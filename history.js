const primaryColor = '#4834d4'
const warningColor = '#f0932b'
const successColor = '#6ab04c'
const dangerColor = '#eb4d4b'
const soblueColor = '#007FFF'
const blueColor = '#00BFFF'
const yellowColor = '#f0932b'
const redColor = '#eb4d4b'

const themeCookieName = 'theme'
const themeDark = 'dark'
const themeLight = 'light'

const body = document.getElementsByTagName('body')[0]

function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = "expires="+d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
    var name = cname + "="
    var ca = document.cookie.split(';')
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ""
}

loadTheme()

function loadTheme() {
	var theme = getCookie(themeCookieName)
	body.classList.add(theme === "" ? themeLight : theme)
}

function switchTheme() {
	if (body.classList.contains(themeLight)) {
		body.classList.remove(themeLight)
		body.classList.add(themeDark)
		setCookie(themeCookieName, themeDark)
	} else {
		body.classList.remove(themeDark)
		body.classList.add(themeLight)
		setCookie(themeCookieName, themeLight)
	}
}

function collapseSidebar() {
	body.classList.toggle('sidebar-expand')
}

function showContent(){
	
}
function processFormData() {
	const form = document.forms['form1'];    // 取得 name 屬性為 form 的表單
	const sensor = form.elements.feature.value;  // 取得 elements 集合中 name 屬性為 name 的值
	const date1 = form.elements.date1.value;// 取得 elements 集合中 name 屬性為 email 的值
	const date2 = form.elements.date2.value;
}
//$('#datepicker2').datepicker('update', new Date(result.localStorage.getItem("mySharedData")));


window.onclick = function(event) {
	openCloseDropdown(event)
}


var ctx = document.getElementById('lineChart')
ctx.height = 300
ctx.width = 500
var data = {
	labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
	datasets: [{
		fill: false,
		label: '室外',
		borderColor: successColor,
		data: [20, 15, 10, 10, 23, 22, 20, 26, 25, 23, 24, 20],
		borderWidth: 2,
		// lineTension: 0,
	}, {
		fill: false,
		label: '棚架內',
		borderColor: dangerColor,
		data: [26, 24, 12, 28, 29, 26, 28, 23, 10, 22, 27, 12],
		borderWidth: 2,
		// lineTension: 0,
	}, {
		fill: false,
		label: '氣象站',
		borderColor: warningColor,
		data: [28, 24, 12, 26, 28, 26, 28, 25, 10, 23, 26, 15],
		borderWidth: 2,
		// lineTension: 0,
	}]
}

var lineChart = new Chart(ctx, {
	type: 'line',
	data: data,
	options: {
		maintainAspectRatio: false,
        bezierCurve: true,
        scales: {
            // xAxes: [{
            //     scaleLabel: {
            //         display: true,
            //         labelString: 'Month'
            //     }
            // }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '溫度(℃)'
                },
                ticks: {
                    min: -20,  //最小值
                    max: 50  //最大值
                  },
            }]
        }
	}
})
var ctx = document.getElementById('lineChart4')
ctx.height = 300
ctx.width = 500
var data = {
	labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
	datasets: [{
		fill: false,
		label: '室外',
		borderColor: successColor,
		data: [20, 15, 10, 50, 63, 82, 70, 66, 85, 23, 54, 20],
		borderWidth: 2,
		// lineTension: 0,
	}, {
		fill: false,
		label: '棚架內',
		borderColor: dangerColor,
		data: [26, 24, 12, 28, 29, 26, 28, 23, 10, 22, 27, 12],
		borderWidth: 2,
		// lineTension: 0,
	}, {
		fill: false,
		label: '氣象站',
		borderColor: warningColor,
		data: [28, 24, 12, 26, 28, 26, 28, 25, 10, 23, 26, 15],
		borderWidth: 2,
		// lineTension: 0,
	}]
}

var lineChart4 = new Chart(ctx, {
	type: 'line',
	data: data,
	options: {
		maintainAspectRatio: false,
        bezierCurve: true,
        scales: {
            // xAxes: [{
            //     scaleLabel: {
            //         display: true,
            //         labelString: 'Month'
            //     }
            // }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: '濕度(%)'
                },
                ticks: {
                    min: 0,  //最小值
                    max: 100  //最大值
                  },
            }]
        }
	}
})

$(document).ready(function() {
	$("#history").on("click", function(event) {
	  	var modal = bootbox.dialog({
		  	message: bootBoxContent(),
		  	title: "歷史紀錄搜尋",
		  	buttons: [
			{
			  	label: "取消",
			  	className: "btn btn-default pull-left",
			  	callback: function() {
					console.log("just do something on close");
			  	}
			},
			{
			  	label: "搜尋",
			  	className: "btn btn-primary pull-left",
			  	callback: function(result) { 
					var storyId = $(".searcha").attr('href');
					console.log(storyId);
					  //console.log($(this).attr('href'));
					//window.location.href = ;
					if (result) {
						window.location.href = storyId;
				 	}
			  	}
			}
		  	],
		  	show: false,
		  	onEscape: function() 
		  	{ modal.modal("hide"); }
	  	});
	  	modal.modal("show");
	});
	
  })
$(document).ready(function() {
	$(".datepicker1").datepicker({
		format: 'yyyy/mm/dd',
		clearBtn: true,
		todayBtn: true,
		disableTouchKeyboard: true,
		multidate: false,
		todayHighlight: true,
		weekStart: 1,
		keyboardNavigation: false,
		endDate: new Date(),
	});
	$(".datepicker2").datepicker({
		format: 'yyyy/mm/dd',
	  	clearBtn: true,
	  	todayBtn: true,
	  	disableTouchKeyboard: true,
	  	multidate: false,
	  	todayHighlight: true,
	  	weekStart: 1,
	  	keyboardNavigation: false,
	  	endDate: new Date(),
  	});
	var url = location.href;
	if(url.indexOf('?')!=-1)
	{
		var arr1 = url.split('?');
		var arr2 = arr1[1].split('&');
		var data = { 起始日期: arr2[1], 結束日期: arr2[2]};
		$.ajax({
			type: 'post',
			url: "http://134.208.97.191:8080/sensor_WebService.asmx/Sensor1_WS_HourAverage",
			//url: "http://134.208.97.191:8080/JSON_WebService.asmx/Sensor1_list_HourAverage",
			//contentType: "application/json;utf-8",
			data: data,
			dataType: "json",
			async: false,
			success: function (result) {
				var labels = [], Tdata=[], Hdata=[];
			  	for(i=0;i<result.length;i++)
				{
					labels.push(result[i].DataTime); 
				}
				console.log(labels);//得到鍵對應的值 
				for(i=0;i<result.length;i++)
				{
					Tdata.push(result[i].Tempartature); 
				}
				console.log(Tdata);//得到鍵對應的值 
				for(i=0;i<result.length;i++)
				{
					Hdata.push(result[i].Humidity); 
				}
				console.log(Hdata);//得到鍵對應的值                                 
			},
			error: function (result) {
				alert(result.status + "///////" + result.statusText);
			}
		});
		
		//$('#datepicker2').datepicker('change', new Date(arr2[2]));
		$("#Date2").datepicker({
			dateFormat: 'yy-mm-dd'
		}).datepicker('setDate',new Date(arr2[2]) );
		$("#Date1").datepicker({
			dateFormat: 'yy-mm-dd'
		}).datepicker('setDate',new Date(arr2[1]) );
	
	}
})