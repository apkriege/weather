// data needed and rough model
// fiveDay
// - day
// - date
// - high temp
// - low temp
// - precip
// - conditions
// - accumulations

// FIVE DAY DATA OBJECT
class FiveDay {
  constructor(d){
    this.five = {}
    this.data = d
    this.createArrayOfDays(d)
    this.rest = this.setProps()
  }
  createArrayOfDays(data){
    data = data.list;
    let ct = 0;
    let test = [];
    test[ct] = [];

    for(let i = 0; i < data.length; i++){
      let time = data[i].dt_txt.split(' ')[1];
      if(time == "00:00:00" && test[ct].length != 0){
        ct++;
        test[ct] = [];
      }
      test[ct].push(data[i]);
    }
    this.five.days = test;
  }
  setProps(){
    let rest = [];
    this.five.days.forEach(function(ele){
      let y = {};
      y.date = formatDate(ele[0].dt_txt);
      y.day = formatDay(ele[0].dt_txt);
      y.high = highTemp(ele);
      y.low = lowTemp(ele);
      y.conditions = ele[0].weather[0].main;
      y.icon = icon(y.conditions);
      y.accum = accumulation(ele);
      y.thresh = snowThresh(ele.accum);
      rest.push(y);
    })
    return rest;
  }

}

// HELPER FUNCTIONS
var formatDay = txt => {
  let day = new Date(txt);
  let d = day.getDay();
  var days = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
  return days[d];
}

var formatDate = txt => {
  let day = new Date(txt);
  let x = txt.split(' ')[0];
  let y = x.split('-');
  let date =  y[1]+'/'+y[2];
  return date;
}

var highTemp = data => {
  let that = this;
  let x = data[0].main.temp_max;

  data.forEach(function (ele){
    if(x < ele.main.temp_max){
      x = ele.main.temp_max;
    }
  })
  return formatTemp(x);
}

var lowTemp = data => {
  let that = this;
  let y = data[0].main.temp_min;

  data.forEach(function (ele){
    if(y > ele.main.temp_min){
      y = ele.main.temp_min;
    }
  })
  return formatTemp(y);
}

var accumulation = data => {
  let snow = 0;
  data.forEach(function (ele){
    if(ele.hasOwnProperty('snow' )&& ele.snow['3h'] != undefined){
      snow = snow + ele.snow['3h'];
    }
  })
  // return {total: snow, thresh: snowThresh(snow)};
  return snow;
}

var formatTemp = temp => {
  temp = 9/5 * (temp - 273) + 32;
  return temp.toFixed(0);
}

var icon = desc => {
  let ret;
  if(desc == "Snow"){
    ret = "fa fa-snowflake-o"
  }
  else if(desc == "Rain"){
    ret = "fa fa-tint"
  }
  else if(desc == "Clouds"){
    ret = "fa fa-cloud"
  }
  else{
    ret = "fa fa-sun-o"
  }
  return ret;
}

var snowThresh = tot => {
  let ret;

  if(tot < 1){ ret = '> 1"' }
  else if(tot >= 1 && tot < 2){ ret = '1-3"'}
  else if(tot >= 2 && tot < 3){ ret = '2-4"'}
  else if(tot >= 3){ ret = '3-5"'}
  else{ ret = 'No Accumulation' }
  return ret;
}

module.exports = FiveDay;
