import axios from "axios";

export class ServicioFacultades {
  baseUrl = "https://portal-ucb-backend.onrender.com/api/v1/";

  getAll() {

    return axios.get(this.baseUrl + "facultades/").then(res => res.data);
    }

    postFacultad(facultad) {
      return axios.post(this.baseUrl + "facultades/", facultad).then(res => res.data);
    }

    putFacultad(facultad) {
      return axios.put(this.baseUrl + "facultades/", facultad).then(res => res.data);
    }

}