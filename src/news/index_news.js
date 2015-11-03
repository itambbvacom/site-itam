google.load('visualization', '1.1', {packages: ['controls']});
google.setOnLoadCallback(draw);

function draw() {
	var w = $('#slides').width();
	$('.slides_container div.slide').width(w);
	$('.contenido').width(w*0.85);
	
	w = $('.slide').width() - ((w*0.85) + 10);
	w = w/2;
	w = w - 20;
	$('#slides .prev').css('left', w);
	w = $('.slide').width() - w - 10;
	$('#slides .next').css('left', w);

	/* HOJA de LAB
	https://docs.google.com/spreadsheets/d/1ZOw0_Z-BfC9xKp2Fxk4c33xnwLMxVYco1e6cKo0X5wA/edit#gid=0
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1ZOw0_Z-BfC9xKp2Fxk4c33xnwLMxVYco1e6cKo0X5wA/edit#gid=0');
	*/

	/* HOJA de QA
	https://docs.google.com/spreadsheets/d/1nb9ogvBm4aA3n1bYwSszZ3EbjZu76QrkWudNJNIe7Ko/edit#gid=0
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1nb9ogvBm4aA3n1bYwSszZ3EbjZu76QrkWudNJNIe7Ko/edit#gid=0');
	*/

	/* HOJA de PRODUCCION
	https://docs.google.com/spreadsheets/d/1H-GWfPxz-oTpkYJ2YGEhRl91QyI7wwclfD4VQnIG4vM/edit#gid=0
	*/
	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1H-GWfPxz-oTpkYJ2YGEhRl91QyI7wwclfD4VQnIG4vM/edit#gid=0');


	query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}

	var data = response.getDataTable();
	for (var row = 0; row < data.getNumberOfRows(); row++) {
		$('#f' + (row + 1)).text('Fecha: ' + data.getFormattedValue(row, 0));
		$('#h' + (row + 1)).text(cut_text(data.getValue(row, 1), 43));
		$('#c' + (row + 1)).text(cut_text(data.getValue(row, 2), 650));
		$('#a' + (row + 1)).text('Autor: ' + data.getValue(row, 3));
		$('#l' + (row + 1)).attr('href', data.getValue(row, 4));
	}
	
	slide_news();
}

function cut_text(text, size) {
	if (text.length > size) {
	   text = text.substring(0, size);
	   var index = text.lastIndexOf(' ');
	   if (index != -1) {
			text = text.substring(0, (index + 1));
	   }
	   text = text.trim();
	   text = text + '...';
	}
	
	return text;
}

function slide_news() {
	$('#slides').slides({
		preload : true,
		preloadImage : 'https://rawgit.com/itambbvacom/site-itam/master/img/loading.gif',
		play : 7000, //7000
		pause : 3500,//3500
		hoverPause : true,
		animationStart : function(current) {
		},
		animationComplete : function(current) {
		},
		slidesLoaded : function() {
		}
	});
	
	$('.pagination li a').css('background-image', 'url(https://rawgit.com/itambbvacom/site-itam/master/img/pagination.png)');
}
