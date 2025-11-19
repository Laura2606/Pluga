import { useEffect, useState } from "react"; //useEffect: chama a API; // useState:guarda a lista de apps da API
import { getApps } from "../services/api";
import Card from "../components/Card";
import Modal from "../components/Modal";

function Home() {
  const [apps, setApps] = useState([]);
  const [searchBox, setSearchBox] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewedApps, setViewedApps] = useState([]);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const appsPerPage = 12;

  useEffect(() => {
    getApps().then(setApps).catch(()=> console.error ("Erro ao buscar dados"));
    
  }, []);

  function handleCardClick(app) {
    setViewedApps(prev => [app,...prev.filter(item => item.app_id !== app.app_id)].slice(0,4 ));
    
    
    setSelectedApp(app);

  }

    function closeModal() {
      setSelectedApp(null);
    }

  // Filtrar apps pela busca
  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchBox.toLowerCase())
  );

  // Paginação
  const indexOfLastApp = currentPage * appsPerPage;
  const indexOfFirstApp = indexOfLastApp - appsPerPage;
  const currentApps = filteredApps.slice(indexOfFirstApp, indexOfLastApp);

  const totalPages = Math.ceil(filteredApps.length / appsPerPage);

  return (
    
    <div style={{ padding: "20px" }}>
      <h1>As ferramentas que você mais ama, agora juntas</h1>

      <div
  style={{
    maxWidth: "1200px",  // controla até onde a busca pode ir
    margin: "20px auto",
    width: "100%",
    position: "relative",
  }}
></div>

<div
  style={{
    maxWidth: "1200px", // Largura máxima do conteúdo
    margin: "0 auto",   // Centraliza horizontalmente
    padding: "0 20px",  // Espaçamento lateral para telas pequenas
  }}
>
  {/* Barra de busca */}
  <input
    type="text"
    placeholder="Buscar +100 ferramentas..."
    value={searchBox}
    onChange={(e) => setSearchBox(e.target.value)}
    style={{
      padding: "20px",
      width: "100%",
      border: "1px solid #ccc",
      borderRadius: "20px",
      fontSize: "16px",
      boxSizing: "border-box",
    }}
  />

  {/* Cards */}
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      marginTop: "20px",
  
    }}
  >
    {currentApps.map((app) => (
      <Card key={app.app_id} app={app} onClick={() => handleCardClick(app)} />
    ))}
  </div>
</div>


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

      {selectedApp && (
        <Modal app={selectedApp} onClose={closeModal} viewed={viewedApps}/>
      )}
    </div>
  );
}
export default Home;
