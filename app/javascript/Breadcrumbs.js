import React from "react"
import { Route, Link } from "react-router-dom"

const Breadcrumb = ({ pathPieces, active }) => {
  if (pathPieces.length === 1) {
    return (
      <li key="/">
        <Link to="/">Home</Link>
      </li>
    )
  }

  const path = pathPieces.join("/")
  let title = pathPieces[pathPieces.length - 1]
  title = title.charAt(0).toUpperCase() + title.slice(1)
  if (active) {
    return (
      <li className="is-active">
        <Link to={`${path}`} aria-current="page">
          {title}
        </Link>
      </li>
    )
  } else {
    return (
      <li>
        <Link to={`${path}`}>{title}</Link>
      </li>
    )
  }
}

const Breadcrumbs = () => (
  <Route
    render={props => {
      const path = props.location.pathname
      if (path === "/") {
        return null
      }
      const paths = props.location.pathname.split("/")
      return (
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            {paths.map((_, i) => (
              <Breadcrumb
                key={i}
                pathPieces={paths.slice(0, i + 1)}
                active={i + 1 === paths.length}
              />
            ))}
          </ul>
        </nav>
      )
    }}
  />
)

export default Breadcrumbs
