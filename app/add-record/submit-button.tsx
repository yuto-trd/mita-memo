'use client';

import { Button, type ButtonProps } from '@chakra-ui/react';
import { useFormStatus } from 'react-dom';

export function SubmitButton({
  children,
  pendingText,
  ...props
}: ButtonProps & {
  pendingText?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      aria-disabled={pending}
      colorScheme={props.colorScheme ?? 'blue'}
      type='submit'
    >
      {pending ? pendingText : children}
    </Button>
  );
}
