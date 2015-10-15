if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, ''); 
  }
}                        
google.load('visualization', '1.1', {packages: ['controls','table']});
google.setOnLoadCallback(draw);

function draw() {
	var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=1jU7ujdEKlJLgwlM1pHyyB093ZXCr5yqbYG94EF7N8iU&usp=drive_web#gid=1871223754');
	query.send(handleQueryResponse);
		
}

function handleQueryResponse(response) {
		if (response.isError()) {
			alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
			return;
		}
		
		var data = response.getDataTable();
		
		var category_aplicativo = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro1',
								'options': {
									'filterColumnIndex': '5',
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
		
		var category_estatus = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro2',
								'options': {
									'filterColumnIndex': '6',
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
		// data.removeRow(0); // <j.schroeder> 201505061510 Se comenta porque no aparece el renglón 1 dentro de la página del site
		var formatter_fecha_alta = new google.visualization.DateFormat({pattern: 'dd.LLLyy'});
		formatter_fecha_alta.format(data, 3);
		var formatter_fecha_compromiso = new google.visualization.DateFormat({pattern: 'dd.LLLyy'});
		formatter_fecha_compromiso.format(data, 8);
		var formatter_fecha_cierre = new google.visualization.DateFormat({pattern: 'dd.LLLyy'});
		formatter_fecha_cierre.format(data, 9);
		
		var column_folio = 0;
		var column_nombre = 1;
		var column_incidencias = 2;//
		var column_fechaalta = 3;
		var column_solucionador = 4;
		var column_aplicativo = 5;
		var column_estatus = 6;
		var column_atendidopor = 7;
		var column_fechacompromiso = 8;
		var column_fechacierre = 9;
		var column_severidad = 10;
		var column_comentario = 11;
		var comentario;
		var incidencia;
		var style_fecha = 'cell_style cell_width_60';
		var style_fecha_neg = 'cell_style bold_style cell_width_60';
		for (var row = 0; row < data.getNumberOfRows(); row++) {
			data.setCell(row, column_folio, data.getValue(row, column_folio), data.getFormattedValue(row, column_folio), {'className': 'cell_left_style cell_width_70'});
			data.setCell(row, column_nombre, data.getValue(row, column_nombre), data.getFormattedValue(row, column_nombre), {'className': 'cell_style bold_style cell_width_180'});
			
			incidencia = data.getValue(row, column_incidencias);
			if (incidencia != null) {
				incidencia = incidencia.split('>').join('&#62');
			incidencia = incidencia.split('<').join('&#60');
			incidencia = incidencia.split('"').join('&#34');
			data.setCell(row, column_incidencias, incidencia, incidencia, {'className': 'cell_style cell_width_60'});
			}
			
			
			data.setCell(row, column_fechaalta, data.getValue(row, column_fechaalta), data.getFormattedValue(row, column_fechaalta), {'className': 'cell_style bold_style cell_width_60'});
			data.setCell(row, column_solucionador, data.getValue(row, column_solucionador), data.getFormattedValue(row, column_solucionador), {'className': 'cell_style cell_width_75'});
			
			data.setCell(row, column_aplicativo, data.getValue(row, column_aplicativo), data.getFormattedValue(row, column_aplicativo), {'className': 'cell_style cell_width_60'});
			data.setCell(row, column_estatus, data.getValue(row, column_estatus), data.getFormattedValue(row, column_estatus), {'className': 'cell_style bold_style cell_width_60'});
			data.setCell(row, column_atendidopor, data.getValue(row, column_atendidopor), data.getFormattedValue(row, column_atendidopor), {'className': 'cell_style cell_width_75'});
			
			if (data.getValue(row, column_fechacierre) != null) {
				data.setCell(row, column_fechacompromiso, data.getValue(row, column_fechacompromiso), data.getFormattedValue(row, column_fechacompromiso), {'className': style_fecha});
				data.setCell(row, column_fechacierre, data.getValue(row, column_fechacierre), data.getFormattedValue(row, column_fechacierre), {'className': style_fecha_neg});
			} else {
				data.setCell(row, column_fechacompromiso, data.getValue(row, column_fechacompromiso), data.getFormattedValue(row, column_fechacompromiso), {'className': style_fecha_neg});
				data.setCell(row, column_fechacierre, data.getValue(row, column_fechacierre), data.getFormattedValue(row, column_fechacierre), {'className': style_fecha});
			}
			
			
			data.setCell(row, column_severidad, data.getValue(row, column_severidad), data.getFormattedValue(row, column_severidad), {'className': 'cell_style cell_width_100'});
			
			comentario = data.getValue(row, column_comentario);
			if (comentario != null) {
				comentario = comentario.split('>').join('&#62');
				comentario = comentario.split('<').join('&#60');
				comentario = comentario.split('"').join('&#34');
				data.setCell(row, column_comentario, comentario, comentario, {'className': ''});
			}
			
		}
		
		var formatter_link = new google.visualization.PatternFormat('<a class="inline" href="#inline_content" onclick="getComentario(this);"><input type="hidden" value="{11}"/>{0}</a>');
		formatter_link.format(data, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
		
		var view = new google.visualization.DataView(data);
		view.setColumns([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		
		new google.visualization.Dashboard(document.getElementById('dashboard')).
						bind([category_aplicativo, category_estatus], table).
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
function getComentario(elemento) {
	$("#comentario_text").text(elemento.firstChild.value);
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
