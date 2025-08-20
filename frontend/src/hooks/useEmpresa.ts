import { Endereco, useEndereco } from "./useEndereco";

export interface Empresa {
	idEmpresa: number;
	nome: string;
	fantasia: string;
	cnpj: string;
	endereco: Endereco;
}

export const useEmpresa = () => {
	const { criarVazio: criarEnderecoVazio } = useEndereco();

	const criarVazio = (): Empresa => ({
		idEmpresa: 0,
		nome: "",
		fantasia: "",
		cnpj: "",
		endereco: criarEnderecoVazio(),
	});

	return {
		criarVazio,
	};
};
