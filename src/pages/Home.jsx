import { useEffect, useState } from "react"; //useEffect: chama a API; // useState:guarda a lista de apps da API
import { getApps } from "../services/api";
import Card from "../components/Card";

function Home() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    async function fetchApps() {
      try {
        const data = await getApps();
        setApps(data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchApps();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pluga Apps</h1>

      <div style={{ marginTop: "20px" }}>
        {apps.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {apps.map((app) => (
              <Card key={app.id} app={app} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
export default Home;
