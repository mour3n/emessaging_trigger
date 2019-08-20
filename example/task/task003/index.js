
const fs = require('fs-extra');
const moment = require('moment');
const path = require('path');
const co = require('co');
const mysql = require('promise-mysql');
const request = require('request');
const http = require('http');
var url = require('url');
var util = require('util');

// 清除上个月所有任务的历史记录
co(function* () {
    var config = {"backExecRecordNum":1,"mysqlConfig":{"host":"localhost","port":"3306","user":"root","password":"eqinfo","database":"db_schedule"},"entryFile":"index.js","command":"node","taskRootPath":"E:\\phpStudy_2016\\WWW\\emessaging_trigger\\example/task","notifyList":"613557187@qq.com"};
    yield customtask003Task(config);
});
function* customtask003Task({taskRootPath, backExecRecordNum, mysqlConfig}) {
    try {
        const mysqlClient = yield mysql.createConnection(mysqlConfig);
        const taskList = yield mysqlClient.query("select taskName,customUrl,taskStatus from t_task_list where taskName='task003'" );
        const data = taskList[0];
        if (!data['customUrl']||data['taskStatus']!==0) { 
            return false; 
        }
        var requestData="1";
        request({
            url: data['customUrl'],
            method: "POST",
            json: true,
            headers: {
                "content-type": "application/json",
            },
            body: requestData
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body) // 请求成功的处理逻辑
            }
        });

        mysqlClient.end();
    } catch (e) {
        console.error(e);
        process.exit(101);
    }
}