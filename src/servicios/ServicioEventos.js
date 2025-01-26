import axios from "axios";

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
