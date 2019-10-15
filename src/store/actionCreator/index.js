import { MAP_CITY_NAME_SET } from '../actionTypes'
/**
 * 
 * @param {String} cityName  城市名成
 */

export const mapCityName = (cityName)=>{
    return { type: MAP_CITY_NAME_SET,value: cityName }
}