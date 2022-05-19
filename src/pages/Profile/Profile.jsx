import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import Page from '../../components/Page';

export default function Profile({ defaultValues, updateProfile }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => updateProfile(data);

  return (
    <Page title="Meu perfil">
      <Stack direction={['column', 'row']} spacing="12" m="8">
        <Flex direction="column">
          <Avatar size="2xl" mb="4" name={defaultValues && defaultValues.name} />
          <Button variant="ghost">Escolher...</Button>
        </Flex>
        <Stack flex="1" spacing="4" as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors && errors.name}>
            <FormLabel>Nome</FormLabel>
            <Input {...register('name', { required: true })} />
            {errors && errors.name && <FormErrorMessage>Campo obrigatório</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={errors && errors.email}>
            <FormLabel>E-mail</FormLabel>
            <Input {...register('email', { required: true })} />
            {errors && errors.email && <FormErrorMessage>Campo obrigatório</FormErrorMessage>}
          </FormControl>

          <FormControl isInvalid={errors && errors.birthdate}>
            <FormLabel>Data de nascimento</FormLabel>
            <Input type="date" {...register('birthdate', { required: true })} />
            {errors && errors.birthdate && <FormErrorMessage>Campo obrigatório</FormErrorMessage>}
          </FormControl>

          <Button w="fit-content" alignSelf="end" type="submit">
            Salvar
          </Button>
        </Stack>
      </Stack>
    </Page>
  );
}
