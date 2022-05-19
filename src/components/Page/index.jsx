import { Box, Heading } from '@chakra-ui/react';

export default function Page({ children, title = '' }) {
  return (
    <Box width="full" height="full">
      <Box borderBottom="1px" borderColor="whiteAlpha.100" bg="blackAlpha.100" p="4">
        <Heading size="lg">{title}</Heading>
      </Box>
      <Box p="4">{children}</Box>
    </Box>
  );
}
