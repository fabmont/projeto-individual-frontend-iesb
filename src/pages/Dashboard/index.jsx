import { useMemo } from 'react';
import { Center, Spinner } from '@chakra-ui/react';

import useAccounts from '../../services/accounts';
import Dashboard from './Dashboard';

export default function DashboardWrapper() {
  const { accounts, isLoading } = useAccounts();

  const totalBalances = useMemo(
    () => accounts && accounts.reduce((prev, curr) => prev + curr.balance, 0),
    [accounts]
  );

  if (isLoading) {
    return (
      <Center h="full">
        <Spinner />
      </Center>
    );
  }
  return <Dashboard totalBalances={totalBalances} accounts={accounts} />;
}
