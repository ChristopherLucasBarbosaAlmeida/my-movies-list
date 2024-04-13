import { NavLink, useNavigate } from "react-router-dom";
import { Button, Dialog, Input, List, Avatar } from "..";
import styles from "./styles.module.scss";
import { CiLogout } from "react-icons/ci";
import { useContext, useEffect, useRef, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import { axiosInstance } from "../../libs/axios";
import { AxiosError, AxiosResponse } from "axios";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

type CreateListFormProps = {
  name: string;
  description: string;
};

export type ResponseRequestListProps = {
  pages: number;
  results: {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path?: string;
  }[];
  total_pages: number;
  total_results: number;
};

function notify() {
  toast.success("Lista criada com sucesso!", {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    theme: "light",
  });
}

export function Sidebar() {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [lists, setLists] = useState<ResponseRequestListProps>({} as ResponseRequestListProps);

  const { session, handleLogout } = useContext(SessionContext);

  const navigate = useNavigate();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const {
    register,
    reset,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateListFormProps>();

  async function onSubmit(data: CreateListFormProps) {
    if (!session) return console.error("Invalid session!");

    try {
      await axiosInstance.post(
        "/list",
        { name: data.name, description: data.description },
        {
          params: {
            session_id: session,
          },
        }
      );

      const response: AxiosResponse<ResponseRequestListProps> = await axiosInstance.get(
        `/account/${session}/lists`
      );

      dialogRef.current?.close();

      setLists(response.data);
      notify();
      reset();
    } catch (error) {}
  }

  async function handleDeleteList(listId: number) {
    try {
      await axiosInstance.delete(`/list/${listId}`);
      const response: AxiosResponse<ResponseRequestListProps> = await axiosInstance.get(
        `/account/${session}/lists`
      );
      setLists(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.code);
      }
    }
  }

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<UserProps> = await axiosInstance.get(`/account/${session}`);
      setUser(response.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<ResponseRequestListProps> = await axiosInstance.get(
        `/account/${session}/lists`
      );
      setLists(response.data);
    })();
  }, []);

  return (
    <>
      <aside className={styles.sidebar}>
        <h1>My movie list</h1>
        <nav>
          <Input placeholder="Search" />
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? styles.active : "")}
                to={"/favorites"}
              >
                Fovoritos
              </NavLink>
            </li>
          </ul>
        </nav>
        <section>
          <h1>Minhas listas</h1>
          <ul>
            {!lists?.total_results ? (
              <span>Você não tem listas criadas</span>
            ) : (
              lists.results.map((result) => (
                <List
                  key={result.id}
                  name={result.name}
                  handleClick={() => handleDeleteList(result.id)}
                />
              ))
            )}
          </ul>
          <Button
            variant="purple"
            leftIcon={() => <GoPlus size={20} />}
            onClick={() => dialogRef.current?.showModal()}
          >
            Criar uma nova lista
          </Button>
        </section>
        <div>
          <Avatar
            avatar={user?.avatar?.tmdb?.avatar_path}
            username={user.username}
          />
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
      <Dialog
        title="Criar uma nova lista"
        ref={dialogRef}
        handleClose={() => {
          dialogRef.current?.close();
          clearErrors();
          reset();
        }}
      >
        <form
          className={styles.create__list__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            label="Nome da lista"
            {...register("name", {
              required: { value: true, message: "O nome da lista é obrigatorio" },
            })}
            helperText={errors.name?.message}
          />
          <Input
            label="Descrição"
            {...register("description")}
          />
          <div className={styles.wrapper__buttons}>
            <Button
              variant="primary"
              onClick={(ev) => {
                ev.preventDefault();
                dialogRef.current?.close();
                clearErrors();
                reset();
              }}
            >
              Cancelar
            </Button>
            <Button variant="purple">Criar</Button>
          </div>
        </form>
      </Dialog>
      <ToastContainer />
    </>
  );
}
