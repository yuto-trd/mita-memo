import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=ユーザーを認証できません");
    }

    return redirect("/");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=ユーザーを認証できません");
    }

    return redirect("/login?message=サインインを完了するにはメールを確認してください");
  };

  return (
    <div style={{ minHeight: "calc(100vh - 3rem);" }} className="flex flex-col items-center">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <FormControl>
            <FormLabel htmlFor="email">メールアドレス</FormLabel>

            <Input
              type="email"
              autoComplete="email"
              name="email"
              placeholder="you@example.com"
              required />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">パスワード</FormLabel>

            <Input
              type="password"
              autoComplete="password"
              name="password"
              placeholder="••••••••"
              required />
          </FormControl>
          <SubmitButton
            formAction={signIn}
            colorScheme="blue"
            className="mb-2 mt-2"
            pendingText="サインイン中..."
          >
            サインイン
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="mb-2"
            pendingText="サインアップ中..."
          >
            サインアップ
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
