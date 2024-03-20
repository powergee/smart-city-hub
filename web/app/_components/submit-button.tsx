"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton(props: {
  text: string;
  pendingText: string;
  [key: string]: any;
}) {
  const { pending } = useFormStatus();
  const { text, pendingText, ...restProps } = props;

  return (
    <button type="submit" disabled={pending} aria-disabled={pending} {...restProps}>
      {pending ? pendingText : text}
    </button>
  );
}
