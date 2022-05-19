import { Box } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Dashboard from './Dashboard';
import Accounts from './Accounts';
import Profile from './Profile';
import Categories from './Categories';
import Goals from './Goals';
import Expenses from './Expenses';
import NotFound from './NotFound';

export default function Pages() {
  return (
    <Box minW="full" minH="full">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Box>
  );
}
