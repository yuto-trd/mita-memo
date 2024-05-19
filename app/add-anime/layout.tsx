import createMetadata from '@/utils/createMetadata';
import { PropsWithChildren } from 'react';

export const metadata = createMetadata("作品を追加 - Mita-memo", "/add-anime");

export default async function Layout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
