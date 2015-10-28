if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, ''); 
  }
}                        
google.load('visualization', '1.1', {packages: ['controls','table']});
google.setOnLoadCallback(draw);

function draw() {
	// HOJA de QA  https://drive.google.com/open?id=1IfSrp3VdCwssPKiolfza-1X1TGlPaiWIIR_JIF_qRlk
	// var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=1IfSrp3VdCwssPKiolfza-1X1TGlPaiWIIR_JIF_qRlk&usp=drive_web');

	// HOJA de LAB 
	// var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=16f2lOWJmoU1VlF2QLUNRusEcbS-gzmZSHryPdylKQm4&usp=drive_web');

	// HOJA DE PRODUCCION 	
	var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=1QE_pkbrCfNDpoyLbvid_SvuVckNHVMLoj3I5hygSXb4&usp=drive_web');
    


	query.send(handleQueryResponse);
		
}

function handleQueryResponse(response) {
		if (response.isError()) {
			alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
			return;
		}
		var data = response.getDataTable();
										
		var category_reporto = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro1',
								'options': {
									'filterColumnIndex': 1,
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
		
		var category_responsable = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro2',
								'options': {
									'filterColumnIndex': 8,
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
		
		var category_aplicativo = new google.visualization.ControlWrapper({
								'controlType': 'CategoryFilter',
								'containerId': 'filtro3',
								'options': {
									'filterColumnIndex': 2,
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
								'containerId': 'filtro4',
								'options': {
									'filterColumnIndex': 3,
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
								'containerId': 'filtro5',
								'options': {
									'filterColumnIndex': 5,
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

		//var formatter_link = new google.visualization.PatternFormat('<a class="inline" href="#inline_content" onclick="getComentario(this);"><input type="hidden" value="{8}"/>{0}</a>');
		//formatter_link.format(data, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
		//Remove Headders
		data.removeRow(0);
		var formatter_fecha_reporte = new google.visualization.DateFormat({pattern: 'dd.LLLyy'});
		formatter_fecha_reporte.format(data, 4);
		var formatter_fecha_compromiso = new google.visualization.DateFormat({pattern: 'dd.LLLyy'});
		formatter_fecha_compromiso.format(data, 6);
		
		var column_id = 0;
		var column_reporto = 1;
		var column_aplicativo = 2;
		var column_area = 3;
		var column_fechareporte = 4;
		var column_estatus = 5;
		var column_fechacompromiso = 6;
		var column_incidencia = 7;
		var column_responsable = 8;
		var column_comentario = 9;
		var comentario;
		for (var row = 0; row < data.getNumberOfRows(); row++) {
			data.setCell(row, column_id, data.getValue(row, column_id), data.getFormattedValue(row, column_id), {'className': 'cell_left_style cell_width_85'});
			data.setCell(row, column_reporto, data.getValue(row, column_reporto), data.getFormattedValue(row, column_reporto), {'className': 'cell_left_style cell_width_100'});
			data.setCell(row, column_aplicativo, data.getValue(row, column_aplicativo), data.getFormattedValue(row, column_aplicativo), {'className': 'cell_style bold_style cell_width_120'});
			data.setCell(row, column_area, data.getValue(row, column_area), data.getFormattedValue(row, column_area), {'className': 'cell_style bold_style cell_width_120'});
												
			data.setCell(row, column_fechareporte, data.getValue(row, column_fechareporte), data.getFormattedValue(row, column_fechareporte), {'className': 'cell_style bold_style cell_width_85'});
			data.setCell(row, column_estatus, data.getValue(row, column_estatus), data.getFormattedValue(row, column_estatus), {'className': 'cell_style cell_width_60'});
			
			data.setCell(row, column_fechacompromiso, data.getValue(row, column_fechacompromiso), data.getFormattedValue(row, column_fechacompromiso), {'className': 'cell_style bold_style cell_width_85'});
			
					 
			data.setCell(row, column_incidencia, data.getValue(row, column_incidencia), data.getFormattedValue(row, column_incidencia), {'className': 'cell_style_justify'});
			data.setCell(row, column_responsable, data.getValue(row, column_responsable), data.getFormattedValue(row, column_responsable), {'className': 'cell_style cell_width_100'});                                                                        
			comentario = data.getValue(row, column_comentario);
  
        if (comentario != null) {
				comentario = comentario.split('>').join('&#62');
				comentario = comentario.split('<').join('&#60');
				comentario = comentario.split('"').join('&#34');
				data.setCell(row, column_comentario, comentario, comentario, {'className': ''});
			}
		}
		
		var formatter_link = new google.visualization.PatternFormat('<a class="inline" href="#inline_content" onclick="getComentario(this);"><input type="hidden" value="{9}"/>{0}</a>');
		formatter_link.format(data, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
		
		var view = new google.visualization.DataView(data);
		view.setColumns([0, 1, 2, 3, 4, 5, 6, 7, 8]);
		
		new google.visualization.Dashboard(document.getElementById('dashboard')).
						bind([category_reporto, category_area, category_aplicativo, category_estatus, category_responsable], table).
						draw(view);
		
						
		google.visualization.events.addListener(table, 'ready',
				function(event) {
						$(".inline").colorbox({inline:true, width:"60%", height:"50%"});
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
