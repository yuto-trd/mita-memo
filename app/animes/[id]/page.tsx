import type { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Display from './display';

export default async function Page({
  params: { id },
  searchParams,
}: { params: { id: string }; searchParams: { result: string | undefined } }) {
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

  const { data, error } = await supabase
    .from('animes')
    .select()
    .eq('id', `${id}`)
    .returns<Tables<'animes'>[]>();

  const { data: records } = await supabase
    .from('records')
    .select()
    .eq('anime_id', `${id}`)
    .returns<Tables<'records'>[]>();

  if (!data?.[0]) {
    return redirect('/animes');
  }

  return (
    <Display
      result={searchParams.result}
      isModerator={isModerator !== 0}
      item={data[0]}
      record={records?.[0] ?? null}
    />
  );
}
