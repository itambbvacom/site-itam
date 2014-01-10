function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function getAnnouncementsSlidder() {
  
  var pagina = SitesApp.getPageByUrl("https://sites.google.com/a/bbva.com/it-am-qa/sistemas-am/noticias");
  var announcements = pagina.getAnnouncements({ start: 0, max: 4});
  var noticias = '';
  var contacts = ContactsApp.getContacts();
  for (var i in announcements) {
      var fecha = Utilities.formatDate(announcements[i].getDatePublished(), "GMT", "dd/MM/yyyy");
      var titulo = announcements[i].getTitle();
      var contenido = announcements[i].getTextContent();
      var autor = announcements[i].getAuthors()[0];
      var url = announcements[i].getUrl();
      noticias = noticias + fecha + ';'+ titulo + ';' + contenido + ';' + autor + ';' + url + ';|';
  }
 
  return noticias;
}