import axios from "axios";

export class ServicioInstitutosInvestigacion {
    baseUrl = "http://localhost:8080/api/v1/";
    
    getAll() {
        return axios.get(this.baseUrl + "institutos/investigacion/").then(res => res.data);
    }

    postInstitutoInvestigacion(institutoInvestigacion) {
        return axios.post(this.baseUrl + "institutos/investigacion/", institutoInvestigacion).then(res => res.data);
    }
    
    putInstitutoInvestigacion(institutoInvestigacion) {
        return axios.put(this.baseUrl + "institutos/investigacion/", institutoInvestigacion).then(res => res.data);
    }
}
