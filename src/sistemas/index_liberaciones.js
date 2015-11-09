if(typeof String.prototype.trim !== 'function') { 
  String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, ''); 
  }
}                        
google.load('visualization', '1.1', {packages: ['controls','table']});
google.setOnLoadCallback(draw);

function draw() {
	var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=1sF34PZhGuULMgmYq_ct1ARQWOr6Nq3sXh-YN9Am0l0s&usp=drive_web#gid=0');
	query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
		if (response.isError()) {
			alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
			return;
		}
		var data = response.getDataTable();
									   
		var category_filtro1 = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro1',
								'options': {
									'filterColumnIndex': '0',
									'ui': {
										'labelSeparator' : '',
										'label' : '',
										'caption' : 'Selecciona',
										'allowMultiple': true,
										'allowTyping': false,
										'selectedValuesLayout': 'aside'
									}
								}
							});
		
		var category_filtro2 = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro2',
								'options': {
									'filterColumnIndex': '1',
									'ui': {
										'labelSeparator' : '',
										'label' : '',
										'caption' : 'Selecciona',
										'allowMultiple': true,
										'allowTyping': false,
										'selectedValuesLayout': 'aside'
									}
								}
							});
		
		var category_filtro3 = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro3',
								'options': {
									'filterColumnIndex': '2',
									'ui': {
										'labelSeparator' : '',
										'label' : '',
										'caption' : 'Selecciona',
										'allowMultiple': true,
										'allowTyping': false,
										'selectedValuesLayout': 'aside'
									}
								}
							});
		
		var cssClassNames = {
			'headerRow': 'header_hide_style',
			'tableCell': 'cell_style'
		};
		
		var options = {'allowHtml': true, 'cssClassNames': cssClassNames, 'sort': 'disable', 'height': '100%', 'width': '100%'};
		
		var table = new google.visualization.ChartWrapper({
						'chartType': 'Table',
						'containerId': 'table',
						'options': options
						});

		var formatter_fecha_reporte = new google.visualization.DateFormat({pattern: 'dd.LLLyy'});
		formatter_fecha_reporte.format(data, 3);
		var formatter_fecha_compromiso = new google.visualization.DateFormat({pattern: 'dd.LLLyy'});
		formatter_fecha_compromiso.format(data, 5);
		
		var column1 = 0;
		var column2 = 1;
		var column3 = 2;
		var column4 = 3;
		var column5 = 4;
		var column6 = 5;
		var column7 = 6;
		var column8 = 7;
		var column_extra = 8;
		var extra;
		for (var row = 0; row < data.getNumberOfRows(); row++) {
			data.setCell(row, column1, data.getValue(row, column1), data.getFormattedValue(row, column1), {'className': 'cell_left_style cell_width_100'});
			data.setCell(row, column2, data.getValue(row, column2), data.getFormattedValue(row, column2), {'className': 'cell_style cell_width_120'});
			data.setCell(row, column3, data.getValue(row, column3), data.getFormattedValue(row, column3), {'className': 'cell_style cell_width_120'});
			data.setCell(row, column4, data.getValue(row, column4), data.getFormattedValue(row, column4), {'className': 'cell_style cell_width_85'});
			data.setCell(row, column5, data.getValue(row, column5), data.getFormattedValue(row, column5), {'className': 'cell_style cell_width_60'});
			data.setCell(row, column6, data.getValue(row, column6), data.getFormattedValue(row, column6), {'className': 'cell_style cell_width_85'});
			data.setCell(row, column7, data.getValue(row, column7), data.getFormattedValue(row, column7), {'className': 'cell_style_justify'});
			data.setCell(row, column8, data.getValue(row, column8), data.getFormattedValue(row, column8), {'className': 'cell_style cell_width_100'});                                                                        

			extra = data.getValue(row, column_extra);
			extra = extra.split('>').join('&#62');
			extra = extra.split('<').join('&#60');
			extra = extra.split('"').join('&#34');
			data.setCell(row, column_extra, extra, extra, {'className': ''});
		}
		
		//var formatter_link = new google.visualization.PatternFormat('<a class="inline" href="#inline_content" onclick="getComentario(this);"><input type="hidden" value="{8}"/>{0}</a>');
		//formatter_link.format(data, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
		var formatter_link = new google.visualization.PatternFormat('<a class="iframe" href="https://spreadsheets.google.com/a/bbva.com/spreadsheet/ccc?chrome=false&key=1sF34PZhGuULMgmYq_ct1ARQWOr6Nq3sXh-YN9Am0l0s&output=html&pubredirect=true&widget=true" onclick="getDatoExtra(this);"><input type="hidden" value="{7}"/>{0}</a>');
		formatter_link.format(data, [10, 4, 12, 3, 4, 5, 6, 7, 8]);
		
		var view = new google.visualization.DataView(data);
		view.setColumns([10, 4, 12, 3, 4, 5, 6, 7]);
		
		new google.visualization.Dashboard(document.getElementById('dashboard')).
						bind([category_filtro1, category_filtro2, category_filtro3], table).
						draw(view);

		google.visualization.events.addListener(table, 'ready',
				function(event) {
						$(".inline").colorbox({inline:true, width:"40%", height:"40%"});
						$('#contenido_tabla').perfectScrollbar({
							wheelSpeed: 20,
							wheelPropagation: false
						});
						
						$("#table table tbody tr:last-child td").each(function(index){
							if ($("#w"+(index+1)).val() > $(this).width()) {
								$(this).width($("#w"+(index+1)).val());
								$("#h"+(index+1)).width($("#w"+(index+1)).val());
							} else {
								$("#h"+(index+1)).width($(this).width());
							}

						});
						$("#table table tbody tr:last-child td").each(function(index){
							$("#h"+(index+1)).width($(this).width());
						});
						
						
		});
		
}

function getDatoExtra(elemento) {
	$("#textoExtra_text").text(elemento.firstChild.value);
}

function seleccionar(el) {
	var body = document.body, range, sel;
	if (document.createRange && window.getSelection) {
		range = document.createRange();
		sel = window.getSelection();
		sel.removeAllRanges();
		try {
			range.selectNodeContents(el);
			sel.addRange(range);
			range.execCommand('copy');
		} catch (e) {
			range.selectNode(el);
			sel.addRange(range);
		}
	} else if (body.createTextRange) {
		range = body.createTextRange();
		range.moveToElementText(el);
		range.select();
	}
}

function cambia_detalle() {
	$(".iframe").each(function(index, elemento){
		var keysheet = elemento.href;
		var indexkey = keysheet.indexOf("key=");
		keysheet = keysheet.substring(indexkey + 4, keysheet.length);
		indexkey = keysheet.indexOf("&");
		if (indexkey != -1) {
			keysheet = keysheet.substring(0, indexkey);
		}
		if ($('#chk_editar').prop('checked')) {
			$.colorbox.remove();
			elemento.href = 'https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=' + keysheet +'&usp=drive_web';
		} else {
			$(".iframe").colorbox({iframe:true, width:"100%", height:"95%"});
			elemento.href = 'https://spreadsheets.google.com/a/bbva.com/spreadsheet/ccc?chrome=false&key=' + keysheet +'&output=html&pubredirect=true&widget=true';
		}
	});
}
