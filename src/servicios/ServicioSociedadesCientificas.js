import axios from "axios";

export class ServicioSociedadesCientificas {
    baseUrl = "http://localhost:8080/api/v1/";
    
    getAll() {
        return axios.get(this.baseUrl + "sociedades/cientificas/").then(res => res.data);
    }

    postSociedadCientifica(sociedadCientifica) {
        return axios.post(this.baseUrl + "sociedades/cientificas/", sociedadCientifica).then(res => res.data);
    }

    putSociedadCientifica(sociedadCientifica) {
        return axios.put(this.baseUrl + "sociedades/cientificas/", sociedadCientifica).then(res => res.data);
    }
}
