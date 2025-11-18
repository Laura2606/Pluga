export default function Modal({ app, onClose, viewed = [] }) {

    const filteredViewed = viewed.filter(item => item.app_id !== app.app_id);
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

          {/* LINK PARA O SITE DA PLUGA */}
        <p style={{ marginTop: "15px" }}>
          <a 
            href={app.link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: "#0070f3" }}
          >
            Ver página do app na Pluga →
          </a>
        </p>

        {/* ÚLTIMAS FERRAMENTAS VISUALIZADAS */}
        <div style={{ marginTop: "25px" }}>
          <h3>Últimas ferramentas visualizadas</h3>

          {filteredViewed.length === 0 ? (
  <p>Nenhuma ainda.</p>
) : (

          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            {filteredViewed
            .map((item) => (
              <div
                key={item.app_id}
                style={{
                  textAlign: "center",
                  border: "1px solid #ddd",
                  padding: "10px",
                  borderRadius: "8px",
                  width: "90px",
                }}
              >
                <img 
                  src={item.icon} 
                  alt={item.name} 
                  style={{ width: "40px" }} 
                />
                <p style={{ fontSize: "14px", marginTop: "5px" }}>
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        )}
  </div>
  </div>
    </div>
  );
}
