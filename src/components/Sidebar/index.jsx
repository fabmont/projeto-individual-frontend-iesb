import { Avatar, Box, Button, Flex, Heading, Icon, Skeleton, Stack, Text } from '@chakra-ui/react';
import { RiBankCardLine } from 'react-icons/ri';
import { BiCategory, BiHome } from 'react-icons/bi';
import { FiDollarSign } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useProfile from '../../services/profile';

export default function Sidebar({ onClose }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { profile, isLoading } = useProfile();

  const handleActiveMenu = (menuName) => pathname === menuName;

  return (
    <Flex justify="space-between" direction="column" h="full">
      <Box>
        <Heading color="primary.400" letterSpacing="tighter" mb="4">
          Fortune
        </Heading>

        <Stack spacing="2">
          <Link to="/" onClick={onClose}>
            <Button
              w="full"
              variant="ghost"
              justifyContent="start"
              colorScheme={handleActiveMenu('/') ? 'primary' : 'white'}
              bg={handleActiveMenu('/') ? 'blackAlpha.500' : null}
            >
              <Icon as={BiHome} mr="4" />
              Home
            </Button>
          </Link>
          <Link to="/accounts" onClick={onClose}>
            <Button
              w="full"
              variant="ghost"
              justifyContent="start"
              colorScheme={handleActiveMenu('/accounts') ? 'primary' : 'white'}
              bg={handleActiveMenu('/accounts') ? 'blackAlpha.500' : null}
            >
              <Icon as={RiBankCardLine} mr="4" />
              Minhas contas
            </Button>
          </Link>
          <Link to="/account-types" onClick={onClose}>
            <Button
              w="full"
              variant="ghost"
              justifyContent="start"
              colorScheme={handleActiveMenu('/account-types') ? 'primary' : 'white'}
              bg={handleActiveMenu('/account-types') ? 'blackAlpha.500' : null}
            >
              <Icon as={FiDollarSign} mr="4" />
              Tipos de conta
            </Button>
          </Link>
          <Link to="/categories" onClick={onClose}>
            <Button
              w="full"
              variant="ghost"
              justifyContent="start"
              colorScheme={handleActiveMenu('/categories') ? 'primary' : 'white'}
              bg={handleActiveMenu('/categories') ? 'blackAlpha.500' : null}
            >
              <Icon as={BiCategory} mr="4" />
              Categorias
            </Button>
          </Link>
        </Stack>
      </Box>

      <Skeleton isLoaded={!isLoading} startColor="whiteAlpha.200" endColor="whiteAlpha.300">
        <Box
          bg="whiteAlpha.100"
          p="4"
          borderRadius="md"
          transition="ease-in-out"
          transitionDuration="0.2s"
          cursor="pointer"
          onClick={() => navigate('/profile')}
          _hover={{ bg: 'whiteAlpha.200' }}
        >
          {profile ? (
            <Flex align="center" wordBreak="break-all">
              <Avatar name={profile && profile.name} mr="4" />
              <Box>
                <Text fontWeight="bold">{profile && profile.name}</Text>
              </Box>
            </Flex>
          ) : (
            <Text textAlign="center">Clique aqui para criar seu perfil.</Text>
          )}
        </Box>
      </Skeleton>
    </Flex>
  );
}
