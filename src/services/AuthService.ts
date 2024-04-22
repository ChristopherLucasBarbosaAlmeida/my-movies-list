import { AxiosResponse } from "axios";
import { axiosInstance } from "../libs/axios";
import { User } from "../types/User";

class AuthService {
  async generateRequestToken() {
    const response: AxiosResponse<RequestTokenResponse> = await axiosInstance.get(
      "/authentication/token/new"
    );
    return response.data;
  }

  async authorizeRequestToken(data: Input) {
    const response: AxiosResponse<AuthorizedRequestToken> = await axiosInstance.post(
      "authentication/token/validate_with_login",
      {
        username: data.username,
        password: data.password,
        request_token: data.unauthorizedRequestToken,
      }
    );
    return response.data;
  }

  async createSession(authorizedRequestToken: string) {
    const response: AxiosResponse<CreatedSession> = await axiosInstance.post(
      "/authentication/session/new",
      {
        request_token: authorizedRequestToken,
      }
    );
    return response.data;
  }

  async deleteSession(sessionId: string) {
    await axiosInstance.delete("/authentication/session", { data: { session_id: sessionId } });
  }

  async getUserDetails(sessionId: string) {
    const response: AxiosResponse<User> = await axiosInstance.get(`/account/${sessionId}`);
    return response.data;
  }
}

export const authService = new AuthService();

type AuthorizedRequestToken = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

type Input = {
  username: string;
  password: string;
  unauthorizedRequestToken: string;
};

type RequestTokenResponse = {
  request_token: string;
  expires_at: string;
  success: boolean;
};

type CreatedSession = {
  success: boolean;
  session_id: string;
};


