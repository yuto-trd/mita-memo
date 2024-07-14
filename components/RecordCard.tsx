'use client';

import { updateEpisodeNumber } from '@/app/list/postAction';
import type { Tables } from '@/types/supabase';
import * as Chakra from '@chakra-ui/react';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitChakraButton } from './submit-button';

export function RecordCard({
  record,
  result,
}: {
  record: Tables<'records'> & { animes: Tables<'animes'> };
  result: string | undefined;
}) {
  const [sliderValue, setSliderValue] = useState(record.episode_number);
  const [showTooltip, setShowTooltip] = useState(false);
  const [editting, setEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (result === 'handled') {
      setEditing(false);
      router.push('/');
    }
  }, [result, router]);

  return (
    <Chakra.Card
      direction={{ base: 'row' }}
      size='sm'
      overflow='hidden'
      variant='outline'
    >
      {record.animes.cover_img ? (
        <div className='w-28 md:w-40 h-auto bg-gray-100'>
          {/* biome-ignore lint/a11y/useAltText: <explanation> */}
          <img
            className='aspect-square h-full object-cover'
            src={`https://bxwxjmhrwdilohrmccph.supabase.co/storage/v1/object/public/cover_img/${record.animes.cover_img}`}
          />
        </div>
      ) : (
        <div className='w-28 md:w-40 h-auto bg-gray-100' />
      )}

      <Chakra.Stack style={{ flex: 1 }}>
        <Chakra.CardBody>
          <Chakra.Heading
            size='md'
            as={Link}
            href={`/animes/${record.anime_id}`}
          >
            {record.animes.name}
          </Chakra.Heading>

          <Chakra.Text className='mt-2 max-h-12 overflow-hidden line-clamp-2'>
            {record.animes.description}
          </Chakra.Text>
        </Chakra.CardBody>

        {editting && (
          <form action={updateEpisodeNumber}>
            <input name='id' value={record.id} type='hidden' />
            <Chakra.VStack
              alignItems='stretch'
              marginLeft='var(--card-padding)'
              marginRight='var(--card-padding)'
            >
              <Chakra.Slider
                name='episode_number'
                min={0}
                max={record.animes.episodes}
                defaultValue={sliderValue ?? 0}
                onChange={(v) => setSliderValue(v)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Chakra.SliderTrack>
                  <Chakra.SliderFilledTrack />
                </Chakra.SliderTrack>
                <Chakra.Tooltip
                  hasArrow
                  color='white'
                  placement='top'
                  isOpen={showTooltip}
                  label={`${sliderValue}`}
                >
                  <Chakra.SliderThumb />
                </Chakra.Tooltip>
              </Chakra.Slider>

              <div className='flex justify-between'>
                <Chakra.Text>
                  {sliderValue} / {record.animes.episodes}
                </Chakra.Text>
                <Chakra.Text>0にするとリストから削除</Chakra.Text>
              </div>
            </Chakra.VStack>

            <SubmitChakraButton
              pendingText='処理中...'
              variant='solid'
              colorScheme='blue'
              margin='var(--card-padding)'
              type='submit'
            >
              確定
            </SubmitChakraButton>
            <SubmitChakraButton
              type='button'
              marginTop='var(--card-padding)'
              marginBottom='var(--card-padding)'
              marginRight='var(--card-padding)'
              onClick={() => {
                setEditing(!editting);
                setSliderValue(record.episode_number);
              }}
            >
              キャンセル
            </SubmitChakraButton>
          </form>
        )}

        {!editting && (
          <>
            <Chakra.Progress
              size='sm'
              marginLeft='var(--card-padding)'
              marginRight='var(--card-padding)'
              value={record.episode_number ?? 0}
              max={record.animes.episodes}
            />
            <Chakra.CardFooter>
              <Chakra.Button
                variant='solid'
                onClick={() => setEditing(!editting)}
              >
                進捗を更新
              </Chakra.Button>
            </Chakra.CardFooter>
          </>
        )}
      </Chakra.Stack>
    </Chakra.Card>
  );
}
