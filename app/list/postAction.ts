'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const updateEpisodeNumber = async (formData: FormData) => {
  const record_id = formData.get('id') as string;
  const episode_number = Number.parseInt(
    formData.get('episode_number') as string,
  );
  if (Number.isNaN(episode_number)) {
    return redirect('/error');
  }

  const supabase = createClient();

  if (episode_number === 0) {
    const { error } = await supabase
      .from('records')
      .delete()
      .eq('id', record_id);

    if (error) {
      console.log(error);
    }

    return redirect('/list');
  }

  const { error } = await supabase
    .from('records')
    .update({ episode_number: episode_number })
    .eq('id', record_id);

  if (error) {
    console.log(error);
  }

  return redirect(`/list/?result=handled&rid=${record_id}`);
};
