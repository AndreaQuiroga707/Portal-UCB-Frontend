import axios from "axios";

export class ServicioSociedadesCientificas {
    baseUrl = "https://portal-ucb-backend.onrender.com/api/v1/";
    
    getAll() {
        return axios.get(this.baseUrl + "sociedades/cientificas/").then(res => res.data);
    }

    postSociedadCientifica(sociedadCientifica) {
        return axios.post(this.baseUrl + "sociedades/cientificas/", sociedadCientifica).then(res => res.data);
    }

    putSociedadCientifica(sociedadCientifica) {
        return axios.put(this.baseUrl + "sociedades/cientificas/", sociedadCientifica).then(res => res.data);
    }

    deleteSociedadCientifica(id) {
        return axios.delete(this.baseUrl + `sociedades/cientificas/${id}`).then(res => res.data);
    }
}
