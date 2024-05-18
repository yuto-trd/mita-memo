import { PropsWithChildren } from 'react';

export const metadata = {
  title: "サインイン - Mita-memo",
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
