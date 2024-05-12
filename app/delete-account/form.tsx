"use client"

import { useFormState } from "react-dom";
import { DeleteAccount } from "./postAction";
import { FormErrorMessage, Heading, Text } from "@chakra-ui/react";
import { SubmitButton } from "../add-record/submit-button";

export function DeleteAccountForm() {
    const [result, dispatch] = useFormState(DeleteAccount, {});

    return (
        <div className="mt-3 flex flex-col items-center">
            <div className="flex-1 flex flex-col w-full px-4 sm:max-w-md justify-center gap-2">
                <form
                    action={dispatch}
                    className="sm:p-4 sm:rounded-xl sm:border sm:border-slate-300">
                    <Heading size="lg" className="mb-2">アカウントを削除</Heading>
                    <Text>アカウントを削除する場合は続行をクリックしてください。</Text>
                    {result?.error && <FormErrorMessage>{result.error}</FormErrorMessage>}
                    <SubmitButton className="mt-3" pendingText="処理中...">続行</SubmitButton>
                </form>
            </div>
        </div>
    )
}