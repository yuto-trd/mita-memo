'use client';

import { Tables } from '@/types/supabase';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { useFormState } from 'react-dom';
import { SubmitButton } from '../add-record/submit-button';
import { AddRequest } from './postAction';

export function RequestForm() {
  const [result, dispatch] = useFormState(AddRequest, {});

  return (
    <div className='mt-3 flex flex-col items-center'>
      <div className='flex-1 flex flex-col w-full px-4 sm:max-w-md justify-center gap-2'>
        <form
          action={dispatch}
          className='sm:p-4 sm:rounded-xl sm:border sm:border-slate-300'
        >
          <Heading size='lg' className='mb-2'>
            作品をリクエスト
          </Heading>
          <FormControl isInvalid={result?.errors?.name}>
            <FormLabel>作品名</FormLabel>
            <Input name='name' required className='mb-2' />
            {result?.errors?.name && (
              <FormErrorMessage>{result.errors.name}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={result?.errors?.url}>
            <FormLabel>URL (任意)</FormLabel>
            <Input name='url' className='mb-2' />
            {result?.errors?.url && (
              <FormErrorMessage>{result.errors.url}</FormErrorMessage>
            )}
          </FormControl>
          <SubmitButton className='mt-3' pendingText='処理中...'>
            送信
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
