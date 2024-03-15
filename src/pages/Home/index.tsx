import { BookMarked, Warehouse } from "lucide-react";
import { Banner, Button, Input, List } from "../../components";
import styles from "./styles.module.scss";
import { NavLink } from "react-router-dom";

export function Home() {
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
      <div>
        <header>
          <h1>Your recents movies</h1>
        </header>
        <ul>
          <Banner
            bannerUrl="https://4.bp.blogspot.com/-5Ve8erkXNRA/UZJLLs19YuI/AAAAAAAAAHQ/KFuqj7F7Oa8/s1600/capa.jpg"
            name="Os vingadores"
            genre="Action"
          />
        </ul>
      </div>
    </main>
  );
}
