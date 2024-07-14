'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export const cancelRequest = async (formData: FormData) => {
  const id = formData.get('id') as string;
  const supabase = createClient();

  const { error } = await supabase.from('requests').delete().eq('id', id);

  if (error) {
    return redirect('/error?message=Could not authenticate user');
  }

  return redirect('/requests');
};
