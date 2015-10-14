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

                                var query = new google.visualization.Query('https://docs.google.com/a/bbva.com/spreadsheet/ccc?key=1H-GWfPxz-oTpkYJ2YGEhRl91QyI7wwclfD4VQnIG4vM&usp=drive_web#gid=0');
                                query.send(handleQueryResponse);
                        }
                        
                        function handleQueryResponse(response) {
                                if (response.isError()) {
                                        alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
                                        return;
                                }
                        
                                var data = response.getDataTable();
								var html_content, html_content_temp, index;
								
                                for (var row = 0; row < data.getNumberOfRows(); row++) {
										html_content_temp = data.getValue(row, 2);
										html_content_temp = removespansfonts(html_content_temp);
										index = html_content_temp.indexOf('<td');
										index = html_content_temp.indexOf('>', index);
										html_content = html_content_temp.slice(0, index + 1);
										html_content = html_content + '<h5 style="color:#094FA4;margin:0;">';
										html_content = html_content + html_content_temp.slice(index + 1);
										html_content_temp = html_content;
										index = html_content_temp.lastIndexOf('</td>');
										html_content = html_content_temp.slice(0, index);
										html_content = html_content + '</h5>';
										html_content = html_content + html_content_temp.slice(index);

                                        $('#f' + (row + 1)).text('Fecha: ' + data.getFormattedValue(row, 0));
                                        $('#h' + (row + 1)).text(cut_text(data.getValue(row, 1), 43));
										$('#c' + (row + 1)).append(html_content);
                                        $('#a' + (row + 1)).text('Autor: ' + data.getValue(row, 3));
                                        $('#l' + (row + 1)).attr('href', data.getValue(row, 4));
                                }
                                
                                slide_news();
                        
                        }
                        function removespansfonts(html_text) {
							var index_class = html_text.indexOf("<span");
							var html_res;
							while (index_class != -1) {
								html_res = html_text.slice(0, index_class);
								index_class = html_text.indexOf(">", index_class + 5);
								html_res =  html_res + html_text.slice(index_class + 1);
								html_text = html_res;
								index_class = html_text.indexOf("<span");
							}
							index_class = html_text.indexOf("</span");
							while (index_class != -1) {
								html_res = html_text.slice(0, index_class);
								index_class = html_text.indexOf(">", index_class + 6);
								html_res =  html_res + html_text.slice(index_class + 1);
								html_text = html_res;
								index_class = html_text.indexOf("</span");
							}
							
							index_class = html_text.indexOf("<font");
							while (index_class != -1) {
								html_res = html_text.slice(0, index_class);
								index_class = html_text.indexOf(">", index_class + 5);
								html_res =  html_res + html_text.slice(index_class + 1);
								html_text = html_res;
								index_class = html_text.indexOf("<font");
							}
							
							index_class = html_text.indexOf("</font");
							while (index_class != -1) {
								html_res = html_text.slice(0, index_class);
								index_class = html_text.indexOf(">", index_class + 6);
								html_res =  html_res + html_text.slice(index_class + 1);
								html_text = html_res;
								index_class = html_text.indexOf("</font");
							}
							//
						
							return html_text;
							
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
                                        preloadImage : 'https://cdn.rawgit.com/itambbvacom/site-itam/master/img/loading.gif',
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
                                
                                $('.pagination li a').css('background-image', 'url(https://cdn.rawgit.com/itambbvacom/site-itam/master/img/pagination.png)');
                        }
