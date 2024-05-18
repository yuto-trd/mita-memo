import { PropsWithChildren } from 'react';

export const metadata = {
  title: "作品を追加 - Mita-memo",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
