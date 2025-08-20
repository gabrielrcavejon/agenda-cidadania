import { AxiosError } from "axios";
import api from "../services/api";
import { Response, useResponse } from "./useResponse";
import { Empresa, useEmpresa } from "./useEmpresa";

export interface Usuario {
	idUsuario: number;
	idEmpresa: number;
	email: string;
	nome: string;
	senha: string;
	telefone: string;
	foto: string;
	empresa: Empresa;
}

export const useUsuario = () => {
	const { criarResponse } = useResponse();
	const { criarVazio: criarEmpresaVazio } = useEmpresa();

	const getMe = async (): Promise<Response<Usuario>> => {
		try {
			return await criarResponse(await api.get<Usuario>(`/usuario/me`));
		} catch (erro) {
			return await criarResponse(erro as AxiosError<Usuario>);
		}
	};

	const criarVazio = (): Usuario => ({
		idUsuario: 0,
		senha: "",
		telefone: "",
		idEmpresa: 0,
		email: "",
		nome: "",
		foto: "",
		empresa: criarEmpresaVazio(),
	});

	return {
		criarVazio,
		getMe,
	};
};
