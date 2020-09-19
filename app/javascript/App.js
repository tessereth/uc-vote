import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import "bulma/css/bulma.css"
import PrimaryNav from "./PrimaryNav"
import PrimaryFooter from "./PrimaryFooter"
import Home from "./Home"
import About from "./About"
import Election from "./Election"
import { Provider, testContext, reducer } from "./context"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { context: testContext.set("dispatch", this.dispatch) }
  }

  dispatch = action => {
    console.log("Dispatching action:", action)
    this.setState({ context: reducer(action, this.state.context) })
  }

  render() {
    return (
      <Router>
        <Provider value={this.state.context}>
          <PrimaryNav />
          <main>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/elections/:id" component={Election} />
          </main>
          <PrimaryFooter />
        </Provider>
      </Router>
    )
  }
}

export default App
