/*
  用户模块
*/
const express = require('express')
const utility = require('utility')
const path = require('path')
const router = express.Router()
const db = require(path.join(__dirname, '../common.js'))

// 获取用户信息
router.get('/userinfo', async (req, res) => {
  // 1、获取用户标识id
  // 需要从token中反解出用户的id
  // 这个req.user属性从何而来？
  let id = req.user.id
  // 2、查询数据库
  let sql = 'select id, username, nickname, email, user_pic from classname where id = ?'
  let ret = await db.operateDb(sql, id)
  // 3、返回结果
  if (ret && ret.length > 0) {
    res.json({
      status: 0,
      message: '查询用户信息成功',
      data: ret[0]
    })
  } else {
    res.json({
      status: 1,
      message: '查询用户信息失败'
    })
  }
})

// 更新密码
router.post('/updatepwd', async (req, res) => {
  // 1、获取参数
  let id = req.user.id
  let params = req.body
  params.oldPwd = utility.md5(params.oldPwd)
  params.newPwd = utility.md5(params.newPwd)
  // 2、操作数据库
  let sql = 'update classname set password = ? where id = ? and password = ?'
  let ret = await db.operateDb(sql, [params.newPwd, id, params.oldPwd])
  // 3、响应状态
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '重置密码成功'
    })
  } else {
    res.json({
      status: 1,
      message: '重置密码失败'
    })
  }
})

// 更新头像
router.post('/update/avatar', async (req, res) => {
  // 1、获取参数
  let id = req.user.id
  let params = req.body
  console.log(params)
  // 2、操作数据库
  let sql = 'update classname set user_pic = ? where id = ?'
  let ret = await db.operateDb(sql, [params.avatar, id])
  // 3、响应状态
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '更新头像成功'
    })
  } else {
    res.json({
      status: 1,
      message: '更新头像失败'
    })
  }
})

// 更新用户信息
router.post('/userinfo', async (req, res) => {
  // 1、获取参数
  let params = req.body
  // 2、操作数据库
  let sql = 'update classname set nickname = ?, email = ? where id = ?'
  let ret = await db.operateDb(sql, [params.nickname, params.email, params.id])
  // 3、响应状态
  if (ret && ret.affectedRows > 0) {
    res.json({
      status: 0,
      message: '更新用户信息成功'
    })
  } else {
    res.json({
      status: 1,
      message: '更新用户信息失败'
    })
  }
})

module.exports = router 
