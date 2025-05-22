import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_ENV_BACKEND_URL
const PROXY = `${BACKEND_URL}/pons`

class DictionaryService {

    static async translate(q, direction = 'depl', inLang = null) {
        if (!q?.trim()) throw new Error('Brak zapytania')
        const params = { q, l: direction }
        if(inLang) params.in = inLang

        const { data } = await axios.get(PROXY, { params })
        return data
    }
}

export default DictionaryService