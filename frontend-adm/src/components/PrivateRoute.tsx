// components/PrivateRoute.tsx
import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const { logado } = useAuth();
	return logado ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
