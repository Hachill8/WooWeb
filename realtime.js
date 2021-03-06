// $(document).ready(function ()是在頁面完成HTML的載入並建立了DOM樹之後就開始執行，但不代表頁面的所
// 有資料已經全部載入完成，一些大的圖片會在建立DOM樹之後很長一段時間才載入完成
$(document).ready(function () {
    //執行東華過去24小時的溫度折線圖
    Set_cwblast24hours_ndhu_temperature();

    //執行上方即時的溫度、相對溼度、天氣
    Set_FourTitleText();
});

function Set_cwblast24hours_ndhu_temperature() {
    $.ajax({
        type: "GET",
        // contentType: "application/json; charset=utf-8",
        url: 'http://134.208.97.191:8080/JSON_WebService.asmx/NDHU_24hr',
        dataType: 'json'

    })
        .fail(function (jqXHR, textStatus, errorThrown) { alert('ERROR'); })
        .done(function (results) {

            console.log(results);
            // 将获取到的json数据分别存放到两个数组中
            var last24hours = [], Temperature_data = [];
            // var Relative_humidity_data = [];

            for (let i = results.length - 1; i >= 0; i--) {
                //X軸時間簡化，如果每個都顯示日期太冗長
                //今日的00:00和X軸第一個的值要顯示日期
                //23 - (24 - parseInt(results[23].DataTime.substring(6, 8) =>找出今日00:00的位置)
                if (i == 23 || i == parseInt(results[23].DataTime.substring(6, 8) - 1)) {
                    last24hours.push(results[i].DataTime);
                }
                else {
                    last24hours.push(results[i].DataTime.substring(6, 11));
                }
            }
            console.log(last24hours);
            for (let i = results.length - 1; i >= 0; i--) {

                Temperature_data.push(results[i].Temperature);

            }
            console.log(Temperature_data);

            //相對溼度
            // for (i = results.length - 1; i >= 0; i--) {

            //     Relative_humidity_data.push(results[i].Humidity);

            // }
            // console.log(Relative_humidity_data);


            // 获取所选canvas元素的内容
            var ctx = document.getElementById('ndhu_cwb_temperature_linechart');

            //设置图表高度
            ctx.height = 400;


            // 设置图表的数据
            var tempData = {
                labels: last24hours,
                datasets: [{

                    label: "東華溫度",
                    yAxisID: "y-Temp",
                    fill: false,
                    data: Temperature_data,
                    borderColor: yellowColor,
                    borderWidth: 2,



                }]
            };

            //根據滑鼠停留圖表的位置，會顯示Y軸的線，線會對應X軸上的值
            Chart.defaults.LineWithLine = Chart.defaults.line;
            Chart.controllers.LineWithLine = Chart.controllers.line.extend({
                draw: function (ease) {
                    Chart.controllers.line.prototype.draw.call(this, ease);
                    if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                        var activePoint = this.chart.tooltip._active[0],
                            ctx = this.chart.ctx,
                            x = activePoint.tooltipPosition().x,
                            // topY = this.chart.legend.bottom,
                            bottomY = this.chart.chartArea.bottom;
                        ctx.save();
                        ctx.beginPath();
                        ctx.moveTo(x, Math.ceil(Math.max.apply(this, Temperature_data)));
                        ctx.lineTo(x, bottomY);
                        ctx.lineWidth = 2;
                        ctx.strokeStyle = yellowColor;
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            });


            // 初始化一个新的图
            var ndhu_cwb_linechart = new Chart(ctx, {
                type: 'LineWithLine',
                data: tempData,
                options: {
                    title: {
                        display: true,
                        text: "累積日照 : " + results[0].Light + "小時",
                    },

                    //標籤設定
                    legend: {
                        position: "bottom"
                    },

                    tooltips: {
                        mode: 'index',
                        intersect: false,


                    },
                    hover: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: redColor,
                    },

                    maintainAspectRatio: false,
                    bezierCurve: true,
                    scales: {
                        xAxes: [{
                            offset: true,
                            gridLines: {
                                display: false,
                            },
                        }],
                        yAxes: [{
                            id: "y-Temp",
                            position: 'left',

                            scaleLabel: {
                                display: true,
                                labelString: '溫度(℃)'
                            },

                            ticks: {

                                min: Math.floor(Math.min.apply(this, Temperature_data)) - 1, //最小值
                                max: Math.ceil(Math.max.apply(this, Temperature_data)) + 1, //最大值
                                stepSize: 1
                            },
                        }]
                    }
                }
            });
            //每隔10分鐘重新執行一次(1秒=1000)
            setTimeout(Set_cwblast24hours_ndhu_temperature, 600000);
        });
}




var temp_text = document.getElementById('tempid');
var hum_text = document.getElementById('humid');
var weather_text = document.getElementById('weatherid');
var updatetime1 = document.getElementById('time1');
var updatetime2 = document.getElementById('time2');
var updatetime3 = document.getElementById('time3');
var weather_img = document.getElementById('img');


function Set_FourTitleText() {
    $.ajax({
        type: 'GET',
        // contentType: "application/json; charset=utf-8",
        // async: true,
        url: 'http://134.208.97.191:8080/JSON_WebService.asmx/Hualien_24hr',

        dataType: 'json'

    }).done(function (results) {

        console.log(results);
        // 将获取到的json数据分别存放到两个数组中
        var Timedata = [], Tdata = [], Hdata = [], Wdata = [], Wimgdata = [];

        Timedata.push(results[0].DataTime);
        Tdata.push(results[0].Temperature);
        Hdata.push(results[0].Humidity);
        Wdata.push(results[0].Weather);
        Wimgdata.push(results[0].Weather_img);

        temp_text.textContent = Tdata[0] + "℃";
        hum_text.textContent = Hdata[0] + "%";
        if (Wimgdata[0] == "day/01.svg") {
            weather_img.src = 'assets/day01.svg';
        }
        else if (Wimgdata[0] == "day/04.svg") {
            weather_img.src = 'assets/day04.svg';
        }
        else if (Wimgdata[0] == "night/04.svg") {
            weather_img.src = 'assets/night04.svg';
        }
        else if (Wimgdata[0] == "night/04.svg") {
            weather_img.src = 'assets/night04.svg';
        }
        else {
            weather_img.src = 'assets/dayandnight07.svg';
        }
        updatetime1.textContent = "更新時間 : " + Timedata[0];
        updatetime2.textContent = "更新時間 : " + Timedata[0];
        updatetime3.textContent = "更新時間 : " + Timedata[0];


        setTimeout(Set_FourTitleText, 600000);
    });
}


