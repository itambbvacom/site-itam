if(typeof String.prototype.trim !== 'function') { 
  String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, ''); 
  }
}                          
google.load('visualization', '1.1', {packages: ['controls','table']});
google.setOnLoadCallback(draw);

function draw() {

		/* ANTERIOR 
		var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=0AoQ79COH9rrIdGxqdjZHTVZFUkZWdUx4TFBXWHZTVUE&usp=drive_web#gid=9');
		*/
		
		/* ANTERIOR 
		https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=0AjOaof4bFUTmdDQ2RlY5a0hOTGZXWXBmMVlNOUVpa1E&usp=drive_web DOCUMENTO googlecode 
		*/

		/* LAB 
		https://drive.google.com/open?id=0AoQFEv3dKsH6dEpDT0ZxWmlNMW1wcGhfTnRzN2RsM2c
		var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=0AoQFEv3dKsH6dEpDT0ZxWmlNMW1wcGhfTnRzN2RsM2c&usp=drive_web#gid=9');
		*/
		
		/* QA 
		https://drive.google.com/open?id=1TR0_1uMrad39DAqMZXjhXfKqJncllAnQVtr7bwkWCA4
		var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=1TR0_1uMrad39DAqMZXjhXfKqJncllAnQVtr7bwkWCA4&usp=drive_web#gid=9');
		*/
		
		/* PROD 
		https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=0AjOaof4bFUTmdDQ2RlY5a0hOTGZXWXBmMVlNOUVpa1E&usp=drive_web#gid=9
		*/
		var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=0AjOaof4bFUTmdDQ2RlY5a0hOTGZXWXBmMVlNOUVpa1E&usp=drive_web#gid=9');

		query.send(handleQueryResponse);
		
}

function handleQueryResponse(response) {
		if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
		}
		var data = response.getDataTable();
										
		var category_codigo = new google.visualization.ControlWrapper({
								'controlType': 'StringFilter',
								'containerId': 'filtro1',
								'options': {
									'filterColumnLabel': 'CODIGO',
									'ui': {
										'labelSeparator' : '',
										'label' : '',
										'cssClass' : ''
									}
								}
							});
		
		var category_champion = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro2',
								'options': {
									'filterColumnLabel': 'CHAMPION',
									'ui': {
										'labelSeparator' : '',
										'label' : '',
										'caption' : 'Todos',
										'allowMultiple': false,
											'allowTyping': false,
										'selectedValuesLayout': 'aside'
									}
								}
							});
		
		var category_lider = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro3',
								'options': {
									'filterColumnLabel': 'L\u00cdDER',
									'ui': {
										'labelSeparator' : '',
										'label' : '',
										'caption' : 'Todos',
										'allowMultiple': false,
										'allowTyping': false,
										'selectedValuesLayout': 'aside'
									}
								}
							});
							
		var category_anio = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro4',
								'options': {
									'filterColumnLabel': 'A\u00d1O',
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
							
		var category_estado = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro5',
								'options': {
									'filterColumnLabel': 'ESTADO',
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
		
		var category_fase = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro6',
								'options': {
									'filterColumnLabel': 'FASE ACTUAL',
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
		
		var category_area = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro7',
								'options': {
									'filterColumnLabel': '\u00c1REA',
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
		
		var category_op = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro8',
								'options': {
									'filterColumnLabel': 'OFICINA DE PROYECTO',
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
		
		var formatter_link = new google.visualization.PatternFormat('<a class="iframe" href="{12}" target="_blank" >{0}</a>');
		formatter_link.format(data, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
		
		var formatter_fecha = new google.visualization.DateFormat({pattern: 'dd.LLLyy'});
		formatter_fecha.format(data, 8);
		
		var column_codigo = 0;
		var column_nombre = 1;
		var column_tipo = 2;
		var column_anio = 3;
		var column_finproyecto = 4;
		var column_lider = 5;
		var column_estado = 6;
		var column_fase = 7;
		var column_finfase = 8;
		var column_ppto = 9;
		var column_champion     = 10;   
		var column_area = 11;
		var column_op = 13;
		var stilo;
		var fecha_actual = new Date();
		fecha_actual = new Date(fecha_actual.getFullYear(), fecha_actual.getMonth(), fecha_actual.getDate());                                           
		var cadena_format;
		
		
		for (var row = 0; row < data.getNumberOfRows(); row++) {
				data.setCell(row, column_codigo, data.getValue(row, column_codigo), data.getFormattedValue(row, column_codigo), {'className': 'cell_left_style bold_style cell_width_85'});
				data.setCell(row, column_nombre, data.getValue(row, column_nombre), data.getFormattedValue(row, column_nombre), {'className': 'cell_left_style cell_width_180'});
				data.setCell(row, column_tipo, data.getValue(row, column_tipo), data.getFormattedValue(row, column_tipo), {'className': 'cell_style'});
				data.setCell(row, column_anio, data.getValue(row, column_anio), data.getFormattedValue(row, column_anio), {'className': 'cell_style bold_style cell_width_60'});
				data.setCell(row, column_finproyecto, data.getValue(row, column_finproyecto), data.getFormattedValue(row, column_finproyecto), {'className': 'cell_style'});
				data.setCell(row, column_lider, data.getValue(row, column_lider), data.getFormattedValue(row, column_lider), {'className': 'cell_style cell_width_100'});
														
				cadena_format = data.getValue(row, column_estado);
				cadena_format = cadena_format.substring(2);
				cadena_format = cadena_format.trim();
				data.setCell(row, column_estado, data.getValue(row, column_estado), cadena_format, {'className': 'cell_style bold_style cell_width_100'});
														
				cadena_format = data.getValue(row, column_fase);
				cadena_format = cadena_format.substring(2);
				cadena_format = cadena_format.trim();
				data.setCell(row, column_fase, data.getValue(row, column_fase), cadena_format, {'className': 'cell_style bold_style cell_width_120'});
				
														
				stilo = 'cell_style bold_style cell_width_70';
				if ((data.getValue(row, column_estado)).toLowerCase().indexOf('en cartera') == -1
					&& (data.getValue(row, column_estado)).toLowerCase().indexOf('terminado') == -1
					&& (data.getValue(row, column_estado)).toLowerCase().indexOf('suspendido') == -1
					&& data.getValue(row, column_finfase) < fecha_actual) {
					stilo = 'cell_warning_style bold_style cell_width_70';
				} else {
					if ((data.getValue(row, column_estado)).toLowerCase().indexOf('en cartera') == -1
						&& (data.getValue(row, column_estado)).toLowerCase().indexOf('terminado') == -1
						&& (data.getValue(row, column_estado)).toLowerCase().indexOf('suspendido') == -1
						&& data.getValue(row, column_finfase) >= fecha_actual && ((((data.getValue(row, column_finfase)-fecha_actual)/1000)/60)/60)/24 <= 7) {
						stilo = 'cell_warning_info_style bold_style cell_width_70';
					}

				}
				data.setCell(row, column_finfase, data.getValue(row, column_finfase), data.getFormattedValue(row, column_finfase), {'className': stilo});
				data.setCell(row, column_ppto, data.getValue(row, column_ppto), data.getFormattedValue(row, column_ppto), {'className': 'cell_style'});
				data.setCell(row, column_champion, data.getValue(row, column_champion), data.getFormattedValue(row, column_champion), {'className': 'cell_style cell_width_100'});
				data.setCell(row, column_area, data.getValue(row, column_area), data.getFormattedValue(row, column_area), {'className': 'cell_style cell_width_100'});
				
				cadena_format = data.getValue(row, column_op);
				cadena_format = cadena_format.substring(0, 1);
				cadena_format = cadena_format.trim();
				data.setCell(row, column_op, data.getValue(row, column_op), cadena_format, {'className': 'cell_style'});
														
		}
		
		var view = new google.visualization.DataView(data);
		view.setColumns([0, 1, 13, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		
		new google.visualization.Dashboard(document.getElementById('dashboard')).
						bind([category_codigo, category_champion, category_lider, category_anio, category_estado, category_fase, category_area, category_op], table).
						draw(view);

		google.visualization.events.addListener(table, 'ready',
				function(event) {
						$(".google-visualization-controls-stringfilter").children().css( "width", "80px" );;
						$(".iframe").colorbox({iframe:true, width:"100%", height:"95%"});
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
								elemento.href = 'https://spreadsheets.google.com/a/bbva.com/spreadsheet/ccc?chrome=false&key=' + keysheet +'&output=html&pubredirect=true&widget=true';
							}
						});
						
						
		});
		
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
