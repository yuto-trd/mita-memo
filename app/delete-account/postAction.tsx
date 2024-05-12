"use server";

import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient} from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export async function DeleteAccount(state: any, formData: FormData): Promise<any> {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const supabaseAdmin = createAdminClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL as string,
        process.env.SERVICE_ROLE_KEY as string
    )

    if (data.user !== null) {
        const { error } = await supabaseAdmin.auth.admin.deleteUser(data.user.id);

        if (error) {
            console.log(error);
            return {
                error: `エラーが発生しました (${error.code})`
            };
        }
    }

    redirect(`/login`);
};
