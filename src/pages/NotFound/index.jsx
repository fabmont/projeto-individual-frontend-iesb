import { ArrowBackIcon } from '@chakra-ui/icons';
import { Center, Box, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Text404 } from './styles';

export default function NotFound() {
  return (
    <Box w="full" h="full">
      <Center h="full" w="full" flexDirection="column">
        <Text404 fontSize="8xl">404</Text404>
        <Text>Não foi possível encontrar esta página 😔</Text>

        <Link to="/dashboard">
          <Button mt="8" leftIcon={<ArrowBackIcon />}>
            Voltar para a dashboard
          </Button>
        </Link>
      </Center>
    </Box>
  );
}
