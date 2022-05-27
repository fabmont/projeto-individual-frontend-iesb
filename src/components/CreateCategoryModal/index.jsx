import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const defaultFormValues = {
  name: '',
};

const formValidator = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
});

export default function CreateCategoryModal({
  isOpen,
  onClose,
  editingData,
  createCategory,
  editCategory,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...(editingData
        ? {
            id: editingData.id,
            name: editingData.name,
          }
        : {
            ...defaultFormValues,
          }),
    },
    resolver: yupResolver(formValidator),
  });

  const getTitle = () => {
    if (editingData) return 'Editar categoria';

    return 'Criar categoria';
  };

  const onCloseModal = () => {
    reset({
      ...defaultFormValues,
    });
    onClose();
  };

  const onSubmit = (data) => {
    if (editingData) {
      editCategory(
        editingData.id,
        data,
        () => {
          onCloseModal();
          toast.success('Categoria editada com sucesso.');
        },
        () => {
          toast.error('Ocorreu um erro ao editar a categoria');
        }
      );
    } else {
      createCategory(
        data,
        () => {
          onCloseModal();
          toast.success('Categoria criada com sucesso.');
        },
        () => {
          toast.error('Ocorreu um erro ao criar a categoria');
        }
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{getTitle()}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack
            id="transaction-form"
            flex="1"
            spacing="4"
            as="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing="4">
              <FormControl isInvalid={errors && errors.name}>
                <FormLabel>Nome</FormLabel>
                <Input {...register('name')} />
                {errors && errors.name && (
                  <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                )}
              </FormControl>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" colorScheme="blue" mr={3} onClick={onCloseModal}>
            Fechar
          </Button>
          <Button type="submit" form="transaction-form">
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
