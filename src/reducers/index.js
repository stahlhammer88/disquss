const initialState = {
    page: 1,
    totalCount: 0
}

export const Reducer = (state={...initialState}, action) => {    
    const {type, payload} = action;
    switch (type) {               
        case 'LOADING':            
            return {...state, loading: true};
        case 'GET': 
            return {
                ...state, 
                tasks: payload.tasks, 
                totalCount: payload.totalCount, 
                page: payload.page,
                sortDir: payload.sortDir,
                sortField: payload.sortField,
                loading: false, 
                error: false, 
                errorMessage: ''
            };        
        case 'FAILED': 
            return {
                ...state, 
                error: payload.error, 
                errorMessage: payload.errorMessage, 
                loading: false
            };
        case 'POST':         
            return {
                ...state, 
                tasks: [...state.tasks, payload.addedTask], 
                loading: false
            };
        case 'LOG_IN':         
            return {
                ...state, 
                token: payload.token,
                loading: false
            };
        case 'EDIT':
            const newTasks = [...state.tasks];
            newTasks.forEach(t => {
                if (t.id === payload.id) {
                    t.status = t.status === 0 ? 10 : 0
                }
            });                    
            return {
                ...state, 
                tasks: [...newTasks], 
                loading: false
            };       
        default:
            return state;
    }
};