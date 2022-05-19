import { ChakraProvider } from '@chakra-ui/react';
import { EmojiProvider } from 'react-apple-emojis';
import { ToastContainer } from 'react-toastify';
import emojiData from 'react-apple-emojis/src/data.json';
import 'react-toastify/dist/ReactToastify.css';

import theme from './theme';
import Pages from './pages';

function App() {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <EmojiProvider data={emojiData}>
        <Pages />
        <ToastContainer position="bottom-right" theme="colored" />
      </EmojiProvider>
    </ChakraProvider>
  );
}

export default App;
