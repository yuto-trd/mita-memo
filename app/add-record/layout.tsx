import createMetadata from '@/utils/createMetadata';
import { PropsWithChildren } from 'react';

export const metadata = createMetadata("記録を追加 - Mita-memo", "/add-record");

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
