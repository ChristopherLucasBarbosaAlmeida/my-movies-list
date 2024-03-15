import { BookMarked, Warehouse } from "lucide-react";
import { Button, Input, List } from "../components";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export function Layout(props: LayoutProps) {
  const { children } = props;

  return (
    <main className={styles.container__main}>
      <aside>
        <h1>My movie list</h1>
        <nav>
          <Input placeholder="Search" />
          <ul>
            <li>
              <Warehouse size={20} />
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <BookMarked size={20} />
              <NavLink to={""}>Library</NavLink>
            </li>
          </ul>
        </nav>
        <section>
          <h1>My list</h1>
          <ul>
            <List
              imgUlr="https://tse3.mm.bing.net/th?id=OIP.xU3TPXoDbaPxRwp_EO8__QHaEK&pid=Api&P=0&h=180"
              name="Action"
            />
          </ul>
        </section>
        <Button variant="purple">Create list</Button>
      </aside>
      {children}
    </main>
  );
}
