import { Banner } from "../../components";
import styles from "./styles.module.scss";
import { Layout } from "../../layout";

export function Home() {
  return (
    <Layout>
      <div className={styles.container__home}>
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
    </Layout>
  );
}
