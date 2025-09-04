import { Endereco, useEndereco } from "./useEndereco";

export enum TipoEmpresa {
	ADMINISTRADOR = "A", // Pessoal do sistema
	GERENCIADOR = "G", // Pessoal das prefeituras
	ORGANIZADOR = "O", // Pessoal que quer publicar evento
}

export interface Empresa {
	idEmpresa: number;
	nome: string;
	fantasia: string;
	cnpj: string;
	tipo: TipoEmpresa;
	endereco: Endereco;
}

export const useEmpresa = () => {
	const { criarVazio: criarEnderecoVazio } = useEndereco();

	const criarVazio = (): Empresa => ({
		idEmpresa: 0,
		nome: "",
		fantasia: "",
		tipo: TipoEmpresa.ORGANIZADOR,
		cnpj: "",
		endereco: criarEnderecoVazio(),
	});

	return {
		criarVazio,
	};
};
