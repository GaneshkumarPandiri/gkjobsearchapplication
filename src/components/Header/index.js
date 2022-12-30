import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navbar">
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </div>
      <ul className="header-links">
        <li>
          <Link to="/" className="links">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="links">
            Jobs
          </Link>
        </li>
      </ul>
      <li>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </li>
    </nav>
  )
}

export default withRouter(Header)
