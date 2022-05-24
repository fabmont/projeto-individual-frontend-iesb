import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Skeleton,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FiEdit, FiEye, FiEyeOff, FiMoreVertical, FiTrash } from 'react-icons/fi';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import { Emoji } from 'react-apple-emojis';
import { Link } from 'react-router-dom';

import moment from 'moment';
import { toast } from 'react-toastify';
import Page from '../../components/Page';
import numberToCurrency from '../../services/numberToCurrency';
import useTransactions from '../../services/transactions';
import CreateTransactionModal from '../../components/CreateTransactionModal';
import useCategories from '../../services/categories';

export default function Dashboard({ totalBalances, accounts }) {
  const [showTotalAmount, setShowTotalAmount] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(accounts && accounts[0] && accounts[0].id);
  const { transactions, isLoading, createTransaction, editTransaction, deleteTransaction } =
    useTransactions(selectedAccount);
  const { categories } = useCategories();
  const [transactionType, setTransactionType] = useState(null);
  const [editingData, setEditingData] = useState(false);

  return (
    <Page title="Home">
      {accounts && !accounts.length ? (
        <Box
          bg="blackAlpha.100"
          border="1px"
          borderColor="blackAlpha.200"
          p="4"
          borderRadius="12px"
        >
          <Emoji name="hole" width={32} />
          <Text mt="2">Nenhuma conta foi cadastrada ainda.</Text>
          <Text>
            <Button as={Link} variant="link" to="/accounts" colorScheme="primary">
              Clique aqui
            </Button>{' '}
            para criar e gerenciar suas contas.
          </Text>
        </Box>
      ) : (
        <>
          <Stat
            bg="blackAlpha.100"
            border="1px"
            borderColor="blackAlpha.200"
            p="4"
            borderRadius="12px 12px 0 0"
          >
            <StatLabel opacity={0.7} letterSpacing="wider" fontSize="xs">
              VALOR TOTAL
            </StatLabel>
            <StatNumber>
              <Flex alignItems="center" direction="row">
                {showTotalAmount ? (
                  numberToCurrency(totalBalances)
                ) : (
                  <Box
                    w="150px"
                    h="25px"
                    bg="whiteAlpha.100"
                    display="inline-block"
                    borderRadius="md"
                  />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTotalAmount((prev) => !prev)}
                  ml="4"
                >
                  {showTotalAmount ? <FiEyeOff /> : <FiEye />}
                </Button>
              </Flex>
            </StatNumber>
          </Stat>

          <SimpleGrid
            columns={[2, 2, 2, 4]}
            spacing="4"
            borderRadius="0 0 12px 12px"
            border="1px"
            borderColor="blackAlpha.200"
            bg="blackAlpha.100"
          >
            {accounts.map((account) => (
              <Box
                p="4"
                key={account.id}
                bg={account.id === selectedAccount ? 'blackAlpha.300' : null}
                m="2"
                borderRadius="md"
                cursor="pointer"
                transition="ease-in-out"
                transitionDuration="0.2s"
                onClick={() => setSelectedAccount(account.id)}
                _hover={{ bg: 'blackAlpha.200' }}
              >
                {showTotalAmount ? (
                  <Text>{numberToCurrency(account.balance)}</Text>
                ) : (
                  <Box
                    w="150px"
                    h="25px"
                    bg="whiteAlpha.100"
                    display="inline-block"
                    borderRadius="md"
                  />
                )}
                <Text letterSpacing="wider" fontSize="xs" textTransform="uppercase" opacity={0.7}>
                  {account.name}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          <Stack spacing="4" direction="row" justify="flex-end" mt="6">
            <Button
              colorScheme="green"
              leftIcon={<BiTrendingUp />}
              onClick={() => setTransactionType('earning')}
            >
              Ganho
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<BiTrendingDown />}
              onClick={() => setTransactionType('expense')}
            >
              Despesa
            </Button>
          </Stack>

          {isLoading ? (
            <Stack mt="4">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  w="full"
                  h="25px"
                  startColor="whiteAlpha.200"
                  endColor="whiteAlpha.300"
                />
              ))}
            </Stack>
          ) : (
            <TableContainer border="1px" borderColor="whiteAlpha.200" borderRadius="md" mt="4">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th borderColor="whiteAlpha.200">Data</Th>
                    <Th borderColor="whiteAlpha.200">Descrição</Th>
                    <Th borderColor="whiteAlpha.200">Valor</Th>
                    <Th borderColor="whiteAlpha.200">Categoria</Th>
                    <Th borderColor="whiteAlpha.200">Tipo</Th>
                    <Th borderColor="whiteAlpha.200" />
                  </Tr>
                </Thead>
                <Tbody>
                  {(transactions || []).map((transaction) => (
                    <Tr key={transaction.id}>
                      <Td borderColor="whiteAlpha.200">
                        {moment(transaction.created_at).format('DD/MM/YYYY')}
                      </Td>
                      <Td borderColor="whiteAlpha.200">{transaction.description}</Td>
                      <Td borderColor="whiteAlpha.200">{numberToCurrency(transaction.value)}</Td>
                      <Td borderColor="whiteAlpha.200">{transaction.category}</Td>
                      <Td borderColor="whiteAlpha.200">
                        <Tag colorScheme={transaction.type === 'expense' ? 'red' : 'green'}>
                          {transaction.type === 'expense' ? 'Despesa' : 'Receita'}
                        </Tag>
                      </Td>
                      <Td borderColor="whiteAlpha.200">
                        <Menu>
                          <MenuButton as={Button} variant="ghost" size="sm">
                            <FiMoreVertical />
                          </MenuButton>
                          <MenuList>
                            <MenuItem
                              icon={<FiEdit />}
                              onClick={() => {
                                setEditingData(transaction);
                                setTransactionType(transaction.type);
                              }}
                            >
                              Editar
                            </MenuItem>
                            <MenuItem
                              icon={<FiTrash />}
                              onClick={() => {
                                deleteTransaction(
                                  transaction,
                                  () => toast.success('Transação deletada com sucesso.'),
                                  () => toast.error('Ocorreu um erro ao excluir a transação.')
                                );
                              }}
                            >
                              Excluir
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  ))}
                  {transactions && !transactions.length && (
                    <Tr>
                      <Td colSpan={6} textAlign="center" borderColor="whiteAlpha.200">
                        Nenhuma transação foi realizada.
                      </Td>
                    </Tr>
                  )}
                  <Tr />
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </>
      )}

      {transactionType && (
        <CreateTransactionModal
          isOpen={!!transactionType}
          transactionType={transactionType}
          editingData={editingData}
          targetAccount={selectedAccount}
          categoriesList={categories}
          createTransaction={createTransaction}
          editTransaction={editTransaction}
          onClose={() => {
            setTransactionType(null);
            setEditingData(null);
          }}
        />
      )}
    </Page>
  );
}
