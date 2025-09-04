import { AxiosError } from "axios";
import api from "../services/api";
import { useResponse, Response } from "./useResponse";
import { Pais, usePais } from "./usePais";

export interface Estado {
	idEstado: number;
	idPais: number;
	nome: string;
	abreviacao: string;
	pais: Pais;
}

export const useEstado = () => {
	const { criarVazio: criarPaisVazio } = usePais();
	const { criarResponse } = useResponse();

	const getEstados = async (): Promise<Response> => {
		try {
			return await criarResponse(await api.get<Estado[]>("/estado"));
		} catch (error) {
			return await criarResponse(error as AxiosError);
		}
	};

	const criarVazio = (): Estado => ({
		idEstado: 0,
		idPais: 0,
		nome: "",
		abreviacao: "",
		pais: criarPaisVazio(),
	});

	return {
		criarVazio,
		getEstados,
	};
};
