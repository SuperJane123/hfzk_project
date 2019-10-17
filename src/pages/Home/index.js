import React, { Component,Fragment } from 'react'
import { Carousel } from 'antd-mobile';
// 引入axios
import axios from '../../utils/request'

// 引入不同环境的接口地址
import { baseUrl } from '../../utils/url'

// 把本地的图片当成js文件一样来引入即可
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

// 引入搜索框组件
import SearchInput from '../../components/searchInput'

// 引入局部样式
import HKindex from './HKindx.module.scss'
export default class Home extends Component {
    state = {
      // 轮播图
        swiperList: [],
        // 解决轮播图高度bug
        imgHeight: 176,

        // 首页导航
        indexNav: [
					{id:1,title: "整组",imgSrc: nav1},
					{id:2,title: "合租",imgSrc: nav2},
					{id:3,title: "地图找房",imgSrc: nav3},
					{id:4,title: "去出租",imgSrc: nav4},
				],
				// 租房小组
        rentGroup:[],

        // 最新咨询
				newsList: []
	}

// 在组件创建完后发送请求
    componentDidMount(){
			// 请求轮播图数据
        axios.get('/home/swiper')
        .then(res=>{
            this.setState({
							swiperList: res.data.body
            })
				});
				// 请求租房小组
				axios.get('/home/groups')
				.then(res=>{
					this.setState({
						rentGroup: res.data.body
				})
        });
        
        // 请求最新咨询
        axios.get("/home/news")
        .then(res=>{
          console.log(res)
          this.setState({newsList: res.data.body})
        })
    }

    render() {
        return (
        <Fragment>

          {/* 该组件没有数据时不要渲染，要等到轮播有数据后才渲染 */}
          <div className={HKindex.Carousel}>
             
             {/* 轮播图开始 */}
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
          </div>
          <div className={HKindex.searh_input}>
          <SearchInput />
          </div>
   

           {/* 首页导航结构开始*/}
					 <div className={HKindex.hk_nav}>

						 {this.state.indexNav.map(v=><div className={HKindex.nav_item} key={v.id}>
							 <div className={HKindex.nav_img_waper}>
							 		<img src={v.imgSrc}/>
							 </div>
							 <span>{v.title}</span>
						 </div>)}
					 </div>
           {/* 首页导航结构结束 */}

							{/* 租房小组结构开始 */}
							<div className={HKindex.rent_group}>
                      <div className={HKindex.rent_title}>
                        <span>租房小组</span>
                        <span>更多</span>
                      </div>
                      <div className={HKindex.rent_content}>
                        {this.state.rentGroup.map(v=><div className={HKindex.rent_item} key={v.id}>
                          <div className={HKindex.item.info}>
                            <div className={HKindex.info_title}>{v.title}</div>
                            <div className={HKindex.info_desc}>{v.desc}</div>
                          </div>
                          <div className={HKindex.item.img_wrap}>
                            <img src={baseUrl + v.imgSrc}/>
                          </div>
                        </div>)}
                      </div>							
							</div>
              {/* 租房小组结构结束 */}
              

              {/* 最新咨询结构开始 */}
                 <div className={HKindex.hk_news}>
                    <div className={HKindex.new_title}>
                      <h3>最新咨询</h3>
                    </div>
                    <div className={HKindex.news_content}>
                      {this.state.newsList.map((v,i)=><div className={HKindex.news_item} key={v.id}>
                        <div className={HKindex.news_img_wrap}>
                          <img src={baseUrl + v.imgSrc}/>
                        </div>
                        <div className={HKindex.news_info}>
                          <div className={HKindex.news_title}>
                            <h3>{v.title}</h3>
                          </div>
                          <div className={HKindex.news_other}>
                            <span>{v.from}</span>
                            <span>{v.date}</span>
                          </div>
                        </div>
                      </div>)}
                        
                    </div>
                 </div>

              {/* 最新咨询结构结束*/}

        </Fragment>       
        );
      }
      
}
