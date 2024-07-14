'use client';

import { SubmitButton } from '@/app/add-record/submit-button';
import type { Tables } from '@/types/supabase';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Text,
  Textarea,
} from '@chakra-ui/react';
import imageCompression from 'browser-image-compression';
import { ChangeEvent, useRef } from 'react';
import { useFormState } from 'react-dom';
import { ProcessRequest } from './action';

export function Form({
  item,
}: {
  item: Tables<'requests'> & { response4request: Tables<'response4request'>[] };
}) {
  const [result, dispatch] = useFormState(ProcessRequest, {});

  return (
    <div className='mt-3 flex flex-col items-center'>
      <div className='flex-1 flex flex-col w-full px-4 sm:max-w-md justify-center gap-2'>
        <form
          action={dispatch}
          className='sm:p-4 sm:rounded-xl sm:border sm:border-slate-300'
        >
          <Heading size='lg' className='mb-2'>
            リクエストを処理
          </Heading>
          <Text>{item.name}</Text>
          <input type='hidden' value={item.id} name='id' />
          <FormControl>
            <FormLabel htmlFor='status'>状態</FormLabel>
            <Select
              name='status'
              defaultValue={
                item.response4request?.[0]?.reject === true
                  ? 'reject'
                  : item.response4request?.[0]?.reject === false
                    ? 'approve'
                    : 'none'
              }
            >
              <option value='none'>未選択</option>
              <option value='reject'>拒否</option>
              <option value='approve'>許可</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor='message'>メッセージ</FormLabel>
            <Textarea
              maxLength={1000}
              name='message'
              className='mb-2'
              defaultValue={item.response4request?.[0]?.message ?? ''}
            />
          </FormControl>
          {result?.error && <FormErrorMessage>{result.error}</FormErrorMessage>}
          <SubmitButton className='mt-3' pendingText='処理中...'>
            保存
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
