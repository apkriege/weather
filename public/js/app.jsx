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
        <span>Lake Tahoe, UT</span>
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
      <div className="weather">
        <div className="top"><Location /></div>
        <div className="middle"><Current /></div>
        <div className="bottom"><FiveDay /></div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, app);
