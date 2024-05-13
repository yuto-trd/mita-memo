"use client"

import { useFormState } from "react-dom";
import { AddAnime } from "./postAction";
import { FormControl, FormErrorMessage, FormLabel, Heading, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea } from "@chakra-ui/react";
import { SubmitButton } from "../add-record/submit-button";

export function AddAnimeForm() {
    const [result, dispatch] = useFormState(AddAnime, {});

    return (
        <div className="mt-3 flex flex-col items-center">
            <div className="flex-1 flex flex-col w-full px-4 sm:max-w-md justify-center gap-2">
                <form
                    action={dispatch}
                    className="sm:p-4 sm:rounded-xl sm:border sm:border-slate-300">
                    <Heading size="lg" className="mb-2">作品を追加</Heading>
                    <FormControl isInvalid={result?.errors?.name}>
                        <FormLabel htmlFor="name">作品名</FormLabel>
                        <Input name="name" required className="mb-2" />
                        {result?.errors?.name && <FormErrorMessage>{result.errors.name}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={result?.errors?.episodes}>
                        <FormLabel htmlFor="episodes">話数</FormLabel>
                        <NumberInput min={1} className="mb-2">
                            <NumberInputField name="episodes" />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        {result?.errors?.episodes && <FormErrorMessage>{result.errors.episodes}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={result?.errors?.description}>
                        <FormLabel htmlFor="description">説明</FormLabel>
                        <Textarea maxLength={1000} name="description" className="mb-2" />
                        {result?.errors?.description && <FormErrorMessage>{result.errors.description}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={result?.errors?.url}>
                        <FormLabel>URL (任意)</FormLabel>
                        <Input name="url" className="mb-2" />
                        {result?.errors?.url && <FormErrorMessage>{result.errors.url}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={result?.errors?.cover_img}>
                        <FormLabel>カバー画像 (任意)</FormLabel>
                        <Input name="cover_img" type="file" accept="image/*" className="mb-2" />
                        {result?.errors?.url && <FormErrorMessage>{result.errors.cover_img}</FormErrorMessage>}
                    </FormControl>
                    {result?.error && <FormErrorMessage>{result.error}</FormErrorMessage>}
                    <SubmitButton className="mt-3" pendingText="処理中...">送信</SubmitButton>
                </form>
            </div>
        </div>
    )
}