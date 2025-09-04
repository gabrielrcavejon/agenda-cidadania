import { AxiosError } from "axios";
import api from "../services/api";
import { Response, useResponse } from "./useResponse";
import { Estado, useEstado } from "./useEstado";

export interface Cidade {
	idCidade: number;
	idEstado: number;
	nome: string;
	estado: Estado;
}

export const useCidade = () => {
	const { criarVazio: criarEstadoVazio } = useEstado();
	const { criarResponse } = useResponse();

	const getCidades = async (idEstado: number): Promise<Response<Cidade[]>> => {
		try {
			return await criarResponse(
				await api.get<Cidade[]>(`/cidade/${idEstado}`)
			);
		} catch (erro) {
			return await criarResponse(erro as AxiosError<Cidade[]>);
		}
	};

	const criarVazio = (): Cidade => ({
		idCidade: 0,
		idEstado: 1,
		nome: "",
		estado: criarEstadoVazio(),
	});

	return {
		criarVazio,
		getCidades,
	};
};
