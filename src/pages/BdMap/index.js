import React, { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import { BMap } from '../../utils/map'
import indexCss from './index.module.scss'
import store from '../../store'
import axios from '../../utils/request'


/**
 * 1 根据定位写好
 * 2 根据城市获取城市下的房源信息
 *   1.根据接口 获取城市名的id号
*    2.根据id去获取城市下的房源数据 返回数组   

   3.获取经纬度

 * 
 */


export default class index extends Component {
    // 定义一个全局的地图对象
    Map = null;
    // 获取当前城市
    constructor(){
        super()
        let cityName = store.getState().mapReducer.cityName
       
        // 判断如果没有城市名，就开启订阅，然后执行渲染地图
        if(!cityName) {
            store.subscribe(()=>{
               cityName = store.getState().mapReducer.cityName
               this.renderCityMap(cityName)
           })
        }
    }

    // 如果有城市名，就在组件加载完毕后，执行渲染地图，不然会报错。
    componentDidMount(){
        let cityName = store.getState().mapReducer.cityName
        if(cityName){
            this.renderCityMap(cityName) 
        }
    }


    // 渲染地图
    renderCityMap=async (cityName)=>{
        // console.log(cityName)
        var map = new BMap.Map("allmap");    // 创建Map实例
        // 全局Map赋值
        this.Map = map
	    map.centerAndZoom(cityName,11);  // 初始化地图,设置中心点坐标和地图级别
        //    添加比例尺
        map.addControl(new BMap.ScaleControl());
        // 添加平移缩放控件
        map.addControl(new BMap.NavigationControl());
        
        // 调用渲染城市label的方法
        this.renderCityLabel({label: cityName,value: null})
    };


    // 2.抽离公共部分代码，渲染城市label
    renderCityLabel=async (cityObj)=>{
       // 判读是否有ID
       let id = cityObj.value;
       // 如果没有ID，就发送接口拿ID
       if(!id) {
           // 1.获取城市ID
           id =(await axios.get("/area/info?name="+cityObj.label)).data.body.value 

       }   
       // 2.获取房源信息
       let list = (await axios.get("/area/map?id="+id)).data.body
       // 3.获取经纬度
       list.forEach((v,i) => {
           const point =  new BMap.Point(v.coord.longitude,v.coord.latitude);
           const htmlStr = `<div class=${indexCss.label_item}><span>${v.label }</span><span>${ v.count}套</span></div>`
           const label = this.getLable(point,htmlStr);
           // 1.给每个label绑定点击事件
           label.addEventListener("click",()=>{
               // console.log(v)  {label: "番禺", value: "AREA|e8e35a38-9f6e-9df8"}
              this.renderCityLabel(v);
             setTimeout(()=>{
                this.Map.clearOverlays()
             },0)
           })

           // 4.把文本描绘到地图上 
           this.Map.addOverlay(label);
           

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
        return label
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
