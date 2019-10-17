    
/***
 * 获取当前地图位置
 */
export const getLocalCity=()=>{
    return new Promise((resolve,reject)=>{
        var myCity = new window.BMap.LocalCity();
        myCity.get(myFun);
        function myFun(result){
            resolve(result)
        }
    })
}

export const BMap = window.BMap
export const BMAP_NORMAL_MAP = window.BMAP_NORMAL_MAP
export const BMAP_HYBRID_MAP = window.BMAP_HYBRID_MAP

