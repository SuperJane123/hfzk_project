/**1.发送请求，获取数据
 *   1.当前城市定位--redux
*    2.获取所有的城市，异步请求
     3.获取热门城市，异步请求
 * 2.获取当前城市的时间的分析
     1.先打开首页
       1在首页打开期间，已经是获取到了真实的城市信息了，把它设置到redux
     2.过了很久，才打开城市选择页面
       1.触发constructor 》 对store开启了订阅 订阅的回调 不会触发
      （订阅中的回调函数，只有在store发生了改变的时候才会触发）
       2 直接获取redux中的城市即可
     3.总结
       1.如果先打开的是首页，在城市选择页面中直接获取当前城市
       2.如果先打开城市选择需要开启订阅
   3.获取数据
     1.发送异步请求，获取所有城市
     2.发送异步请求，获取热门城市
    *  
 */



import React, { Component,Fragment } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import axios from '../../utils/request'
import store from '../../store'
import indexCss from './index.module.scss'
// 1.引入可视区渲染组件
import { List ,AutoSizer} from 'react-virtualized';

// 快速生成有数字的索引
// const list = Object.keys(String(Array(100)))



export default class CityList extends Component {
    state= {
        // totalList:[
        //     {当前城市：北京},
        //     {热门城市:[北京，广州，深圳]}，
        //     {A:[北京，北海]}
        // ]
        totalList: [],

        // 获取右侧栏字母导航
        letterList: [],

        // 当前索引位置
        currentIndex: 0
    };

    constructor(){
        super()
        // 创建 长列表的 ref
        this.MainList = React.createRef()
        let cityName = store.getState().mapReducer.cityName
        if(cityName) {
            // redux中已经存在当前城市了
            this.getAllCity(cityName)
        }else {
            // 如果没有值，就获取当前城市
            store.subscribe(()=>{
                let cityName = store.getState().mapReducer.cityName
                this.getAllCity(cityName)
            })
            
        }
    };
    // 获取和设置城市
   async getAllCity(cityName){
    // 0.定义一个英文数组
    let letterList = ["#","热"]
    
    //    1.获取城市列表数据
       let allCitys = (await axios.get("/area/city?level=1")).data.body
    //    console.log(allCitys)
    //    2.获取热门城市
        let hotCity = (await axios.get("/area/hot")).data.body
        // console.log(hotCity)
        // 3.开始构造函数
        let finalCity = [
            { "当前城市": [cityName] },
            { "热门城市": hotCity.map(v=>v.label)} 
        ]
        // console.log(finalCity)
        // 4.所有城市排序
        allCitys = allCitys.sort((a, b) => a.short.localeCompare(b.short))
        // 5.结合所有数据
        allCitys.forEach((v,i)=>{
            // 1.获取首英文大写字母
            let firstLetter = v.short[0].toUpperCase()
            // 2.判断总数据里面是有包含同样的字母
            const index = finalCity.findIndex(vv=>vv[firstLetter])
            // 3.如果不存在，就push一个对象 { "A": [北京，北海，宝鸡] }
            if(index === -1) {
                // [firstLetter] 动态属性名
                finalCity.push({ [firstLetter]: [v.label] } )
                letterList.push(firstLetter)
            }else {
                // 存在，在相对应的属性中添加其他城市
                finalCity[index][firstLetter].push(v.label)
            }
        })
       
        this.setState({totalList :finalCity ,letterList})

    };

    // 渲染每一行城市
    rowRenderer =({
        key,         // Unique key within array of rows
        index,       // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible,   // This row is visible within the List (eg it is not an overscanned row)
        style        // Style object to be applied to row (to position it)
      }) =>{

        //   获取数组的循环项  { 热门城市:["北京", "广州", "上海", "深圳"] }
        let item = this.state.totalList[index]
        let title = Object.keys(item)[0]
        return (
          <div
            key={key}
            style={style}
            className={indexCss.city_group}
          >
              <div className={indexCss.city_title}>{ title }</div>
              <div className={indexCss.city_main}>
                {item[title].map(v=> <div className={indexCss.city_name} key={ v }>{v}</div>)}
              </div>

          </div>
        )
    };

    // 动态设置每一行高度
    rowHeight=({index})=>{
        // index就是totalList的索引
        // 每一行的高度 = 标题的高度 + 标题内容的长度 * 高度
        let item = this.state.totalList[index]
        // let property = Object.keys(item)[0]
        // item[property] = ['北京'，'北海'，'宝鸡']
        // return (item[property].length ) * 40 + 30
        return (Object.values(item)[0].length) * 40 + 30

    };

    // 长列表每一列数据渲染完毕后会触发的函数
    rowsRendered=( {startIndex} )=>{
        if(startIndex !== this.state.currentIndex){
            this.setState({currentIndex : startIndex})
        }
        // console.log(startIndex) 放回索引值
    };

    // 点击英文字母获取索引
    hadleGetIndex=(index)=>{
        this.setState({currentIndex : index})
       this.MainList.current.scrollToRow(index)
        // this.MainList.current.scrollToRow(index);


    }


    render() {
        const { totalList,letterList,currentIndex } = this.state
        return (
            <Fragment>
                <div className={indexCss.city_list}>
                    <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                    ]}
                    >城市列表</NavBar>
                
                    <div className={indexCss.city_content}>
                        {/* 右侧字母结构开始 */}
                        <div className={indexCss.letter_list}>
                            {letterList.map((v,i)=> 
                            <div key={v} 
                            className={ currentIndex === i ? indexCss.active + " " + indexCss.letter_item : indexCss.letter_item} 
                            onClick={this.hadleGetIndex.bind(this,i)}>{v}
                            </div>)}

                        </div>
                        {/* 右侧字母结构结束 */}

                    <AutoSizer>
                        {({ height, width }) => (     
                    <List
                        ref={this.MainList}
                        width={width}
                        height={height}
                        rowCount={totalList.length}
                        rowHeight={this.rowHeight}
                        rowRenderer={this.rowRenderer}
                        onRowsRendered={this.rowsRendered}
                        // scrollToIndex={currentIndex}
                        scrollToAlignment="start"
                        />
                        )}
                    </AutoSizer>
                    </div>
                </div>
            </Fragment>
        )
    }
}
