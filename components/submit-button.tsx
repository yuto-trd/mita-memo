"use client";

import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@chakra-ui/react";

type Props = ButtonProps & {
  pendingText?: string;
};

export function SubmitChakraButton({ children, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <Button {...props} aria-disabled={pending}>
      {isPending ? pendingText : children}
    </Button>
  );
}
