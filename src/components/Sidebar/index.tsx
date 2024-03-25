import { NavLink } from "react-router-dom";
import { Button, Input, List } from "..";
import styles from "./styles.module.scss";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h1>My movie list</h1>
      <nav>
        <Input placeholder="Search" />
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
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
  );
}
