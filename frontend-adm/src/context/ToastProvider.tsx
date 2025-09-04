import React, { createContext, useContext, useState } from "react";

type ToastType = "success" | "error";

type Toast = {
	id: number;
	message: string;
	type: ToastType;
};

const ToastContext = createContext<(message: string, type: ToastType) => void>(
	() => {}
);

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const showToast = (message: string, type: ToastType = "success") => {
		const id = Date.now();
		const newToast = { id, message, type };
		setToasts((prev) => [newToast, ...prev]);

		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 3000);
	};

	return (
		<ToastContext.Provider value={showToast}>
			{children}
			<div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
				{toasts.map((toast) => (
					<div
						key={toast.id}
						style={{
							marginBottom: "10px",
							padding: "12px 16px",
							borderRadius: "6px",
							color: "#fff",
							backgroundColor: toast.type === "success" ? "#4caf50" : "#f44336",
							boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
							animation: "fadeIn 0.3s ease",
						}}
					>
						{toast.message}
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};
