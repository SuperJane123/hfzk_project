// 1.倒入一个负责合并管理员的函数
import { combineReducers } from 'redux'
// 2.倒入被合并的管理员
import mapReducer from './mapReducer'

// 3.合并导出
export default combineReducers({mapReducer})