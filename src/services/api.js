export async function getApps() {
    try {
      const response = await fetch("https://pluga.co/ferramentas_search.json");
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      return [];
    }
  }
  