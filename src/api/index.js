/* 
包含n个接口请求函数的模块, 每个函数的返回值都是promise对象
根据接口文档编写
*/
import jsonp from 'jsonp'
import { message } from 'antd'
import ajax from './ajax'

// const BASE = 'http://localhost:5000'
const BASE = ''

/* 
1. 登陆
*/
/* export function reqLogin({username, password}) {
  return ajax.post('/login', {username, password})
} */
export const reqLogin = ({ username, password }) => ajax.post(BASE + '/login', { username, password })


/* 
2. 添加用户
*/
export const reqAddUser = (user) => ajax({
  url: BASE + '/manage/user/add',
  method: 'POST',
  data: user
})


/* 
获取天气信息(jsonp) 
*/
export const reqWeather = (city) => {
  const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
  
  return new Promise((resolve, reject) => { // 执行器函数
    jsonp(url, {}, (err, data) => {
      if (!err && data.error === 0) {
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // reject(err)
        message.error('获取天气信息失败!')
      }
    })
  })
  
}

/* 
获取所有商品分类的列表
*/
export const reqCategorys = () => ajax.get('/manage/category/list')
// export const reqCategorys = () => ajax({
//   method: 'GET',
//   url: '/manage/category/list'
// })
// export const reqCategorys = () => ajax('/manage/category/list')


/* 
添加分类
*/
export const reqAddCategory = (categoryName) => ajax.post('/manage/category/add', {categoryName})

/* 
修改分类
*/
export const reqUpdateCategory = (categoryId, categoryName) => ajax.post('/manage/category/update', {
  categoryId, categoryName
})

/* 
根据分类ID获取分类
*/
export const reqCategory = (categoryId) => ajax('/manage/category/info', {
  params: {
    categoryId
  }
})


/* 
获取商品分页列表
*/
export const reqProducts = (pageNum, pageSize) => ajax.get('/manage/product/list', {
  params: { // 值是对象, 对象中包含的是query参数数据
    pageNum,
    pageSize
  }
})
// ajax({ url: '/manage/product/list', params: {pageNum, pageSize}})


/* 
根据Name / desc搜索产品分页列表
*/
export const reqSearchProducts = ({
    pageNum,
    pageSize,
    searchType, // 搜索的方式 'productDesc' 或者 'productName'
    searchName
  }) => ajax({
  method: 'GET',
  url: '/manage/product/search',
  params: {
    pageNum,
    pageSize,
    [searchType]: searchName
  }
})

/* 
对商品进行上架 / 下架处理
*/
export const reqUpdateProductStatus = (productId, status) => ajax({
  method: 'POST',
  url: '/manage/product/updateStatus',
  data: {
    productId,
    status
  }
})

/* 
根据商品ID获取商品
*/
export const reqProduct = (productId) => ajax.get('/manage/product/info', {
  params: {
    productId
  }
})