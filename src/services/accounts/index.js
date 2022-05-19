import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';

export default function useAccounts() {
  const accountsCollection = collection(firestore, 'accounts');
  const [accounts, isLoading, error] = useCollection(accountsCollection);

  return {
    accounts: accounts && accounts.docs.map((e) => ({ id: e.id, ...e.data() })),
    isLoading,
    error,
  };
}
