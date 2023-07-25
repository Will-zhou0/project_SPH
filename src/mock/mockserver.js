import Mock from 'mockjs'
// 引入json文件 
// 图片、json数据格式 在 webpack中 会默认对外暴露
import banner from './banner.json'
import floor from './floor.json'

// mock数据 （参数请求地址 请求数据）
Mock.mock("/mock/banner", { code: 200, data: banner }); // 模拟首页大的轮播图
Mock.mock("/mock/floor", { code: 200, data: floor });  // 模拟楼层的轮播图