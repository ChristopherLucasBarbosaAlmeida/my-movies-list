import { ReactNode } from "react";
import { Sidebar } from "../components";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}
