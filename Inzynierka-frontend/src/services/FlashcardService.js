import axios from 'axios';

class FlashcardService {

    static BACKEND = import.meta.env.VITE_ENV_BACKEND_URL;
    static BASE_URL = `${this.BACKEND}/api`;

    static async getFlashcards() {
        const response = await axios.get(`${this.BASE_URL}/flashcards`,
            { withCredentials: true });
        return response.data;
    }

    static async getFlashcardByCategoryId(id) {
        const response = await axios.get(`${this.BASE_URL}/flashcards/${id}`,
            {withCredentials: true });
        return response.data;
    }

}

export default FlashcardService;