import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Evento, useEvento } from "../hooks/useEvento";
import { Cidade, useCidade } from "../hooks/useCidade";
import { Estado, useEstado } from "../hooks/useEstado";
import { useUsuario, Usuario } from "../hooks/useUsuario";
import { useToast } from "../context/ToastProvider";
import NavbarSuperior from "../components/NavbarSuperior";

interface DataHoraLocal {
	ano: string;
	mes: string;
	dia: string;
	hora: string;
	minuto: string;
}

const getDataHoraAtual = (): DataHoraLocal => {
	const now = new Date();
	return {
		ano: String(now.getFullYear()),
		mes: String(now.getMonth() + 1).padStart(2, "0"),
		dia: String(now.getDate()).padStart(2, "0"),
		hora: String(now.getHours()).padStart(2, "0"),
		minuto: String(now.getMinutes()).padStart(2, "0"),
	};
};

const formatarParaDataIso = (data: DataHoraLocal): string => {
	const { ano, mes, dia, hora, minuto } = data;
	const dataHoraString = `${ano}-${mes}-${dia}T${hora}:${minuto}:00`;
	const date = new Date(dataHoraString);
	const segundo = String(date.getSeconds()).padStart(2, "0");

	const offset = -date.getTimezoneOffset();
	const sinal = offset >= 0 ? "+" : "-";
	const horasOffset = String(Math.abs(Math.floor(offset / 60))).padStart(
		2,
		"0"
	);
	const minutosOffset = String(Math.abs(offset % 60)).padStart(2, "0");

	return `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}${sinal}${horasOffset}:${minutosOffset}`;
};

const formatarParaInput = (data: DataHoraLocal) =>
	`${data.ano}-${data.mes}-${data.dia}T${data.hora}:${data.minuto}`;

const CadastrarEvento = () => {
	const { criarVazio, salvar } = useEvento();
	const { getCidades } = useCidade();
	const { getEstados } = useEstado();
	const { getMe } = useUsuario();
	const toast = useToast();

	const [evento, setEvento] = useState<Evento>(criarVazio());
	const [estados, setEstados] = useState<Estado[]>([]);
	const [cidades, setCidades] = useState<Cidade[]>([]);
	const [dataInicio, setDataInicio] = useState(getDataHoraAtual());
	const [dataFim, setDataFim] = useState(getDataHoraAtual());

	useEffect(() => {
		const carregarDadosIniciais = async () => {
			try {
				const usuario = (await getMe()).data as Usuario;

				setEvento((prev) => ({
					...prev,
					endereco: {
						...prev.endereco,
						idCidade: usuario.empresa.endereco.idCidade,
						cidade: {
							...prev.endereco.cidade,
							idEstado: usuario.empresa.endereco.cidade.idEstado,
						},
					},
				}));

				const estadosRes = await getEstados();
				setEstados(estadosRes.data as Estado[]);

				const cidadesRes = await getCidades(
					usuario.empresa.endereco.cidade.idEstado
				);
				setCidades(cidadesRes.data as Cidade[]);
			} catch (error) {
				console.error("Erro ao carregar dados iniciais", error);
			}
		};

		carregarDadosIniciais();
	}, []);

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setEvento((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleEnderecoChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setEvento((prev) => ({
			...prev,
			endereco: {
				...prev.endereco,
				[name]: value,
			},
		}));
	};

	const handleDataHoraChange = (
		valor: string,
		setData: (d: DataHoraLocal) => void,
		campo: "dataHoraInicio" | "dataHoraFim"
	) => {
		const [data, hora] = valor.split("T");
		const [ano, mes, dia] = data.split("-");
		const [horaSel, minSel] = hora.split(":");

		const novaData: DataHoraLocal = {
			ano,
			mes,
			dia,
			hora: horaSel,
			minuto: minSel,
		};
		setData(novaData);
		setEvento((prev) => ({
			...prev,
			[campo]: formatarParaDataIso(novaData),
		}));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await salvar(evento);
			toast("Sucesso ao salvar!", "success");
		} catch (error) {
			console.error("Erro ao salvar evento", error);
		}
	};

	return (
		<div className="content-area">
			<div className="eventos-container">
				<NavbarSuperior titulo={"Cadastrar Novo Evento"} />

				<form onSubmit={handleSubmit}>
					{/* Nome e Descrição */}
					<div className="row mb-3">
						<div className="col-md-6">
							<label className="form-label">Nome do Evento</label>
							<input
								type="text"
								name="nome"
								className="form-control"
								value={evento.nome}
								onChange={handleInputChange}
								required
								minLength={3}
								maxLength={60}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Descrição</label>
							<input
								type="text"
								name="descricao"
								className="form-control"
								value={evento.descricao}
								onChange={handleInputChange}
								required
								minLength={3}
								maxLength={60}
							/>
						</div>
					</div>

					{/* Datas */}
					<div className="row mb-3">
						<div className="col-md-6">
							<label className="form-label">Data e Hora de Início</label>
							<input
								type="datetime-local"
								className="form-control"
								value={formatarParaInput(dataInicio)}
								onChange={(e) =>
									handleDataHoraChange(
										e.target.value,
										setDataInicio,
										"dataHoraInicio"
									)
								}
								required
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Data e Hora de Término</label>
							<input
								type="datetime-local"
								className="form-control"
								value={formatarParaInput(dataFim)}
								onChange={(e) =>
									handleDataHoraChange(
										e.target.value,
										setDataFim,
										"dataHoraFim"
									)
								}
								required
							/>
						</div>
					</div>

					{/* Estado e Cidade */}
					<div className="row mb-3">
						<div className="col-md-6">
							<label className="form-label">Estado</label>
							<select
								className="form-control"
								value={evento.endereco.cidade.idEstado}
								onChange={async (e) => {
									const idEstado = Number(e.target.value);
									const cidadesRes = await getCidades(idEstado);
									setCidades(cidadesRes.data);
									setEvento((prev) => ({
										...prev,
										endereco: {
											...prev.endereco,
											idCidade: cidadesRes.data[0]?.idCidade || 0,
											cidade: { ...prev.endereco.cidade, idEstado },
										},
									}));
								}}
								required
							>
								{estados.map((estado) => (
									<option key={estado.idEstado} value={estado.idEstado}>
										{estado.nome}
									</option>
								))}
							</select>
						</div>
						<div className="col-md-6">
							<label className="form-label">Cidade</label>
							<select
								className="form-control"
								name="idCidade"
								value={evento.endereco.idCidade}
								onChange={handleEnderecoChange}
								required
							>
								{cidades.map((cidade) => (
									<option key={cidade.idCidade} value={cidade.idCidade}>
										{cidade.nome}
									</option>
								))}
							</select>
						</div>
					</div>

					{/* Logradouro, Bairro, CEP, Número */}
					<div className="row mb-3">
						<div className="col-md-6">
							<label className="form-label">Logradouro</label>
							<input
								type="text"
								className="form-control"
								name="logradouro"
								value={evento.endereco.logradouro}
								onChange={handleEnderecoChange}
								required
								minLength={3}
								maxLength={60}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Bairro</label>
							<input
								type="text"
								className="form-control"
								name="bairro"
								value={evento.endereco.bairro}
								onChange={handleEnderecoChange}
								required
								minLength={3}
								maxLength={60}
							/>
						</div>
					</div>

					<div className="row mb-3">
						<div className="col-md-6">
							<label className="form-label">CEP</label>
							<input
								type="text"
								className="form-control"
								name="cep"
								value={evento.endereco.cep}
								onChange={handleEnderecoChange}
								required
								minLength={8}
								maxLength={8}
							/>
						</div>
						<div className="col-md-6">
							<label className="form-label">Número</label>
							<input
								type="text"
								className="form-control"
								name="numero"
								value={evento.endereco.numero}
								onChange={handleEnderecoChange}
								required
								minLength={1}
								maxLength={10}
							/>
						</div>
					</div>

					<button
						type="submit"
						className="btn btn-success d-flex align-items-center gap-2"
						style={{
							position: "fixed",
							right: "20px",
						}}
					>
						<i className="bi bi-calendar-plus"></i>
						Cadastrar Evento
					</button>
				</form>
			</div>
		</div>
	);
};

export default CadastrarEvento;
