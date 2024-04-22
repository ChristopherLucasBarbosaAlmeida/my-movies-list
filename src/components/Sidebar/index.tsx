import { NavLink, useNavigate } from "react-router-dom";
import { Button, Dialog, Input, List, Avatar } from "..";
import styles from "./styles.module.scss";
import { CiLogout } from "react-icons/ci";
import { useContext, useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import { GoPlus } from "react-icons/go";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authService } from "../../services/AuthService";
import { SessionIdContext } from "../../context/SessionIdContext";
import { PagedList, PaginatedData } from "../../types/PaginatedData";
import { notify } from "../../libs/toastify";
import { listService } from "../../services/ListService";
import { User } from "../../types/User";

type CreateListFormProps = {
  name: string;
  description: string;
};

const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Favoritos",
    path: "/favorites",
  },
];

export function Sidebar() {
  const [user, setUser] = useState<User>();
  const [paginatedList, setPaginatedList] = useState<PaginatedData<PagedList>>();

  const { sessionId, deleteSessionId } = useContext(SessionIdContext);

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
    try {
      const payload = {
        name: data.name,
        description: data.description,
        sessionId,
      };

      await listService.createList(payload);

      const paginatedListsData = await listService.getLists(sessionId);

      dialogRef.current?.close();

      setPaginatedList(paginatedListsData);
      notify();
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.code);
      }
    }
  }

  async function handleDeleteList(listId: number) {
    try {
      await listService.deleteList(listId);
      const paginatedListData = await listService.getLists(sessionId);
      setPaginatedList(paginatedListData);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.code);
      }
    }
  }

  useEffect(() => {
    (async () => {
      const userData = await authService.getUserDetails(sessionId);
      setUser(userData);
      const paginatedList = await listService.getLists(sessionId);
      setPaginatedList(paginatedList);
    })();
  }, [sessionId]);

  return (
    <>
      <aside className={styles.sidebar}>
        <h1>My movie list</h1>
        <nav>
          <Input placeholder="Search" />
          <ul>
            {links.map((link) => (
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? styles.active : "")}
                  to={link.path}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <section>
          <h1>Minhas listas</h1>
          <ul>
            {!paginatedList?.total_results ? (
              <span>Você não tem listas criadas</span>
            ) : (
              paginatedList.results.map((result) => (
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
            avatarPath={user?.avatar?.tmdb?.avatar_path}
            username={user?.username}
          />
          <span>{user?.username}</span>
        </div>
        <Button
          variant="seconday"
          rightIcon={() => <CiLogout size={20} />}
          onClick={() => {
            deleteSessionId();
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
