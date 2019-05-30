import { getData, postData, edit } from "../service";
import { authenticate } from './../service';

export function getTasks(sortField='id', sortDir='asc', page=1) {        
    return dispatch => {                
        dispatch({type: 'LOADING', loading: true});
        return getData(sortField, sortDir, page).then(res => {
            dispatch({
                type: 'GET', 
                payload: {
                    tasks: res.tasks, 
                    totalCount: res.total_task_count,
                    sortField,
                    sortDir,
                    page
                }, 
                loading: false
            })
        })
        .catch(error => dispatch({type: 'FAILED', payload:{ error: true, errorMessage: `${error}`}}))
    }
}

export function postTask({username, email, text}) {
    return dispatch => {        
        dispatch({type: 'LOADING', loading: true});        
        return postData(username, email, text).then(res => {            
            dispatch({type: 'POST', payload: {addedTask: res}, loading: false})
        })
        .catch(error => dispatch({type: 'FAILED', payload:{ error: true, errorMessage: `${error}`}}))
    }
}

export function editTask({token, id, text, status}) {
    return dispatch => {
        dispatch({type: 'LOADING', loading: true});          
        return edit(token, id, text, status).then(res => {            
            dispatch({type: 'EDIT', payload: res, loading: false})
        })       
        .catch(error => dispatch({type: 'FAILED', payload:{ error: true, errorMessage: `${error}`}}))
    }
}

export function logIn({username, password}) {
    return dispatch => {
        dispatch({type: 'LOADING', loading: true});           
        return authenticate(username, password).then(res => {                        
            dispatch({type: 'LOG_IN', payload: {token: res.token}, loading: false})
        })   
        .catch(error => dispatch({type: 'FAILED', payload:{ error: true, errorMessage: `${error}`}})) 
    }
}