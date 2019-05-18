import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { map, keys, values, slice } from 'lodash'

import api from '../services/api'
import store from '../services/store'
import demandes from '../data/demandes'
import colors from '../data/colors'
import PieGraphe from './PieGraphe'
import LineGraphe from './LineGraphe';

class Graphiques extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      graphiques: demandes.graphiques,
      error: null
    }

    this.observers = []
  }

  getData(payload) {
    try {
      map(this.state.graphiques, async (graph, ind) => {
        const data = { labels: null, datasets: [] }
        const options = { }
        for (let i=0; i < graph.donnees.length; i++) {
          const donnee = graph.donnees[i]
          const res = (donnee.method === 'post') ? await api.post(donnee.url, payload) : await api.get(donnee.url)
          if (!data.labels) {
            switch (graph.type) {
              case 'pie':
                data.labels = keys(res.data)
                break
              case 'line':
                data.labels = map(res.data, r => map(graph.abscisses, ab => r[ab]))
                options.scales = { yAxes: [{ ticks: { beginAtZero: true } }] }
                break
              default:
                break
            }
          }
          switch (graph.type) {
            case 'pie':
              data.datasets.push({
                data: values(res.data),
                backgroundColor: slice(colors, 0, res.data.length),
                hoverBackgroundColor: slice(colors, 0, res.data.length),
              })
              break
            case 'line':
              data.datasets.push({
                fill: false,
                label: donnee.label,
                backgroundColor: colors[i],
                borderColor: colors[i],
                pointBorderColor: colors[i],
                data: map(res.data, donnee.valeur)
              })
              break
            default:
              break
          }
        }
        this.setState({ graphiques: 
          [
            ...slice(this.state.graphiques, 0, ind),
            { ...this.state.graphiques[ind], data, options },
            ...slice(this.state.graphiques, ind + 1)
          ]
        })
      })
    } catch (error) {
      this.setState(error)
    }
  }

  componentDidMount() {
    this.observers.push(
      store.demande$
        .subscribe(value => {
          let payload = {}
          for (let i = 0; i<keys(value).length; i++) {
            if (value[keys(value)[i]]) payload[keys(value)[i]] = value[keys(value)[i]]
          }
          this.getData(payload)
        })
    )
  }

  componentWillUnmount() {
    this.observers.map(obs => obs.unsubscribe())
  }

  render () {
    const { graphiques } = this.state
    return (
      <Row>
        {
          graphiques.map((graph, ind) =>
            <Col xs="12" md="6" key={ind}>
              { (graph.type === 'pie') ? 
                  <PieGraphe titre={graph.titre} data={graph.data} options={graph.options}/> 
                  : (graph.type === 'line') ?
                  <LineGraphe titre={graph.titre} data={graph.data} options={graph.options}/> 
                  : null
              } 
            </Col>
          )
        }
      </Row>
    )
  }
}

export default Graphiques
