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
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const defaultFormValues = {
  name: '',
  balance: '',
};

const formValidator = yup.object().shape({
  description: yup.string().required('Campo obrigatório'),
  balance: yup
    .number()
    .typeError('Valor deve ser um número')
    .positive('Valor deve ser maior que zero')
    .required('Campo obrigatório'),
});

export default function CreateAccountModal({
  isOpen,
  onClose,
  editingData,
  createAccount,
  editAccount,
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
            name: editingData.name,
            balance: editingData.balance,
          }
        : {
            ...defaultFormValues,
          }),
    },
    resolver: yupResolver(formValidator),
  });

  const getTitle = () => {
    if (editingData) return 'Editar conta';

    return 'Cadastrar conta';
  };

  const onCloseModal = () => {
    reset({
      ...defaultFormValues,
    });
    onClose();
  };

  const onSubmit = (data) => {
    if (editingData) {
      editAccount(
        data,
        () => {
          onCloseModal();
          toast.success('Transação criada com sucesso');
        },
        (e) => toast.error(e.message)
      );
    } else {
      createAccount(
        data,
        () => {
          onCloseModal();
          toast.success('Transação criada com sucesso');
        },
        (e) => toast.error(e.message)
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
              <FormControl isInvalid={errors && errors.balance}>
                <FormLabel>Valor inicial</FormLabel>
                <NumberInput>
                  <NumberInputField {...register('balance')} disabled={editingData} />
                </NumberInput>
                {errors && errors.balance && (
                  <FormErrorMessage>{errors.balance.message}</FormErrorMessage>
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
