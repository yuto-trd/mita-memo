"use server";

import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export async function AddAnime(state: any, formData: FormData): Promise<any> {
    const name = formData.get("name") as string;
    const episodes = parseInt(formData.get("episodes") as string);
    const description = formData.get("description") as string;
    const url = formData.get("url") as string;
    const cover_img = formData.get("cover_img") as File;
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
    if (cover_img && cover_img.size > 100 * 1024) {
        errors = { ...errors, description: "ファイルサイズは100KB以内にしてください" };
    }

    if (errors) {
        return { errors };
    }

    let imgFileName: string | undefined;
    if (cover_img?.size) {
        imgFileName = randomUUID();
        const { error } = await supabase.storage.from('cover_img')
            .upload(imgFileName, cover_img);

        if (error) {
            console.log(error);
            return { error: "不明なエラーが発生しました" };
        }
    }

    const { error } = await supabase.from("animes")
        .insert({
            name,
            url,
            description,
            episodes,
            cover_img: imgFileName
        });

    if (error) {
        console.log(error);
        return { error: "不明なエラーが発生しました" };
    }

    redirect(`/`);
};
