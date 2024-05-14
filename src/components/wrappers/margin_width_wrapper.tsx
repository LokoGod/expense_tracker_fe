import { ReactNode } from "react";

export default function Margin_width_wrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col md:ml-[40px] sm:border-r sm:border-zinc-700 min-h-screen">
      {children}
    </div>
  );
}
