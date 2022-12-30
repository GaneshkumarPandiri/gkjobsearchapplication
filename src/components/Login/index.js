import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMessage: false,
    errorMessage: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = error => {
    this.setState({showErrorMessage: true, errorMessage: error})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    console.log(response)

    if (response.ok === true) {
      const jwtToken = data.jwt_token
      this.onSubmitSuccess(jwtToken)
      console.log('Submit success')
    } else {
      const error = data.error_msg
      this.onSubmitFailure(error)
      console.log('Submit failed')
    }
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {showErrorMessage, errorMessage, username, password} = this.state

    return (
      <div className="login-main-container">
        <form className="form-control" onSubmit={this.onSubmitLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="input-field"
            onChange={this.onChangeUsername}
            value={username}
          />
          <label htmlFor="password" className="label">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="input-field"
            onChange={this.onChangePassword}
            value={password}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMessage && <p className="error-message">*{errorMessage}</p>}
        </form>
      </div>
    )
  }
}

export default Login
