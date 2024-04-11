import { useContext, useState } from "react";
import { Button, Input, Alert } from "../../components";
import styles from "./styles.module.scss";
import { axiosInstance } from "../../libs/axios";
import { AxiosResponse } from "axios";
import { SessionContext } from "../../context/SessionContext";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "../../utils/getError";
import { MoonLoader } from "react-spinners";

type RequestTokenResponse = {
  request_token: string;
  expires_at: string;
  success: boolean;
};

type AuthForm = {
  username: string;
  password: string;
};

type ErrorMessageProps = {
  title: string;
  description: string;
};

export function Login() {
  const [errorMessage, setErrorMessage] = useState<ErrorMessageProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { handleLogin } = useContext(SessionContext);

  const navigate = useNavigate();

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

  async function onSubmit(data: AuthForm) {
    try {
      setIsLoading(true);
      const requestTokenResponse: AxiosResponse<RequestTokenResponse> = await axiosInstance.get(
        "/authentication/token/new"
      );

      const authUserAndTokenResponse = await axiosInstance.post(
        "authentication/token/validate_with_login",
        {
          username: data.username,
          password: data.password,
          request_token: requestTokenResponse.data.request_token,
        }
      );

      const sessionIdResponse: AxiosResponse<{ success: boolean; session_id: string }> =
        await axiosInstance.post("/authentication/session/new", {
          request_token: authUserAndTokenResponse.data.request_token,
        });

      handleLogin(sessionIdResponse.data.session_id);
      navigate("/");
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container__login}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errorMessage && (
          <Alert
            title={errorMessage.title}
            description={errorMessage?.description}
          />
        )}
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
          rightIcon={() => !isLoading && <CiLogin size={20} />}
          disabled={isLoading}
        >
          {!isLoading ? (
            "Entrar"
          ) : (
            <MoonLoader
              size={20}
              color="#eef2ff"
            />
          )}
        </Button>
      </form>
    </div>
  );
}
