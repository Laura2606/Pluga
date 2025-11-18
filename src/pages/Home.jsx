import { useEffect, useState } from "react"; //useEffect: chama a API; // useState:guarda a lista de apps da API
import { getApps } from "../services/api";
import Card from "../components/Card";
import Modal from "../components/Modal";

function Home() {
  const [apps, setApps] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewedApps, setViewedApps] = useState([]);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 12;

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

  // Filtrar apps pela busca
  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação lógica
  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = filteredApps.slice(indexOfFirstApp, indexOfLastApp);

  const totalPages = Math.ceil(filteredApps.length / appsPerPage);

  return (
    <div style={{ padding: "20px" }}>
      <h1>As ferramentas que você mais ama, agora juntas</h1>

       {/* Barra de busca */}
       <input
        type="text"
        placeholder="Buscar +100 ferramentas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginTop: "20px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

       {/* Cards */}
       {currentApps.length === 0 ? (
        <p>Nenhuma ferramenta encontrada.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
          {currentApps.map((app) => (
            <Card key={app.app_id} app={app} onClick={() => handleCardClick(app)} />
          ))}
        </div>
      )}

      {/* Paginação */}
<div style={{ marginTop: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
  <button 
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    Anterior
  </button>

  <span>Página {currentPage} de {totalPages}</span>

  <button 
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    Próxima
  </button>
</div>


      {/* <div style={{ marginTop: "20px" }}>
        {apps.length === 0 ? (
          <p>Carregando...</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
            {apps.map((app) => (
              <Card key={app.app_id} app={app} onClick={() => handleCardClick(app)} />
            ))}
          </div>
        )}
      </div> */}
      {selectedApp && (
        <Modal app={selectedApp} onClose={closeModal} viewed={viewedApps}/>
      )}
    </div>
  );
}
export default Home;
