import { useEffect, useState } from "react"; //useEffect: chama a API; // useState:guarda a lista de apps da API
import { getApps } from "../services/api";
import Card from "../components/Card";
import Modal from "../components/Modal";

function Home() {
  const [apps, setApps] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewedApps, setViewedApps] = useState([]);

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
    setViewedApps(prev => {
      const filtered = prev.filter(item => item.app_id !== app.app_id);
      return [app, ...filtered].slice(0,4 );
    });
    
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
              <Card key={app.app_id} app={app} onClick={() => handleCardClick(app)} />
            ))}
          </div>
        )}
      </div>
      {selectedApp && (
        <Modal app={selectedApp} onClose={closeModal} viewed={viewedApps}/>
      )}
    </div>
  );
}
export default Home;
