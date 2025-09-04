import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [senha, setSenha] = useState("");
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await login(email, senha);
		navigate("/");
	};

	return (
		<div className="container-fluid vh-100 d-flex p-0">
			<div className="row w-100 m-0">
				<div
					id="login"
					className="col-md-6 d-none d-md-flex flex-column justify-content-center align-items-center text-white p-5"
				>
					<img
						src="/logo_login.png"
						alt="Logo"
						style={{ width: "400px", marginBottom: "20px" }}
					/>
					<h1 className="display-5 fw-bold text-center">Bem-vindo de volta!</h1>
					<p className="text-center mt-3">
						Entre com sua conta e aproveite tudo que preparamos para você.
					</p>
				</div>

				<div className="col-md-6 d-flex align-items-center justify-content-center bg-light">
					<div
						className="card p-4 shadow rounded-4"
						style={{ width: "100%", maxWidth: "400px" }}
					>
						<h4 className="text-center mb-4 fw-bold text-dark">Login</h4>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label className="form-label text-muted">Email</label>
								<input
									type="email"
									className="form-control rounded-pill"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className="mb-4">
								<label className="form-label text-muted">Senha</label>
								<input
									type="password"
									className="form-control rounded-pill"
									value={senha}
									onChange={(e) => setSenha(e.target.value)}
									required
								/>
							</div>
							<button
								type="submit"
								className="btn btn-primary w-100 rounded-pill fw-semibold"
							>
								Entrar
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
