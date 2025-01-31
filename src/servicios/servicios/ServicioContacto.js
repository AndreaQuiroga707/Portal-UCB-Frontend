import axios from "axios";

export class ServicioContacto {
  baseUrl = "https://portal-ucb-backend.onrender.com/api/v1/";

  getAll() {
    return axios.get(this.baseUrl + "contactos/").then((res) => res.data);
  }
}
