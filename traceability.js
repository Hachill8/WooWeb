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

var date = new Date(),date2 = new Date();
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
        var minDate = new Date(selected.date.valueOf());/*讓使用者只能選取 開始日期之後 和 不能超過今天 的日期 */
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
var veget, scaffold;
function vegetfunction (sel) {
	veget = sel.options[sel.selectedIndex].value;
	console.log(veget);
}
function scaffoldfunction (sel) {
	scaffold = sel.options[sel.selectedIndex].value;
	console.log(scaffold);
}
$(document).ready(function() {
	$("#historyt").on("click", function(event) {	
	  	var modal = bootbox.dialog({
			closeButton: false,
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
					var storyId = $(".searchb").attr('href');
					console.log(date.toString());
					console.log(storyId);
					var sensorselected=[], environmentselected=[];
					$("[name=feature]:checkbox:checked").each(function(){/*獲取使用者勾選的感測器 */
						sensorselected.push($(this).val());
					});
					$("[name=environment]:checkbox:checked").each(function(){/*獲取使用者勾選的裝置 */
						environmentselected.push($(this).val());
					});
					if (result) {
						window.location.href = storyId+"?sensor="+"&"+sensorselected+"&"+date+"&"+date2+"&"+environmentselected+"&"+veget+"&"+scaffold;
						/*file:///C:/Users/Maggie/WooWeb/history.html?sensor=&temperature,Humidity&2020/11/15&2020/11/16&1,2,3 */
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