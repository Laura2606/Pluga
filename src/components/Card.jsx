export default function Card({ app, onClick }) {
    return (
      <div 
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        textAlign: "center",
        backgroundColor: "#e9f4f5",
        transition: "0.2s",
      }}>
        <img src={app.icon} alt={app.name} width="60" style={{marginBottom: "10px"}} />
        <h3 style={{ fontSize: "1rem"}}>{app.name}</h3>
      </div>
    );
  }
  