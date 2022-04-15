export function userReducer(state, action){
    switch(action.type){
        case 'LOGIN':
        case 'REGISTER':
            return {username: action.username, userType: action.userType, storeList:action.storeList}
        case 'LOGOUT':
            return ''
        default:
            throw new Error()
    }
}