
function initchart(fileName,data0){
    // console.log('init')
    // var data0= [0.02, 0.12, 0.05, 0.8, 0.01];
    if(arguments.length==0){
        data0=[];
    }
    var colChart = echarts.init(document.getElementById('col-chart'));
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
            data: data0
        }]
    }
    
    colChart.setOption(option);


}



/*******下面是page2
 * 辅助功能
 * 4种图表
 */


 function init4Chart(data1,data2,data3,data4){
    
    if(arguments.length==0){
        initLinechart([]);
        initc_chart([]);
        initPinchart([]);
        filltable([]);
    }else{
        initLinechart(data1);
        initc_chart(data2);
        initPinchart(data3);
        filltable(data4);
    }
        
 }



 /****分析按钮绑定 */
function bindeAnalyse(fileName){
    document.getElementById('analyse').addEventListener('click',function(){
    var d =get4data(fileName);
    new Toast().showMsg('请稍等...',2000);
    setTimeout(function(){
        init4Chart(d.data1,d.data2,d.data3,d.data4)
    },2000)

    setTimeout(function(){
        getScreen2();
      },3000);
    
    })
}

function get4data(fileName){

    return{
        data1:[5, 6, 3, 10, 9, 4, 5],
        data2:[5, 0, 1, 2, 3],
        data3:[
            {value:5, name:'扒窃'},
            {value:0, name:'抢劫'},
            {value:1, name:'斗殴'},
            {value:2, name:'救援'},
            {value:3,name:'其他'}
        ],
        data4:[['02:33','其他','83.56%'],['05:12','扒窃','90.52%'],['07:12','扒窃','89.77%'],['20:33','斗殴','58.89%'],['23:12','其他','87.32%'],['29:42','扒窃','78.40%']]
    } 

}


 function initLinechart(data1){
    var lineChart = echarts.init(document.getElementById('line-chart'));
    var option ={
        title: {
            text: '人群流量变化  '
        },
        xAxis: {
            text:'时间节点',
            data: ['00:00', '05:00', '10:00', '15:00', '20:00', '25:00', '30:00']
        },
        tooltip: {},
        yAxis: {
            type: 'value'
        },
        series: [{
            data: data1,
            type: 'line',
            smooth: true
        }]
    };
    lineChart.setOption(option);
}



function initc_chart(data2){
    var cChart = echarts.init(document.getElementById('c-chart'));
    var option = {
        title: {
            text: '事件统计'
        },
        tooltip: {},
        legend: {
            data:['次数']
        },
        xAxis: {
            data: ["扒窃","抢劫","斗殴","救援","其他"]
        },
        yAxis: {},
        series: [{
            name: '次数',
            type: 'bar',
            data: data2
        }]
    }
    
    cChart.setOption(option);
}

function initPinchart(data3){
    var pinChart = echarts.init(document.getElementById('pin-chart'));
    option = {
        title : {
            text: '事件分析',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['扒窃','抢劫','斗殴','救援','其他']
        },
        series : [
            {
                name: '事件',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:data3,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };    
    pinChart.setOption(option);
}



function filltable(data4) {
    var model= ``;
    data4.map((item)=>{
        model+=`<tr>
        <td>${item[0]} </td>
        <td>${item[1]} </td>
        <td>${item[2]}</td>
            </tr>`
    })
    $('tbody').html(model);
  }


