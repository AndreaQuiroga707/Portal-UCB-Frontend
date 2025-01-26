import axios from "axios";

export class ServicioCentrosInvestigacion {
    baseUrl = "http://localhost:8080/api/v1/";
    
    getAll() {
        return axios.get(this.baseUrl + "centros/investigaciones/").then(res => res.data);
    }

    postCentroInvestigacion(institutoInvestigacion) {
        return axios.post(this.baseUrl + "centros/investigaciones/", institutoInvestigacion).then(res => res.data);
    }

    putCentroInvestigacion(institutoInvestigacion) {
        return axios.put(this.baseUrl + "centros/investigaciones/", institutoInvestigacion).then(res => res.data);
    }

    deleteCentroInvestigacion(id) {
        return axios.delete(this.baseUrl + `centros/investigaciones/${id}`).then(res => res.data);
    }
}
