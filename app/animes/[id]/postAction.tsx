"use server";

import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function AddRecord(formData: FormData) {
    const anime_id = formData.get("anime_id") as string;
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user === null) {
        redirect("/login");
    }

    const { error } = await supabase.from("records")
        .insert({
            anime_id,
            user_id: data.user.id,
            episode_number: 1
        });

    if (error) {
        console.log(error);
    }

    return redirect(`/animes/${anime_id}?result=handled`);
};

export const UpdateEpisodeNumber = async (formData: FormData) => {
    const record_id = formData.get("id") as string;
    const anime_id = formData.get("anime_id") as string;
    const episode_number = parseInt(formData.get("episode_number") as string);
    if (isNaN(episode_number)) {
        return redirect("/error");
    }

    const supabase = createClient();

    if (episode_number === 0) {
        const { error } = await supabase.from("records")
            .delete()
            .eq('id', record_id);

        if (error) {
            console.log(error);
        }

        return redirect(`/animes/${anime_id}?result=handled`);
    } else {
        const { error } = await supabase.from("records")
            .update({ episode_number: episode_number })
            .eq('id', record_id);

        if (error) {
            console.log(error);
        }

        return redirect(`/animes/${anime_id}?result=handled`);
    }
};

export async function DeleteAnime(formData: FormData) {
    const id = formData.get("anime_id") as string;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) {
        redirect("/login");
    }

    const isModerator = (await supabase.rpc("is_in_role", { role: "moderator" }).returns<number>()).data

    if (!isModerator) {
        return redirect("/login");
    }

    const { error } = await supabase.from("animes")
        .delete()
        .eq("id", `${id}`);

    if (error) {
        console.log(error);
        return { error: "不明なエラーが発生しました" };
    }

    redirect(`/animes`);
}