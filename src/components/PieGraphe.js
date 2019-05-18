import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Pie } from 'react-chartjs-2'
import { keys, slice, values } from 'lodash'

import api from '../services/api'
import store from '../services/store'
import colors from '../data/colors'

class PieGraphe extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      graph: this.props.data,
      observer: null,
      error: null
    }

  }

  async callApi(payload) {
    const { graph } = this.state
    const data = { labels: null, datasets: [] }
    const res = await api[graph.donnees.method](graph.donnees.url, payload)    
    data.labels = keys(res.data)
    data.datasets.push({
      data: values(res.data),
      backgroundColor: slice(colors, 0, res.data.length),
      hoverBackgroundColor: slice(colors, 0, res.data.length),
    })
    this.setState({ graph: { ...graph, data } })
  }

  componentWillMount() {
    const observer = store.demande$
      .subscribe(value => {
        this.setState({ graph: { ...this.state.graph, data: null } })
        this.callApi(value)
      })
    this.setState({ observer })
  }

  componentWillUnmount() {
    this.state.observer.unsubscribe()
  }

  render() {
    const { graph } = this.state

    return (
      <Col xs="12" md="6">
        <div className="carte shadow mb-4">
          <div className="carte-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-xs text-uppercase" style={{color: '#4e73df'}}>
              {graph.titre}
            </h6>
          </div>
          <div className="carte-body">
            {
              graph.data ? (
                <Pie data={graph.data} />
              ) : (
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  <FontAwesomeIcon className="text-gray-300" icon={faSpinner} pulse />
                </div>
              )
            }
          </div>
        </div>
      </Col>
    )
  }

}

PieGraphe.propTypes = {
  data: PropTypes.object
}

export default PieGraphe
