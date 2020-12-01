/*
  封装通用的数据库操作
*/
function operateDb(sql, params) {
  // 返回Promise实例对象
  return new Promise(function (resolve, reject) {
    // 1) 加载 MySQL 模块
    var mysql = require('mysql')
    // 2) 创建 MySQL 连接对象
    var cn = mysql.createConnection({
      // 数据库所在计算机的IP地址或者域名
      host: 'localhost',
      // 数据库的端口
      port: 3306,
      // 数据库名称
      database: 'node-01',
      // 登录数据库的账号名称
      user: 'root',
      // 登录数据库的账号密码
      password: 'root'
    })
    // 3) 连接 MySQL 服务器
    cn.connect()
    // 4) 执行SQL语句           
    // 查询返回的结果是什么？数组
    // 增删改操作的结果是什么？对象（affectedRows）
    cn.query(sql, params, function (err, result) {
      if (err) {
        return reject('数据库操作失败')
      }
      // 数据库的操作是异步的（只有获取到异步结果后，回调函数才会执行）
      resolve(result)
    })
    // 5) 关闭链接  
    cn.end()
  })
}

module.exports = {
  operateDb: operateDb
}