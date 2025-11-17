export default function Modal({ app, onClose }) {
    return (
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <button onClick={onClose} style={{ float: "right" }}>
            X
          </button>
  
          <h2>{app.name}</h2>
          <img src={app.icon} alt={app.name} style={{ width: "80px" }} />
          <p style={{ marginTop: "10px" }}>{app.description}</p>
        </div>
      </div>
    );
  }
  