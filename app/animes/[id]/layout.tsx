import { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { PropsWithChildren } from 'react';

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export async function generateMetadata({ params: { id } }: { params: { id: string } }) {
  const supabase = createClient();

  const { data, error } = await supabase.from("animes")
    .select()
    .eq("id", `${id}`)
    .returns<Tables<"animes">[]>();

  return {
    title: `'${data?.[0].name}' - Mita-memo`,
  }
}