import { http } from "./api";

export default {
    listAll: () => {
        return http.get('schedule')
    }
}

    
