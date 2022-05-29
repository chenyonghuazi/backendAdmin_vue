import Mock from 'mockjs';
import homeApi from '@/mock/MockHomeData'
import userApi from '@/mock/MockUserData'
import mallApi from '@/mock/MockMallData'

Mock.mock('/api/home/getData',homeApi.getStatisticalData())

//因为getUserList后面会更上params，所以不能写字符串，不像nodejs express可以写占位符
Mock.mock(/api\/user\/getUserList/,'get',userApi.getUserList)
Mock.mock(/api\/user\/createUser/,'post',userApi.createUser)
Mock.mock(/api\/user\/editUser/,'post',userApi.updateUser)
Mock.mock(/api\/user\/deleteUser/,'get',userApi.deleteUser)

//用于mall页面的
Mock.mock(/api\/mall\/getRooms/,'get',mallApi.getRooms)