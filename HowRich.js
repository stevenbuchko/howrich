

var date = '2016-02-15'

var histData = $.getJSON('https://api.coindesk.com/v1/bpi/historical/close.json?start=' + date + '&end=' + date, function(data) {
    //data is the JSON string
});

var histPrice = histData.responseJSON.bpi[date];

