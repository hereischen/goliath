## Goliath接口使用文档

### 库存相关接口（前端使用）
#### 1. 查询品牌/品类/商品接口
接口地址：
`GET http://127.0.0.1:8000/inventory/brands `
`GET http://127.0.0.1:8000/inventory/categories `
`GET http://127.0.0.1:8000/inventory/merchandise `

可选参数
三个接口都可用?id=1，来查询某个品牌/品类/商品信息
默认20个项目分页，可用?page_size=100来修改

返回参数,为`json`格式:
```json
{  
"count":3,  
"next":null,  
"previous":null,  
"results":[  
{  
"id":1,  
"brand":{  
"id":1,  
"brand":"戴尔",  
"in_stock":true  
},  
"category":{  
"id":1,  
"category":"笔记本电脑",  
"in_stock":true  
},  
"in_stock":true,  
"code":"dl111",  
"remarks":""  
},  
{  
"id":2,  
"brand":{  
"id":2,  
"brand":"佳能",  
"in_stock":true  
},  
"category":{  
"id":2,  
"category":"打印机",  
"in_stock":true  
},  
"in_stock":true,  
"code":"cn123",  
"remarks":""  
},  
{  
"id":3,  
"brand":{  
"id":1,  
"brand":"戴尔",  
"in_stock":true  
},  
"category":{  
"id":2,  
"category":"打印机",  
"in_stock":true  
},  
"in_stock":true,  
"code":"dl222",  
"remarks":""  
}  
]  
}
```
#### 2. 查询全部库存接口
接口地址：
`GET http://127.0.0.1:8000/inventory/inventories `

返回参数,为`json`格式, 返回根据商品合并后(*即不同商户相同商品累加*)的库存:
```json
{  
"count":3,  
"next":null,  
"previous":null,  
"results":[  
{  
"quantity":51,  
"merchandise":{  
"id":3,  
"brand":{  
"id":1,  
"brand":"戴尔",  
"in_stock":true  
},  
"category":{  
"id":2,  
"category":"打印机",  
"in_stock":true  
},  
"in_stock":true,  
"code":"dl222",  
"remarks":""  
}  
},  
{  
"quantity":104,  
"merchandise":{  
"id":2,  
"brand":{  
"id":2,  
"brand":"佳能",  
"in_stock":true  
},  
"category":{  
"id":2,  
"category":"打印机",  
"in_stock":true  
},  
"in_stock":true,  
"code":"cn123",  
"remarks":""  
}  
},  
{  
"quantity":350,  
"merchandise":{  
"id":1,  
"brand":{  
"id":1,  
"brand":"戴尔",  
"in_stock":true  
},  
"category":{  
"id":1,  
"category":"笔记本电脑",  
"in_stock":true  
},  
"in_stock":true,  
"code":"dl111",  
"remarks":""  
}  
}
]  
}
```
#### 3. 查询某个商户库存接口
接口地址：
`GET http://127.0.0.1:8000/inventory/inventories/merchants`

查询某个商户的库存`http://127.0.0.1:8000/inventory/inventories/merchants?id=a445041c-ee12-42a4-821c-1ca6d0c0bdab`

返回参数,为`json`格式, 返回根据改商户的所有库存:
```json
{  
"count":2,  
"next":null,  
"previous":null,  
"results":[  
{  
"id":1,  
"merchant":{  
"id":"a445041c-ee12-42a4-821c-1ca6d0c0bdab",  
"name":"test1",  
"address":"test1",  
"email":"test1@test.com",  
"mobile":"11111111111",  
"dingding":"test1"  
},  
"quantity":42,  
"merchandise":{  
"id":1,  
"brand":{  
"id":1,  
"brand":"戴尔",  
"in_stock":true  
},  
"category":{  
"id":1,  
"category":"笔记本电脑",  
"in_stock":true  
},  
"in_stock":true,  
"code":"dl111",  
"remarks":""  
},  
"modified_date":"2019-01-02T21:33:51.140102"  
},  
{  
"id":3,  
"merchant":{  
"id":"a445041c-ee12-42a4-821c-1ca6d0c0bdab",  
"name":"test1",  
"address":"test1",  
"email":"test1@test.com",  
"mobile":"11111111111",  
"dingding":"test1"  
},  
"quantity":4,  
"merchandise":{  
"id":2,  
"brand":{  
"id":2,  
"brand":"佳能",  
"in_stock":true  
},  
"category":{  
"id":2,  
"category":"打印机",  
"in_stock":true  
},  
"in_stock":true,  
"code":"cn123",  
"remarks":""  
},  
"modified_date":"2018-12-30T23:27:04.920449"  
}  
]  
}
```
#### 4. 查询某商品库存接口
接口地址：
`GET http://127.0.0.1:8000/inventory/inventories/merchandise`
查询某个商品的库存`http://127.0.0.1:8000/inventory/inventories/merchandise?id=2`

返回参数,为`json`格式, 返回根据改商品的所有库存:
```json
{  
"count":2,  
"next":null,  
"previous":null,  
"results":[  
{  
"id":3,  
"merchant":{  
"id":"a445041c-ee12-42a4-821c-1ca6d0c0bdab",  
"name":"test1",  
"address":"test1",  
"email":"test1@test.com",  
"mobile":"11111111111",  
"dingding":"test1"  
},  
"quantity":4,  
"merchandise":{  
"id":2,  
"brand":{  
"id":2,  
"brand":"佳能",  
"in_stock":true  
},  
"category":{  
"id":2,  
"category":"打印机",  
"in_stock":true  
},  
"in_stock":true,  
"code":"cn123",  
"remarks":""  
},  
"modified_date":"2018-12-30T23:27:04.920449"  
},  
{  
"id":5,  
"merchant":{  
"id":"83719796-8d17-4709-a12c-c7b56b90d7fb",  
"name":"test2",  
"address":"test2",  
"email":"test2@test.com",  
"mobile":"2222222222",  
"dingding":"test2"  
},  
"quantity":100,  
"merchandise":{  
"id":2,  
"brand":{  
"id":2,  
"brand":"佳能",  
"in_stock":true  
},  
"category":{  
"id":2,  
"category":"打印机",  
"in_stock":true  
},  
"in_stock":true,  
"code":"cn123",  
"remarks":""  
},  
"modified_date":"2019-01-01T20:12:32.986333"  
}  
]  
}
```
#### 5. 更新库存接口
接口地址：
`POST http://127.0.0.1:8000/inventory/update/`

创建新库存/向库存中存入, 增：
```json
{  
"current_merchant_id":"a445041c-ee12-42a4-821c-1ca6d0c0bdab",
"merchandise_id":1, 
"quantity":20,
"price":30.22,
"remarks":"test api"
}
// current_merchant_id 必填, string 当前新建/存入的商户的id
// merchandise_id 必填, int 新建/存入的商品的id
// quantity 必填, int 新建/存入的数量
// price  必填， decimal 新建/存入的价格,会覆盖原价格
// remarks 选填, string 备注
```
若成功  `http code：200`返回结果为` {  "result":  "success"  }`
若失败 `http code：200` 返回结果为` {"result": "fail", "details": "xxx"}`
若参数缺失返回 `http code：400 bad request`

从库存中取出, 减：
```json
{  
"current_merchant_id":"a445041c-ee12-42a4-821c-1ca6d0c0bdab",
"merchandise_id":1, 
"quantity":20,
"deposit":false, 
"remarks":"test api",
"withdraw_from":[
{  
"merchant":"83719796-8d17-4709-a12c-c7b56b90d7fb",  
"quantity":1  
},  
{  
"merchant":"b4b33695-983d-4fea-bb51-6822f76f74c2",  
"quantity":2,  
"remarks":"withdraw" 
}  
]  
}
// current_merchant_id 必填, string 当前取出的商户的id
// merchandise_id 必填, int 取出的商品的id
// quantity 必填, int 取出的数量
// deposit 必填, bool false为取出
// remarks 选填, string 备注
// withdraw_from  取出时必填, json格式  包括从其他商户id取出的商品数量int
// 此次取出的商品总数量为 `20+1+2`
```
若成功  `http code：200`返回结果为` {  "result":  "success"  }`
若失败 `http code：200` 返回结果为` {"result": "fail", "details": "xxx"}`
`details` 会缺省
若参数缺失返回 `http code：400 bad request`

