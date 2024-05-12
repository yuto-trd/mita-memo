import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AddAnimeForm } from "./form";

export default async function RequestPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const isModerator = await supabase.rpc("is_in_role", "moderator").returns<number>()

    if (!isModerator) {
        return redirect("/login");
    }

    return (
        <AddAnimeForm />
    )
}