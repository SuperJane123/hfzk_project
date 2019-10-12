import React, { Component } from 'react'
import { HashRouter as Router, Route, Link } from "react-router-dom";
// 1.引入tabbar布局
import HKLayouts from './components/HKLayouts'
// 3.引入组件
import Home from './pages/Home'
import List from './pages/List'
import News from './pages/News'
import My from './pages/My'

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 2.创建路由 */}
        <Router>
          <Route path="/" exact render={(props)=><HKLayouts {...props}><Home /></HKLayouts>}></Route>
          <Route path="/List"  exact render={(props)=><HKLayouts {...props}><List /></HKLayouts>}></Route>
          <Route path="/News" exact render={(props)=><HKLayouts {...props}><News /></HKLayouts>}></Route>
          <Route path="/My"  exact render={(props)=><HKLayouts {...props}><My /></HKLayouts>}></Route>
        </Router>
      </div>
    )
  }
}
