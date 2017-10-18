# 用户API
权限说明:
- 1: 普通
- 2: 编辑
- 3: 管理员
- 99: 超级管理员 

#### post /user/login 用户登陆
发送参数：(email 和手机二选一)
- email 邮箱
- phone 手机号码
- password 密码

返回值：
```
{
    "success": true,
    "data": {
        "nickname": "管理员1",
        "headimgurl": "http://cdn.mrsix.top/img/default.png",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNTllNWUwMWQzNDlmMDg0MTFjYjllYmZhIiwicGVybWlzc2lvbiI6MSwiaWF0IjoxNTA4MjM3MzQxLCJleHAiOjE1MDg4NDIxNDF9.BR7EJwYd1XbOgQPBvg62C6qHhDLbn6zBJP1izvqy0yk"
    }
}
```

#### post /user/signup 用户注册
发送参数：(email 和手机二选一)
- email 邮箱
- phone 手机号码
- password 密码
- nickname 用户名(可选)
- openid 微信openid(可选)

返回数据：
```
{
    "msg": "",
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```
#### patch /user/resetPassword 更改用户密码
发送参数：（email或手机号）
- token token值
- password 旧密码
- newpassword 新密码

返回结果：
```
{
    "success": true,
    "msg": "",
    "data": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
}
```

#### patch /user/account/:id 更新用户信息
发送参数：
- token token值
- headimgurl intro sex nickname 普通用户
- 管理员(可更新全部信息)

返回结果：
```
{
    "success": true,
    "data": {
        "_id": "59e5e01d349f08411cb9ebfa",
        "updatedAt": "2017-10-18T06:57:47.555Z",
        "createdAt": "2017-10-17T10:49:01.827Z",
        "phone": "13200000000",
        "wechat": {
            "hidden": true
        },
        "nickname": "管理员",
        "zmz": {
            "favList": []
        },
        "wallet": 0,
        "headimgurl": "http://cdn.mrsix.top/img/default.png"
    }
}
```

#### post /user/account/:id 查看用户信息
发送参数：
- token token值
*ps非管理员或非本帐号之返回基本信息*

返回结果：
```
略
```

#### post /user/account 列出用户(管理员权限)
发送参数：
- token token值
- search 搜索nickname
- page 数据起始页
- limit 每页数据数量
- options 可选项 {sort,offset,select} 排序,偏移,返回参数筛选


返回结果：
```
略
```

#### delete /user/account/:id 查找用户(管理员权限)
发送参数：
- token token值


返回结果：
```
略
```

