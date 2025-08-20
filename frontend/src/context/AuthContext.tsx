import React, { useContext } from "react";
import { createContext, useState } from "react";
import { HttpStatusCode } from "axios";
import { useUsuario, Usuario } from "../hooks/useUsuario";
import { useLogin, Token as TokenBackend } from "../hooks/useLogin";
import api from "../services/api";
import { Response } from "../hooks/useResponse";
import { Token } from "./models/Token";

type Auth = {
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	loginStore: () => Promise<void>;
	usuario: Usuario | null;
	token: Token | null;
	logado: boolean;
};

const AuthContext = createContext<Auth>({} as Auth);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [usuario, setUsuario] = useState<Usuario | null>(null); // Instacia do objeto User que esta logado
	const [token, setToken] = useState<Token | null>(null); // Token que vem do back-end ao usuario
	const { login: loginAPI } = useLogin();
	const { getMe } = useUsuario();

	const loginStore = async () => {
		try {
			const token = localStorage.getItem("token");

			if (!token) {
				setUsuario(null);
				return;
			}

			api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

			const responseGetMe: Response<Usuario> = await getMe();

			if (responseGetMe.statusCode != HttpStatusCode.Ok) {
				setUsuario(null); // Seta para null, para poder verificar se ta logado ou nao
				return;
			}

			console.log(responseGetMe.data);

			setUsuario(responseGetMe.data);

			const userJwt = await JSON.parse(atob(token.split(".")[1]));

			setToken({
				idEmpresa: userJwt.idEmpresa,
				idUsuario: userJwt.idUsuario,
			});
		} catch (error) {
			console.log("ERRO: " + error);
		}
	};

	const login = async (email: string, password: string) => {
		const responseToken: Response<TokenBackend> = await loginAPI(
			email,
			password
		);

		console.log(responseToken);

		if (responseToken.statusCode != HttpStatusCode.Ok) {
			setUsuario(null);
			return;
		}

		localStorage.setItem("token", responseToken.data.access_token);

		await loginStore();
	};

	const logout = async () => {
		localStorage.removeItem("token");
		setUsuario(null);
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				logout,
				loginStore,
				token,
				usuario,
				logado: !!usuario,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);
	return context;
};

export { useAuth, AuthProvider };
