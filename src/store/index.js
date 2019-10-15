// 1.创建一个仓库
import { createStore } from 'redux'
// 2.引入管理者
import reducer from './reducer/index'

// 3.导出仓库
export default createStore(reducer,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)