export default function Card({ app }) {
    return (
      <div style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px"
      }}>
        <img src={app.icon} alt={app.name} width="60" />
        <h3>{app.name}</h3>
      </div>
    );
  }
  