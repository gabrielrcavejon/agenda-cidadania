import { AxiosError } from "axios";
import api from "../services/api";
import { useResponse, Response } from "./useResponse";

export interface Pais {
	idPais: number;
	nome: string;
	abreviacao: string;
}

export const usePais = () => {
	const { criarResponse } = useResponse();

	const getPaises = async (): Promise<Response> => {
		try {
			return await criarResponse(await api.get<Pais[]>("/pais"));
		} catch (error) {
			return await criarResponse(error as AxiosError);
		}
	};

	const criarVazio = (): Pais => ({
		idPais: 0,
		nome: "",
		abreviacao: "",
	});

	return {
		criarVazio,
		getPaises,
	};
};
