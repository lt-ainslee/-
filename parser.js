function scheduleHtmlParser(html) {
  // section 数据处理
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
      // weeks数据处理
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
if (!html) {
return null;
} else {
// 数据解压
let class_data_one = html.split('@');
let class_data_info_all = [];
// console.log(class_data_one);
for (let i = 0; i < class_data_one.length; i++) {
  let class_date_info_one = class_data_one[i].split('^');
  // class_data_info_all.push(class_date_info_one);
  let class_data_info_one_array = [];
  for (let j = 0; j < class_date_info_one.length; j++) {
      class_data_info_one_array.push(class_date_info_one[j].split('&'));
  };
  class_data_info_all.push(class_data_info_one_array);
};
// 数据处理
outPutData = []
for (let i = 0; i < class_data_info_all.length; i++) {
  let class_one = class_data_info_all[i];
  let class_data = {
      name: class_one[1][1],                // 课程名称
      position: class_one[10][1],         // 上课地点
      teacher: class_one[11][1],             // 教师名称
      weeks: weeks(class_one[8][1]),         // 周数
      day: Number(class_one[6][1]),                      // 星期
      sections: sections(class_one[7][1]),         // 节次
  };
  outPutData.push(class_data);
};
return outPutData
}
}