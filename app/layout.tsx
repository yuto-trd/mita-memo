import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { createClient } from '@/utils/supabase/server';
import type { Metadata } from 'next';
import { Providers } from './providers';

const publicUrl = process.env.VERCEL_URL
  ? 'https://mita-memo.vercel.app'
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title: 'Mita-memo',
  description: '見た作品を記録しよう',
  openGraph: {
    title: 'Mita-memo',
    description: '見た作品を記録しよう',
    url: '/',
    type: 'website',
    images: [
      {
        url: '/ogp_large.png',
      },
    ],
  },
  twitter: {
    title: 'Mita-memo',
    description: '見た作品を記録しよう',
    card: 'summary',
    site: '@indigo_san_',
    creator: '@indigo_san_',
    images: {
      url: '/ogp.png',
    },
  },
};

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isModerator =
    user !== null &&
    (await supabase.rpc('is_in_role', { role: 'moderator' }).returns<number>())
      .data;

  return (
    <html lang='ja' className={notoSansJP.variable}>
      <body className='bg-background text-foreground'>
        <Providers>
          <Header auth={user !== null} moderator={!!isModerator} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
