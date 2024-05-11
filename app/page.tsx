import { createClient } from "@/utils/supabase/server";
import { Tables } from "@/types/supabase";
import { RecordCard } from "@/components/RecordCard";
import { redirect } from "next/navigation";

export default async function Index({ searchParams }: { searchParams: { result: string | undefined, rid: number | undefined } }) {
  const supabase = createClient();
  const { data: records } = await supabase.from("records")
    .select(`*, animes(*)`)
    .returns<(Tables<'records'> & { animes: Tables<"animes"> })[]>();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="ml-auto mr-auto mt-2 p-3 max-w-4xl">
      <h2 className="font-bold text-lg">最近見たリスト</h2>
      <div className="mt-2 gap-2 flex flex-col">
        {records?.map((item) => <RecordCard
          result={item.id == searchParams.rid ? searchParams.result : undefined}
          record={item}
          key={item.id} />)}
      </div>
    </div>
  );
}
