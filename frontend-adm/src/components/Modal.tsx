import React from "react";

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
	if (!isOpen) return null;

	return (
		<div style={overlayStyle}>
			<div style={modalStyle}>
				<button
					onClick={onClose}
					style={{
						position: "absolute",
						top: "10px",
						right: "10px",
						backgroundColor: "#e74c3c", // vermelho moderno
						color: "#fff",
						border: "none",
						borderRadius: "8px",
						padding: "4px 10px",
						fontSize: "16px",
						fontWeight: "bold",
						cursor: "pointer",
						boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						transition: "all 0.3s ease",
					}}
					onMouseOver={(e) =>
						(e.currentTarget.style.backgroundColor = "#c0392b")
					}
					onMouseOut={(e) =>
						(e.currentTarget.style.backgroundColor = "#e74c3c")
					}
				>
					✕
				</button>
				{children}
			</div>
		</div>
	);
};

const overlayStyle: React.CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	backgroundColor: "rgba(0, 0, 0, 0.6)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 9999,
};

const modalStyle: React.CSSProperties = {
	position: "relative",
	background: "#ffffff",
	padding: "30px",
	borderRadius: "10px",
	boxShadow: "0 0 10px rgba(0,0,0,0.25)",
	border: "#ffff 1px solid",
};

export default Modal;
