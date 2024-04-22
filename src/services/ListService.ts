import { AxiosResponse } from "axios";
import { axiosInstance } from "../libs/axios";
import { PagedList, PaginatedData } from "../types/PaginatedData";

class ListService {
  async createList(data: Input) {
    await axiosInstance.post(
      "/list",
      { name: data.name, description: data.description },
      {
        params: {
          session_id: data.sessionId,
        },
      }
    );
  }

  async getLists(sessionId: string) {
    const response: AxiosResponse<PaginatedData<PagedList>> = await axiosInstance.get(
      `/account/${sessionId}/lists`
    );
    return response.data;
  }

  async deleteList(listId: number) {
    await axiosInstance.delete(`/list/${listId}`);
  }
}

export const listService = new ListService();

type Input = {
  name: string;
  description: string;
  sessionId: string;
};
