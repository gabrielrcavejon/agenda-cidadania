import { AxiosError } from "axios";
import api from "../services/api";
import { Response, useResponse } from "./useResponse";
import { Endereco, useEndereco } from "./useEndereco";
import { Empresa, useEmpresa } from "./useEmpresa";

export interface Evento {
	idEvento: number;
	idEmpresa: number;
	idUsuarioCriacao: number;
	nome: string;
	descricao: string;
	dataHoraInicio: string;
	dataHoraFim: string;
	empresa: Empresa;
	endereco: Endereco;
}

export const useEvento = () => {
	const { criarResponse } = useResponse();
	const { criarVazio: criarEmpresaVazio } = useEmpresa();
	const { criarVazio: criarEnderecoVazio } = useEndereco();

	const getEventos = async (): Promise<Response> => {
		try {
			return await criarResponse(await api.get<Evento[]>(`/evento`));
		} catch (erro) {
			return await criarResponse(erro as AxiosError);
		}
	};

	const getEvento = async (idEvento: number): Promise<Response> => {
		try {
			return await criarResponse(await api.get<Evento>(`/evento/${idEvento}`));
		} catch (erro) {
			return await criarResponse(erro as AxiosError);
		}
	};

	const criarVazio = (): Evento => ({
		idEvento: 0,
		idEmpresa: 0,
		idUsuarioCriacao: 0,
		nome: "",
		descricao: "",
		dataHoraInicio: new Date().toISOString().slice(0, 16),
		dataHoraFim: new Date().toISOString().slice(0, 16),
		empresa: criarEmpresaVazio(),
		endereco: criarEnderecoVazio(),
	});

	const salvar = async (evento: Evento): Promise<Response> => {
		const request = {
			nome: evento.nome,
			descricao: evento.descricao,
			dataHoraInicio: evento.dataHoraInicio,
			dataHoraFim: evento.dataHoraFim,
			endereco: {
				idCidade: evento.endereco.idCidade,
				logradouro: evento.endereco.logradouro,
				bairro: evento.endereco.bairro,
				cep: evento.endereco.cep,
				numero: evento.endereco.numero,
			},
		};

		if (evento.idEvento && evento.idEvento > 0) {
			return await criarResponse(
				await api.patch<Evento>(`/c/${evento.idEvento}`, request, {
					headers: {
						"Content-Type": "application/json",
					},
				})
			);
		} else {
			return await criarResponse(
				await api.post<Evento>("/evento", request, {
					headers: {
						"Content-Type": "application/json",
					},
				})
			);
		}
	};

	return {
		criarVazio,
		getEventos,
		getEvento,
		salvar,
	};
};
