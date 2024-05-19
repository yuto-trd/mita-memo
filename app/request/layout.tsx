import createMetadata from '@/utils/createMetadata';
import { PropsWithChildren } from 'react';

export const metadata = createMetadata('リクエストする - Mita-memo', '/request');

export default async function Layout({ children }: PropsWithChildren) {
    return <>{children}</>;
}
