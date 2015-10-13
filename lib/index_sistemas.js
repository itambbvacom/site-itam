				var data, dataManuals, dataGAPS, count; 
				//columnas
				var row_selected;
				var col_aplicativo = 0;
				var col_funcionalidad = 1;
				var col_proveedor = 2;
				var col_version_qa = 3;
				var col_version_pr = 4;
				var col_equipo_pr = 5;
				var col_equipo_qa = 6;
				var col_ubicacioneq_pr = 7;
				var col_ubicacioneq_qa = 8;
				var col_sistema = 9;
				var col_lenguaje = 10;
				var col_basedatos_pr = 11;
				var col_basedatos_qa = 12;
				var col_clientebd_pr = 13;
				var col_clientebd_qa = 14;
				var col_licenciasw_pr = 15;
				var col_licenciasw_qa = 16;
				var col_licenciabd_pr = 17;
				var col_licenciabd_qa = 18;
				var col_equipovir_pr = 19;
				var col_equipovir_qa = 20;
				var col_citrix_pr = 21;
				var col_citrix_qa = 22;
				var col_fondosmutuos = 23;
				var col_porvenir = 24;
				var col_seguros = 25;
				var col_terceros = 26;
				var col_fideicomisos = 27;
				var col_prevision = 28;
				var col_fija = 29;
				var col_variable = 30;
				var col_fondofondos = 31;
				var col_listados = 32;
				var col_otc = 33;
				var col_front = 34;
				var col_ejecucion = 35;
				var col_middle = 36;
				var col_producto = 37;
				var col_riesgos = 38;
				var col_ics = 39;
				var col_back = 40;
				var col_control = 41;
				var col_funcionalidades = 42;
				var col_mapaintegracion = 43;
				var html_gp = '';
				//
				var myUrl = window.location.href;
				var myUrlTab = myUrl.substring(myUrl.indexOf("#"));  
				var myUrlTabName = myUrlTab.substring(0,4);
				//
				if(typeof String.prototype.trim !== 'function') {
				  String.prototype.trim = function() {
					return this.replace(/^\s+|\s+$/g, ''); 
				  }
				}                        
				google.setOnLoadCallback(getdata);
				google.load('visualization', '1.1', {packages: ['controls','table']});
				
				function getdata() {
					var query = new google.visualization.Query('https://spreadsheets.google.com/a/bbva.com/tq?&tq=&key=1B0mDSVnN0Z0dv4wrDINx-J9ym66eKT6zdd4F5CweyjM&gid=1');
					query.send(handleQueryResponse);
					var queryManuals = new google.visualization.Query('https://spreadsheets.google.com/a/bbva.com/tq?&tq=&key=1B0mDSVnN0Z0dv4wrDINx-J9ym66eKT6zdd4F5CweyjM&gid=48');
					queryManuals.send(handleQueryResponseManuals);
					var queryGAPS = new google.visualization.Query('https://spreadsheets.google.com/a/bbva.com/tq?&tq=&key=1B0mDSVnN0Z0dv4wrDINx-J9ym66eKT6zdd4F5CweyjM&gid=1441491815');
					queryGAPS.send(handleQueryResponseGAPS);
				}
				function handleQueryResponseGAPS(response) {
					if (response.isError()) {
						//alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
						alert('No se tiene permisos al archivo de sistemas Gaps.');
						return;
					}
					dataGAPS = response.getDataTable();
				}
				function handleQueryResponseManuals(response) {
					if (response.isError()) {
						//alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
						alert('No se tiene permisos al archivo de sistemas Manuals.');
						return;
					}
					dataManuals = response.getDataTable();
				}
				function handleQueryResponse(response) {
					if (response.isError()) {
						//alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
						alert('No se tiene permisos al archivo de sistemas.');
						return;
					}
					data = response.getDataTable();
					var data_matrix = [];
					var data_array = [];
					var data_counts = [];
					var last_letter = '';
					var total = 0;
					var count_cols = 0;
					
					for (var row = 3; row < data.getNumberOfRows(); row++) {
						
						if (last_letter != data.getValue(row, col_aplicativo).substring(0, 1)) {
							if (data_array.length > 0) {
								total++;
								data_counts.push(count_cols);
								count_cols = 0;
								data_matrix.push(data_array);
								
							}
							data_array = [];
							data_arrayinfo = [];
							last_letter = data.getValue(row, col_aplicativo).substring(0, 1);
							data_array.push(last_letter);
						}
						count_cols++;
						data_array.push(data.getValue(row, col_aplicativo));
					}
					
					if (data_array.length > 0) {
						total++;
						data_counts.push(count_cols);
						count_cols = 0;
						data_matrix.push(data_array);
					}
					var html_text;
					count = 1;
					var col1 = Math.round(total / 3);
					var col2 = Math.round((total - col1)/ 2) + col1;
					for (var i = 0; i < data_matrix.length; i++) {
						for (var j = 0; j < data_matrix[i].length; j++) {
							if (j == 0) {
								html_text = '<div class="portlet" ><div class="portlet-header">' +
											 data_matrix[i][j] + '</div><div class="portlet-content">' +
											'<table width="100%">'
							} else {
								if (j%2 == 1) {
									html_text = html_text + '<tr><td width="45%" class="widget-content"><p><a class="inline widget-content" href="#inline_content" onclick="getData(this);" id="'+i+'_'+j+'">' + data_matrix[i][j] + '</a></p></td>';
								} else {
									html_text = html_text + '<td width="10%" class="widget-content"></td>';
									html_text = html_text + '<td width="45%" class="widget-content"><p><a class="inline widget-content" href="#inline_content" onclick="getData(this);" id="'+i+'_'+j+'">' + data_matrix[i][j] + '</a></p></td></tr>';
								}
							}
							
							 
						}
						
						html_text = html_text + '</table></div></div>';
						
						if (count <= col1)
							$('#column1').append(html_text);
						if (count > col1 && count <= col2)
							$('#column2').append(html_text);
						if (count > col2)
							$('#column3').append(html_text);
						count++;
					}
					makeportlets();
					$(".inline").colorbox({inline:true, width:"85%", height:"100%"});
					mostrarocultar();
				}
				function makeportlets() {
					$( ".column" ).sortable({
					  connectWith: ".column",
					  handle: ".portlet-header",
					  cancel: ".portlet-toggle",
					  placeholder: "portlet-placeholder ui-corner-all"
					});
				 
					$( ".portlet" )
					  .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
					  .find( ".portlet-header" )
						.addClass( "ui-widget-header ui-corner-all" )
						.prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");
				 
					$( ".portlet-toggle" ).click(function() {
					  var icon = $( this );
					  icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
					  icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
					});
					
					
				}
				function getData(elemento) {
					var funcionalidades;
					html_gp = '';
					$('#content-tab1').remove();
					$('#content-tab2').remove();
					$('#content-tab3').remove();
					$('#id_content04_mapa').remove();
					$('#content-tab4-gapf-det').remove();
					$('#content-tab4-gapt-det').remove();
					$('#content-tab5').remove();
					$('#content-tab6').remove();
					row_selected = null;
					for (var row = 3; row < data.getNumberOfRows(); row++) {
					    
						if (elemento.text == data.getValue(row, col_aplicativo)) {
							row_selected = row;
							$("#id_aplicativo").text(data.getValue(row, col_aplicativo));
							$("#id_funcionalidad").text(data.getValue(row, col_funcionalidad));
							
							//NEGOCIO
							data.getValue(row, col_fondosmutuos) == 'SI' ? $("#id_fondosmutuos").prop('checked', true) : $("#id_fondosmutuos").prop('checked', false);
							data.getValue(row, col_porvenir) == 'SI' ? $("#id_porvenir").prop('checked', true) : $("#id_porvenir").prop('checked', false);
							data.getValue(row, col_seguros) == 'SI' ? $("#id_seguros").prop('checked', true) : $("#id_seguros").prop('checked', false);
							data.getValue(row, col_terceros) == 'SI' ? $("#id_terceros").prop('checked', true) : $("#id_terceros").prop('checked', false);
							data.getValue(row, col_fideicomisos) == 'SI' ? $("#id_fideicomisos").prop('checked', true) : $("#id_fideicomisos").prop('checked', false);
							data.getValue(row, col_prevision) == 'SI' ? $("#id_prevision").prop('checked', true) : $("#id_prevision").prop('checked', false);
							//MERCADO
							data.getValue(row, col_fija) == 'SI' ? $("#id_fija").prop('checked', true) : $("#id_fija").prop('checked', false);
							data.getValue(row, col_variable) == 'SI' ? $("#id_variable").prop('checked', true) : $("#id_variable").prop('checked', false);
							data.getValue(row, col_fondofondos) == 'SI' ? $("#id_fondofondos").prop('checked', true) : $("#id_fondofondos").prop('checked', false);
							data.getValue(row, col_listados) == 'SI' ? $("#id_listados").prop('checked', true) : $("#id_listados").prop('checked', false);
							data.getValue(row, col_otc) == 'SI' ? $("#id_otc").prop('checked', true) : $("#id_otc").prop('checked', false);
							//AREAS
							
							data.getValue(row, col_front) == 'SI' ? $("#id_front").prop('checked', true) : $("#id_front").prop('checked', false);
							data.getValue(row, col_ejecucion) == 'SI' ? $("#id_ejecucion").prop('checked', true) : $("#id_ejecucion").prop('checked', false);
							data.getValue(row, col_middle) == 'SI' ? $("#id_middle").prop('checked', true) : $("#id_middle").prop('checked', false);
							data.getValue(row, col_riesgos) == 'SI' ? $("#id_riesgos").prop('checked', true) : $("#id_riesgos").prop('checked', false);
							data.getValue(row, col_back) == 'SI' ? $("#id_back").prop('checked', true) : $("#id_back").prop('checked', false);
							data.getValue(row, col_producto) == 'SI' ? $("#id_producto").prop('checked', true) : $("#id_producto").prop('checked', false);
							data.getValue(row, col_ics) == 'SI' ? $("#id_ics").prop('checked', true) : $("#id_ics").prop('checked', false);
							data.getValue(row, col_control) == 'SI' ? $("#id_control").prop('checked', true) : $("#id_control").prop('checked', false);
							
							//DESCRIPCION TECNICA
							$("#id_proveedor").text(data.getValue(row, col_proveedor) != null ? data.getValue(row, col_proveedor) : '');
							$("#id_version").text(data.getValue(row, col_version_pr) != null ? data.getValue(row, col_version_pr) : '');
							
							$("#id_equipo").text(data.getValue(row, col_equipo_pr) != null ? data.getValue(row, col_equipo_pr) : '');
							$("#id_ubicacioneq").text(data.getValue(row, col_ubicacioneq_pr) != null ? data.getValue(row, col_ubicacioneq_pr) : '');
							
							$("#id_sistema").text(data.getValue(row, col_sistema) != null ? data.getValue(row, col_sistema) : '');
							$("#id_lenguaje").text(data.getValue(row, col_lenguaje) != null ? data.getValue(row, col_lenguaje) : '');
							
							$("#id_basedatos").text(data.getValue(row, col_basedatos_pr) != null ? data.getValue(row, col_basedatos_pr) : '');
							$("#id_clientebd").text(data.getValue(row, col_clientebd_pr) != null ? data.getValue(row, col_clientebd_pr) : '');
							
							$("#id_licenciasw").text(data.getValue(row, col_licenciasw_pr) != null ? data.getValue(row, col_licenciasw_pr) : '');
							$("#id_licenciabd").text(data.getValue(row, col_licenciabd_pr) != null ? data.getValue(row, col_licenciabd_pr) : '');
							
							data.getValue(row, col_equipovir_pr) == 'SI' ? $("#id_equipovir").prop('checked', true) : $("#id_equipovir").prop('checked', false);
							data.getValue(row, col_citrix_pr) == 'SI' ? $("#id_citrix").prop('checked', true) : $("#id_citrix").prop('checked', false);
					
							funcionalidades = data.getValue(row, col_funcionalidades);
							if (funcionalidades != null) {
								funcionalidades = funcionalidades.split('>').join('&#62');
								funcionalidades = funcionalidades.split('<').join('&#60');
								funcionalidades = funcionalidades.split('"').join('&#34');
								$("#id_funcionalidades").text(funcionalidades);
							} else {
								$("#id_funcionalidades").text('');
							}
							
							
							
							//INTERACCION DECALOG
							/*
							data.getValue(row, col_conexion) == 'SI' ? $("#id_conexion").prop('checked', true) : $("#id_conexion").prop('checked', false);
							data.getValue(row, col_envia) == 'SI' ? $("#id_envia").prop('checked', true) : $("#id_envia").prop('checked', false);
							data.getValue(row, col_recibe) == 'SI' ? $("#id_recibe").prop('checked', true) : $("#id_recibe").prop('checked', false);
							*/
							//MAPA INTEGRACION (PRESENTACION)
							if (data.getValue(row, col_mapaintegracion) != null) {
								var heightmapa = 600;
								var widthmapa = 960;
								html_gp = '<table id="id_cont_mapa" width="100%"><tr><td>';
								html_gp = html_gp + '<iframe src="https://docs.google.com/a/bbva.com/presentation/d/'+ data.getValue(row, col_mapaintegracion) + '/embed?start=false&loop=false&delayms=10000" frameborder="0" width="' + widthmapa + '" height="' + heightmapa + '" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>';
								html_gp = html_gp + '</td></tr><tr><td>' + '</td></tr></table>';
							}
							
						}
					}
					
					var col_aplicativoM = 0;
					var col_tituloM = 1;
					var col_datoM = 2;
					var col_clasificacionM = 3;
					
					var html_mf = '';
					var html_mt = '';
					var html_rutas = '';
					var html_ba = '';
					var html_s = '';
					
					var countMF = 1, countMT = 1, countRU = 1, countBA = 1, countS = 1;
					for (var rowM = 1; rowM < dataManuals.getNumberOfRows(); rowM++) {
						if (elemento.text == dataManuals.getValue(rowM, col_aplicativoM)) {
							if (dataManuals.getValue(rowM, col_clasificacionM) == "MF") {
								if (countMF%2 == 1) {
									html_mf = html_mf + '<tr><td width="45%"><p><a href="' + dataManuals.getValue(rowM, col_datoM) + '" >' + dataManuals.getValue(rowM, col_tituloM) + '</a></p></td>';
								} else {
									html_mf = html_mf + '<td width="10%" class="widget-content"></td>';
									html_mf = html_mf + '<td width="45%"><p><a href="' + dataManuals.getValue(rowM, col_datoM) + '" >' + dataManuals.getValue(rowM, col_tituloM) + '</a></p></td></tr>';
								}
								countMF++;
							}
							if (dataManuals.getValue(rowM, col_clasificacionM) == "MT") {
								if (countMT%2 == 1) {
									html_mt = html_mt + '<tr><td width="45%"><p><a href="' + dataManuals.getValue(rowM, col_datoM) + '" >' + dataManuals.getValue(rowM, col_tituloM) + '</a></p></td>';
								} else {
									html_mt = html_mt + '<td width="10%"></td>';
									html_mt = html_mt + '<td width="45%"><p><a href="' + dataManuals.getValue(rowM, col_datoM) + '" >' + dataManuals.getValue(rowM, col_tituloM) + '</a></p></td></tr>';
								}
								countMT++;
							}
							if (dataManuals.getValue(rowM, col_clasificacionM) == "R") {
								html_rutas = html_rutas + '<h3 style="margin: 0;">' + dataManuals.getValue(rowM, col_tituloM) + '</h3><p>' + dataManuals.getValue(rowM, col_datoM) + '</p>';
							}
							if (dataManuals.getValue(rowM, col_clasificacionM) == "B") {
								if (countBA%2 == 1) {
									html_ba = html_ba + '<tr><td width="45%"><p><a href="' + dataManuals.getValue(rowM, col_datoM) + '" >' + dataManuals.getValue(rowM, col_tituloM) + '</a></p></td>';
								} else {
									html_ba = html_ba + '<td width="10%"></td>';
									html_ba = html_ba + '<td width="45%"><p><a href="' + dataManuals.getValue(rowM, col_datoM) + '" >' + dataManuals.getValue(rowM, col_tituloM) + '</a></p></td></tr>';
								}
								countBA++;
							}
							if (dataManuals.getValue(rowM, col_clasificacionM) == "S") {
								if (countS%2 == 1) {
									html_s = html_s + '<tr><td width="45%"><p><a href="' + dataManuals.getValue(rowM, col_datoM) + '" >' + dataManuals.getValue(rowM, col_tituloM) + '</a></p></td>';
								} else {
									html_s = html_s + '<td width="10%"></td>';
									html_s = html_s + '<td width="45%"><p><a href="' + dataManuals.getValue(rowM, col_datoM) + '" >' + dataManuals.getValue(rowM, col_tituloM) + '</a></p></td></tr>';
								}
								countS++;
							}
						}
					}
					
					if (html_mf.length > 0) {
						$('#tab1').append('<div id="content-tab1"><table width="100%">' + html_mf + '</table></div>');
					}
					if (html_mt.length > 0) {
						$('#tab2').append('<div id="content-tab2"><table width="100%">' + html_mt + '</table></div>');
					}
					if (html_rutas.length > 0) {
						$('#tab3').append('<div id="content-tab3">' + html_rutas + '</div>');
					}
					if (html_ba.length > 0) {
						$('#tab5').append('<div id="content-tab5"><table width="100%">' + html_ba + '</table></div>');
					}
					
					if (html_s.length > 0) {
						$('#tab6').append('<div id="content-tab6"><table width="100%">' + html_s + '</table></div>');
					}
					
					var col_aplicativoG = 0;
					var col_gapG = 1;
					var col_clasificacionG = 2;
					
					var html_gapf = '';
					var html_gapt = '';
					
					for (var rowG = 1; rowG < dataGAPS.getNumberOfRows(); rowG++) {
						if (elemento.text == dataGAPS.getValue(rowG, col_aplicativoG)) {
							if (dataGAPS.getValue(rowG, col_clasificacionG) == "GF") {
								html_gapf = html_gapf + '<input type="checkbox" disabled><label>' + dataGAPS.getValue(rowG, col_gapG) + '</label></br>'
							}
							if (dataGAPS.getValue(rowG, col_clasificacionG) == "GT") {
								html_gapt = html_gapt + '<input type="checkbox" disabled><label>' + dataGAPS.getValue(rowG, col_gapG) + '</label></br>'
							}

						}
					}
					
					if (html_gapf.length > 0) {
						$('#content-tab4-gapf').append('<div id="content-tab4-gapf-det">' + html_gapf + '</div>');
					}
					if (html_gapt.length > 0) {
						$('#content-tab4-gapt').append('<div id="content-tab4-gapt-det">' + html_gapt + '</div>');
					}

					if (html_gp.length > 0) {
						$('#id_content04').append('<div id="id_content04_mapa">' + html_gp + '</div>');
					}
					
					$('#multiAccordion').multiAccordion();
					resetAccordion();
					resetTabs();
					tabs_load();
					load_data('PR');
					$('input:checkbox(:checked)').each(function() {
						$("#" + ($(this)[0].id) + "l").css('color','#000000');
					});
					$('input:checkbox:not(:checked)').each(function() {
						$("#" + ($(this)[0].id) + "l").css('color','#C3C3C3');
					});
				}
				function resetAccordion() {
					for (var i = 1; i < 5; i++) {
						cadena = $("#id_content0" + i)[0].className;
						if (cadena.search("ui-accordion-content-active") == -1 ) {
							$("#id_header0" + i).trigger('click');
						}
					}
					for (var i = 2; i < 5; i++) {
						cadena = $("#id_header0" + i)[0].className;
						if (cadena.search("ui-state-active") != -1 ) {
							$("#id_header0" + i).trigger('click');
						}
					}
					
				}
				function tabs_load() {
					$("#content > div").hide(); 
					$("#tabs li:first a").attr("id","current"); 
					$("#content > div:first").fadeToggle(1000); 
					
					$("#tabs a").on("click",function(e) {
						
						e.preventDefault();
						if ($(this).attr("id") == "current"){ 
						 return       
						}
						else{             
						resetTabs();
						$(this).attr("id","current");
						$($(this).attr('name')).fadeToggle(1000);
						}
					});
				}
				function resetTabs(){
					$("#content > div").hide(); 
					$("#tabs a").attr("id","");
				}
				function mostrarocultar() {
					var cadena, indplus, indminus, countp = 0, countm = 0;

					for (var j = 0; j < count-1; j++) {
						cadena = $(".portlet-toggle").eq(j)[0].className;
						indplus = cadena.search("plusthick");
						indminus = cadena.search("minusthick");
						if (indplus != -1) {
							countp++;
						}
						if (indminus != -1) {
							countm++;
						}
					}
					for (var j = 0; j < count-1; j++) {
						cadena = $(".portlet-toggle").eq(j)[0].className;
						indplus = cadena.search("plusthick");
						indminus = cadena.search("minusthick");
						if (countp > countm) {
							if (indplus != -1)
								$(".portlet-toggle").eq(j).trigger('click');
						} else {
							if (indminus != -1)
								$(".portlet-toggle").eq(j).trigger('click');
						}
						
					}
					
				}
				function load_data(tipo_data) {
					if (tipo_data == 'PR') {
						$("#id_qa").css("font-weight", "normal");
						$("#id_qa").css("font-size", "1.4em");
						$("#id_pr").css("font-weight", "bold");
						$("#id_pr").css("font-size", "1.6em");
						
						$("#id_version").text(data.getValue(row_selected, col_version_pr) != null ? data.getValue(row_selected, col_version_pr) : '');
						$("#id_equipo").text(data.getValue(row_selected, col_equipo_pr) != null ? data.getValue(row_selected, col_equipo_pr) : '');
						$("#id_ubicacioneq").text(data.getValue(row_selected, col_ubicacioneq_pr) != null ? data.getValue(row_selected, col_ubicacioneq_pr) : '');
						$("#id_basedatos").text(data.getValue(row_selected, col_basedatos_pr) != null ? data.getValue(row_selected, col_basedatos_pr) : '');
						$("#id_clientebd").text(data.getValue(row_selected, col_clientebd_pr) != null ? data.getValue(row_selected, col_clientebd_pr) : '');
						$("#id_licenciasw").text(data.getValue(row_selected, col_licenciasw_pr) != null ? data.getValue(row_selected, col_licenciasw_pr) : '');
						$("#id_licenciabd").text(data.getValue(row_selected, col_licenciabd_pr) != null ? data.getValue(row_selected, col_licenciabd_pr) : '');
						data.getValue(row_selected, col_equipovir_pr) == 'SI' ? $("#id_equipovir").prop('checked', true) : $("#id_equipovir").prop('checked', false);
						data.getValue(row_selected, col_citrix_pr) == 'SI' ? $("#id_citrix").prop('checked', true) : $("#id_citrix").prop('checked', false);
					} else {
						$("#id_pr").css("font-weight", "normal");
						$("#id_pr").css("font-size", "1.4em");
						$("#id_qa").css("font-weight", "bold");
						$("#id_qa").css("font-size", "1.6em");
						
						$("#id_version").text(data.getValue(row_selected, col_version_qa) != null ? data.getValue(row_selected, col_version_qa) : '');
						$("#id_equipo").text(data.getValue(row_selected, col_equipo_qa) != null ? data.getValue(row_selected, col_equipo_qa) : '');
						$("#id_ubicacioneq").text(data.getValue(row_selected, col_ubicacioneq_qa) != null ? data.getValue(row_selected, col_ubicacioneq_qa) : '');
						$("#id_basedatos").text(data.getValue(row_selected, col_basedatos_qa) != null ? data.getValue(row_selected, col_basedatos_qa) : '');
						$("#id_clientebd").text(data.getValue(row_selected, col_clientebd_qa) != null ? data.getValue(row_selected, col_clientebd_qa) : '');
						$("#id_licenciasw").text(data.getValue(row_selected, col_licenciasw_qa) != null ? data.getValue(row_selected, col_licenciasw_qa) : '');
						$("#id_licenciabd").text(data.getValue(row_selected, col_licenciabd_qa) != null ? data.getValue(row_selected, col_licenciabd_qa) : '');
						data.getValue(row_selected, col_equipovir_qa) == 'SI' ? $("#id_equipovir").prop('checked', true) : $("#id_equipovir").prop('checked', false);
						data.getValue(row_selected, col_citrix_qa) == 'SI' ? $("#id_citrix").prop('checked', true) : $("#id_citrix").prop('checked', false);
					}
					
				}
				function mostrarocultardetalle() {
					var cadena;
					var count_active = 0;
					var active_acc = true;
					for (var i = 1; i < 4; i++) {
						cadena = $("#id_header0" + i)[0].className;
						if (cadena.search("ui-state-active") != -1) {
							count_active++;
						}
					}
					if (count_active >= 3) {
						active_acc = false;
					}
					for (var i = 1; i < 4; i++) {
						cadena = $("#id_header0" + i)[0].className;
						if (cadena.search("ui-state-active") != -1 && !active_acc) {
							$("#id_header0" + i).trigger('click');
						}
						if (cadena.search("ui-state-active") == -1 && active_acc) {
							$("#id_header0" + i).trigger('click');
						}
					}
					cadena = $("#id_header04")[0].className;
					if (cadena.search("ui-state-active") != -1) {
						$("#id_header04").trigger('click');
					}
					
				}
