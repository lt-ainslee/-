async function scheduleHtmlProvider() {
 var idoc = document.getElementsByTagName('iframe')[1].contentWindow.document.getElementsByTagName('iframe')[0].contentWindow.document;
  //console.log('m', m);
  var a = idoc.getElementById('calendar');
  if (!a) {
    console.log('获取的html为空！！');
    return null
  } else {
    var b = a.getElementsByClassName("fc-content-skeleton")[0];
  
    var c = b.getElementsByClassName("fc-event-container");
    var data = ""
  for (let i = 0; i < c.length; i++) {
     /* console.log(c[i].innerHTML) */
      data += c[i].innerHTML;
      //console.log(data.length)
      
  };
  return data
  }
}
