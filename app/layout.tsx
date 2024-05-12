import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Mita-memo",
  description: "見た作品を記録しよう",
};

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
    <html lang="ja" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <Providers>
          <Header auth={user !== null} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
