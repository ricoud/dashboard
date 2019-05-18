import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { keys } from 'lodash'

import '../css/Carte.css'

import api from '../services/api'
import store from '../services/store'

class Carte extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      carte: this.props.data,
      observer: null,
      error: null
    }

  }

  async callApi(payload) {
    try {
      const { carte } = this.state
      const res = await api[carte.method](carte.url, payload)
      this.setState({ carte: { ...carte, data: res.data } })
    } catch (error) {
      this.setState(error)
    }
  }

  componentDidMount() {
    const observer = store.demande$
      .subscribe(value => {
        this.setState({ carte: { ...this.state.carte, data: null } })
        this.callApi(value)
      })
    this.setState({ observer })
  } 

  componentWillUnmount() {
    this.state.observer.unsubscribe()
  }

  render() {
    const { carte } = this.state

    return (
      <Col xs="6" md="3">
        <div className="carte carte-basic shadow" style={{borderLeftColor: carte.color}}>
          <div className="carte-body">
            <Row className="no-gutters align-items-center">
              <Col className="mr-2">
                <div className="text-xs font-weight-bold text-uppercase mb-1" style={{color: carte.color}}>
                  {carte.titre}
                </div>
                {
                  carte.data ? (
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      {carte.data[keys(carte.data)[0]]}
                    </div>
                  ) : (
                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                      <FontAwesomeIcon className="text-gray-300" icon={faSpinner} pulse />
                    </div>
                  )
                }
              </Col>
              <Col className="col-auto">
                <FontAwesomeIcon className="fa-2x" icon={carte.icon} color={carte.color} />
              </Col>
            </Row>
          </div>
        </div>
      </Col>  
    )
  }

}

Carte.propTypes = {
  data: PropTypes.object
}

export default Carte
