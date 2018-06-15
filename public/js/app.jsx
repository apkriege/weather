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
        <Current />
      </div>
    )
  }
}

ReactDOM.render(<App/>, app);
