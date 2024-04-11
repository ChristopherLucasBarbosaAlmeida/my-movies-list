import { AxiosError } from "axios";

const httpRequestErrorCodes = {
  ERR_BAD_REQUEST: {
    title: "Credenciais inválidas!",
    description: "Verifique se suas credencias estão corretas",
  },
  ERR_GENERIC: {
    title: "Erro",
    description: "Oops! Ocorreu um errro, tente novamente mais tarde.",
  },
};

export function getErrorMessage(error: unknown) {
  if (error instanceof AxiosError) {
    const code = error.code ?? "ERR_GENERIC";

    return httpRequestErrorCodes[code as keyof typeof httpRequestErrorCodes];
  }
  return httpRequestErrorCodes.ERR_GENERIC;
}
