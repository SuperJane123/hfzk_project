import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { BMap } from '../../utils/map'
import indexCss from './index.module.scss'
import store from '../../store'
import axios from '../../utils/request'
import { nonsense } from 'antd-mobile/lib/picker';

/**
 * 1 根据定位写好
 * 2 根据城市获取城市下的房源信息
 *   1.根据接口 获取城市名的id号
*    2.根据id去获取城市下的房源数据 返回数组   

   3.获取经纬度

 * 
 */


export default class index extends Component {

    // 获取当前城市
    constructor(){
        super()
        let cityName = store.getState().mapReducer.cityName
       
        // 判断如果没有城市名，就开启订阅，然后执行渲染地图
        if(!cityName) {
            store.subscribe(()=>{
               cityName = store.getState().mapReducer.cityName
               this.renderCity(cityName)   
           })
        }
    }

    // 如果有城市名，就在组件加载完毕后，执行渲染地图，不然会报错。
    componentDidMount(){
        let cityName = store.getState().mapReducer.cityName
        if(cityName){
            this.renderCity(cityName) 
        }
    }


    // 渲染地图
    renderCity=async (cityName)=>{
        // console.log(cityName)
        var map = new BMap.Map("allmap");    // 创建Map实例
	    map.centerAndZoom(cityName,11);  // 初始化地图,设置中心点坐标和地图级别
        //    添加比例尺
        map.addControl(new BMap.ScaleControl());
        // 添加平移缩放控件
        map.addControl(new BMap.NavigationControl());
        // 1.获取城市ID
        let id =(await axios.get("/area/info?name="+cityName)).data.body.value 
        // 2.获取房源信息
        let list = (await axios.get("/area/map?id="+id)).data.body
        //    3.获取经纬度
        list.forEach((v,i) => {
            const point =  new BMap.Point(v.coord.longitude,v.coord.latitude);
        const htmlStr = `<div class=${indexCss.label_item}><span>${v.label }</span><span>${ v.count}套</span></div>`
            const label = this.getLable(point,htmlStr);
            // 4.把文本描绘到地图上 
            map.addOverlay(label);

        });
       


        
    }

    // 渲染地图文字标签
    getLable=(point,content)=>{

        var opts = {
            position : point,    // 指定文本标注所在的地理位置
            offset   : new BMap.Size(30, -30)    //设置文本偏移量
        }
        var label = new BMap.Label(content, opts);  // 创建文本标注对象
            label.setStyle({
                 border: 'none',
                 backgroundColor: 'transparent'
           });
        // map.addOverlay(label);  
        return  label
    }


    render() {
        return (
            <div className={indexCss.bdmap}>
                <div className={indexCss.bd_nav}>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.history.push("/")}
                    rightContent={[
                    ]}
                    >地图找房</NavBar>
                </div>
                <div id="allmap" className={indexCss.allmap}></div>
            </div>
        )
    }
}
