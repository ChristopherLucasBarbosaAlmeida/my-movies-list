import { useContext, useEffect, useState } from "react";
import { Button, Input } from "../../components";
import styles from "./styles.module.scss";
import { axiosInstance } from "../../libs/axios";
import { AxiosError, AxiosResponse } from "axios";
import { SessionContext } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useForm } from "react-hook-form";

type RequestTokenResponse = {
  request_token: string;
  expires_at: string;
  success: boolean;
};

type AuthForm = {
  username: string;
  password: string;
};

export function Login() {
  const [responseRequestToken, setResponseRequestToken] = useState<RequestTokenResponse | null>(
    null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { handleLogin } = useContext(SessionContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const response: AxiosResponse<RequestTokenResponse> = await axiosInstance.get(
        "/authentication/token/new"
      );
      setResponseRequestToken(response.data);
    })();
  }, []);

  async function onSubmit(data: AuthForm) {
    try {
      const response = await axiosInstance.post("authentication/token/validate_with_login", {
        username: data.username,
        password: data.password,
        request_token: responseRequestToken?.request_token,
      });

      console.log(response.data);

      const id: AxiosResponse<{ success: boolean; session_id: string }> = await axiosInstance.post(
        "/authentication/session/new",
        {
          request_token: response.data.request_token,
        }
      );

      handleLogin(id.data.session_id);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  }

  return (
    <div className={styles.container__login}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Bem vindo!</h1>
        <Input
          label="Nome de usuário"
          {...register("username", {
            required: { value: true, message: "Por favor, digite seu nome de usuário!" },
          })}
          helperText={errors.username?.message}
        />
        <Input
          label="Senha"
          {...register("password", {
            required: { value: true, message: "Por favor, digite sua senha!" },
          })}
          helperText={errors.password?.message}
        />
        <Button
          variant="purple"
          rightIcon={() => <CiLogin size={20} />}
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}
