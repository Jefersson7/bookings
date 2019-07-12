import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'
import './Login.css'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  onEmailChange = e => {
    this.setState({
      email: e.target.value
    })
  }

  onPasswordChange = e => {
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit = e => {
    axios
      .put(
        `https://dev.tuten.cl:443/TutenREST/rest/user/${this.state.email}`,
        {},
        {
          headers: {
            password: this.state.password,
            app: 'APP_BCK'
          }
        }
      )
      .then(res => {
        console.log(res)
        this.props.history.push({
          pathname: '/bookings',
          state: { token: res.data.sessionTokenBck }
        })
      })
      .catch(err => {
        alert('No se pudo iniciar sesión, intente de nuevo')
        console.log(err)
      })
    e.preventDefault()
  }

  render() {
    return (
      <div className='App'>
        <div className='login-container'>
          <p className='text-header'>Iniciar Sesión</p>
          <form className='login-form'>
            <div className='input-group mb-3'>
              <div className='input-group-prepend'>
                <span className='input-group-text bg-transparent'>
                  <FontAwesomeIcon icon={faUser} />
                </span>
              </div>
              <input
                type='text'
                className='form-control border-left-0 '
                placeholder='Correo'
                value={this.state.email}
                onChange={e => this.onEmailChange(e)}
              />
            </div>
            <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text bg-transparent'>
                  <FontAwesomeIcon icon={faKey} />
                </span>
              </div>
              <input
                type='password'
                className='form-control border-left-0'
                placeholder='Contraseña'
                value={this.state.password}
                onChange={e => this.onPasswordChange(e)}
              />
            </div>
            <button className='submit' onClick={e => this.handleSubmit(e)}>
              <p className='input-text'>Ingresar</p>
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
