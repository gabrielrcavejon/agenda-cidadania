import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./App.css";
import CadastrarEvento from "./pages/CadastrarEvento";
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
						path="/cadastro"
						element={
							<PrivateRoute>
								<CadastrarEvento />
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
