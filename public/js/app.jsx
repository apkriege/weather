

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
  constructor(props) {
    super()
    this.state = { zip:props.zip }
  }
  async componentDidMount() {
    let res = await fetch('/current/'+this.props.zip )
    let data = await res.json()
    this.setState({ current:data })
  }
  async componentWillReceiveProps(nextProps) {
    let res = await fetch('/current/'+nextProps.zip )
    let data = await res.json()
    this.setState({ current:data })
  }
  render() {
    if(this.state.current){
      let x = this.state.current.weather
      return (
        <div className="current">
          <h1 className="temp">{x.temp}° <span className="curr-icon"><i className={x.icon}></i></span></h1>
          <div className="conditions">
            <h3>
              <span className="day">Current</span>
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
  constructor(props) {
    super()
    this.state = { zip:props.zip }
  }
  async componentDidMount() {
    let res = await fetch('/fiveday/'+this.props.zip);
    let data = await res.json();
    this.setState({ fiveday:data })
  }
  async componentWillReceiveProps(nextProps) {
    let res = await fetch('/fiveday/'+nextProps.zip);
    let data = await res.json();
    this.setState({ fiveday:data })
  }
  render() {
    if(this.state.fiveday){
      let x = this.state.fiveday.rest
      let i = x.today == x.date ? 0 : 1;
      return (
        <div className="fiveday">
          <SingleDay day={x[i]} />
          <SingleDay day={x[i+1]} />
          <SingleDay day={x[i+2]} />
          <SingleDay day={x[i+3]} />
          <SingleDay day={x[i+4]} />
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
    this.state = { day:props.day }
  }
  componentWillReceiveProps(nextProps){
    this.setState({ day:nextProps.day }) 
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
// CURRENT CONDITIONS
class Location extends React.Component {
  constructor(props) {
    super()
    this.state = { zip:props.initZip, location:'' }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount(){
    this.setCityAndState(this.state.zip)
  }
  async handleSubmit(ev) {
    ev.preventDefault()
    this.setCityAndState(this.state.zip)
    this.props.subBack(this.state.zip)
  }
  async setCityAndState(zip){
    let res = await fetch('http://maps.googleapis.com/maps/api/geocode/json?address='+zip+'&sensor=true')
    let data = await res.json()
    let addr = data.results[0].formatted_address
    addr = addr.replace(/[0-9]{5}.*$/g, '')
    this.setState({location:addr})
  }
  handleChange(ev) {
    this.setState({zip:ev.target.value})
  }
  render() {
    return (
      <div className="location">
        <h1>{this.state.location}</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="button" onClick={this.handleSubmit} value="submit"/>
        </form>
      </div>
    )
  }
}

// class Test extends React.Component {
//   constructor(props){
//     super();
//     this.state = {zip:props.test}
//   }
//   async componentDidMount(){
//     // console.log(this.state)
//     // let res = await fetch('http://maps.googleapis.com/maps/api/geocode/json?address='+this.state.zip+'&sensor=true')
//     // // let res = await fetch('/city')
//     // let data = await res.json()
//     // console.log(data)

//   }
//   // shouldComponentUpdate(nextProps){
//   //   console.log(nextProps)
//   //   this.setState({zip:nextProps.test})
//   //   console.log(this.state)

//   // }
//   render() {
//     return(<h1>test</h1>)
//   }
// }


// MAIN APPLICATION
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { zip:'48757', city:'' }
    this.setZipCode = this.setZipCode.bind(this)
  }
  setZipCode(x){
    this.setState({ zip:x })
  }
  render() {
    return (
      <div id="inner">
        <div className="top">
          {/* <Test test={this.state.zip} /> */}
          <div className="city"><Location subBack={this.setZipCode} initZip={this.state.zip}/></div>
          <div className="time"><Time/></div>
        </div>
        <div className="bottom">
          <div className="weather">
              <Current zip={this.state.zip} cityBack={this.setCity} />
              <FiveDay zip={this.state.zip} />
              {/* <Test zip={this.state.zip} /> */}
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, app);
