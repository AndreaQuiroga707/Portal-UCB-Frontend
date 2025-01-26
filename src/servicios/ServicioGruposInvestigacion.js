import axios from "axios";

export class ServicioGruposInvestigacion {
    baseUrl = "http://localhost:8080/api/v1/";
    
    getAll() {
        return axios.get(this.baseUrl + "grupos/investigaciones/").then(res => res.data);
    }

    postGrupoInvestigacion(institutoInvestigacion) {
        return axios.post(this.baseUrl + "grupos/investigaciones/", institutoInvestigacion).then(res => res.data);
    }

    putGrupoInvestigacion(institutoInvestigacion) {
        return axios.put(this.baseUrl + "grupos/investigaciones/", institutoInvestigacion).then(res => res.data);
    }

    deleteGrupoInvestigacion(id) {
        return axios.delete(this.baseUrl + `grupos/investigaciones/${id}`).then(res => res.data);
    }
}
