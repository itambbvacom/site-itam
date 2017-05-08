
(function($) {
    $.fn.hasVerticalScrollbar = function() {
        return this.get(0).scrollHeight > this.height();
    }
    
})(jQuery);

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

var column_folio = 0;
var column_titulo = 1;
var column_aplicativo = 2;
var column_fecha_registro = 3;
var column_estatus = 4;
var column_fecha_estatus = 5;
var column_fecha_compromiso = 6;
var column_ind = 7;
var column_oc = 8;
var column_area_resolutoria = 9;
var column_area_responsable = 10;
var column_usuario_afectado = 11;
var column_area_negocio = 12;   
var column_folio_usuario = 13;
var column_folio_1 = 14;
var column_folio_2 = 15;
var column_folio_3 = 16;
var column_clave_estatus = 17;
var data = [];
var dataDetalle = [];
var dataOcurrencias = [];
var data_area_responsable = [];
var data_area_resolutoria = [];
var data_aplicativo = [];
var data_usuario_afectado = [];
var data_area_negocio = [];
var data_estatus = [];

var cdet_folio = 0;
var cdet_fecha = 1;
var cdet_usuario = 2;
var cdet_comentario = 3;
var cdet_tipo = 4;

var coc_folio_padre = 0;
var coc_folio = 1;
var coc_titulo = 2;
var coc_aplicativo = 3;
var coc_fecha_registro = 4;
var coc_estatus = 5;
var coc_fecha_estatus = 6;
var coc_ind = 7;
var coc_area_responsable = 8;

if(typeof String.prototype.trim !== 'function') { 
  String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, ''); 
  }
}                          
google.load('visualization', '1.1', {packages: ['controls','table']});
google.setOnLoadCallback(draw);

function draw() {

	/* LAB
	https://drive.google.com/open?id=1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M
	var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=1RpmpKCiIsaE9Kyk6xHfIyPDARlMHiHvpPXtLCwu3qXQ&usp=drive_web#gid=0');
	*/
	
	/* QA
	https://docs.google.com/spreadsheets/d/1i9vxIQnvTUZoJdIzWAHtvq4K2KJg8RxKJaXVbyjEkas/edit#gid=0
	https://docs.google.com/spreadsheets/d/1i9vxIQnvTUZoJdIzWAHtvq4K2KJg8RxKJaXVbyjEkas/edit#gid=1919145693
	https://docs.google.com/spreadsheets/d/1i9vxIQnvTUZoJdIzWAHtvq4K2KJg8RxKJaXVbyjEkas/edit#gid=1604511922

	var query = new google.visualization.Query('https://spreadsheets.google.com/a/bbva.com/tq?&tq=&key=1i9vxIQnvTUZoJdIzWAHtvq4K2KJg8RxKJaXVbyjEkas&gid=0');
	query.send(handleQueryResponse);
	var queryDetalle = new google.visualization.Query('https://spreadsheets.google.com/a/bbva.com/tq?&tq=&key=1i9vxIQnvTUZoJdIzWAHtvq4K2KJg8RxKJaXVbyjEkas&gid=1919145693');
	queryDetalle.send(handleQueryResponseDetalle);
	var queryOcurrencias = new google.visualization.Query('https://spreadsheets.google.com/a/bbva.com/tq?&tq=&key=1i9vxIQnvTUZoJdIzWAHtvq4K2KJg8RxKJaXVbyjEkas&gid=1604511922');
	queryOcurrencias.send(handleQueryResponseOcurrencias);
	
	*/
	/* PROD
	https://docs.google.com/spreadsheets/d/1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M/edit#gid=0
	https://docs.google.com/spreadsheets/d/1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M/edit#gid=1919145693
	https://docs.google.com/spreadsheets/d/1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M/edit#gid=1604511922

	var query = new google.visualization.Query('https://spreadsheets.google.com/a/bbva.com/tq?&tq=&key=1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M&gid=0');
	query.send(handleQueryResponse);
	var queryDetalle = new google.visualization.Query('https://spreadsheets.google.com/a/bbva.com/tq?&tq=&key=1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M&gid=1919145693');
	queryDetalle.send(handleQueryResponseDetalle);
	var queryOcurrencias = new google.visualization.Query('https://spreadsheets.google.com/a/bbva.com/tq?&tq=&key=1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M&gid=1604511922');
	queryOcurrencias.send(handleQueryResponseOcurrencias);

	*/

	var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M/edit#gid=0');
	query.send(handleQueryResponse);
	var queryDetalle = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M/edit#gid=1919145693');
	queryDetalle.send(handleQueryResponseDetalle);
	var queryOcurrencias = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1bvYvZzkrODKRFDfJ2QS6RYMqrWWTI1TI9O4614Ab__M/edit#gid=1604511922');
	queryOcurrencias.send(handleQueryResponseOcurrencias);
		
}

function handleQueryResponseOcurrencias(response) {
		if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
		}
		dataOcurrencias = response.getDataTable();
}

function handleQueryResponseDetalle(response) {
		if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
		}
		dataDetalle = response.getDataTable();
}

function handleQueryResponse(response) {
		if (response.isError()) {
				alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
				return;
		}
		data = response.getDataTable();
		loadSelect();
		loadDataTable()
}



function loadSelect() {
	data_area_responsable = [];
	data_area_resolutoria = [];
	data_aplicativo = [];
	data_usuario_afectado = [];
	data_area_negocio = [];
	data_estatus = [];
	for (var row = 0; row < data.getNumberOfRows(); row++) {
		data_area_responsable.push(data.getValue(row, column_area_responsable));
		data_area_resolutoria.push(data.getValue(row, column_area_resolutoria));
		data_aplicativo.push(data.getValue(row, column_aplicativo));
		data_usuario_afectado.push(data.getValue(row, column_usuario_afectado));
		data_area_negocio.push(data.getValue(row, column_area_negocio));
		data_estatus.push(data.getValue(row, column_estatus));
		//data table
	}
	data_area_responsable = data_area_responsable.unique();
	data_area_resolutoria = data_area_resolutoria.unique();
	data_aplicativo = data_aplicativo.unique();
	data_usuario_afectado = data_usuario_afectado.unique();
	data_area_negocio = data_area_negocio.unique();
	data_estatus = data_estatus.unique();
	
	data_area_responsable = data_area_responsable.sort();
	data_area_resolutoria = data_area_resolutoria.sort();
	data_aplicativo = data_aplicativo.sort();
	data_usuario_afectado = data_usuario_afectado.sort();
	data_area_negocio = data_area_negocio.sort();
	data_estatus = data_estatus.sort();
	
	loadSelectOptions($("#sAreaResponsable"), data_area_responsable);
	loadSelectOptions($("#sAreaResolutoria"), data_area_resolutoria);
	loadSelectOptions($("#sAplicativo"), data_aplicativo);
	loadSelectOptions($("#sUsuarioAfectado"), data_usuario_afectado);
	loadSelectOptions($("#sAreaNegocio"), data_area_negocio);
	loadSelectOptions($("#sEstatus"), data_estatus);
	$(".es-input").blur(function() {
		var id = $(this).get(0).parentNode.id;
		id = id.replace("c","h");
		$("#"+id).val($(this).val().trim());
		loadDataTable();
	});
	$("#sFolio").blur(function() {
		loadDataTable();
	});
	$("#sFolio").focus(function() {
		$(this).select();
	});
	$("#sFolio").keypress(function(event) {
		if (event.keyCode == 13) {
			loadDataTable();
		}
	});
	$(".es-input").focus(function() {
		$(this).select();
	});
	$(".es-input").keypress(function(event) {
		if (event.keyCode == 13) {
			var id = $(this).get(0).parentNode.id;
			id = id.replace("c","h");
			$("#"+id).val($(this).val().trim());
			loadDataTable();
		}
	});
	
}

function loadSelectOptions(combo, data_select) {
	var cad = "";
	for (var i = 0; i < data_select.length; i++) {
		cad = cad + '<option value="' + data_select[i] + '">' + data_select[i] + '</option>';
	}
	combo.empty();
	combo.append(cad);
	combo.editableSelect({
		onSelect: function (x) {
			var id = $(this).get(0).parentNode.id;
			id = id.replace("c","h");
			$("#"+id).val($(this).val().trim());
			loadDataTable();
			
		}
	});

}

function loadDataTable() {
	var cad = "";
	var fecha_actual = new Date();
    fecha_actual = new Date(fecha_actual.getFullYear(), fecha_actual.getMonth(), fecha_actual.getDate());
	var found = true;
	for (var row = 0; row < data.getNumberOfRows(); row++) {
		found = true;
		if ($("#sFolio").val() != '') {
			if (!($("#sFolio").val().trim() == data.getValue(row, column_folio)
				|| $("#sFolio").val().trim() == data.getValue(row, column_folio_usuario)
				|| $("#sFolio").val().trim() == data.getValue(row, column_folio_1)
				|| $("#sFolio").val().trim() == data.getValue(row, column_folio_2)
				|| $("#sFolio").val().trim() == data.getValue(row, column_folio_3))) {
					found = false;
				}
		}
		
		
		if (found == true && $("#hAreaResponsable").val() != '') {
			if (!($("#hAreaResponsable").val() == data.getValue(row, column_area_responsable))) {
					found = false;
				}
		}
		
		if (found == true && $("#hAreaResolutoria").val() != '') {
			if (!($("#hAreaResolutoria").val() == data.getValue(row, column_area_resolutoria))) {
					found = false;
				}
		}
		
		if (found == true && $("#hAplicativo").val() != '') {
			if (!($("#hAplicativo").val() == data.getValue(row, column_aplicativo))) {
					found = false;
				}
		}
		
		if (found == true && $("#hUsuarioAfectado").val() != '') {
			if (!($("#hUsuarioAfectado").val() == data.getValue(row, column_usuario_afectado))) {
					found = false;
				}
		}
		
		if (found == true && $("#hAreaNegocio").val() != '') {
			if (!($("#hAreaNegocio").val() == data.getValue(row, column_area_negocio))) {
					found = false;
				}
		}
		
		if (found == true && $("#hEstatus").val() != '') {
			if (!($("#hEstatus").val() == data.getValue(row, column_estatus))) {
					found = false;
				}
		}
		if (found == true) {
			var circle = "";
			cad = cad + '<tr>';
			var folio_id = data.getValue(row, column_folio);
			if (data.getValue(row, column_folio_1).toUpperCase().startsWith("CGR")) {
				folio_id = data.getValue(row, column_folio_1);
			}
			cad = cad + '<td class="vcenter-row hcenter-row"><a id="' + data.getValue(row, column_folio) + '" class="detalle_inc" href="#detalle_inc_content" onclick="getDetalle(this);">' + folio_id + '</a></td>';
			cad = cad + '<td class="vcenter-row">' + data.getValue(row, column_titulo) + '</td>';
			cad = cad + '<td class="vcenter-row hcenter-row ">' + data.getValue(row, column_aplicativo) + '</td>';
			cad = cad + '<td class="vcenter-row hcenter-row ">' + data.getValue(row, column_fecha_registro) + '</td>';
			cad = cad + '<td class="vcenter-row hcenter-row ">' + data.getValue(row, column_estatus) + '</td>';
			cad = cad + '<td class="vcenter-row hcenter-row ">' + data.getValue(row, column_fecha_estatus) + '</td>';
			
			var fecha_compromiso = getFechaCompromiso(data.getValue(row, column_fecha_compromiso));
			var estilo_fecha_compromiso = "";
			
			//if (((((fecha_compromiso - fecha_actual)/1000)/60)/60)/24 <= 2) {
			//	estilo_fecha_compromiso = 'class="subrayado_amarillo"';
			//}
			if (data.getValue(row, column_clave_estatus) == 2) {
				if (((((fecha_actual - fecha_compromiso)/1000)/60)/60)/24 >= 2) {
					estilo_fecha_compromiso = 'class="subrayado_rojo"';
				}
			}
			
			cad = cad + '<td class="vcenter-row hcenter-row "><div ' + estilo_fecha_compromiso + '>' + data.getValue(row, column_fecha_compromiso) + '</div></td>';
			if (data.getValue(row, column_ind) == "1")
				circle = "&#9899;";
			else
				circle == "";
			cad = cad + '<td class="vcenter-row hcenter-row " style="color:red;">' + circle + '</td>';
			
			if (data.getValue(row, column_oc) > 1)
				cad = cad + '<td class="vcenter-row hcenter-row"><a id="' + data.getValue(row, column_folio) + '" class="detalle_oc" href="#detalle_oc_content" onclick="getOcurrencias(this);">' + data.getValue(row, column_oc) + '</a></td>';
			else
				cad = cad + '<td class="vcenter-row hcenter-row ">' + data.getValue(row, column_oc) + '</td>';
			
			cad = cad + '<td class="vcenter-row hcenter-row ">' + data.getValue(row, column_area_resolutoria) + '</td>';
			cad = cad + '</tr>';
		}
		
	}
	$("#tabla-incidencias tbody").empty();
	$("#tabla-incidencias tbody").append(cad);
	$('#tabla-incidencias').fixedHeaderTable('destroy');
	$('#tabla-incidencias').fixedHeaderTable();
	$('#tabla-incidencias').fixedHeaderTable('show', 1000);
	ajustar();
	$(".detalle_inc").colorbox({inline:true, width:"70%", height:"90%"});
	$(".detalle_oc").colorbox({inline:true, width:"80%", height:"50%"});
}

function ajustar() {
	for (var i = 0; i < 10; i++) {
		$(".fht-thead tr:last").get(0).children[i].width = $(".fht-tbody tr:last").get(0).children[i].scrollWidth + 1;
		$(".fht-thead tr:last").get(0).children[i].scrollWidth = $(".fht-tbody tr:last").get(0).children[i].scrollWidth;
	}
	if ($('.fht-tbody').hasVerticalScrollbar() == false) {
		$(".fht-thead th:last").css("padding-right","6px");
	}
}

function getDetalle(elemento) {
	var found;
	for (var row = 0; row < data.getNumberOfRows(); row++) {
		found = true;

		
		if (!(elemento.id == data.getValue(row, column_folio))) {
					found = false;
		}
		if (found == true) {
			$("#sFolioUsuario").val(data.getValue(row, column_folio_usuario));
			$("#sFolioCGR").val(data.getValue(row, column_folio_1));
			$("#sFolioJira").val(data.getValue(row, column_folio_2));
			$("#sFolioLibre").val(data.getValue(row, column_folio_3));
			$("#sFolioITAM").val(data.getValue(row, column_folio));
		
		}
	}
	
	
	var cadComentarios = "";
	var cadDiagnostico = "";
	for (var row = 0; row < dataDetalle.getNumberOfRows(); row++) {
		found = true;

		
		if (!(elemento.id == dataDetalle.getValue(row, cdet_folio))) {
					found = false;
		}
		
		
		if (found == true) {
			
			
			var nombres = dataDetalle.getValue(row, cdet_usuario).split(" ");
			var abr = '(';
			for (var j = 0; j < nombres.length; j++) {
				abr = abr + nombres[j].substring(0, 1);
			}
			abr = abr + ')';
			
			
			var comentario = dataDetalle.getValue(row, cdet_comentario);
			if (comentario != null) {
				comentario = comentario.split('>').join('&#62');
				comentario = comentario.split('<').join('&#60');
				comentario = comentario.split('"').join('&#34');
			}
			
			if (dataDetalle.getValue(row, cdet_tipo) != "3") {
				cadComentarios = cadComentarios + '<tr>';
				cadComentarios = cadComentarios + '<td width="200px" class="cell_style_justify">' + dataDetalle.getValue(row, cdet_fecha) + ' ' + abr + '</td>';
				cadComentarios = cadComentarios + '<td width="800px" class="cell_style_justify">' + comentario + '</td>';
				cadComentarios = cadComentarios + '</tr>';
			} else {
				cadDiagnostico = cadDiagnostico + '<tr>';
				cadDiagnostico = cadDiagnostico + '<td width="200px" class="cell_style_justify">' + dataDetalle.getValue(row, cdet_fecha) + ' ' + abr + '</td>';
				cadDiagnostico = cadDiagnostico + '<td width="800px" class="cell_style_justify">' + comentario + '</td>';
				cadDiagnostico = cadDiagnostico + '</tr>';
			}
			
			
			
		}

		
	}
	$("#tabla-comentarios tbody").empty();
	$("#tabla-comentarios tbody").append(cadComentarios);
	$("#tabla-diagnostico tbody").empty();
	$("#tabla-diagnostico tbody").append(cadDiagnostico);
}

function getOcurrencias(elemento) {
	var cad = "";
	var found = true;
	for (var row = 0; row < dataOcurrencias.getNumberOfRows(); row++) {
		found = true;
		
		if (!(elemento.id == dataOcurrencias.getValue(row, coc_folio_padre))) {
				found = false;
		}
		
		if (found == true) {
			var circle = "";
			cad = cad + '<tr>';
			
			cad = cad + '<td class="hcenter-row ">' + dataOcurrencias.getValue(row, coc_folio) + '</td>';
			cad = cad + '<td>' + dataOcurrencias.getValue(row, coc_titulo) + '</td>';
			cad = cad + '<td class="hcenter-row ">' + dataOcurrencias.getValue(row, coc_aplicativo) + '</td>';
			cad = cad + '<td class="hcenter-row ">' + dataOcurrencias.getValue(row, coc_fecha_registro) + '</td>';
			cad = cad + '<td class="hcenter-row ">' + dataOcurrencias.getValue(row, coc_estatus) + '</td>';
			cad = cad + '<td class="hcenter-row ">' + dataOcurrencias.getValue(row, coc_fecha_estatus) + '</td>';
			if (dataOcurrencias.getValue(row, coc_ind) == "1")
				circle = "&#9899;";
			else
				circle == "";
			cad = cad + '<td class="hcenter-row " style="color:red;">' + circle + '</td>';
			
			cad = cad + '<td class="hcenter-row ">' + dataOcurrencias.getValue(row, coc_area_responsable) + '</td>';
			cad = cad + '</tr>';
		}
		
	}
	$("#tabla-ocurrencias tbody").empty();
	$("#tabla-ocurrencias tbody").append(cad);
	$('#tabla-ocurrencias').fixedHeaderTable('destroy');
	$('#tabla-ocurrencias').fixedHeaderTable('show', 1000);
}

function getFechaCompromiso(fecha_compromiso) {
	var dia = fecha_compromiso.substring(0,3);
	dia = dia - 0;
	var mes = 0;
	switch (fecha_compromiso.substring(3,6).toUpperCase()) {
		case "ENE":
			mes = 0;
			break;
		case "FEB":
			mes = 1;
			break;
		case "MAR":
			mes = 2;
			break;
		case "ABR":
			mes = 3;
			break;
		case "MAY":
			mes = 4;
			break;
		case "JUN":
			mes = 5;
			break;
		case "JUL":
			mes = 6;
			break;
		case "AGO":
			mes = 7;
			break;
		case "SEP":
			mes = 8;
			break;
		case "OCT":
			mes = 9;
			break;
		case "NOV":
			mes = 10;
			break;
		case "DIC":
			mes = 11;
			break;
	}
	var anio = fecha_compromiso.substring(7,10);
	anio = anio - 0;
	anio = anio + 2000;
	return new Date(anio, mes, dia);
}
function limpiar() {
	$("input:hidden").val('');
	$(".es-input").val('');
	$("#sFolio").val('');
	loadDataTable();
}
