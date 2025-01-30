import axios from 'axios';

class ServicioImagenes {
  baseUrl = 'https://portal-ucb-backend.onrender.com/api/v1/';

  uploadImagen = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${this.baseUrl}file/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.data; // Devuelve el enlace de la imagen
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      throw error;
    }
  };
}

export default ServicioImagenes;
