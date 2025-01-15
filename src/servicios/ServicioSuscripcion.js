import axios from "axios";

export class ServicioSuscripcion {
    baseUrl = "http://localhost:8080/api/v1/";

    postSuscripcion(correo) {
        const suscripcion = { correo: correo }; // Asegúrate de que coincida con la estructura de SuscripcionesDTO
        return axios.post(this.baseUrl + "suscripciones/", suscripcion, {
            headers: {
                'Content-Type': 'application/json', // Configura el tipo de contenido
            },
        }).then(res => res.data);
    }

    deleteSuscripcionByCorreo(correo) {
        return axios.delete(`${this.baseUrl}suscripciones/${correo}`, {
            headers: {
                'Content-Type': 'application/json', // Configura el tipo de contenido
            },
        }).then(res => res.data);
    }
}
