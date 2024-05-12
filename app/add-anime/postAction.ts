"use server";

import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function AddAnime(state: any, formData: FormData): Promise<any> {
    const name = formData.get("name") as string;
    const episodes = parseInt(formData.get("episodes") as string);
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user === null) {
        redirect("/login");
    }

    const isModerator = await supabase.rpc("is_in_role", "moderator").returns<number>()

    if (!isModerator) {
        return redirect("/login");
    }

    let errors = undefined;
    if (!name) {
        errors = { name: "名前を入力してください" };
    }
    if (isNaN(episodes) || episodes <= 0) {
        errors = { ...errors, episodes: "1以上の値を入力してください" };
    }
    if (description.length > 1000) {
        errors = { ...errors, description: "1000文字以内にしてください" };
    }

    if (errors) {
        return { errors };
    }

    const { error } = await supabase.from("animes")
        .insert({
            name,
            url,
            description,
            episodes
        });

    if (error) {
        console.log(error);
        return { error: "不明なエラーが発生しました" };
    }

    redirect(`/`);
};
