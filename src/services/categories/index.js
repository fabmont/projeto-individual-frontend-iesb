import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

import { firestore } from '../firebase';

export default function useCategories() {
  const categoriesCollection = collection(firestore, 'categories');
  const [categories, isLoading, error] = useCollection(categoriesCollection);

  return {
    isLoading,
    categories: categories && categories.docs.map((e) => ({ id: e.id, ...e.data() })),
    error,
  };
}
