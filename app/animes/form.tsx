"use client"

import { useFormState } from "react-dom";
import { AddRecord } from "./postAction";
import { Button, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react";
import { AnimesList } from "./animes-list";
import { SubmitButton } from "./submit-button";
import { Tables } from "@/types/supabase";

export function SearchAnimeForm({ query, result }: { query?: string, result: Tables<"animes">[] }) {
    return (
        <div className="mt-3 flex flex-col items-center">
            <div className="flex-1 flex flex-col w-full px-4 sm:max-w-lg justify-center gap-2">
                <form
                    method="get"
                    className="sm:p-4 sm:rounded-xl sm:border sm:border-slate-300">
                    <Heading className="mb-2" size="lg">作品を検索</Heading>
                    <FormControl>
                        <FormLabel>検索</FormLabel>
                        <Input name="q" defaultValue={query}/>
                    </FormControl>
                    <div className="flex mt-2 mb-2 justify-between">
                        <SubmitButton pendingText="処理中...">検索</SubmitButton>
                    </div>
                    <AnimesList result={result} />
                </form>
            </div>
        </div>
    )
}