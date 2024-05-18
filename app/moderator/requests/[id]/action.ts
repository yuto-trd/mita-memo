"use server";

import { Tables } from "@/types/supabase";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export const ProcessRequest = async (state: any, formData: FormData): Promise<any> => {
    const id = formData.get("id") as string;
    const status = formData.get("status") as "none" | "reject" | "approve" | null;
    const message = formData.get("message") as string | null;
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user === null) {
        redirect("/login");
    }

    const { data: requests, error } = await supabase.from("requests")
        .select()
        .eq("id", id)
        .returns<Tables<"requests">[]>();

    if (!requests?.[0]) {
        return {
            error: "Request not found"
        }
    }

    if (!(!status || status === "none" || status === "reject" || status === "approve")) {
        return {
            error: "Invalid status"
        }
    }

    supabase.from("response4request")

    const { data: responses } = await supabase.from("response4request")
        .select()
        .eq("request_id", id)
        .returns<Tables<"response4request">[]>();

    if (responses?.[0]) {
        if (!status || status === "none") {
            const { error: error1 } = await supabase.from("response4request")
                .delete()
                .eq("id", responses[0].id);

            if (error1) {
                console.log(error1);
                return {
                    error: `Error: ${error1.code}`
                }
            }
        } else {
            const { error: error1 } = await supabase.from("response4request")
                .update({
                    message: message,
                    reject: status === "reject"
                })
                .eq("id", responses[0].id);

            if (error1) {
                console.log(error1);
                return {
                    error: `Error: ${error1.code}`
                }
            }
        }
    } else {
        if (status === "reject" || status === "approve") {
            const { error: error1 } = await supabase.from("response4request")
                .insert({
                    message: message,
                    reject: status === "reject",
                    user_id: requests[0].user_id,
                    request_id: requests[0].id,
                });

            if (error1) {
                console.log(error1);
                return {
                    error: `Error: ${error1.code}`
                }
            }
        }
    }

    return redirect("/moderator/requests")
};
