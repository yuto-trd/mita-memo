import createMetadata from '@/utils/createMetadata';
import { PropsWithChildren } from 'react';

export const metadata = createMetadata('作品を検索 - Mita-memo', '/list');

export default async function Layout({ children }: PropsWithChildren) {
    return <>{children}</>;
}
