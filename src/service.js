import axios from 'axios';

const baseUrl = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';
const auth = '?developer=Dmitry';

export const getData = async (sortField, sortDir, page) => {    
    const sort = `&sort_field=${sortField}`;
    const direction = `&sort_direction=${sortDir}`;
    const pageNum = `&page=${page}`;    
    const data = await axios.get(`${baseUrl}${auth}${sort}${direction}${pageNum}`)
        .then(res => res.data.message);           
    return data;    
}

export const postData = async (username, email, text) => {    
    const form = new FormData();
        form.append("username", username);
        form.append("email", email);
        form.append("text", text);

    const options = {
        method: 'POST',
        url: `${baseUrl}create${auth}`,
        data: form,
        headers: {            
            'Content-Type': 'multipart/form-data'
        },
        json: true
      };      
      
      return axios(options)
        .then(res => res.data.message);
}

export const authenticate = async (username, password)  => {
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
        const options = {
        method: 'POST',
        url: `${baseUrl}login${auth}`,
        data: form,
        headers: {            
            'Content-Type': 'multipart/form-data'
        },
        json: true
      };    

      return axios(options)
        .then(res => res.data.message);
}

export const edit = async (token, id, text, status)  => {
    const form = new FormData();
    form.append("text", text);
    form.append("status", status);
    form.append("token", token);
        const options = {
        method: 'POST',
        url: `${baseUrl}edit/${id}${auth}`,
        data: form,
        headers: {            
            'Content-Type': 'multipart/form-data'
        },
        json: true
      };    

      return axios(options)
        .then(res => res.data);
}