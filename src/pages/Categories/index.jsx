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
import CreateCategoryModal from '../../components/CreateCategoryModal';
import Page from '../../components/Page';
import useCategories from '../../services/categories';

export default function Categories() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { categories, isLoading, createCategory, editCategory, deleteCategory } = useCategories();
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
    <Page title="Categorias">
      <Stack direction="row" justify="flex-end" mb="8">
        <Button
          leftIcon={<MdAdd />}
          onClick={() => {
            onOpen();
          }}
        >
          Adicionar categoria
        </Button>
      </Stack>

      <Box w="full" borderRadius="md" border="1px" borderColor="whiteAlpha.200">
        <Table>
          <Tbody>
            {categories.map((category) => (
              <Tr _last={{ td: { border: 0 } }} key={category.id}>
                <Td borderColor="whiteAlpha.200" fontWeight="bold">
                  {category.name}
                </Td>
                <Td textAlign="right" borderColor="whiteAlpha.200">
                  <ButtonGroup size="sm" variant="outline" isAttached>
                    <Button
                      leftIcon={<MdEdit />}
                      onClick={() => {
                        setEditingData(category);
                        onOpen();
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      onClick={() =>
                        deleteCategory(
                          category.id,
                          () => toast.success('Categoria exclu??da com sucesso'),
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
            {!categories.length && (
              <Tr _last={{ td: { border: 0 } }}>
                <Td colSpan={2} textAlign="center">
                  Nenhuma categoria foi criada ainda.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {isOpen && (
        <CreateCategoryModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setEditingData(null);
          }}
          editingData={editingData}
          createCategory={createCategory}
          editCategory={editCategory}
        />
      )}
    </Page>
  );
}
