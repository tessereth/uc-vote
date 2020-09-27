import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { fromJS } from 'immutable'
import { Provider, reducer } from './context'
import PrimaryNav from './PrimaryNav'
import PrimaryFooter from './PrimaryFooter'
import Home from './Home'
import About from './About'
import Election from './Election'
import Voted from './Voted'
import UnknownPage from './UnknownPage'
import RequireViewer from './admin/RequireViewer'
import ElectionIndex from './admin/ElectionIndex'

class App extends Component {
  constructor(props) {
    super(props)
    const metadata = JSON.parse(document.getElementById('metadata').innerHTML)
    this.state = { context: fromJS({ metadata, dispatch: this.dispatch }) }
  }

  dispatch = action => {
    console.log('Dispatching action:', action)
    this.setState({ context: reducer(action, this.state.context) })
  }

  render() {
    return (
      <Router>
        <Provider value={this.state.context}>
          <PrimaryNav />
          <main>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/elections/:id">
                <Election />
              </Route>
              <Route exact path="/elections/:id/voted">
                <Voted />
              </Route>
              <Route path="/admin">
                <RequireViewer>
                  <Switch>
                    <Route exact path="/admin">
                      <ElectionIndex />
                    </Route>
                    <Route path="*">
                      <UnknownPage />
                    </Route>
                  </Switch>
                </RequireViewer>
              </Route>
              <Route path="*">
                <UnknownPage />
              </Route>
            </Switch>
          </main>
          <PrimaryFooter />
        </Provider>
      </Router>
    )
  }
}

export default App
