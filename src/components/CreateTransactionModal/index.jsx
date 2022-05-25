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
  Select,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

const defaultFormValues = {
  description: '',
  value: '',
  created_at: '',
  category: '',
};

const formValidator = yup.object().shape({
  description: yup.string().required('Campo obrigatório'),
  value: yup
    .number()
    .typeError('Valor deve ser um número')
    .positive('Valor deve ser maior que zero')
    .required('Campo obrigatório'),
  created_at: yup.string().required('Campo obrigatório'),
  category: yup.string().required('Campo obrigatório'),
});

export default function CreateTransactionModal({
  isOpen,
  onClose,
  transactionType,
  editingData,
  targetAccount,
  categoriesList,
  createTransaction,
  editTransaction,
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
            description: editingData.description,
            value: editingData.value,
            prevValue: editingData.value,
            created_at: editingData.created_at,
            category: editingData.category,
          }
        : {
            ...defaultFormValues,
          }),
      account: targetAccount,
      type: transactionType,
    },
    resolver: yupResolver(formValidator),
  });

  const getTitle = () => {
    if (transactionType === 'earning' && !editingData) return 'Adicionar novo ganho';
    if (transactionType === 'earning' && editingData) return 'Editar ganho';
    if (transactionType === 'expense' && !editingData) return 'Adicionar despesa';
    if (transactionType === 'expense' && editingData) return 'Editar despesa';

    return '';
  };

  const onCloseModal = () => {
    reset({
      ...defaultFormValues,
      type: transactionType,
      account: targetAccount,
    });
    onClose();
  };

  const onSubmit = (data) => {
    if (editingData) {
      editTransaction(
        data,
        () => {
          onCloseModal();
          toast.success('Transação criada com sucesso');
        },
        (e) => toast.error(e.message)
      );
    } else {
      createTransaction(
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
              <FormControl isInvalid={errors && errors.description}>
                <FormLabel>Descrição</FormLabel>
                <Input {...register('description')} />
                {errors && errors.description && (
                  <FormErrorMessage>{errors.description.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors && errors.value}>
                <FormLabel>Valor</FormLabel>
                <NumberInput>
                  <NumberInputField {...register('value')} />
                </NumberInput>
                {errors && errors.value && (
                  <FormErrorMessage>{errors.value.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors && errors.created_at}>
                <FormLabel>Data</FormLabel>
                <Input type="date" {...register('created_at')} />
                {errors && errors.created_at && (
                  <FormErrorMessage>{errors.created_at.message}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errors && errors.category}>
                <FormLabel>Categoria</FormLabel>
                <Select {...register('category')}>
                  {categoriesList &&
                    categoriesList.map((i) => (
                      <option key={i.id} value={i.name}>
                        {i.name}
                      </option>
                    ))}
                </Select>
                {errors && errors.category && (
                  <FormErrorMessage>{errors.category.message}</FormErrorMessage>
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
