import React, { PureComponent } from "react"
import { Link, withRouter } from "react-router-dom"
import { withContext } from './context'

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
    const metadata = this.props.context.get('metadata')
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
              <Link to="/about" className="navbar-item">
                About
              </Link>
            </div>
            <div className="navbar-end">
              {metadata.get('signed_in') ?
                <React.Fragment>
                  <Link className="navbar-item" to="/admin">Admin</Link>
                  <a className="navbar-item" href={metadata.get('logout_path')}>
                    Logout
                  </a>
                </React.Fragment>:
                <a className="navbar-item" href={metadata.get('google_login_path')}>
                  Admin
                </a>
              }
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default withContext(withRouter(PrimaryNav))
