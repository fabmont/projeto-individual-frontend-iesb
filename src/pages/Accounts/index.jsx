import {
  Box,
  Button,
  Center,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';
import CreateAccountModal from '../../components/CreateAccountModal';
import Page from '../../components/Page';
import useAccounts from '../../services/accounts';
import numberToCurrency from '../../services/numberToCurrency';

export default function Account() {
  const { accounts, isLoading } = useAccounts();
  const { isOpen, onToggle } = useDisclosure();
  const [editingData, setEditingData] = useState(null);

  if (isLoading) {
    return (
      <Center h="full">
        <Spinner />
      </Center>
    );
  }

  return (
    <Page title="Contas">
      <Stack direction="row" justify="flex-end" mb="8">
        <Button leftIcon={<MdAdd />}>Adicionar conta</Button>
      </Stack>

      <SimpleGrid columns={[1, 3]} spacing="4">
        {accounts.map((account) => (
          <Box key={account.id} bg="blackAlpha.200" w="full" borderRadius="md" boxShadow="lg">
            <Stack p="4" justifyContent="space-between">
              <Text letterSpacing="wider" fontSize="md" textTransform="uppercase" opacity={0.7}>
                {account.name}
              </Text>
              <Text textAlign="end" fontSize="lg" fontWeight="bold">
                {numberToCurrency(account.balance)}
              </Text>
            </Stack>
            <Stack
              justify="flex-end"
              direction="row"
              p="4"
              borderTop="1px"
              borderColor="whiteAlpha.200"
            >
              <Button
                variant="outline"
                onClick={() => {
                  onToggle();
                  setEditingData(account);
                }}
              >
                <MdEdit />
              </Button>
              <Button variant="outline" onClick={() => console.log('delete account')}>
                <MdDelete />
              </Button>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>

      <CreateAccountModal isOpen={isOpen} onClose={onToggle} editingData={editingData} />
    </Page>
  );
}
