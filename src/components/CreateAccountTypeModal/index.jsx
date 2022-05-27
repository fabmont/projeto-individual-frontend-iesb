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

export default function CreateAccountTypeModal({
  isOpen,
  onClose,
  editingData,
  createAccountType,
  editAccountType,
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
    if (editingData) return 'Editar tipo de conta';

    return 'Criar tipo de conta';
  };

  const onCloseModal = () => {
    reset({
      ...defaultFormValues,
    });
    onClose();
  };

  const onSubmit = (data) => {
    if (editingData) {
      editAccountType(
        editingData.id,
        data,
        () => {
          onCloseModal();
          toast.success('Tipo de conta editado com sucesso.');
        },
        () => {
          toast.error('Ocorreu um erro ao editar o tipo de conta');
        }
      );
    } else {
      createAccountType(
        data,
        () => {
          onCloseModal();
          toast.success('Tipo de conta criado com sucesso.');
        },
        () => {
          toast.error('Ocorreu um erro ao criar o tipo de conta');
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
