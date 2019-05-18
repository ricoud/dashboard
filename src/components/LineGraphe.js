import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Line } from 'react-chartjs-2'
import { map } from 'lodash'

import api from '../services/api'
import store from '../services/store'
import colors from '../data/colors'

class LineGraphe extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      graph: this.props.data,
      options: { scales: { yAxes: [{ ticks: { beginAtZero: true } }] } },
      observer: null,
      error: null
    }

  }

  async callApi(payload) {
    const { graph } = this.state
    const data = { labels: null, datasets: [] }
    for (let i=0; i < graph.donnees.length; i++) {
      const donnee = graph.donnees[i]
      const res = await api[donnee.method](donnee.url, payload)
      if (!data.labels) {
        data.labels = res.data.map(r => graph.abscisses.map(ab => r[ab]))
      }
      data.datasets.push({
        fill: false,
        label: donnee.label,
        backgroundColor: colors[i],
        borderColor: colors[i],
        pointBorderColor: colors[i],
        data: map(res.data, donnee.valeur)
      })
    }
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

  render () {
    const { graph, options } = this.state

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
                <Line data={graph.data} options={options}/>
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

LineGraphe.propTypes = {
  data: PropTypes.object
}

export default LineGraphe
