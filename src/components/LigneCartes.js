import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { faFile, faTimesCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import Carte from './Carte'

class LigneCartes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cartes: [
        {
          color: '#4e73df',
          titre: 'Demandes ouvertes',
          icon: faFile,
          valeur: 200
        },
        {
          color: '#1cc88a',
          titre: 'Demandes créées',
          icon: faPlusCircle,
          valeur: 80
        },
        {
          color: '#36b9cc',
          titre: 'Demandes clôturées',
          icon: faTimesCircle,
          valeur: 150
        }
      ]
    }
  }

  render () {
    const { cartes } = this.state
    return (
      <Row className="justify-content-md-center">
        {
          cartes.map((carte, index) => 
            <Col xs="6" md="4" key={index}>
              <Carte 
                color={carte.color}
                titre={carte.titre}
                icon={carte.icon}
                valeur={carte.valeur}
              />
            </Col>  
          )
        }
      </Row>
    )
  }
}

export default LigneCartes
