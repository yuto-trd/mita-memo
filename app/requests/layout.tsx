import createMetadata from '@/utils/createMetadata';
import { PropsWithChildren } from 'react';

export const metadata = createMetadata('リクエスト一覧 - Mita-memo', '/requests');

export default async function Layout({ children }: PropsWithChildren) {
    return <>{children}</>;
}
