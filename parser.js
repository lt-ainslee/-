function scheduleHtmlParser(data) {
//sections数据处理
function sections(section) {
  //第一步清洗（得到xx-xx）
  let new_data = /第(?<sectionStart>\d+)-(?<sectionStop>\d+)节/.exec(section).groups
  let start = Number(new_data.sectionStart);
  let stop = Number(new_data.sectionStop);
  let data = [];
  if (new_data) {
    for (let i = start; i <= stop; i++) {
      data[i - start] = i
      };
      return data;
  } else {
    console.log("课程节次获取失败！！！！！！");
    return null
  }
  
}
//weeks数据处理

function weeks(week) {
  let arrayWeek = week.split(',');
  let arrayList = [];
  let j = 0;
  if (!arrayWeek) {
      console.log("课程周数获取失败！！！");
      return null;
  } else {
    for (let i = 0; i < arrayWeek.length; i++) {
      if (arrayWeek[i].indexOf('-') == -1) {
          if (arrayList.indexOf(Number(arrayWeek[i])) == -1 ) {
              arrayList[j] = Number(arrayWeek[i]);
              j += 1;
          } else {
              continue;
          }
          
      } else {
          let new_week = /(?<weekStart>\d+)-(?<weekStop>\d+)/.exec(arrayWeek[i]).groups;
          let start = Number(new_week.weekStart);
          let stop = Number(new_week.weekStop);
          for (let k = start; k <= stop; k++) {
              if (arrayList.indexOf(k) == -1 ) {
                  arrayList[j] = k;
                  j += 1
              } else {
                  continue;
              }
              
              };
      }
  };
  return arrayList;
  }
  
};
var myre = /<tr><th>课程：<\/th><td colspan=&quot;3&quot;>(?<name>.*?)<\/td><\/tr>.*?<tr><th width=&quot;25%&quot;>星期：<\/th><td width=&quot;25%&quot;>(?<day>.*?)<\/td><th width=&quot;25%&quot;>节次：<\/th><td width=&quot;25%&quot;>(?<sections>.*?)<\/td><\/tr><tr><th width=&quot;25%&quot;>上课周次：<\/th><td width=&quot;25%&quot;>(?<weeks>.*?)<\/td><th width=&quot;25%&quot;>课序号：<\/th><td style=&quot;word-break:break-all;&quot; width=&quot;25%&quot;>.*?<\/td><\/tr><tr><th>教学场地：<\/th><td  colspan=&quot;3&quot;>(?<position>.*?)<\/td><\/tr><tr><th>授课教师：<\/th><td colspan=&quot;3&quot;>(?<teacher>.*?)<\/td><\/tr>/g;
var dataList = [];
var data_first = data.match(myre);
if (!data_first) {
  console.log("err：正则匹配为空！！")
} else {
  for (let j = 0; j < data_first.length; j++) {
    var myre = /<tr><th>课程：<\/th><td colspan=&quot;3&quot;>(?<name>.*?)<\/td><\/tr>.*?<tr><th width=&quot;25%&quot;>星期：<\/th><td width=&quot;25%&quot;>(?<day>.*?)<\/td><th width=&quot;25%&quot;>节次：<\/th><td width=&quot;25%&quot;>(?<sections>.*?)<\/td><\/tr><tr><th width=&quot;25%&quot;>上课周次：<\/th><td width=&quot;25%&quot;>(?<weeks>.*?)<\/td><th width=&quot;25%&quot;>课序号：<\/th><td style=&quot;word-break:break-all;&quot; width=&quot;25%&quot;>.*?<\/td><\/tr><tr><th>教学场地：<\/th><td  colspan=&quot;3&quot;>(?<position>.*?)<\/td><\/tr><tr><th>授课教师：<\/th><td colspan=&quot;3&quot;>(?<teacher>.*?)<\/td><\/tr>/;
    var data_new = myre.exec(data_first[j]).groups;
    console.log('本次提取的数据预览：',data_new);
    let classList = new Object();
    classList.name = data_new.name;
    classList.position = data_new.position;
    classList.teacher = data_new.teacher;
    classList.weeks = weeks(data_new.weeks);
    classList.day = Number(data_new.day);
    classList.sections = sections(data_new.sections);
    console.log('数据字典：',classList)
    //classList.name = data_new[1];
    //dataList[j] = classList
    
    //console.log(j)
    dataList[j] = classList
  };
};
return dataList 

}

