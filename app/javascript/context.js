import React from "react"
import { fromJS } from "immutable"

const testContext = fromJS({
  user: {
    username: "sam72"
  },
  dispatch: action => {}
})

const { Provider, Consumer } = React.createContext(testContext)

const SET_USER = "SET_USER"

const reducer = (action, state) => {
  switch (action.type) {
    case SET_USER:
      return state.set('user', action.user)
    default:
      return state
  }
}

const withContext = Component => props => (
  <Consumer>{context => <Component {...props} context={context} />}</Consumer>
)

export {
  Provider,
  Consumer,
  testContext,
  reducer,
  withContext,
  SET_USER
}
