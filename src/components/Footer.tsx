import Link from "next/link";
import clsx from "clsx";

import { FaConnectdevelop, FaArrowRightFromBracket } from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024;
  const copyrightName = "CeylonTek" || "CeylonTek" || "";

  return (
    <>
      <footer className="text-sm text-neutral-500 dark:text-neutral-400 mt-10">
        <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
            <p>
              &copy; {currentYear} {copyrightName}
              {copyrightName.length && !copyrightName.endsWith(".")
                ? "."
                : ""}{" "}
              All rights reserved.
            </p>
            <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
            <p>Designed in Colombo</p>
            <p className="md:ml-auto">
              <a
                href="https://www.instagram.com/pearlwave.labs/"
                className="text-black dark:text-white"
              >
                Crafted by ▲ PearlWave Labs
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
