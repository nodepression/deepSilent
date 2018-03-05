
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

