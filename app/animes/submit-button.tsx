'use client';

import { Button } from '@chakra-ui/react';
import type { ComponentProps } from 'react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({
  children,
  pendingText,
  ...props
}: ComponentProps<'button'> & {
  pendingText?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button {...props} aria-disabled={pending} colorScheme='blue' type='submit'>
      {pending ? pendingText : children}
    </Button>
  );
}
