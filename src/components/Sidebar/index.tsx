import { NavLink, useNavigate } from "react-router-dom";
import { Button, Input, List } from "..";
import styles from "./styles.module.scss";
import { CiLogout } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import { axiosInstance } from "../../libs/axios";
import { AxiosResponse } from "axios";
import { GoPlus } from "react-icons/go";
import Avatar from "../Avatar";

type UserProps = {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path?: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
};

export function Sidebar() {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  const { session, handleLogout } = useContext(SessionContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<UserProps> = await axiosInstance.get(`/account/${session}`);
      setUser(response.data);
    })();
  }, []);

  return (
    <aside className={styles.sidebar}>
      <h1>My movie list</h1>
      <nav>
        <Input placeholder="Search" />
        <ul>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
        </ul>
      </nav>
      <section>
        <h1>Minhas listas</h1>
        <ul>
          <List
            imgUlr="https://tse3.mm.bing.net/th?id=OIP.xU3TPXoDbaPxRwp_EO8__QHaEK&pid=Api&P=0&h=180"
            name="Action"
          />
        </ul>
        <Button
          variant="purple"
          leftIcon={() => <GoPlus size={20} />}
        >
          Criar uma nova lista
        </Button>
      </section>
      <div>
        <span>{user.username}</span>
      </div>
      <Button
        variant="seconday"
        rightIcon={() => <CiLogout size={20} />}
        onClick={() => {
          handleLogout();
          navigate("/login");
        }}
      >
        Sair
      </Button>
    </aside>
  );
}
