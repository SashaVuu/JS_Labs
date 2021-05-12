import axios from 'axios';

// Передаем параметры по умолчанию при создании инстанса
const api = axios.create({
    baseURL: 'http://localhost:3000/'
});

export default {

    getAllTasks() {
        return api.get('tasks/');  
    },

    getFilteredTask(type){
        console.log(`tasks/sort?sort_type=${type}`);
        return api.get(`tasks/sort?sort_type=${type}`);
    },

    getTaskById(id){
        console.log(`edit/${id}`);
        return api.get(`edit/${id}`);
    },

    addTask(task) {
        console.log(task);
        return api.post('/add',task);  
    },

    deleteTask(id) {
        console.log(`sending for delete:${id}`);
        return api.delete(`tasks/${id}`);  
    },

    updateTask(task) {
        console.log(task);
        return api.put(`tasks/${task.idtask}`,task);  
    },

    getAllFiles(id){
        console.log(`getting files id :${id}`);
        return api.get(`files/${id}`); 
    },

    insertNewFile(file,id) {
        
        var formData = new FormData();
        formData.append("text_file",file);

        return api.post(`files/${id}`,formData,{headers:{'Content-Type':'multipart/form-data'}});

        // return axios({
        //     method:"post",
        //     url:`http://localhost:3000/edit/upload/${id}`,
        //     data:formData,
        //     headers:{'Content-Type':'multipart/form-data'}
        // })
    }

}