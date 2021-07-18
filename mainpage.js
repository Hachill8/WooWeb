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
	var expires = "expires=" + d.toUTCString()
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

function getCookie(cname) {
	var name = cname + "="
	var ca = document.cookie.split(';')
	for (var i = 0; i < ca.length; i++) {
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

function showContent() {

}

window.onclick = function (event) {
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


function processFormData() {
	const form = document.forms['form1'];    // 取得 name 屬性為 form 的表單
	const sensor = form.elements.feature.value;  // 取得 elements 集合中 name 屬性為 name 的值
	const date1 = form.elements.date1.value;// 取得 elements 集合中 name 屬性為 email 的值
	const date2 = form.elements.date2.value;
	var d1 = document.getElementById("#Date1").value;
	//$('.datepicker').on('change', function() { $('p').text($('#Date1').val()) })
	console.log($('.datepicker').on('change', function () { $('#Date1').val() }) + "88");
}
var date = new Date(), date2 = new Date();
var ddd = "we are";
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
$(document).ready(function () {
	$("#history").on("click", function (event) {
		var modal = bootbox.dialog({
			message: bootBoxContent(),
			title: "歷史紀錄搜尋",
			buttons: [
				{
					label: "取消",
					className: "btn btn-default pull-left",
					callback: function () {
						console.log("just do something on close");
					}
				},
				{
					label: "搜尋",
					className: "btn btn-primary pull-left",
					callback: function (result) {
						var storyId = $(".searcha").attr('href');
						console.log(date.toString());
						console.log(storyId);
						if (result) {
							window.location.href = storyId + "?sensor=" + "&" + date + "&" + date2;
						}
					}
				}
			],
			show: false,
			onEscape: function () { modal.modal("hide"); }
		});
		modal.modal("show");
	});


})
function doAction(dd) {
	var val = $('#Date1').datepicker('getDate');
	date.toLocaleDateString();
	$('.datepicker').datepicker().change(function () { $('#Date1').val(); });
	console.log(date + "89");
}
function doAction2(dd) {
	var val = $('#Date1').datepicker('getDate');
	ddd = dd.toUTCString();
	$('.datepicker').datepicker().change(function () { $('#Date1').val(); });
	console.log(dd + "88");
}