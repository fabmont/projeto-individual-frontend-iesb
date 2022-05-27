import { Box } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Dashboard from './Dashboard';
import Accounts from './Accounts';
import Profile from './Profile';
import AccountTypes from './AccountTypes';
import Categories from './Categories';
import NotFound from './NotFound';

export default function Pages() {
  return (
    <Box minW="full" minH="full">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/account-types" element={<AccountTypes />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Box>
  );
}
