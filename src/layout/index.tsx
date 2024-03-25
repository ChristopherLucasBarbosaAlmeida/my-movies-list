import { ReactNode } from "react";
import { Sidebar } from "../components";

type LayoutProps = {
  children: ReactNode;
};

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}
