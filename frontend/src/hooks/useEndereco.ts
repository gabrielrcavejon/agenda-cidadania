import { Cidade, useCidade } from "./useCidade";

export interface Endereco {
	idEndereco: number;
	idCidade: number;
	logradouro: string;
	bairro: string;
	cep: string;
	numero: string;
	cidade: Cidade;
}

export const useEndereco = () => {
	const { criarVazio: criarCidadeVazio } = useCidade();

	const criarVazio = (): Endereco => ({
		idEndereco: 0,
		idCidade: 0,
		logradouro: "",
		bairro: "",
		cep: "",
		numero: "",
		cidade: criarCidadeVazio(),
	});

	return {
		criarVazio,
	};
};
