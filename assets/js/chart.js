
function initchart(){
    console.log('init')
    var colChart = echarts.init(document.getElementById('col-chart'));
    var option = {
        title: {
            text: '唇语翻译结果'
        },
        tooltip: {},
        legend: {
            data:['可能性']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    }
    
    colChart.setOption(option);


}



/*******下面是page2
 * 4种图表
 */


 function init4Chart(data1,data2,data3,data4){
    
/***
 * **
 * 视频
 * 绑定
 * 
 */
    $("#upvideo").click(function () {
        $("#videoFile0").click();
    })
    $("#videoFile0").change(function (file) {
        if(file.target.files[0]!=undefined){
            $("body").append(file.target.files[0]);

            var fileName = file.target.files[0].name;
            var attr = fileName.substr(fileName.indexOf('.')+1).toLowerCase();
            console.log(attr);
            if(attr !='mp4'&&attr !='avi'&&attr !='rmvb'&&attr !='3gp'&&attr !='mkv'&&attr !='wmv'&&attr !='vob'&&attr !='flv'&&attr !='swf'&&attr !='mov'&&attr !='mpg'){
                alert('格式不支持')
            }else{
                document.getElementById('dropList').innerHTML+=`<li><a href="javascript:bindeAnalyse()">${fileName}</a></li>`
            }
        }
    });
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
function bindeAnalyse(){
    document.getElementById('analyse').addEventListener('click',function(){
        var data1=[820, 932, 901, 934, 1290, 1330, 1320];
    var data2=[5, 20, 36, 10, 10, 20];
    var data3=[
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'},
        {value:1548, name:'搜索引擎'}
    ];
    var data4=[['2/12','111','111'],['2/12','111','111'],['2/12','111','111']];
    init4Chart(data1,data2,data3,data4)
    })
}


 function initLinechart(data1){
    var lineChart = echarts.init(document.getElementById('line-chart'));
    var option ={
        title: {
            text: '人流统计变化图  '
        },
        xAxis: {
            text:'时间节点',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
            text: '异常事件统计'
        },
        tooltip: {},
        legend: {
            data:['次数']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
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
            text: '异常事件占比',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
            {
                name: '访问来源',
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
        <td> ${item[2]}</td>
            </tr>`
    })
    $('tbody').html(model);
  }


