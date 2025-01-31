import axios from "axios";

export class ServicioCarreras {
    baseUrl = "https://portal-ucb-backend.onrender.com/api/v1/";

    getCarreraPorId(carreraId) {
        return axios.get(`${this.baseUrl}carreras/${carreraId}`)
            .then(res => {
                console.log("Respuesta de carrera por ID", carreraId, res.data);
                return res.data;
            });
    }

    getAllCarreras() {
        return axios.get(`${this.baseUrl}carreras/`).then(res => res.data);
    }

    getCarrerasPorFacultad(facultadId) {
        return axios.get(`${this.baseUrl}carreras/facultad/${facultadId}`)
            .then(res => {
                console.log("Respuesta de carreras para facultad", facultadId, res.data);
                return res.data;
            });
    }

    postCarreras(carrera) {
        return axios.post(this.baseUrl + "carreras/", carrera).then(res => res.data);
    }

}
