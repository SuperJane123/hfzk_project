import React, { Component } from 'react'
import { HashRouter as Router, Route } from "react-router-dom";

// 1.引入自己封装过的tabbar布局
import HKLayouts from './components/HKLayouts'
// 3.引入页面组件
import Home from './pages/Home'
import List from './pages/List'
import News from './pages/News'
import My from './pages/My'
import CityList from './pages/CityList'
import BdMap from './pages/BdMap'
// 引入store
import store from './store'
// 引入action
import { mapCityName } from './store/actionCreator'
// 引入百度地图自己的文件
import { getLocalCity } from './utils/map'
export default class App extends Component {
  // 请求地图数据,主要，在react中使用原声的js全局变量。必须要加上window
  componentDidMount(){
    getLocalCity()
    .then(res=>{
      store.dispatch(mapCityName(res.name  === "全国" ? "上海" : res.name))
    })

  }

  render() {
    return (
      <div>
        {/* 2.创建路由 */}
        {/* <Router>
          <Route path="/" exact render={(props)=><HKLayouts {...props}><Home /></HKLayouts>}></Route>
          <Route path="/List"  exact render={(props)=><HKLayouts {...props}><List /></HKLayouts>}></Route>
          <Route path="/News" exact render={(props)=><HKLayouts {...props}><News /></HKLayouts>}></Route>
          <Route path="/My"  exact render={(props)=><HKLayouts {...props}><My /></HKLayouts>}></Route>
        </Router> */}

{/* 在HKLayouts中使用withRouter可以不用传props，都可以接收props参数 */}
      <Router>
          <Route path="/" exact render={()=><HKLayouts ><Home /></HKLayouts>}></Route>
          <Route path="/List"  exact render={()=><HKLayouts ><List /></HKLayouts>}></Route>
          <Route path="/News" exact render={()=><HKLayouts ><News /></HKLayouts>}></Route>
          <Route path="/My"  exact render={()=><HKLayouts ><My /></HKLayouts>}></Route>
          <Route path="/CityList"  exact component={CityList}></Route>
          <Route path="/BdMap"  exact component={BdMap}></Route>
        </Router>
      </div>
    )
  }
}
