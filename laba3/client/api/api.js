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
        return api.get(`edit/${id}`,{withCredentials: true}).catch(error => {alert(error.response.data.message)});
    },

    addTask(task) {
        console.log(task);
        return api.post('/add',task,{withCredentials: true}).catch(error => {alert(error.response.data.message)});
    },

    deleteTask(id) {
        console.log(`sending for delete:${id}`);
        return api.delete(`tasks/${id}`,{withCredentials: true}).catch(error => {alert(error.response.data.message)});
    },

    updateTask(task) {
        console.log(task);
        return api.put(`tasks/${task.idtask}`,task,{withCredentials: true}).catch(error => {alert(error.response.data.message)});
    },

    getAllFiles(id){
        console.log(`getting files id :${id}`);
        return api.get(`files/${id}`,{withCredentials: true}).catch(error => {alert(error.response.data.message)});
    },

    userLogin(user){
        console.log(user);
        return api.post('/user/login', user,{withCredentials: true}).then(({data})=>{
            alert(data.message);
        }).catch(error => {alert(error.response.data.message)});
    },

    userRegister(user){
        return api.post('/user/register',user, {withCredentials: true}).then(({data})=>{
            alert(data.message);
        }).catch(error => {alert(error.response.data.message)});
    },

    userLogout(){
        return api.post('/user/logout',"", {withCredentials: true}).then(({data})=>{
            alert(data.message);
        }).catch(error => {alert(error.response.data.message)});
    },

    insertNewFile(file,id) {
        
        var formData = new FormData();
        formData.append("text_file",file);

        return api.post(`files/${id}`,formData,{headers:{'Content-Type':'multipart/form-data'},withCredentials: true})
        .catch(error => {alert(error.response.data.message)});
    }

}