import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DeleteAccountForm } from "./form";

export default async function DeleteAccountPage() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    return (
        <DeleteAccountForm />
    )
}