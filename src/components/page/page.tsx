import { ReactNode } from 'react';

import Layout from '@components/layout/layout';

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return <Layout>{children}</Layout>;
};

export default Page;
