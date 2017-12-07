var date = "2017-01-01";
var curPrice = 0;
var histPrice = 0;

$.getJSON('https://api.coindesk.com/v1/bpi/currentprice.json', function(data) {
	console.dir(data)
	curPrice = data.bpi.USD.rate_float;
	// console.log(curPrice)
});

var initiate = document.getElementById("regret-button");


function setCurPrice(data) {
	curPrice = data.bpi.USD.rate_float;
}


initiate.addEventListener("click", function(){
	date = document.getElementById("date-select").value;
	console.log(date)
	// get the price for the selected date
	$.getJSON('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + date + '&end=' + date, function(data) {
		// histPrice = data.responseJSON.bpi[date];
		console.dir(data)
		histPrice = data.bpi[date];
		// console.log('Huh?')
		calculatePrice()
	});
	
})

function calculatePrice(){
	var rateIncrease = curPrice/histPrice;
	var amount = parseInt(document.querySelector('.amount-input').value,10);
	document.getElementById("calc-amount").textContent = (amount*rateIncrease).toFixed(2);
}