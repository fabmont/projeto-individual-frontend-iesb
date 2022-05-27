import { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import CreateAccountTypeModal from '../../components/CreateAccountTypeModal';

import Page from '../../components/Page';
import useAccountTypes from '../../services/accountTypes';

export default function AccountTypes() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { accountTypes, isLoading, createNewAccountType, editAccountType, deleteAccountType } =
    useAccountTypes();
  const [editingData, setEditingData] = useState();

  if (isLoading) {
    if (isLoading) {
      return (
        <Center h="full">
          <Spinner />
        </Center>
      );
    }
  }

  return (
    <Page title="Tipos de conta">
      <Stack direction="row" justify="flex-end" mb="8">
        <Button
          leftIcon={<MdAdd />}
          onClick={() => {
            onOpen();
          }}
        >
          Adicionar tipo de conta
        </Button>
      </Stack>

      <Box w="full" borderRadius="md" border="1px" borderColor="whiteAlpha.200">
        <Table>
          <Tbody>
            {accountTypes.map((accountType) => (
              <Tr _last={{ td: { border: 0 } }} key={accountType.id}>
                <Td borderColor="whiteAlpha.200">{accountType.name}</Td>
                <Td textAlign="right" borderColor="whiteAlpha.200">
                  <ButtonGroup size="sm" variant="outline" isAttached>
                    <Button
                      leftIcon={<MdEdit />}
                      onClick={() => {
                        setEditingData(accountType);
                        onOpen();
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() =>
                        deleteAccountType(
                          accountType.id,
                          () => toast.success('Categoria excluída com sucesso'),
                          () => toast.error('Ocorreu um erro ao excluir a categoria')
                        )
                      }
                    >
                      <MdDelete />
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
            {!accountTypes.length && (
              <Tr _last={{ td: { border: 0 } }}>
                <Td colSpan={2} textAlign="center">
                  Nenhum tipo de conta foi criada ainda.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {isOpen && (
        <CreateAccountTypeModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setEditingData(null);
          }}
          editingData={editingData}
          createAccountType={createNewAccountType}
          editAccountType={editAccountType}
        />
      )}
    </Page>
  );
}
