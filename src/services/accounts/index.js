/* eslint-disable no-unused-expressions */
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { toast } from 'react-toastify';
import { firestore } from '../firebase';

export default function useAccounts() {
  const accountsCollection = collection(firestore, 'accounts');
  const [accounts, isLoading, error] = useCollection(accountsCollection);

  const createNewAccount = async (payload, onSuccess, onError) => {
    const accountRef = collection(firestore, 'accounts');
    try {
      const { name, accountType, balance } = payload;

      await addDoc(accountRef, { name, accountType, balance });

      toast.success('Conta criada com sucesso.');

      onSuccess && onSuccess();
    } catch (err) {
      toast.error('Ocorreu um erro ao criar a conta.');
      onError && onError(err);
    }
  };

  const editAccount = async (payload, onSuccess, onError) => {
    const { id, name, accountType } = payload;
    const accountRef = doc(firestore, 'accounts', id);
    try {
      await setDoc(accountRef, { name, accountType }, { merge: true });

      toast.success('Conta criada com sucesso.');

      onSuccess && onSuccess();
    } catch (err) {
      toast.error('Ocorreu um erro ao criar a conta.');
      onError && onError(err);
    }
  };

  const deleteAccount = async (accountId) => {
    const accountDoc = doc(firestore, 'accounts', accountId);

    try {
      await deleteDoc(accountDoc);
      toast.success('Conta deletada com sucesso.');
    } catch (err) {
      toast.error('Ocorreu um erro ao deletar a conta.');
    }
  };

  return {
    accounts: accounts && accounts.docs.map((e) => ({ id: e.id, ...e.data() })),
    isLoading,
    error,
    createNewAccount,
    editAccount,
    deleteAccount,
  };
}
