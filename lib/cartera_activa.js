if(typeof String.prototype.trim !== 'function') { 
  String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, ''); 
  }
}
google.load('visualization', '1.1', {packages: ['controls','table']});
google.setOnLoadCallback(draw);

function draw() {
	var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=1bmnmfRx4UO9tREN-m5mKYkNvvNwKojRgat3EFXc-pWI#gid=0');
	query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
	if (response.isError()) {
		alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
		return;
	}
	var data = response.getDataTable();
	
	var category_champion = new google.visualization.ControlWrapper({
							'controlType': 'CategoryFilter',
							'containerId': 'filtro1',
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
							'containerId': 'filtro2',
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
							'containerId': 'filtro3',
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
							'containerId': 'filtro4',
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
							'containerId': 'filtro5',
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
							'containerId': 'filtro6',
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
		
		var formatter_link = new google.visualization.PatternFormat('<a href="{11}" target="_blank">{0}</a>');
		formatter_link.format(data, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
		
		var formatter_fecha = new google.visualization.DateFormat({pattern: 'dd.LLLyy'});
		formatter_fecha.format(data, 8);
		
		var column_nombre = 1;
		var column_anio = 3;
		var column_lider = 5;
		var column_estado = 6;
		var column_fase = 7;
		var column_finfase = 8;
		var column_area = 11;
		var stilo;
		var fecha_actual = new Date();
		fecha_actual = new Date(fecha_actual.getFullYear(), fecha_actual.getMonth(), fecha_actual.getDate());
		var cadena_format;
		
		for (var row = 0; row < data.getNumberOfRows(); row++) {
				cadena_format = data.getValue(row, column_estado);
				cadena_format = cadena_format.substring(2);
				cadena_format = cadena_format.trim();          
				data.setCell(row, column_nombre, data.getValue(row, column_nombre), data.getFormattedValue(row, column_nombre), {'className': 'cell_left_style'});
				data.setCell(row, column_anio, data.getValue(row, column_anio), data.getFormattedValue(row, column_anio), {'className': 'cell_style bold_style cell_width_60'});
				data.setCell(row, column_lider, data.getValue(row, column_lider), data.getFormattedValue(row, column_lider), {'className': 'cell_style cell_width_120'});
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
				data.setCell(row, column_area, data.getValue(row, column_area), data.getFormattedValue(row, column_area), {'className': 'cell_style cell_width_100'});
		}
		
		var view = new google.visualization.DataView(data);
		view.setColumns([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		
		new google.visualization.Dashboard(document.getElementById('dashboard')).
						bind([category_champion, category_lider, category_anio, category_estado, category_fase, category_area], table).
						draw(view);

		google.visualization.events.addListener(table, 'ready',
				function(event) {
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
