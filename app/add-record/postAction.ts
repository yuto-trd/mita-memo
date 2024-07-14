'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type Result = {
  errors?: {
    anime_id?: string;
  };
};

export async function AddRecord(
  state: Result,
  formData: FormData,
): Promise<Result> {
  const anime_id = formData.get('anime_id') as string;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user === null) {
    redirect('/login');
  }

  if (!anime_id) {
    return {
      errors: {
        anime_id: '作品を選択してください',
      },
    };
  }

  const { error } = await supabase.from('records').insert({
    anime_id,
    user_id: data.user.id,
    episode_number: 1,
  });

  if (error) {
    console.log(error);
  }

  redirect('/list');
}
