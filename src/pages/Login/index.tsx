import { useContext, useState } from "react";
import { Button, Input, Alert } from "../../components";
import styles from "./styles.module.scss";
import { SessionIdContext } from "../../context/SessionIdContext";
import { useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { getErrorMessage } from "../../utils/getError";
import { MoonLoader } from "react-spinners";
import { authService } from "../../services/AuthService";

type AuthForm = {
  username: string;
  password: string;
};

type ErrorMessageProps = {
  title: string;
  description: string;
};

export function Login() {
  const [errorMessage, setErrorMessage] = useState<ErrorMessageProps>();
  const [isLoading, setIsLoading] = useState(false);

  const { storeSessionId } = useContext(SessionIdContext);

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
      const requestTokenResponse = await authService.generateRequestToken();

      const payload = {
        username: data.username,
        password: data.password,
        unauthorizedRequestToken: requestTokenResponse.request_token,
      };

      const authorizationRequestToken = await authService.authorizeRequestToken(payload);

      const createdSession = await authService.createSession(
        authorizationRequestToken.request_token
      );

      storeSessionId(createdSession.session_id);
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
