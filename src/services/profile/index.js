import { useDocument } from 'react-firebase-hooks/firestore';
import { doc, setDoc } from 'firebase/firestore';

import { toast } from 'react-toastify';
import { firestore } from '../firebase';

export default function useProfile() {
  const profileDoc = doc(firestore, 'user', 'profile');
  const [profile, isLoading, error] = useDocument(profileDoc);

  const updateProfile = async (values) => {
    try {
      await setDoc(profileDoc, values, { merge: true });
      toast.success('Perfil salvo com sucesso.');
    } catch (err) {
      toast.error('Ocorreu um erro ao salvar dados do perfil.');
    }
  };

  return {
    isLoading,
    profile: profile && profile.data(),
    error,
    updateProfile,
  };
}
