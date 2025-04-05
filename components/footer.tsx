import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ModeToggle } from "./mode-toggle";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="h-20 "></div>

      <footer className="fixed bottom-0 left-0  right-0 h-20 bg-gray-100 dark:bg-zinc-900 px-8 md:px-12 border-t flex justify-between items-center gap-2">
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
    </>
  );
}
