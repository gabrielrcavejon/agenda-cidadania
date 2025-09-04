import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Eventos from "./pages/Eventos";
import EventoDetalhes from "./pages/EventoDetalhes";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

interface ProtectedRoutesProp {
	isLoad: boolean;
}

const ProtectedRoutes = ({ isLoad }: ProtectedRoutesProp) => {
	if (isLoad) {
		return <></>;
	} else {
		return (
			<>
				<Sidebar />
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Dashboard />
							</PrivateRoute>
						}
					/>
					<Route
						path="*"
						element={
							<PrivateRoute>
								<></>
							</PrivateRoute>
						}
					/>
					<Route
						path="/evento"
						element={
							<PrivateRoute>
								<Eventos />
							</PrivateRoute>
						}
					/>
					<Route
						path="/evento/:id"
						element={
							<PrivateRoute>
								<EventoDetalhes />
							</PrivateRoute>
						}
					/>
				</Routes>
			</>
		);
	}
};

const App = () => {
	const { loginStore } = useAuth();
	const [isLoad, setIsLoad] = useState<boolean>(true);

	useEffect(() => {
		const loadApp = async () => {
			try {
				setIsLoad(true); // Start no carregamanto

				await loginStore();
			} catch (error) {
				console.log(error);
			} finally {
				setIsLoad(false); // Para o carregamanto
			}
		};

		loadApp();
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/*" element={<ProtectedRoutes isLoad={isLoad} />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
