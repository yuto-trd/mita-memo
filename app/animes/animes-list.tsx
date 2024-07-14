'use client';

import type { Tables } from '@/types/supabase';
import { createClient } from '@/utils/supabase/client';
import * as Chakra from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode, useCallback, useEffect, useState } from 'react';

export function AnimesList({
  query,
  result,
}: { query?: string; result: Tables<'animes'>[] }) {
  return (
    <>
      <Chakra.VStack alignItems='stretch'>
        {result.map((item) => {
          return (
            <Chakra.Card
              key={item.id}
              direction={{ base: 'row' }}
              size='sm'
              overflow='hidden'
              variant='outline'
            >
              {item.cover_img ? (
                <div className='w-28 h-auto bg-gray-100'>
                  {/* biome-ignore lint/a11y/useAltText: <explanation> */}
                  <img
                    className='aspect-square h-full object-cover'
                    src={`https://bxwxjmhrwdilohrmccph.supabase.co/storage/v1/object/public/cover_img/${item.cover_img}`}
                  />
                </div>
              ) : (
                <div className='w-28 h-auto bg-gray-100' />
              )}

              <Chakra.Stack style={{ flex: 1 }} gap={0}>
                <Chakra.CardBody>
                  {/* {item.url ?
                                        <Chakra.Heading size='md' as="a" href={item.url}>
                                            {item.name}
                                        </Chakra.Heading> :
                                        <Chakra.Heading size='md'>{item.name}</Chakra.Heading>
                                    } */}
                  <Chakra.Heading
                    as={Link}
                    href={`/animes/${item.id}`}
                    size='md'
                  >
                    {item.name}
                  </Chakra.Heading>

                  <Chakra.Text className='mt-2 max-h-20 overflow-hidden line-clamp-3'>
                    {item.description}
                  </Chakra.Text>
                </Chakra.CardBody>

                <Chakra.CardFooter paddingTop={0}>
                  <Chakra.Text>エピソード数: {item.episodes}</Chakra.Text>
                </Chakra.CardFooter>
              </Chakra.Stack>
            </Chakra.Card>
          );
        })}
      </Chakra.VStack>
    </>
  );
}
