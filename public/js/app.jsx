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
        <h1>Lake Tahoe, UT</h1>
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
  }

  // async componentDidMount() {
    // let res = await fetch('/current');
    // let data = await res.json();
    // console.log(data);
  // }

  render() {
    return (
      <div className="current">
        <div className="temp">75°</div>
      </div>
    )
  }
}

// FIVEDAY CONDITIONS
class FiveDay extends React.Component {
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
      <div className="fiveday">
        something
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
              {/* <Current /> */}
              <FiveDay />
            {/* </div> */}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, app);
