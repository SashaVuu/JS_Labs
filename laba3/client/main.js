import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/'
});

api.get("/edit/files?id=108").then(({data})=>{
    console.log(data);
});