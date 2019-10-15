import React, { Component } from 'react'
import serchIndx from './searchInput.module.css'
import store from '../../store'
import { withRouter } from 'react-router-dom'

 class SearchInput extends Component {

    state= {
        cityName: ""
    }

    constructor(){
        super();
        this.state.cityName = store.getState().mapReducer.cityName
        // 开启一个订阅
        store.subscribe(()=>{
            this.state.cityName = store.getState().mapReducer.cityName
        })
    }

    render() {
        return (
            <div className={serchIndx.search_bar}>
                {/* 输入框 */}
                <div className={serchIndx.search_warp}>
                    <div className={serchIndx.localtion} onClick={()=>(this.props.history.push('/CityList'))}> 
                    <span>{this.state.cityName === "" ? "获取中" : this.state.cityName}</span>
                    <i className="iconfont icon-arrow"></i>
                    </div>
                    <div className={serchIndx.search_input}>
                        <i className="iconfont icon-seach"></i>
                        <span>请输入小区或地址</span>
                    </div>
                </div>
                {/* 字体图标 */}    
                <i className="iconfont icon-map"></i>
            </div>
        )
    }
}

export default withRouter(SearchInput)
