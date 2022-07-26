import { http } from "./api";

export default {
    listAll: () => {
        return http.get('schedule')
    },

    save: (person) => {
        return http.post('schedule', person)
    },
    
    delete: (dataForDelete) => {
        console.log(dataForDelete)
        return http.delete(`person/${dataForDelete.id}`)
    }
}

    
