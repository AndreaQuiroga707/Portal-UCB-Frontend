import axios from "axios";

export class ServicioNoticias {
  baseUrl = "http://localhost:8080/api/v1/";

  getAll() {
    return axios.get(this.baseUrl + "noticias/").then((res) => res.data);
  }

  postNoticia(noticia) {
    return axios.post(this.baseUrl + "noticias/", noticia).then((res) => res.data);
  }

  putNoticia(noticia) {
    return axios.put(this.baseUrl + "noticias/", noticia).then((res) => res.data);
  }
  deleteNoticia(id) {
    return axios.delete(this.baseUrl + `noticias/${id}`).then((res) => res.data);
  }
}
