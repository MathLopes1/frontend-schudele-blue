import { http } from "./api";

export default {
    listAll: () => {
        return http.get('schedule')
    },

    save: (person) => {
        return http.post('schedule', person)
    },
    update: (person) => {
        return http.put(`person/${person.id}`, person)
    },
    delete: (person) => {
        return http.delete(`person/${person.id}`)
    }
}

    
