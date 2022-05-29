import request from '@/api/request'

export const getData = () =>{
    return request({
        url:'/home/getData',
        method:'get'
    })
}

export const getUserList = (params)=>{
    return request({
        url:'/user/getUserList',
        method:'get',
        params
    })
}

export const addUser = (data)=>{
    return request({
        url:'/user/createUser',
        method:'post',
        data
    })
}

export const editUser = (data)=>{
    return request({
        url:'/user/editUser',
        method:'post',
        data
    })
}

export const deleteUser = (params)=>{
    return request({
        url:'/user/deleteUser',
        method:'get',
        params
    })
}

//mall页面的发送请求
export const getRooms = (params)=>{
    return request({
        url:'/mall/getRooms',
        method:'get',
        params
    })
}