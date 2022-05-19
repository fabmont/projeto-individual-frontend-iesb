import { Center, Spinner } from '@chakra-ui/react';
import useProfile from '../../services/profile';
import ProfileWrapper from './Profile';

export default function Profile() {
  const { profile, isLoading, updateProfile } = useProfile();

  if (isLoading) {
    return (
      <Center h="full">
        <Spinner />
      </Center>
    );
  }

  return <ProfileWrapper defaultValues={profile} updateProfile={updateProfile} />;
}
