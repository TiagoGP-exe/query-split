"use client ";

import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useMemo, type MouseEvent } from "react";
import { Button } from "../ui/button";

interface CardQueryProps {
  keyText: string;
  value: string;
}

export const CardQuery = ({ keyText, value }: CardQueryProps) => {
  const { copy, copied } = useCopyToClipboard();
  const icon = useMemo(
    () => (copied ? <CopyCheckIcon size={16} /> : <CopyIcon size={16} />),
    [copied]
  );

  const selectText = (
    e: MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
  ) => {
    const range = document.createRange();
    range.selectNodeContents(e.currentTarget);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  return (
    <li className="break-all items-center">
      <strong className="text-foreground">{keyText}:</strong>
      <span
        className="text-foreground/50 ml-2"
        onDoubleClick={(e) => selectText(e)}
      >
        {value}
      </span>
      <Button
        type="button"
        onClick={() => copy(value)}
        className="active:scale-85 cursor-pointer transition-all translate-y-1"
        variant="link"
      >
        {icon}
      </Button>
    </li>
  );
};
