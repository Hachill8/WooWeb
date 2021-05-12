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

window.onclick = function(event) {
	openCloseDropdown(event)
}

function closeAllDropdown() {
	var dropdowns = document.getElementsByClassName('dropdown-expand')
	for (var i = 0; i < dropdowns.length; i++) {
		dropdowns[i].classList.remove('dropdown-expand')
	}
}

function openCloseDropdown(event) {
	if (!event.target.matches('.dropdown-toggle')) {
		// 
		// Close dropdown when click out of dropdown menu
		// 
		closeAllDropdown()
	} else {
		var toggle = event.target.dataset.toggle
		var content = document.getElementById(toggle)
		if (content.classList.contains('dropdown-expand')) {
			closeAllDropdown()
		} else {
			closeAllDropdown()
			content.classList.add('dropdown-expand')
		}
	}
}

var ctx = document.getElementById('lineChart')
ctx.height = 300
ctx.width = 500
var data = {
	labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
	datasets: [{
		fill: false,
		label: 'sensor1',
		borderColor: successColor,
		data: [20, 15, 10, 10, 23, 22, 20, 26, 25, 23, 24, 20],
		borderWidth: 2,
		// lineTension: 0,
	}, {
		fill: false,
		label: 'senser2',
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

var ctx = document.getElementById('lineChart2')
ctx.height = 300
ctx.width = 500
var data = {
	labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
	datasets: [{
		fill: false,
		label: 'sensor1溫度',
		borderColor: successColor,
		data: [20, 15, 10, 10, 23, 22, 20, 26, 25, 23, 24, 20],
		borderWidth: 2,
		// lineTension: 0,
	}, {
		fill: false,
		label: 'senser1濕度',
		borderColor: dangerColor,
		data: [26, 24, 12, 28, 29, 26, 28, 23, 10, 22, 27, 12],
		borderWidth: 2,
		// lineTension: 0,
	}]
}

var lineChart2 = new Chart(ctx, {
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
            yAxes: [
				{
				position: 'left',
                scaleLabel: {
                    display: true,
                    labelString: '溫度(℃)'
                },
                ticks: {
                    min: -50,  //最小值
                    max: 50  //最大值
                  },
            },
			{
				position: 'right',
                scaleLabel: {
                    display: true,
                    labelString: '濕度(%)'
                },
                ticks: {
                    min: 0,  //最小值
                    max: 100  //最大值
                  },
            }
		]
        }
	}
})

var ctx = document.getElementById('lineChart3')
ctx.height = 300
ctx.width = 500
var data = {
	labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
	datasets: [{
		fill: false,
		label: 'sensor2溫度',
		borderColor: yellowColor,
		data: [20, 15, 10, 10, 23, 22, 20, 26, 25, 23, 24, 20],
		borderWidth: 2,
		// lineTension: 0,
	}, {
		fill: false,
		label: 'senser2濕度',
		borderColor: redColor,
		data: [26, 24, 12, 28, 29, 26, 28, 23, 10, 22, 27, 12],
		borderWidth: 2,
		// lineTension: 0,
	}]
}

var lineChart3 = new Chart(ctx, {
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
            yAxes: [
				{
				position: 'left',
                scaleLabel: {
                    display: true,
                    labelString: '溫度(℃)'
                },
                ticks: {
                    min: -50,  //最小值
                    max: 50  //最大值
                  },
            },
			{
				position: 'right',
                scaleLabel: {
                    display: true,
                    labelString: '濕度(%)'
                },
                ticks: {
                    min: 0,  //最小值
                    max: 100  //最大值
                  },
            }
		]
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
		label: 'sensor1',
		borderColor: successColor,
		data: [20, 15, 10, 50, 63, 82, 70, 66, 85, 23, 54, 20],
		borderWidth: 2,
		// lineTension: 0,
	}, {
		fill: false,
		label: 'senser2',
		borderColor: dangerColor,
		data: [26, 24, 12, 28, 29, 26, 28, 23, 10, 22, 27, 12],
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

var ctx2 = document.getElementById('barChart')
ctx2.height = 300
ctx2.width = 500
var data = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'
],
	datasets: [{
		label: 'sensor1',
        borderColor: soblueColor,
        backgroundColor: blueColor,
		data: [220, 315, 410, 610, 823, 422, 320, 226, 325, 313, 424, 620, 720, 815, 1010, 910, 823, 622, 420, 426, 625, 513, 724, 1024, 920],
		borderWidth: 1,
		// lineTension: 0,
	}]
}

var barChart = new Chart(ctx2, {
	type: 'bar',
	data: data,
	options: {
		responsive: true,
		legend: {
            position: 'top',
        },
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
                    labelString: '濕度(%RH)'
                },
                ticks: {
                    min: 0,  //最小值
                    max: 1024,  //最大值

                    stepSize: 200,
                  },
            }]
        }
	}
})
function processFormData() {
	const form = document.forms['form1'];    // 取得 name 屬性為 form 的表單
	const sensor = form.elements.feature.value;  // 取得 elements 集合中 name 屬性為 name 的值
	const date1 = form.elements.date1.value;// 取得 elements 集合中 name 屬性為 email 的值
	const date2 = form.elements.date2.value;
	var d1 = document.getElementById("#Date1").value;
	//$('.datepicker').on('change', function() { $('p').text($('#Date1').val()) })
	console.log($('.datepicker').on('change', function() { $('#Date1').val() })+"88");
}
var date = new Date(),date2 = new Date();
var ddd="we are";
function bootBoxContent() {
	var content = $(".form-content").clone();
	
	$(content).show();
	content.find(".datepicker1").datepicker({
		format: 'yyyy/mm/dd',
		autoclose: true,
		clearBtn: true,
		todayBtn: true,
		disableTouchKeyboard: true,
		multidate: false,
		todayHighlight: true,
		weekStart: 1,
		keyboardNavigation: false,
		endDate: new Date(),
	}).on('changeDate', function (selected) {
        var minDate = new Date(selected.date.valueOf());
        $('.datepicker2').datepicker('setStartDate', minDate);
		$('.datepicker2').datepicker('setEndDate', new Date());
		//$('#Date2').datepicker('setDate', minDate);
		date = $(this).val();
    });
	content.find(".datepicker2").datepicker({
	  format: 'yyyy/mm/dd',
	  autoclose: true,
	  clearBtn: true,
	  todayBtn: true,
	  disableTouchKeyboard: true,
	  multidate: false,
	  todayHighlight: true,
	  weekStart: 1,
	  keyboardNavigation: false,
	  endDate: new Date(),
  }).on('changeDate', function (selected) {
		//var maxDate = new Date(selected.date.valueOf());
		//$('#Date2').datepicker('setDate', maxDate);
		date2 = $(this).val();
	});
	return content;
}
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
					console.log(date.toString());
					console.log(storyId);
					if (result) {
						window.location.href = storyId+"?sensor="+"&"+date+"&"+date2;
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
function doAction(dd)
{
    var val=$('#Date1').datepicker('getDate'); 
	date.toLocaleDateString();
	$('.datepicker').datepicker().change( function() { $('#Date1').val(); });
    console.log(date+"89");
}
function doAction2(dd)
{
    var val=$('#Date1').datepicker('getDate'); 
	ddd=dd.toUTCString();
	$('.datepicker').datepicker().change( function() { $('#Date1').val(); });
    console.log(dd+"88");
}