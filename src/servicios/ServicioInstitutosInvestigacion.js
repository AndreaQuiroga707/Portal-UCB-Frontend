import axios from "axios";

export class ServicioInstitutosInvestigacion {
    baseUrl = "https://portal-ucb-backend.onrender.com/api/v1/";

    getToken() {
        return localStorage.getItem("token"); // Ajusta esto según cómo almacenas el token
    }

    getAll() {
        return axios.get(this.baseUrl + "institutos/investigacion/", {
            headers: { Authorization: `Bearer ${this.getToken()}` }
        }).then(res => res.data);
    }

    postInstitutoInvestigacion(institutoInvestigacion) {
        return axios.post(this.baseUrl + "institutos/investigacion/", institutoInvestigacion, {
            headers: { Authorization: `Bearer ${this.getToken()}` }
        }).then(res => res.data);
    }

    putInstitutoInvestigacion(institutoInvestigacion) {
        return axios.put(this.baseUrl + "institutos/investigacion/", institutoInvestigacion, {
            headers: { Authorization: `Bearer ${this.getToken()}` }
        }).then(res => res.data);
    }

    deleteInstitutoInvestigacion(id) {
        return axios.delete(this.baseUrl + `institutos/investigacion/${id}`, {
            headers: { Authorization: `Bearer ${this.getToken()}` }
        }).then(res => res.data);
    }
}


/*import axios from "axios";

export class ServicioInstitutosInvestigacion {
    baseUrl = "https://portal-ucb-backend.onrender.com/api/v1/";
    
    getAll() {
        return axios.get(this.baseUrl + "institutos/investigacion/").then(res => res.data);
    }

    postInstitutoInvestigacion(institutoInvestigacion) {
        return axios.post(this.baseUrl + "institutos/investigacion/", institutoInvestigacion).then(res => res.data);
    }
    
    putInstitutoInvestigacion(institutoInvestigacion) {
        return axios.put(this.baseUrl + "institutos/investigacion/", institutoInvestigacion).then(res => res.data);
    }

    deleteInstitutoInvestigacion(id) {
        return axios.delete(this.baseUrl + `institutos/investigacion/${id}`).then(res => res.data);
    }
}
*/