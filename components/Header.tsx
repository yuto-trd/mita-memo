'use client';

import { SubmitButton } from '@/app/login/submit-button';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import React, { useRef } from 'react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';
import { signOut } from './signOut';

export default function Header({
  auth,
  moderator,
}: { auth: boolean; moderator: boolean }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <div className='flex h-12 bg-white sticky top-0 z-50 w-full border-slate-300 border-b'>
        {auth && (
          <IconButton
            onClick={onOpen}
            className='mt-auto mb-auto ml-2'
            variant='ghost'
            icon={<HamburgerIcon />}
            aria-label='Open menu'
          />
        )}
        <a
          href={auth ? '/list' : '/'}
          className='mt-auto mb-auto ml-2 decoration-0'
        >
          Mita-memo
        </a>

        <div className='ml-auto mt-auto mb-auto mr-2'>
          <IconButton
            as={Link}
            href='https://github.com/yuto-trd/mita-memo'
            aria-label='GitHub'
            icon={<FaGithub />}
            variant='ghost'
          />
          {auth && (
            <IconButton
              as={Link}
              href='/animes'
              aria-label='アニメ一覧'
              icon={<AddIcon />}
              variant='ghost'
            />
          )}
        </div>
      </div>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Mita-memo</DrawerHeader>

          <DrawerBody className='flex flex-col justify-start'>
            <Button
              justifyContent='start'
              variant='ghost'
              as={Link}
              href='/requests'
            >
              リクエスト一覧
            </Button>
            <Button
              justifyContent='start'
              variant='ghost'
              as={Link}
              href='/request'
            >
              リクエストする
            </Button>
            <Button
              justifyContent='start'
              variant='ghost'
              as={Link}
              href='/moderator/requests'
            >
              モデレーター
            </Button>
          </DrawerBody>

          <DrawerFooter
            alignItems='stretch'
            flexDirection='column'
            justifyContent='stretch'
          >
            <form action={signOut} className='flex flex-col'>
              <SubmitButton
                pendingText='ログアウト中'
                justifyContent='start'
                variant='ghost'
                type='submit'
              >
                ログアウト
              </SubmitButton>
            </form>
            <Button
              justifyContent='start'
              variant='ghost'
              as={Link}
              href='/delete-account'
            >
              アカウントを削除
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
