import axios from "axios";

export class ServicioEventos {
  baseUrl = "https://portal-ucb-backend.onrender.com/api/v1/eventos/";

  getAuthHeader() {
    const token = localStorage.getItem("token");
    console.log("Token usado en solicitud:", token); // 🔍 Verifica si es el mismo que funciona en Postman
    return { 
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"  // 🔹 Asegura que el backend lo reciba correctamente
    };
  }
  

  getAll() {  // 🔹 Agrega esta función
    return axios.get(this.baseUrl, { headers: this.getAuthHeader() })
      .then((res) => res.data);
  }

  crearEvento(evento) {
    return axios.post(this.baseUrl, evento, { headers: this.getAuthHeader() })
      .then((res) => res.data)
      .catch((error) => {
        console.error("Error en crearEvento:", error.response || error);
        throw error;
      });
  }
  

  actualizarEvento(evento) {
    const token = localStorage.getItem("token");
    return axios.put(
      `https://portal-ucb-backend.onrender.com/api/v1/eventos/`, // Sin ID en la URL
      evento,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => res.data);
  }
  

  eliminarEvento(id) {
    return axios.delete(`${this.baseUrl}${id}`, { headers: this.getAuthHeader() })
      .then((res) => res.data);
  }
}
