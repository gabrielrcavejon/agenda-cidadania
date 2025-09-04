import { useEffect, useState } from "react";
import { Evento, useEvento } from "../hooks/useEvento";
import NavbarSuperior from "../components/NavbarSuperior";
import { Link } from "react-router-dom";

const Eventos = () => {
	const [eventos, setEventos] = useState<Evento[]>([]);
	const { getEventos } = useEvento();

	useEffect(() => {
		(async () => {
			const res = await getEventos();

			console.log(res);

			setEventos(res.data as Evento[]);
		})();
	}, []);

	return (
		<div className="content-area">
			<NavbarSuperior titulo="Eventos" />

			<div className="row g-4">
				{eventos.map((evento) => (
					<div className="col-lg-6 col-md-12" key={evento.idEvento}>
						<div className="card h-100 border-0 shadow-sm position-relative">
							<div className="card-body pb-5">
								<h5 className="fw-bold text-dark mb-2">
									{evento.empresa.fantasia}: Evento {evento.idEvento} -{" "}
									{evento.nome}
								</h5>

								<p className="text-muted mb-1" style={{ fontSize: "0.9rem" }}>
									<i className="bi bi-geo-alt-fill me-1"></i>
									{evento.endereco.logradouro}, {evento.endereco.numero} -{" "}
									{evento.endereco.bairro}
								</p>
								<p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
									{evento.endereco.cidade.nome} -{" "}
									{evento.endereco.cidade.estado.abreviacao}
								</p>

								<p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
									<i className="bi bi-clock-fill me-1"></i>
									{new Date(evento.dataHoraInicio).toLocaleString()} até{" "}
									{new Date(evento.dataHoraFim).toLocaleString()}
								</p>

								<div className="position-absolute bottom-0 end-0 m-3 d-flex gap-2">
									<Link
										to={`/evento/${evento.idEvento}`}
										className="btn btn-sm btn-success"
									>
										<i className="bi bi-eye me-1"></i> Ver Evento
									</Link>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Eventos;
