import axios from "axios";

export class ServicioEventos {
  baseUrl = "http://localhost:8080/api/v1/eventos/";

  getAuthHeader() {
    const token = localStorage.getItem("token"); // O la forma en que guardas el token
    return { Authorization: `Bearer ${token}` };
  }

  getAll() {
    return axios.get(this.baseUrl, { headers: this.getAuthHeader() }).then((res) => res.data);
  }

  crearEvento(evento) {
    return axios.post(this.baseUrl, evento, { headers: this.getAuthHeader() }).then((res) => res.data);
  }

  actualizarEvento(evento) {
    return axios.put(`${this.baseUrl}${evento.eventoId}`, evento, { headers: this.getAuthHeader() })
      .then((res) => res.data);
  }

  eliminarEvento(id) {
    return axios.delete(`${this.baseUrl}${id}`, { headers: this.getAuthHeader() }).then((res) => res.data);
  }
}

/*import axios from "axios";

export class ServicioEventos {
  baseUrl = "http://localhost:8080/api/v1/";

  getAll() {
    return axios.get(this.baseUrl + "eventos/").then((res) => res.data);
  }

  postEvento(evento) {
    return axios.post(this.baseUrl + "eventos/", evento).then((res) => res.data);
  }

  putEvento(evento) {
    return axios.put(this.baseUrl + "eventos/", evento).then((res) => res.data);
  }

  deleteEvento(id) {
    return axios.delete(this.baseUrl + `eventos/${id}`).then((res) => res.data);
  }
}
*/