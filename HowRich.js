var curPrice = 0;
var histPrice = 0;

// $('[data-toggle="datepicker"]').datepicker({
// 	format: 'yyyy-mm-dd'
// });

//$('#date').datepicker({
//	maxDate: new Date(),
//	minDate: new Date(2010,6,18),
//    startDate: new Date(2011, 11, 1),
//    autoClose: true
//})

var myDatePicker = $('#date').datepicker({
	maxDate: new Date(),
	minDate: new Date(2010,6,18),
    startDate: new Date(2011, 11, 1),
    autoClose: true
}).data('datepicker');

myDatePicker.selectDate(new Date(2011, 11, 1));

//get the price for todays date
$.getJSON('https://api.coindesk.com/v1/bpi/currentprice.json', function(data) {
	// console.dir(data)
	// document.querySelector("#date-select").max = data.time.updatedISO.slice(0,10);
	curPrice = data.bpi.USD.rate_float;
	// console.log(curPrice)
});

var initiate = document.getElementById("regret-button");

Date.prototype.toString = function() {
	var month = this.getMonth() + 1;
	if (month < 10)
		month = "0" + month;
	var day = this.getDate();
	if (day < 10)
		day = "0" + day
    return this.getFullYear() + "-" + month + "-" + day
}

function setCurPrice(data) {
	curPrice = data.bpi.USD.rate_float;
}

function withCommas(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

initiate.addEventListener("click", function(){
	var buyDate = $('#date').data().datepicker.selectedDates[0]
	var date = buyDate.toString();
	
	// get the price for the selected date
	$.getJSON('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + date + '&end=' + date, function(data) {
		// histPrice = data.responseJSON.bpi[date];
		// console.dir(data)
		histPrice = data.bpi[date];
		// console.log('Huh?')
		calculatePrice()
	});
    
    $('#would-have').css('visibility', 'visible');
	
})

function calculatePrice(){
	var rateIncrease = curPrice/histPrice;
	var amount = parseInt(document.querySelector('.amount-input').value,10);
	document.getElementById("calc-amount").textContent = withCommas((amount*rateIncrease).toFixed(2));
}
