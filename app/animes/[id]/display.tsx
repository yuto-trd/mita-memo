"use client"

import { Tables } from "@/types/supabase";
import { Link } from "@chakra-ui/next-js";
import { Box, VStack } from "@chakra-ui/react";
import { FaAlignLeft, FaLink } from "react-icons/fa6";

export default function Display({ item }: { item: Tables<"animes"> }) {
    return (
        <div className="ml-auto mr-auto mt-2 p-3 max-w-4xl">
            <div className="md:grid-cols-2 md:grid md:gap-8">
                <div className="md:col-start-1 md:row-start-1 ml-auto mr-auto md:grid md:grid-cols-1" >
                    <img className="hidden md:block blur-md col-start-1 row-start-1 mr-auto ml-auto" src={`https://bxwxjmhrwdilohrmccph.supabase.co/storage/v1/object/public/cover_img/${item.cover_img}`} />
                    <img className="sticky md:static md:top-0 z-10 col-start-1 row-start-1 mr-auto ml-auto"
                        style={{top: "calc(3rem + 0.75rem + 0.5rem)"}}
                        src={`https://bxwxjmhrwdilohrmccph.supabase.co/storage/v1/object/public/cover_img/${item.cover_img}`} />

                    <div className="sticky md:hidden z-20 bg-background">
                        <h2 className="font-bold text-2xl p-4">{item.name}</h2>

                        {item.url && <VStack p={4} alignItems="start">
                            <p className="inline-flex items-center gap-2"><FaLink />ホームページ</p>
                            <Link href={item.url}>{item.url}</Link>
                        </VStack>}

                        {item.description && <VStack p={4} alignItems="start">
                            <p className="inline-flex items-center gap-2"><FaAlignLeft />作品説明</p>
                            <p>{item.description}</p>
                        </VStack>}
                    </div>
                </div>
                <div className="hidden md:col-start-2 md:flex gap-4 flex-col">
                    <h2 className="font-bold text-2xl">{item.name}</h2>

                    {item.url && <VStack p={4} borderWidth='1px' borderRadius='lg' alignItems="start">
                        <p className="inline-flex items-center gap-2"><FaLink />ホームページ</p>
                        <Link href={item.url}>{item.url}</Link>
                    </VStack>}

                    {item.description && <VStack p={4} borderWidth='1px' borderRadius='lg' alignItems="start">
                        <p className="inline-flex items-center gap-2"><FaAlignLeft />作品説明</p>
                        <p>{item.description}</p>
                    </VStack>}
                </div>
            </div>
        </div>
    );
}