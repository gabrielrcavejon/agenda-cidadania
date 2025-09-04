import { AxiosError } from "axios";
import { Response, useResponse } from "./useResponse";
import api from "../services/api";

export interface Token {
	access_token: string;
}

export const useLogin = () => {
	const { criarResponse } = useResponse();

	const login = async (
		email: string,
		password: string
	): Promise<Response<Token>> => {
		try {
			return await criarResponse(
				await api.post<Token>("/login", {
					email,
					password,
				})
			);
		} catch (error) {
			return await criarResponse(error as AxiosError<Token>);
		}
	};

	return {
		login,
	};
};
