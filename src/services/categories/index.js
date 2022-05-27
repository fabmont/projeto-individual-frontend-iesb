/* eslint-disable no-unused-expressions */
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';

import { firestore } from '../firebase';

export default function useCategories() {
  const categoriesCollection = collection(firestore, 'categories');
  const [categories, isLoading, error] = useCollection(categoriesCollection);
  const categoriesRef = collection(firestore, 'categories');
  const categoryDocRef = (categoryId) => doc(firestore, 'categories', categoryId);

  const createCategory = async (data, onSuccess, onError) => {
    const { name } = data;
    try {
      const payload = { name };

      await addDoc(categoriesRef, payload);
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  };

  const editCategory = async (categoryId, data, onSuccess, onError) => {
    const { name } = data;
    try {
      const payload = { name };

      await setDoc(categoryDocRef(categoryId), payload, { merge: true });
      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  };

  const deleteCategory = async (categoryId, onSuccess, onError) => {
    try {
      await deleteDoc(categoryDocRef(categoryId));

      onSuccess && onSuccess();
    } catch (err) {
      onError && onError(err);
    }
  };

  return {
    isLoading,
    categories: categories && categories.docs.map((e) => ({ id: e.id, ...e.data() })),
    error,
    createCategory,
    editCategory,
    deleteCategory,
  };
}
