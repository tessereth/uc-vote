import React, { PureComponent } from "react"
import { Link, withRouter } from "react-router-dom"

class PrimaryNav extends PureComponent {
  state = { menuOpen: false }

  componentDidMount() {
    this.props.history.listen((_location, _action) => {
      this.setState({ menuOpen: false })
    })
  }

  toggleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    })
  }

  render() {
    return (
      <nav className="navbar has-shadow">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              UC Vote
            </Link>
            <a
              role="button"
              className={`navbar-burger ${
                this.state.menuOpen ? "is-active" : ""
              }`}
              aria-label="menu"
              aria-expanded={this.state.menuOpen}
              onClick={this.toggleMenu}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div
            className={`navbar-menu ${this.state.menuOpen ? "is-active" : ""}`}
          >
            <div className="navbar-start">
              <Link to="/elections" className="navbar-item">
                Elections
              </Link>
              <Link to="/about" className="navbar-item">
                About
              </Link>
            </div>
            <div className="navbar-end">
              <Link className="navbar-item" to="/users/auth/google_oauth2">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(PrimaryNav)
