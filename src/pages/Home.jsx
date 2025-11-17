import { useEffect, useState } from "react"; //useEffect: chama a API; // useState:guarda a lista de apps da API
import { getApps } from "../services/api";
import Card from "../components/Card";
import Modal from "../components/Modal";

function Home() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);

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

  function handleCardClick(app) {
    setSelectedApp(app);
    }

    function closeModal() {
      setSelectedApp(null);
    }

  return (
    <div style={{ padding: "20px" }}>
      <h1>As ferramentas que você mais ama, agora juntas</h1>

      <div style={{ marginTop: "20px" }}>
        {apps.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {apps.map((app) => (
              <Card key={app.id} app={app} onClick={() => handleCardClick(app)} />
            ))}
          </div>
        )}
      </div>
      {selectedApp && (
        <Modal app={selectedApp} onClose={closeModal}/>
      )}
    </div>
  );
}
export default Home;
