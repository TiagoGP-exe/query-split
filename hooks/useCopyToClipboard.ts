import { useState } from "react";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Falha ao copiar: ", error);
      setCopied(false);
    }
  };

  return { copy, copied };
}
