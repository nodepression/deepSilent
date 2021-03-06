

// var ws = new WebSocket('ws://localhost:8181');

// ws.addEventListener("message", function (e) {
//     var json = JSON.parse(e.data);
//     console.log("接收到   ", json);
//     if(json.chart==0){
//         chartObj.chart0={data:json.data,time:json.time};
//     }



// })
// ws.addEventListener("error", function (e) {
//     ws.send(JSON.stringify({"event": 1}));//断开连接发送请求
//     console.log("ws error   ", (e));
// })
// ws.addEventListener("close", function (e) {
//      ws.send(JSON.stringify({"event": 1}));
//     console.log("ws close   ", e);

// });
// window.onunload=function () {
//     ws.send(JSON.stringify({"event": 1}));
//     console.log("web close   ",);
// }



/**只是简单的监听变量变化，
 * 没有递归，
 * 所以不能监听下层变化*/

var chartObj={};

var chart0={start:0,end:100};

function watchObj(obj,key,fun){
    fun = typeof fun ==='function'? fun:new Function();
    Object.defineProperty(obj,key,{
       
            configurable: true,//告诉值可修改
            get:function(){
                return eval(key)
            },
            set:function(value){
                key=value;
                // console.log('set ',value)
                 fun();
            }
        
    })
}

watchObj(chartObj,'chart0',showChart0);

function showChart0() {
    try {
        var lineChart = echarts.init(document.getElementById('chart0'));
    } catch (error) {
        console.log('no chart');
        return;
    }
    
    var option ={
        title: {
            text: '人群流量变化  '
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            text:'时间节点',
            data: chartObj.chart0.date
        },
        legend: {
            data:['人数','置信度','aaa']
        },
        tooltip: {
            trigger: 'axis',
            // axisPointer: {
            //     type: 'cross'
            // }
        },
        dataZoom:[
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                left: 'center',
                start: chart0.start,
                end: chart0.end
            },
        ],
        yAxis: [{
            name: '数值',
            type: 'value'
        },{
            name: '人数',
            type: 'value',
        }],
        series: [{
            name:'人数',
            type:'line',
            yAxisIndex: 1,
            data: chartObj.chart0.data0,
            // smooth: true
        },{
            name:'置信度',
            type:'line',
            yAxisIndex: 0,
            data: chartObj.chart0.data1,
            // smooth: true
        },{
            name:'aaa',
            type:'line',
            yAxisIndex: 0,
            data: chartObj.chart0.data2,
            // smooth: true
        }]
    };
    lineChart.setOption(option);
    lineChart.on('datazoom',function(param){
        // console.log(param)
        chart0.start=param.start;
        chart0.end=param.end;

    })
    // console.log(chartObj.chart0)
  }
//   chartObj.chart0=[0, 0, 0, 0, 0];
  
