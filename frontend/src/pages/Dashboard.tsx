import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import React from "react";
import NavbarSuperior from "../components/NavbarSuperior";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const { usuario } = useAuth();

	const commonChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					font: {
						size: 13,
						family: "'Poppins', sans-serif",
					},
					color: "#555",
				},
			},
			title: {
				display: false,
			},
			tooltip: {
				backgroundColor: "rgba(0,0,0,0.8)",
				titleFont: {
					size: 14,
					family: "'Poppins', sans-serif",
				},
				bodyFont: {
					size: 12,
					family: "'Poppins', sans-serif",
				},
				padding: 10,
				cornerRadius: 5,
			},
		},
		scales: {
			x: {
				ticks: {
					font: {
						size: 11,
						family: "'Poppins', sans-serif",
					},
					color: "#777",
				},
				grid: {
					display: false,
				},
			},
			y: {
				ticks: {
					font: {
						size: 11,
						family: "'Poppins', sans-serif",
					},
					color: "#777",
				},
				grid: {
					color: "#f0f0f0",
				},
			},
		},
	};

	const barData = {
		labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
		datasets: [
			{
				label: "Eventos",
				data: [4, 6, 8, 5, 9, 12],
				backgroundColor: "#66b2ff", // azul claro
				borderColor: "rgba(0,0,0,0.05)",
				borderWidth: 1,
				borderRadius: 3,
			},
		],
	};

	const barOptions = {
		...commonChartOptions,
		plugins: {
			...commonChartOptions.plugins,
			legend: {
				position: "top" as const,
				align: "start" as const,
				labels: {
					usePointStyle: true,
					color: "#333",
				},
			},
		},
		scales: {
			x: {
				...commonChartOptions.scales.x,
				grid: {
					display: false,
				},
			},
			y: {
				...commonChartOptions.scales.y,
				min: 0,
				max: 12,
				ticks: {
					stepSize: 2,
				},
				grid: {
					color: "#e0e0e0",
				},
			},
		},
	};

	const lineDataTrends = {
		labels: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
		datasets: [
			{
				label: "Engajamento Semanal",
				data: [150, 280, 220, 300, 180, 250, 200],
				fill: true,
				backgroundColor: "rgba(0, 123, 255, 0.2)",
				borderColor: "#007bff",
				tension: 0.4,
				pointBackgroundColor: "#007bff",
				pointBorderColor: "#fff",
				pointBorderWidth: 2,
				pointRadius: 5,
				pointHoverRadius: 7,
			},
		],
	};

	const lineOptionsTrends = {
		...commonChartOptions,
		plugins: {
			...commonChartOptions.plugins,
			legend: {
				position: "top" as const,
				align: "start" as const,
				labels: {
					usePointStyle: true,
					color: "#333",
				},
			},
		},
		scales: {
			x: {
				...commonChartOptions.scales.x,
			},
			y: {
				...commonChartOptions.scales.y,
				beginAtZero: true,
				max: 400,
			},
		},
	};

	if (usuario?.empresa.tipo == undefined || usuario?.empresa.tipo != "A") {
		navigate("/cadastro");
	} else {
		return (
			<div className="content-area">
				<NavbarSuperior titulo="Dashboard" />

				<div className="row g-4 mb-5">
					{[
						{
							title: "Total de Eventos",
							value: 3,
							percent: "+12%",
							color: "primary",
							icon: "bi-building",
						},
						{
							title: "Total de Participantes",
							value: 10,
							percent: "+23%",
							color: "success",
							icon: "bi-people",
						},
						{
							title: "Eventos Próximos",
							value: 2,
							percent: "+50%",
							color: "warning",
							icon: "bi-clock",
						},
						{
							title: "Taxa de Crescimento",
							value: "18%",
							percent: "+8%",
							color: "info",
							icon: "bi-graph-up-arrow",
						},
					].map((card, index) => (
						<div className="col-lg-3 col-md-6 col-sm-12" key={index}>
							<div className="card h-100 border-0 shadow-sm rounded-lg p-3 hover-lift-shadow">
								<div className="d-flex align-items-center mb-2">
									<div
										className={`icon-circle bg-${card.color}-light text-${card.color} me-3`}
									>
										<i className={`bi ${card.icon} fs-4`}></i>
									</div>
									<div>
										<h6
											className="text-muted text-uppercase mb-0"
											style={{ fontSize: "0.8rem" }}
										>
											{card.title}
										</h6>
										<h3 className="fw-bold mb-0 text-dark">{card.value}</h3>
									</div>
								</div>
								<p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
									<span className={`fw-bold text-${card.color}`}>
										{card.percent}
									</span>
									<span className="ms-1">em relação ao mês passado</span>
								</p>
							</div>
						</div>
					))}
				</div>

				<div className="row g-4">
					<div className="col-lg-6">
						<div className="card shadow-lg border-0 h-100 hover-lift-shadow">
							<div className="card-header bg-white border-0 py-3 pb-0">
								<h5 className="mb-0 fw-semibold text-dark">Eventos por Mês</h5>
							</div>
							<div
								className="card-body d-flex justify-content-center align-items-center"
								style={{ height: "350px" }}
							>
								<Bar data={barData} options={barOptions} />
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="card shadow-lg border-0 h-100 hover-lift-shadow">
							<div className="card-header bg-white border-0 py-3 pb-0">
								<h5 className="mb-0 fw-semibold text-dark">
									Engajamento Semanal
								</h5>
							</div>
							<div
								className="card-body d-flex justify-content-center align-items-center"
								style={{ height: "350px" }}
							>
								<Line data={lineDataTrends} options={lineOptionsTrends} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Dashboard;
