

/**只是简单的监听变量变化，
 * 没有递归，
 * 所以不能监听下层变化*/

var chartObj={};

function watchObj(obj,key,fun){
    fun = typeof fun ==='function'? fun:new Function();
    Object.defineProperty(obj,key,{
       
            configurable: true,//告诉值可修改
            get:function(){
                return eval(key)
            },
            set:function(value){
                key=value;
                console.log('set ',value)
                 fun();
            }
        
    })
}

watchObj(chartObj,'chart0',showChart0);

function showChart0() {
    var colChart = echarts.init(document.getElementById('chart0'));
    var option = {
        title: {
            text: '行为分析'
        },
        tooltip: {},
        legend: {
            data:['可能性']
        },
        xAxis: {
            data: ["扒窃","抢劫","斗殴","救援","正常"]
        },
        yAxis: {},
        series: [{
            name: 'possiblity',
            type: 'bar',
            data: chartObj.chart0
        }]
    }
    colChart.setOption(option);
    // console.log(chartObj.chart0)
  }
//   chartObj.chart0=[0, 0, 0, 0, 0];
  chartObj.chart0=[0.74, 0.08, 0.05, 0.02, 0.11];
