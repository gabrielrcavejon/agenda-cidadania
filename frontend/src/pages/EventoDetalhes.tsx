import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEvento, Evento, TipoEnvio } from "../hooks/useEvento";
import NavbarSuperior from "../components/NavbarSuperior";

const EventoDetalhes = () => {
	const { id } = useParams();
	const { getEvento, finalizarEvento } = useEvento();
	const [evento, setEvento] = useState<Evento | null>(null);
	const [fechando, setFechando] = useState(false);

	useEffect(() => {
		const carregarDados = async () => {
			if (!id) return;

			const resEvento = await getEvento(Number(id));

			setEvento(resEvento.data as Evento);
		};

		carregarDados();
	}, []);

	const enviarTodos = async (tipoEnvio: TipoEnvio) => {
		setFechando(true);
		try {
			await finalizarEvento(evento!.idEvento, tipoEnvio);
		} catch (err) {
			console.log("Erro ao enviar os e-mails. " + err);
		} finally {
			setFechando(false);
		}
	};

	return (
		<div className="content-area position-relative">
			<NavbarSuperior titulo={evento?.nome ?? ""} />

			<h4 className="mt-4 mb-3">Presenças Marcadas</h4>

			<div className="mt-4 justify-content-end d-flex gap-3">
				<button
					onClick={() => enviarTodos(TipoEnvio.EMAIL)}
					className="btn btn-primary d-flex align-items-center gap-2"
					disabled={fechando}
				>
					<i className="bi bi-envelope-fill"></i>
					{fechando ? "Enviando..." : "Enviar por E-mail"}
				</button>

				<button
					onClick={() => enviarTodos(TipoEnvio.WHATSAPP)}
					className="btn btn-success d-flex align-items-center gap-2"
					disabled={fechando}
				>
					<i className="bi bi-whatsapp"></i>
					{fechando ? "Enviando..." : "Enviar por WhatsApp"}
				</button>
			</div>

			{fechando && (
				<div
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 9999,
					}}
				>
					<div
						style={{
							backgroundColor: "white",
							padding: "30px 40px",
							borderRadius: "10px",
							boxShadow: "0 0 10px rgba(0,0,0,0.3)",
							textAlign: "center",
							fontSize: "18px",
						}}
					>
						As mensagens estão sendo enviadas, aguarde...
					</div>
				</div>
			)}
		</div>
	);
};

export default EventoDetalhes;
