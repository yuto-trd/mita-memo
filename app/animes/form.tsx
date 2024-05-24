"use client"

import { FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { AnimesList } from "./animes-list";
import { SubmitButton } from "./submit-button";
import { Tables } from "@/types/supabase";
import { Pagination } from "@/components/Pagination";
import { useRouter } from "next-nprogress-bar";

const PAGE_SIZE = 20;

export function SearchAnimeForm({ query, result, page, count }: { query?: string, result: Tables<"animes">[], page: number, count: number }) {
    const router = useRouter();

    const onClick = (page: number) => {
        if (query) {
            router.push(`/animes?q=${encodeURIComponent(query)}&page=${page - 1}`);
        }
    };

    return (
        <div className="mt-3 flex flex-col items-center">
            <div className="flex-1 flex flex-col w-full px-4 sm:max-w-2xl justify-center gap-2">
                <form
                    method="get"
                    className="sm:p-4 sm:rounded-xl sm:border sm:border-slate-300">
                    <Heading className="mb-2" size="lg">作品を検索</Heading>
                    <FormControl>
                        <FormLabel>検索</FormLabel>
                        <Input name="q" defaultValue={query} />
                    </FormControl>
                    <div className="flex mt-2 mb-2 justify-between">
                        <SubmitButton pendingText="処理中...">検索</SubmitButton>
                    </div>
                    <AnimesList result={result} />

                    {result.length > 0 && <Pagination
                        totalCount={count}
                        pageSize={PAGE_SIZE}
                        currentPage={page}
                        onClick={onClick}
                    />}
                </form>
            </div>
        </div>
    )
}