import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Show,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Sidebar from '../Sidebar';

export default function Layout({ children }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Box display="flex" flexDirection={['column', 'row']}>
        <Show breakpoint="(max-width: 425px)">
          <Box bg="blackAlpha.100">
            <Button variant="ghost" leftIcon={<HamburgerIcon />} size="lg" onClick={onOpen} />
          </Box>
        </Show>
        <Show breakpoint="(min-width: 426px)">
          <Box w="320px" minH="100vh" bg="blackAlpha.300" p="4">
            <Sidebar />
          </Box>
        </Show>

        <Box flex="1">{children}</Box>
      </Box>

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        closeOnEsc
        closeOnOverlayClick
        isFullHeight
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent bg="black" p="4">
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
}
