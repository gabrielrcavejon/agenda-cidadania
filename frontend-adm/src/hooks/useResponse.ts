import { AxiosError, AxiosResponse } from "axios";

export interface Response<T = unknown> {
	mensagem: string;
	statusCode: number;
	data: T;
}

export const useResponse = () => {
	const criarResponse = async <T = unknown>(
		axios?: AxiosResponse<T> | AxiosError<T> | string
	): Promise<Response<T>> => {
		if ((axios as AxiosResponse<T>)?.status !== undefined) {
			const resposta = axios as AxiosResponse<T>;
			return {
				mensagem: resposta.statusText,
				statusCode: resposta.status,
				data: resposta.data,
			};
		} else if (typeof axios === "string") {
			return {
				mensagem: axios,
				statusCode: 0,
				data: null as T,
			};
		} else if (axios instanceof AxiosError) {
			const resposta = axios as AxiosError<T>;
			return {
				mensagem: resposta.message,
				statusCode: resposta.response?.status ?? 0,
				data: resposta.response?.data ?? (null as T),
			};
		}

		return {
			mensagem: "",
			statusCode: 0,
			data: null as T,
		};
	};

	return {
		criarResponse,
	};
};
