function updateNoticias() {
  var spreadsheet = SpreadsheetApp.openByUrl("https://spreadsheet.google.com/a/bbva.com/ccc?key=0AuL8XqqgbAI4dG5xVEdKZnZUY2NSR29mNi1VQm92TXc");
  var sheet = spreadsheet.getSheetByName("Noticias");
  var page = SitesApp.getPageByUrl("https://sites.google.com/a/bbva.com/it-am/sistemas-am/noticias");
  var announcements = page.getAnnouncements({ start: 0, max: 4});
  
  var column_fecha = 1;
  var column_titulo = 2;
  var column_contenido = 3;
  var column_autor = 4;
  var column_url = 5;
  var range;
  
  for (var i in announcements) {
    var fecha = Utilities.formatDate(announcements[i].getDatePublished(), "GMT", "dd/MM/yyyy");
    var titulo = announcements[i].getTitle();
    var contenido = announcements[i].getTextContent();
    var autor = announcements[i].getAuthors()[0];
    var url = announcements[i].getUrl();
    
    range = sheet.getRange((+i + 2), column_fecha);
    range.setValue(fecha);
    range = sheet.getRange((+i + 2), column_titulo);
    range.setValue(titulo);
    range = sheet.getRange((+i + 2), column_contenido);
    range.setValue(contenido);
    range = sheet.getRange((+i + 2), column_autor);
    range.setValue(autor);
    range = sheet.getRange((+i + 2), column_url);
    range.setValue(url);

  }
 
  
}