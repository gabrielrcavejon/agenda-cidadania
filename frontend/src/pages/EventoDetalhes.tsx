import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEvento, Evento } from "../hooks/useEvento";
import NavbarSuperior from "../components/NavbarSuperior";

const EventoDetalhes = () => {
	const { id } = useParams();
	const { getEvento } = useEvento();
	const [evento, setEvento] = useState<Evento | null>(null);
	const [fechando] = useState(false);

	useEffect(() => {
		const carregarDados = async () => {
			if (!id) return;

			const resEvento = await getEvento(Number(id));

			setEvento(resEvento.data as Evento);
		};

		carregarDados();
	}, []);

	return (
		<div className="content-area position-relative">
			<NavbarSuperior titulo={evento?.nome ?? ""} />

			<h4 className="mt-4 mb-3">Presenças Marcadas</h4>

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
