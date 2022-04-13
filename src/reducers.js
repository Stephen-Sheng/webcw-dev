export function userReducer(state, action){
    switch(action.type){
        case 'LOGIN':
        case 'REGISTER':
            return {username: action.username, gender: action.gender}
        case 'LOGOUT':
            return ''
        default:
            throw new Error()
    }
}