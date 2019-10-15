    
/***
 * 获取当前地图位置
 */
export const getLocalCity=()=>{
    return new Promise((resolve,reject)=>{
        var myCity = new window.BMap.LocalCity();
        myCity.get(myFun);
        function myFun(result){
            resolve(result)
            console.log(result)
        }
    })
}
