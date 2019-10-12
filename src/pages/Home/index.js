import React, { Component,Fragment } from 'react'
import { Carousel } from 'antd-mobile';
// 引入axios
import axios from '../../utils/request'

// 引入不同环境的接口地址
import { baseUrl } from '../../utils/url'

// 把本地的图片当成js文件一样来引入即可
// import imgdemo from '../../assets/images'
export default class Home extends Component {
    state = {
      // 轮播图
        swiperList: [],
        // 解决轮播图高度bug
        imgHeight: 176,
    }

// 在组件创建完后发送请求
    componentDidMount(){
        axios.get('/home/swiper')
        .then(res=>{
            console.log(res)
            this.setState({
                swiperList: res.data.body
            })
        })
    }

    render() {
        return (
        <Fragment>
          {/* 轮播图开始 */}
          {/* 该组件没有数据时不要渲染，要等到轮播有数据后才渲染 */}
         {this.state.swiperList.length && <Carousel
              autoplay
              infinite
            >
              {this.state.swiperList.map(val => (
                <a
                  key={val.id}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%' }}
                >
                  <img
                    src={baseUrl + val.imgSrc}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top', height: this.state.imgHeight}}
                    onLoad={() => {
                      // fire window resize event to change height
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>} 
            {/* 轮播图结束  */}
        </Fragment>       
        );
      }
      
}
