$(document).ready(function () {
    function update() {
        $('#dateTime #dateValue').html(moment().format('MMMM D, YYYY'));
        $('#dateTime #timeValue').html(moment().format('h:mm:ss A'));
    }
    setInterval(update, 1000);
});