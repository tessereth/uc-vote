import React from "react"
import ReactDOM from "react-dom"
import App from "../App"
//import registerServiceWorker from "../registerServiceWorker"

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById("root"))
})
// TODO: Decide if we want service workers
//registerServiceWorker()
