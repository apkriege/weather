// CURRENT CONDITIONS
class Location extends React.Component {
  constructor() {
    super()
  }

  // async componentDidMount() {
    // let res = await fetch('/current');
    // let data = await res.json();
    // console.log(data);
  // }

  render() {
    return (
      <div className="location">
        <h1>Lake Tahoe</h1>
      </div>
    )
  }
}

// CURRENT CONDITIONS
class Time extends React.Component {
  constructor() {
    super()
    this.state = { time:this.displayTime() }

    let x = this
    setInterval(function (){
      x.setState({ time:x.displayTime() })
    }, 1000)

  }
  displayTime(){
    var currentTime = new Date(),
    hours = currentTime.getHours(),
    minutes = currentTime.getMinutes(),
    suffix = 'AM'
  
    hours = hours == 0 ? 12 : hours
    minutes = minutes < 10 ? '0'+minutes : minutes;
    suffix = hours >= 12 ? 'PM' : 'AM'
    hours = hours >= 12 ? hours - 12 : hours
    hours = hours == 0 ? 12 : hours

    return hours + ":" + minutes + " " + suffix
  }

  render() {
    return (
      <div className="time">
        <h1>{ this.state.time }</h1>
      </div>
    )
  }
}


// CURRENT CONDITIONS
class Current extends React.Component {
  constructor() {
    super()
    this.state = { }
  }

  async componentDidMount() {
    let res = await fetch('/current');
    let data = await res.json();
    console.log(data);
    this.setState({ current:data })
  }

  render() {
    if(this.state.current){
      // console.log(this.state.current)
      let x = this.state.current.weather
      return (
        <div className="current">
          <h1 className="temp">{x.temp}° <span className="curr-icon"><i className={x.icon}></i></span></h1>
          <div className="conditions">
            <h3>
              <span className="day">{x.day}</span>
              <span className="wind">{x.windspeed} mph</span>
              <span className="cond">{x.weather}</span>
            </h3>
          </div>
        </div>
      )
    }
    else {
      return(
        <div className="current">
          <div className="error">
            <h1>There was an error loading the data from the database</h1>
          </div>
        </div>
      )
    }
    
  }
}

// FIVEDAY CONDITIONS
class FiveDay extends React.Component {
  constructor() {
    super()
    this.state = { }
  }

  async componentDidMount() {
    let res = await fetch('/fiveday');
    let data = await res.json();
    // console.log(data);
    for(let d of data.data.list){
      // console.log(d.weather.main)
      // console.log(d.weather[0].main)
    }
    this.setState({ fiveday:data })
  }

  render() {
    if(this.state.fiveday){
      let x = this.state.fiveday.rest
      return (
        <div className="fiveday">
          <SingleDay day={x[0]} />
          <SingleDay day={x[1]} />
          <SingleDay day={x[2]} />
          <SingleDay day={x[3]} />
          <SingleDay day={x[4]} />
        </div>
      )
    }
    else {
      return(
        <div className="fiveday">
          <div className="error">
            <h1>There was an error loading the five day data</h1>
          </div>
        </div>
      )
    }
  }
}

// SINGLE DAY CONDITIONS
class SingleDay extends React.Component {
  constructor(props) {
    super()
    this.state = { day:props.day}
    // console.log(props.day)
  }

  render() {
    return (
      <div className="single">
        <div className="icon"><i className={this.state.day.icon}></i></div>
        <div className="temp">{this.state.day.high}°<span className="low">{this.state.day.low}°</span></div>
        <div className="day">{this.state.day.day}</div>
      </div>
    )
  }
}


// 5 DAY FORECAST

// MAIN APPLICATION
class App extends React.Component {
  constructor() {
    super()
  }

  // async componentDidMount() {
  //   let res = await fetch('/data');
  //   let data = await res.json();
  //   console.log(data);
  // }

  render() {
    return (
      <div id="inner">
        <div className="top">
          <div className="city"><Location/></div>
          <div className="time"><Time/></div>
        </div>
        <div className="bottom">
          <div className="weather">
            {/* <div className="overlay"> */}
              <Current />
              <FiveDay />
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, app);
