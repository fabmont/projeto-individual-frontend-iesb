import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  Stat,
  StatLabel,
  StatNumber,
  Table,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import { Emoji } from 'react-apple-emojis';
import { Link } from 'react-router-dom';
import Page from '../../components/Page';
import numberToCurrency from '../../services/numberToCurrency';

export default function Dashboard({ totalBalances, accounts }) {
  const [showTotalAmount, setShowTotalAmount] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState(accounts && accounts[0] && accounts[0].id);

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
            <Button colorScheme="green" leftIcon={<BiTrendingUp />}>
              Receita
            </Button>
            <Button colorScheme="red" leftIcon={<BiTrendingDown />}>
              Despesa
            </Button>
          </Stack>

          <TableContainer border="1px" borderColor="whiteAlpha.200" borderRadius="md" mt="4">
            <Table variant="simple" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Data</Th>
                  <Th>Descrição</Th>
                  <Th>Valor</Th>
                  <Th>Categoria</Th>
                  <Th>Tipo</Th>
                </Tr>
              </Thead>
            </Table>
          </TableContainer>
        </>
      )}
    </Page>
  );
}
