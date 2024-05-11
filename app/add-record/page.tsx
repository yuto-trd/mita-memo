import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { AddRecordForm } from "./form";
import { redirect } from "next/navigation";

export default async function AddRecordPage() {
    const supabase = createClient();
    const { data: watched } = await supabase.rpc("get_watched_animes").returns<Tables<"animes">[]>();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <AddRecordForm watchedItems={watched ?? []} />
    )
}