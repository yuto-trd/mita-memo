import type { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { Form } from './form';

export default async function Page({
  params: { id },
}: { params: { id: number } }) {
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

  const { data: requests } = await supabase
    .from('requests')
    .select('*, response4request(*)')
    .eq('id', id)
    .returns<
      (Tables<'requests'> & {
        response4request: Tables<'response4request'>[];
      })[]
    >();

  if (!requests?.[0]) {
    return notFound();
  }

  return <Form item={requests[0]} />;
}
