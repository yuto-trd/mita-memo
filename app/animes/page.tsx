import type { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SearchAnimeForm } from './form';

const PAGE_SIZE = 20;
type AnimesProps = {
  searchParams: {
    q?: string;
    page?: number;
  };
};

export default async function AnimesPage({ searchParams }: AnimesProps) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  let result: Tables<'animes'>[] = [];
  let count = 0;
  const page = searchParams.page ?? 0;
  if (searchParams.q) {
    const startIndex = page * PAGE_SIZE;
    const {
      data,
      count: c1,
      error,
    } = await supabase
      .from('animes')
      .select('*', { count: 'exact' })
      .like('name', `%${searchParams.q}%`)
      .order('name', { ascending: true })
      .range(startIndex, startIndex + (PAGE_SIZE - 1))
      .returns<Tables<'animes'>[]>();

    result = data ?? [];
    count = c1 ?? 0;
  }

  return (
    <SearchAnimeForm
      query={searchParams.q}
      result={result}
      page={page}
      count={count}
    />
  );
}
