function Modal({ onClick, children }) {
  return (
    <div
      onClick={onClick}
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        width: "80vh",
        height: "80vh",
        backgroundColor: "#fff",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "9999",
        borderRadius: "12px",
        overflowY: "scroll",

        padding: "20px 16px",
        // left: "0",
      }}
    >
      {children}
    </div>
  );
}

export default Modal;
