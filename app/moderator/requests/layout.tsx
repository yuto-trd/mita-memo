import { PropsWithChildren } from 'react';

export const metadata = {
  title: "リクエスト一覧 - Mita-memo",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
