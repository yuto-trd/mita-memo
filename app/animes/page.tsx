import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { SearchAnimeForm } from "./form";
import { redirect } from "next/navigation";

export default async function AnimesPage({
    searchParams,
}: {
    searchParams: { q?: string };
}) {
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

    let result: Tables<"animes">[] = [];
    if (searchParams.q) {
        const { data, error } = await supabase
            .from("animes")
            .select()
            .textSearch("name", `${searchParams.q}:*`)
            .returns<Tables<"animes">[]>();

        result = data ?? [];
    }

    return (
        <SearchAnimeForm query={searchParams.q} result={result} />
    )
}