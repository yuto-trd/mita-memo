'use server';

import { createClient } from '@/utils/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

type Result = {
  error?: string;
};

export async function DeleteAccount(
  state: Result,
  formData: FormData,
): Promise<Result> {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  const supabaseAdmin = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SERVICE_ROLE_KEY as string,
  );

  if (data.user !== null) {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.user.id);

    if (error) {
      console.log(error);
      return {
        error: `エラーが発生しました (${error.code})`,
      };
    }
  }

  redirect('/login');
}
