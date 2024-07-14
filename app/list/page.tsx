import { RecordCard } from '@/components/RecordCard';
import type { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/server';
import { Text } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

function getRemain(item: Tables<'records'> & { animes: Tables<'animes'> }) {
  return item.animes.episodes - (item.episode_number ?? 0);
}

export default async function Index({
  searchParams,
}: { searchParams: { result: string | undefined; rid: number | undefined } }) {
  const supabase = createClient();
  const { data: records } = await supabase
    .from('records')
    .select('*, animes(*)')
    .order('updated_at', { ascending: false })
    .returns<(Tables<'records'> & { animes: Tables<'animes'> })[]>();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  const pending = records?.filter((x) => getRemain(x) > 0);
  const completed = records?.filter((x) => getRemain(x) <= 0);

  return (
    <div className='ml-auto mr-auto mt-2 p-3 max-w-4xl'>
      <h2 className='font-bold text-lg'>最近見たリスト</h2>
      <div className='mt-2 gap-2 flex flex-col'>
        {pending?.map((item) => (
          <RecordCard
            result={
              item.id === searchParams.rid ? searchParams.result : undefined
            }
            record={item}
            key={item.id}
          />
        ))}
        {!pending?.length && <Text>ここには何もないようです</Text>}
      </div>

      <h2 className='font-bold text-lg mt-3'>完了</h2>
      <div className='mt-2 gap-2 flex flex-col'>
        {completed?.map((item) => (
          <RecordCard
            result={
              item.id === searchParams.rid ? searchParams.result : undefined
            }
            record={item}
            key={item.id}
          />
        ))}
        {!completed?.length && <Text>ここには何もないようです</Text>}
      </div>
    </div>
  );
}
