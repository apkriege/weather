// data needed and rough model
// - temp -- temp (convert)
// - name -- name
// - humidity -- main.humidity
// - visibility -- visibility (convert)
// - sunrise -- sunrise (convert)
// - sunset -- sunset (convert)
// - weather -- weather[0].main / weather[1].main
// - clouds -- clouds.all
// - wind direction -- wind.deg (convert)
// - wind speed -- wind.speed

class Current {
  constructor(d){
    this.data = d;
    this.weather = this.setProps();
  }
  setProps(){
    let x = this.data;
    let y = {};
    y.temp = kelvinToFahren(x.main.temp);
    y.name = x.name;
    y.humidity = x.main.humidity;
    y.visibility = convertVis(x.visibility);
    y.sunrise = convertSunTime(x.sys.sunrise);
    y.sunset = convertSunTime(x.sys.sunset);
    y.weather = outputConditions(x.weather);
    y.clouds = x.clouds.all;
    y.winddir = windDirectionOutput(x.wind.deg);
    y.wind = x.wind.deg;
    y.windspeed = meterPerSecToMph(x.wind.speed);

    return y;
  }
}

outputConditions = cond => {
  let ret = '';
  cond.forEach(function (val){
    ret += val.main;
  })
  return ret;
}

meterPerSecToMph = speed => {
  return (speed * 2.2369).toFixed(2);
}

kelvinToFahren = temp => {
  return (temp * 9/5 - 459.67).toFixed(0);
}

convertSunTime = time => {
  let date = new Date(time * 1000);
  let h = date.getHours() < 12 ? date.getHours() : date.getHours() - 12;
  let m = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
  return h+":"+m;
}

convertVis = meters => {
  let vis = meters * 0.00062137
  return vis.toFixed(2);
}

windDirectionOutput = deg => {
  if (deg>11.25 && deg<33.75){
    return "NNE";
  }else if (deg>33.75 && deg<56.25){
    return "ENE";
  }else if (deg>56.25 && deg<78.75){
    return "E";
  }else if (deg>78.75 && deg<101.25){
    return "ESE";
  }else if (deg>101.25 && deg<123.75){
    return "ESE";
  }else if (deg>123.75 && deg<146.25){
    return "SE";
  }else if (deg>146.25 && deg<168.75){
    return "SSE";
  }else if (deg>168.75 && deg<191.25){
    return "S";
  }else if (deg>191.25 && deg<213.75){
    return "SSW";
  }else if (deg>213.75 && deg<236.25){
    return "SW";
  }else if (deg>236.25 && deg<258.75){
    return "WSW";
  }else if (deg>258.75 && deg<281.25){
    return "W";
  }else if (deg>281.25 && deg<303.75){
    return "WNW";
  }else if (deg>303.75 && deg<326.25){
    return "NW";
  }else if (deg>326.25 && deg<348.75){
    return "NNW";
  }else{
    return "N";
  }
}

module.exports = Current;
