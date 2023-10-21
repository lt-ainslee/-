function scheduleHtmlProvider() {
  let idoc1 = document.getElementsByTagName('iframe')[1].contentWindow.document.getElementsByTagName('iframe')[0].contentWindow.document;
  // 一周内的课程按day分组为数组
  let tbody1 = idoc1.getElementsByClassName('fc-content-col');
  if (!tbody1) { 
          console.log('空');
          return null; 
      } else {
          var class_data_all = [];
          // 循环每天的课程（七天（七次循环））
          for (let i = 0; i < tbody1.length; i ++) {
              // 获取某天课程信息（data），结果为数组类型（数组里每个元素即为每个课程的详细信息）
              let data = tbody1[i].getElementsByClassName('fc-time-grid-event fc-v-event fc-event fc-start fc-end'); //数组：[课程1，课程2，.....]
              //console.log(data);
              // 循环某天的每个课程
              for (let j = 0; j < data.length; j++) {
                  let innerdata = data[j]; //DOM对象
                  // 提取标签的关键字的值（存贮课程信息的关键字值）
                  let mydata = innerdata.getAttribute('lay-tips');
                  var class_data = [];
                  // 插入document中方便DOM读取
                  innerdata.innerHTML = mydata;
                  // console.log(innerdata);
                  let mytr = innerdata.getElementsByTagName('tr');
                  for (let k = 0; k < mytr.length; k++) {
                      let myth = mytr[k].getElementsByTagName('th');
                      let mytd = mytr[k].getElementsByTagName('td');
                      for (let i = 0; i < mytd.length; i++) {
                          let myob = myth[i].innerHTML + '&' + mytd[i].innerHTML;  // 课程的子信息 'info&data'
                          class_data.push(myob);
                          // console.log(myob);
                      };
  
                  };
                  class_data_all.push(class_data.join('^'));
                  // console.log(class_data.join('^'))
              }
              
          };
          ///console.log(class_data_all.join('@'));
          return class_data_all.join('@')
      };
  }