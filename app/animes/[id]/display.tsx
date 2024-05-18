"use client"

import { SubmitChakraButton } from "@/components/submit-button";
import { Tables } from "@/types/supabase";
import { Link } from "@chakra-ui/next-js";
import { Text, Box, Button, HStack, Progress, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Stack, Tooltip, VStack, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FaAlignLeft, FaLink } from "react-icons/fa6";
import { AddRecord, DeleteAnime, UpdateEpisodeNumber } from "./postAction";
import { useRouter } from "next/navigation";

// ここのコード、メディアクエリで構造を変更しているので...
export default function Display({ item, isModerator, record, result }: { item: Tables<"animes">, isModerator: boolean, record: Tables<"records"> | null, result: string | undefined }) {
    const description = useMemo(() => {
        if (item.description) {
            return item.description.split(/\r\n|\n/);
        }
        return [];
    }, [item.description]);
    const [md] = useMediaQuery("(min-width: 768px)");
    const [sliderValue, setSliderValue] = useState(record?.episode_number ?? 0);
    const [showTooltip, setShowTooltip] = useState(false);
    const [editting, setEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (result === "handled") {
            setEditing(false);
            router.push(`/animes/${item.id}`);
        }
    }, [result]);

    const toggleEdittingAndResetSlider = () => {
        setEditing(!editting);
        setSliderValue(record?.episode_number ?? 0);
    }

    return (
        <div className="ml-auto mr-auto mt-2 p-3 max-w-4xl">
            <div className="md:grid-cols-2 md:grid md:gap-8">
                <div className="md:col-start-1 md:row-start-1 ml-auto mr-auto md:grid-cols-1" >
                    <img className="sticky md:top-0 z-10 mr-auto ml-auto"
                        style={{ top: "calc(3rem + 0.75rem + 0.5rem)" }}
                        src={`https://bxwxjmhrwdilohrmccph.supabase.co/storage/v1/object/public/cover_img/${item.cover_img}`} />

                    {!md && <div className="sticky z-20 bg-background">
                        <h2 className="font-bold text-2xl p-4">{item.name}</h2>

                        {item.url && <VStack p={4} alignItems="start">
                            <p className="inline-flex items-center gap-2"><FaLink />ホームページ</p>
                            <Link href={item.url}>{item.url}</Link>
                        </VStack>}

                        {item.description && <VStack p={4} alignItems="start">
                            <p className="inline-flex items-center gap-2"><FaAlignLeft />作品説明</p>
                            {description.map((v, i) => <p key={i}>{v}</p>)}
                        </VStack>}

                        <HStack p={4} alignItems="start">
                            {!record && <form action={AddRecord}>
                                <input type="hidden" value={item.id} name="anime_id" />
                                <SubmitChakraButton pendingText="処理中..." type="submit" colorScheme="blue">リストに追加</SubmitChakraButton>
                            </form>}
                            {isModerator && <form action={DeleteAnime}>
                                <input type="hidden" value={item.id} name="anime_id" />
                                <SubmitChakraButton pendingText="処理中..." type="submit" colorScheme="red">削除</SubmitChakraButton>
                            </form>}
                            {isModerator && <Button as="a" href={`/animes/${item.id}/edit`}>編集</Button>}
                        </HStack>

                        {record && <Box p={4} alignItems="start">
                            {editting && <form action={UpdateEpisodeNumber}>
                                <input name="id" value={record.id} type="hidden" />
                                <input name="anime_id" value={item.id} type="hidden" />
                                <VStack
                                    className="mb-3"
                                    alignItems="stretch">
                                    <Slider
                                        name='episode_number'
                                        min={0}
                                        max={item.episodes}
                                        defaultValue={sliderValue ?? 0}
                                        onChange={(v) => setSliderValue(v)}
                                        onMouseEnter={() => setShowTooltip(true)}
                                        onMouseLeave={() => setShowTooltip(false)}
                                    >
                                        <SliderTrack>
                                            <SliderFilledTrack />
                                        </SliderTrack>
                                        <Tooltip
                                            hasArrow
                                            color='white'
                                            placement='top'
                                            isOpen={showTooltip}
                                            label={`${sliderValue}`}
                                        >
                                            <SliderThumb />
                                        </Tooltip>
                                    </Slider>

                                    <div className="flex justify-between">
                                        <Text>{sliderValue} / {item.episodes}</Text>
                                        <Text>0にするとリストから削除</Text>
                                    </div>
                                </VStack>

                                <SubmitChakraButton
                                    pendingText="処理中..."
                                    variant="solid"
                                    colorScheme="blue"
                                    type="submit">
                                    確定
                                </SubmitChakraButton>
                                <SubmitChakraButton
                                    type="button"
                                    className="ml-3"
                                    onClick={toggleEdittingAndResetSlider}>
                                    キャンセル
                                </SubmitChakraButton>
                            </form>}

                            {!editting && <>
                                <Progress
                                    className="mb-4"
                                    size='sm'
                                    value={record.episode_number ?? 0}
                                    max={item.episodes} />
                                <Button variant='solid' onClick={toggleEdittingAndResetSlider}>
                                    進捗を更新
                                </Button>
                            </>}
                        </Box>}
                    </div>}
                </div>

                {md && <div className="hidden md:col-start-2 md:flex gap-4 flex-col">
                    <h2 className="font-bold text-2xl">{item.name}</h2>

                    {item.url && <VStack p={4} borderWidth='1px' borderRadius='lg' alignItems="start">
                        <p className="inline-flex items-center gap-2"><FaLink />ホームページ</p>
                        <Link href={item.url}>{item.url}</Link>
                    </VStack>}

                    {item.description && <VStack p={4} borderWidth='1px' borderRadius='lg' alignItems="start">
                        <p className="inline-flex items-center gap-2"><FaAlignLeft />作品説明</p>
                        {description.map((v, i) => <p key={i}>{v}</p>)}
                    </VStack>}

                    <HStack p={4} borderWidth='1px' borderRadius='lg' alignItems="start">
                        {!record && <form action={AddRecord}>
                            <input type="hidden" value={item.id} name="anime_id" />
                            <SubmitChakraButton pendingText="処理中..." type="submit" colorScheme="blue">リストに追加</SubmitChakraButton>
                        </form>}
                        {isModerator && <form action={DeleteAnime}>
                            <input type="hidden" value={item.id} name="anime_id" />
                            <SubmitChakraButton pendingText="処理中..." type="submit" colorScheme="red">削除</SubmitChakraButton>
                        </form>}
                        {isModerator && <Button as="a" href={`/animes/${item.id}/edit`}>編集</Button>}
                    </HStack>

                    {record && <Box p={4} borderWidth='1px' borderRadius='lg' alignItems="start">
                        {editting && <form action={UpdateEpisodeNumber}>
                            <input name="id" value={record.id} type="hidden" />
                            <input name="anime_id" value={item.id} type="hidden" />
                            <VStack
                                className="mb-3"
                                alignItems="stretch">
                                <Slider
                                    name='episode_number'
                                    min={0}
                                    max={item.episodes}
                                    defaultValue={sliderValue ?? 0}
                                    onChange={(v) => setSliderValue(v)}
                                    onMouseEnter={() => setShowTooltip(true)}
                                    onMouseLeave={() => setShowTooltip(false)}
                                >
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip
                                        hasArrow
                                        color='white'
                                        placement='top'
                                        isOpen={showTooltip}
                                        label={`${sliderValue}`}
                                    >
                                        <SliderThumb />
                                    </Tooltip>
                                </Slider>

                                <div className="flex justify-between">
                                    <Text>{sliderValue} / {item.episodes}</Text>
                                    <Text>0にするとリストから削除</Text>
                                </div>
                            </VStack>

                            <SubmitChakraButton
                                pendingText="処理中..."
                                variant="solid"
                                colorScheme="blue"
                                type="submit">
                                確定
                            </SubmitChakraButton>
                            <SubmitChakraButton
                                type="button"
                                className="ml-3"
                                onClick={toggleEdittingAndResetSlider}>
                                キャンセル
                            </SubmitChakraButton>
                        </form>}

                        {!editting && <>
                            <Progress
                                className="mb-4"
                                size='sm'
                                value={record.episode_number ?? 0}
                                max={item.episodes} />
                            <Button variant='solid' onClick={toggleEdittingAndResetSlider}>
                                進捗を更新
                            </Button>
                        </>}
                    </Box>}
                </div>}
            </div>
        </div>
    );
}