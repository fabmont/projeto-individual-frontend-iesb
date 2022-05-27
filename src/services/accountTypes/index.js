/* eslint-disable no-unused-expressions */
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '../firebase';

export default function useAccountTypes() {
  const accountTypeRef = collection(firestore, 'accountTypes');
  const accountTypeDocRef = (accountTypeId) => doc(firestore, 'accountTypes', accountTypeId);
  const [accountTypes, isLoading, error] = useCollection(accountTypeRef);

  const createNewAccountType = async (payload, onSuccess, onError) => {
    const accountRef = collection(firestore, 'accountTypes');
    try {
      const { name } = payload;

      await addDoc(accountRef, { name });

      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  };

  const editAccountType = async (accountTypeId, data, onSuccess, onError) => {
    const { name } = data;
    try {
      const payload = { name };

      await setDoc(accountTypeDocRef(accountTypeId), payload, { merge: true });
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  };

  const deleteAccountType = async (accountTypeId, onSuccess, onError) => {
    try {
      await deleteDoc(accountTypeDocRef(accountTypeId));

      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  };

  return {
    accountTypes: accountTypes && accountTypes.docs.map((i) => ({ id: i.id, ...i.data() })),
    isLoading,
    error,
    createNewAccountType,
    editAccountType,
    deleteAccountType,
  };
}
