'use client';

import type { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  type UseRadioProps,
  VStack,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';
import { type ReactNode, useCallback, useState } from 'react';

function RadioCard(props: UseRadioProps & { children: ReactNode }) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'blue.600',
          color: 'white',
          borderColor: 'blue.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

export function UnwatchedAnimesList({
  watchedItems,
}: { watchedItems: Tables<'animes'>[] }) {
  const [items, setItems] = useState<Tables<'animes'>[]>([]);
  const [term, setTerm] = useState('');
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'anime_id',
  });

  const group = getRootProps();

  const handleClick = useCallback(async () => {
    if (term !== '') {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('animes')
        .select()
        .textSearch('name', `${term}:*`)
        .returns<Tables<'animes'>[]>();

      setItems(
        (data ?? []).filter((i) => !watchedItems.find((ii) => ii.id === i.id)),
      );
    } else {
    }
  }, [term, watchedItems]);

  return (
    <>
      <InputGroup size='md'>
        <Input
          className='mb-2'
          placeholder='検索'
          size='md'
          value={term}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleClick();
            }
          }}
          onChange={(e) => setTerm(e.target.value)}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            検索
          </Button>
        </InputRightElement>
      </InputGroup>

      <VStack alignItems='stretch' {...group}>
        {items.map((item) => {
          const radio = getRadioProps({ value: item.id });
          return (
            <RadioCard key={item.id} {...radio}>
              {item.name}
            </RadioCard>
          );
        })}
      </VStack>
    </>
  );
}
