import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar: React.FC = () => {
	const [collapsed, setCollapsed] = useState(true);
	const location = useLocation();
	const { usuario } = useAuth();

	console.log(usuario?.empresa.tipo);

	return (
		<div
			className={`sidebar ${collapsed ? "collapsed" : ""}`}
			onMouseEnter={() => setCollapsed(false)}
			onMouseLeave={() => setCollapsed(true)}
		>
			<div className="sidebar-header-blue d-flex align-items-center justify-content-center py-1">
				{/* */}
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
