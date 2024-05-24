import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { Button, Text } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { RequestCard } from "./card";
import Link from "next/link";

export default async function RequestsPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const isModerator = (await supabase.rpc("is_in_role", { role: "moderator" }).returns<number>()).data

    if (!isModerator) {
        return redirect("/login");
    }

    const { data: requests } = await supabase.from("requests")
        .select(`*, response4request(*)`)
        .returns<(Tables<'requests'> & { response4request: Tables<"response4request">[] })[]>();

    return (
        <div className="ml-auto mr-auto mt-2 p-3 max-w-4xl">
            <div className="flex justify-between">
                <h2 className="font-bold text-lg">リクエスト一覧</h2>
                <Button as={Link} href="/add-anime" colorScheme="blue">作品を登録</Button>
            </div>
            <div className="mt-2 gap-2 flex flex-col">
                {requests?.map((item) => <RequestCard key={item.id} item={item} />)}
                {!requests?.length && <Text>ここには何もないようです</Text>}
            </div>
        </div>
    );
}