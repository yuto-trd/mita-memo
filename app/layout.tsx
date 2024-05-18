import { Noto_Sans_JP } from 'next/font/google';
import "./globals.css";
import { Providers } from "./providers";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { Metadata } from 'next';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Mita-memo",
  description: "見た作品を記録しよう",
  openGraph: {
    title: "Mita-memo",
    description: "見た作品を記録しよう",
    images: [
      {
        url: `${defaultUrl}/ogp_large.webp`
      }
    ]
  },
  twitter: {
    title: "Mita-memo",
    description: "見た作品を記録しよう",
    card: "summary",
    images: [{
      "url": `${defaultUrl}/ogp.webp`
    }]
  }
};

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp'
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="bg-background text-foreground">
        <Providers>
          <Header auth={user !== null} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
