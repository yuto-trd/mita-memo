'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

type Result = {
  errors?: {
    name?: string;
  };
};

export async function AddRequest(
  state: Result,
  formData: FormData,
): Promise<Result> {
  const name = formData.get('name') as string;
  const url = formData.get('url') as string;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user === null) {
    redirect('/login');
  }

  if (!name) {
    return {
      errors: {
        name: '名前を入力してください',
      },
    };
  }

  const { error } = await supabase.from('requests').insert({
    name,
    url,
    user_id: data.user.id,
  });

  if (error) {
    console.log(error);
  }

  redirect('/requests');
}
