import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import React, { Component } from 'react'
import './Bookings.css'
import ReactDataGrid from 'react-data-grid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import moment from 'moment'
import 'moment/locale/es'
import axios from 'axios'

moment.locale('es')

const columns = [
  { key: 'bookingId', name: 'BookingId', width: 100 },
  { key: 'client', name: 'Cliente' },
  { key: 'bookingTime', name: 'Fecha de creación' },
  { key: 'streetAddress', name: 'Dirección', width: 600 },
  { key: 'bookingPrice', name: 'Precio' }
]

class Bookings extends Component {
  rows = []

  constructor(props) {
    super(props)
    this.state = {
      rows: this.rows,
      filterId: null,
      filterPrice: null
    }
  }

  getInfo = bk => {
    this.rows.push({
      bookingId: bk.bookingId,
      client: `${bk.locationId.tutenUser.firstName} ${bk.locationId.tutenUser.lastName}`,
      bookingTime: moment(bk.bookingTime).format('LL'),
      streetAddress: bk.locationId.streetAddress,
      bookingPrice: bk.bookingPrice
    })
    if (bk.parentBooking) {
      this.getInfo(bk.parentBooking)
    }
    this.setState({
      rows: this.rows
    })
  }

  filterId = rows => {
    let { filterId } = this.state
    switch (filterId) {
      case 1:
        return rows.filter(i => i.bookingId <= 1179)
      case 2:
        return rows.filter(i => i.bookingId > 1179)
      default:
        return rows
    }
  }

  filterPrice = rows => {
    let { filterPrice } = this.state
    switch (filterPrice) {
      case 1:
        return rows.filter(i => i.bookingPrice > 20000)
      case 2:
        return rows.filter(i => i.bookingPrice <= 20000)
      default:
        return rows
    }
  }

  renderInfo = () => {
    let newRows = this.filterPrice(this.filterId(this.rows))
    return (
      <ReactDataGrid
        columns={columns}
        rowGetter={i => newRows[i]}
        rowsCount={newRows.length}
        minHeight={newRows.length * 35 + 52}
      />
    )
  }

  componentDidMount() {
    axios
      .get(`https://dev.tuten.cl:443/TutenREST/rest/user/contacto@tuten.cl/bookings?current=true`, {
        headers: {
          adminemail: 'testapis@tuten.cl',
          token: this.props.location.state.token,
          app: 'APP_BCK'
        }
      })
      .then(res => {
        res.data.forEach(bk => {
          this.getInfo(bk)
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <>
        <header className='navbar navbar-dark flex-column flex-md-row' id='bk-navbar'>
          <div className='container-fluid'>
            <span className='navbar-brand' id='logo'>
              Bookings
            </span>
          </div>
        </header>
        <div className='container-fluid'>
          <div className='row flex-xl-nowrap'>
            <div className='col-12 col-md-3 col-lg-2' id='sidebar'>
              <ul className='list-group items'>
                <li className='list-group-item sidebar-item'>
                  <a data-toggle='collapse' href='#bookingIds' id='bk-id' role='button' aria-expanded='false'>
                    Filtrar Id
                    <FontAwesomeIcon className='ml-2' icon={faChevronDown} />
                  </a>
                  <div className='collapse show' id='bookingIds'>
                    <ul className='list-group'>
                      <li className='list-group-item sidebar-item'>
                        <div className='custom-control custom-radio'>
                          <input
                            className='custom-control-input'
                            type='radio'
                            name='idfilter'
                            id='none'
                            value='none'
                            onChange={() => this.setState({ filterId: 0 })}
                          />
                          <label className='custom-control-label' htmlFor='none'>
                            No filtrar
                          </label>
                        </div>
                      </li>
                      <li className='list-group-item sidebar-item'>
                        <div className='custom-control custom-radio'>
                          <input
                            className='custom-control-input'
                            type='radio'
                            name='idfilter'
                            id='1011-1079'
                            value='10111079'
                            onChange={() => this.setState({ filterId: 1 })}
                          />
                          <label className='custom-control-label' htmlFor='1011-1079'>
                            De 1011 a 1179
                          </label>
                        </div>
                      </li>
                      <li className='list-group-item sidebar-item'>
                        <div className='custom-control custom-radio'>
                          <input
                            className='custom-control-input'
                            type='radio'
                            name='idfilter'
                            id='1182'
                            value='1182'
                            onChange={() => this.setState({ filterId: 2 })}
                          />
                          <label className='custom-control-label' htmlFor='1182'>
                            1182
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className='list-group-item sidebar-item'>
                  <a data-toggle='collapse' href='#bookingPrices' id='bk-price' role='button' aria-expanded='false'>
                    Filtrar Precios
                    <FontAwesomeIcon className='ml-2' icon={faChevronDown} />
                  </a>
                  <div className='collapse show' id='bookingPrices'>
                    <ul className='list-group'>
                      <li className='list-group-item sidebar-item'>
                        <div className='custom-control custom-radio'>
                          <input
                            className='custom-control-input'
                            type='radio'
                            name='pricefilter'
                            id='all'
                            value='none'
                            onChange={() => this.setState({ filterPrice: 0 })}
                          />
                          <label className='custom-control-label' htmlFor='all'>
                            No filtrar
                          </label>
                        </div>
                      </li>
                      <li className='list-group-item sidebar-item'>
                        <div className='custom-control custom-radio'>
                          <input
                            className='custom-control-input'
                            type='radio'
                            name='pricefilter'
                            id='g2000'
                            value='g2000'
                            onChange={() => this.setState({ filterPrice: 1 })}
                          />
                          <label className='custom-control-label' htmlFor='g2000'>
                            Mayor a 20000
                          </label>
                        </div>
                      </li>
                      <li className='list-group-item sidebar-item'>
                        <div className='custom-control custom-radio'>
                          <input
                            className='custom-control-input'
                            type='radio'
                            name='pricefilter'
                            id='l2000'
                            value='l2000'
                            onChange={() => this.setState({ filterPrice: 2 })}
                          />
                          <label className='custom-control-label' htmlFor='l2000'>
                            Menor a 20000
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <main role='main' className='col-12 col-md-9 ml-sm-auto col-lg-10 content'>
              <div className='mt-3'>{this.renderInfo()}</div>
            </main>
          </div>
        </div>
      </>
    )
  }
}

export default Bookings
