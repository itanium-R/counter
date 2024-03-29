function addCount(rem) {
  try{
    // スプレッドシートの操作
    const sheet = openShtByName("cnt");
    var rows  = sheet.getLastRow()+1;
    
    sheet.getRange(rows,1,1,3).setValues([[new Date(),rows-1,rem]]);
    
    return (rows-1);
  }catch(e){
    return -1;
  }
}

function getCount() {
  try{
    // スプレッドシートの操作
    const sheet = openShtByName("cnt");
    var rows  = sheet.getLastRow();
    
    return (rows-1);
  }catch(e){
    return -1;
  }
}

// ページにアクセスされたときに実行
function doGet(e) {    
  return HtmlService.createTemplateFromFile("index").evaluate()
    .setTitle('Counter')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    
}

//アクティブスプレッドシートのnameシートを開く函数
// @param  name {str} シート名
// @return {sheetObject}
function openShtByName(name){
  try{
    const ss = SpreadsheetApp.getActiveSpreadsheet(); //アクティブスプレッドシートを開く->ss
    const sss = ss.getSheetByName(name);              //nameという名前のシートを開く->sss
    return sss;
  }catch(e){                                          //エラー発生時は表示
    Browser.msgBox("シートを開けませんでした");
    return -1;
  }
}

function getChartBlob(){
  var sht = openShtByName("gr");
  // そのシートにある全てのグラフを取得
  var chart = sht.getCharts()[0];
  return (Utilities.base64Encode((chart.getBlob().getBytes())));
}