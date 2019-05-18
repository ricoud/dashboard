import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { findIndex, slice, keys } from 'lodash'

import api from '../services/api'
import store from '../services/store'
import demandes from '../data/demandes'
import Carte from './Carte'

class Cartes extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      cartes: demandes.cartes,
      error: null
    }

    this.observers = []
  }

  async callApi(id, payload = null) {
    try {
      const index = findIndex(this.state.cartes, { id })
      if (index < 0) {
        throw new Error(`Données pour l'élément "${id}" introuvable.`)
      }
      const carte = this.state.cartes[index]
      const res = (carte.method === 'post') ? await api.post(carte.url, payload) : await api.get(carte.url)
      this.setState({ cartes: 
        [
          ...slice(this.state.cartes, 0, index),
          { ...carte, data: res.data },
          ...slice(this.state.cartes, index+1)
        ]
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
          this.state.cartes.map(carte => this.callApi(carte.id, payload))
         })
    )
  }

  componentWillUnmount() {
    this.observers.map(obs => obs.unsubscribe())
  }

  render() {
    const { cartes } = this.state
    return (
      <Row className="justify-content-md-center">
        {
          cartes.map((carte, index) =>
            <Col xs="6" md="3" key={index}>
              <Carte
                color={carte.color}
                titre={carte.titre}
                icon={carte.icon}
                data={carte.data}
              />
            </Col>
          )
        }
      </Row>
    )
  }
}

export default Cartes
