"use client";

import { AnimatedLogo } from "@/components/animated-logo";
import { CardQuery } from "@/components/list-query/card-query";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidUrl } from "@/lib/utils";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UrlForm {
  url: string;
}

interface QueryItem {
  url: string;
  params: Record<string, string>;
}

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<UrlForm>();
  const [history, setHistory] = useState<QueryItem[]>([]);

  const onSubmit = ({ url }: UrlForm) => {
    console.log(url);
    if (!url || !isValidUrl(url)) {
      setError("url", {
        message: "URL inválida",
      });
      return;
    }

    const parsedUrl = new URL(url);
    const params = Object.fromEntries(new URLSearchParams(parsedUrl.search));
    const baseUrl = `${parsedUrl.origin}${parsedUrl.pathname}`;
    setHistory((prev) => [{ url: baseUrl, params }, ...prev]);

    reset();
  };

  const data = new Date();
  const year = data.getFullYear();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-10 dark:bg-background"
    >
      <div className="flex max-w-8xl sticky top-0 w-full bg-background items-center gap-2 z-10">
        <div className="flex flex-col sm:flex-row gap-2 w-full pt-5 items-center relative pb-3">
          <AnimatedLogo />
          <div className="flex gap-2 w-full items-start pt-5 justify-end">
            <Input
              {...register("url", { required: "URL é obrigatória" })}
              placeholder="url"
              error={errors.url?.message}
            />
            <div className="flex items-center gap-2">
              <Button className="h-10">Convert</Button>
            </div>
          </div>
          <div className="h-20 w-full absolute bg-linear-to-t from-transparent to-background -bottom-20 select-none pointer-events-none" />
        </div>
      </div>

      <div className="w-full max-w-8xl flex-1">
        {history.length > 0 && (
          <>
            <h3 className="text-lg font-bold mb-2">Converted Url</h3>
            <div className="flex flex-col gap-4 border p-6 rounded-sm">
              {history.map(({ url, params }, index) => (
                <div key={index} className="border-b pb-4 last:border-none">
                  <p className="font-semibold break-all">{url}</p>
                  <ul className="flex flex-col">
                    {Object.entries(params).map(([key, value]) => (
                      <CardQuery key={key} keyText={key} value={value} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <footer className="flex justify-between w-full border-t pt-6 items-center gap-2">
        <Link
          href={"https://github.com/tiagogp-exe"}
          className={buttonVariants({
            variant: "ghost",
            className: "flex items-center gap-2 cursor-pointer ",
          })}
        >
          <SiGithub size={20} />

          <p className="font-semibold">
            Copyright © {year} QUERY SPLIT. All rights reserved
          </p>
        </Link>
        <ModeToggle />
      </footer>
    </form>
  );
}
