"use client"

import { Input, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, useDisclosure, VStack } from "@chakra-ui/react";
import React, { ReactNode, useRef } from "react";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { signOut } from "./signOut";
import { SubmitButton } from "@/app/login/submit-button";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)

  return (
    <>
      <div className="flex h-12 bg-white sticky top-0 z-50 w-full border-slate-300 border-b">
        <IconButton
          onClick={onOpen}
          className="mt-auto mb-auto ml-2"
          variant="ghost"
          icon={<HamburgerIcon />}
          aria-label="Open menu" />
        <a href="/" className="mt-auto mb-auto ml-2 decoration-0">Mita-memo</a>

        <div className="ml-auto mt-auto mb-auto mr-2">
          <IconButton as={Link}
            href="/add-record"
            aria-label={""}
            icon={<AddIcon />}
            variant="ghost"></IconButton>
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

          <DrawerBody className="flex flex-col">
            <Button justifyContent="start" variant="ghost" as="a" href="requests">リクエスト一覧</Button>
            <Button justifyContent="start" variant="ghost" as="a" href="request">リクエストする</Button>
          </DrawerBody>

          <DrawerFooter alignItems="stretch" flexDirection="column" justifyContent="stretch">
            <form action={signOut} className="flex flex-col">
                <SubmitButton pendingText="ログアウト中" justifyContent="start" variant="ghost" type="submit">ログアウト</SubmitButton>
              </form>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
