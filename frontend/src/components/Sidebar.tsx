import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// IMPORTANTE: CERTIFIQUE-SE DE QUE ESTES CAMINHOS ESTÃO CORRETOS
// As imagens devem estar na pasta 'src/assets' do seu projeto

const Sidebar: React.FC = () => {
	const [collapsed, setCollapsed] = useState(true);
	const location = useLocation();

	return (
		<div
			className={`sidebar ${collapsed ? "collapsed" : ""}`}
			onMouseEnter={() => setCollapsed(false)}
			onMouseLeave={() => setCollapsed(true)}
		>
			<div className="sidebar-header-blue d-flex align-items-center justify-content-center py-1">
				{/* Usar imagens em vez de texto, com larguras fixas para controle */}
			</div>

			<hr className="text-white mt-0" />

			<ul className="nav flex-column flex-grow-1">
				<li className="nav-item">
					<Link
						to="/"
						className={`nav-link sidebar-link-blue ${
							location.pathname === "/" ? "active" : ""
						}`}
					>
						<i className="bi bi-house-door-fill fs-5 sidebar-icon-solid"></i>
						{!collapsed && "Home"}
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="/cadastro"
						className={`nav-link sidebar-link-blue ${
							location.pathname === "/cadastro" ? "active" : ""
						}`}
					>
						<i className="bi bi-plus-square-fill fs-5 sidebar-icon-solid"></i>
						{!collapsed && "Cadastro de Evento"}
					</Link>
				</li>
				<li className="nav-item">
					<Link
						to="/evento"
						className={`nav-link sidebar-link-blue ${
							location.pathname === "/evento" ? "active" : ""
						}`}
					>
						<i className="bi bi-list-task fs-5 sidebar-icon-solid"></i>
						{!collapsed && "Lista de Eventos"}
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
