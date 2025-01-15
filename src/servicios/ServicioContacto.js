import axios from "axios";

export class ServicioContacto {
  baseUrl = "http://localhost:8080/api/v1/";

  getAll() {
    return axios.get(this.baseUrl + "contactos/").then((res) => res.data);
  }
}
