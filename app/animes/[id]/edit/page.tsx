import type { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { EditAnimeForm } from './form';

export default async function Page({
  params: { id },
}: { params: { id: string } }) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const isModerator = (
    await supabase.rpc('is_in_role', { role: 'moderator' }).returns<number>()
  ).data;

  if (!isModerator) {
    return redirect('/login');
  }

  const { data, error } = await supabase
    .from('animes')
    .select()
    .eq('id', `${id}`)
    .returns<Tables<'animes'>[]>();

  if (!data?.[0]) {
    return redirect('/animes');
  }

  return <EditAnimeForm item={data[0]} />;
}
