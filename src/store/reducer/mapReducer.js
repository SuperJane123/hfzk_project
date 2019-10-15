import { MAP_CITY_NAME_SET } from '../actionTypes'
const defaultState= {
    cityName: ""
}

export default (state=defaultState,actions)=>{
    let newState = JSON.parse(JSON.stringify(state))
    switch (actions.type) {
        case MAP_CITY_NAME_SET:
            newState.cityName = actions.value
            break;
    
        default:
            break;
    }
    return newState

}