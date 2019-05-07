import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../css/Carte.css'

const Carte = ({ color, titre, icon, valeur }) => (
  <div className="carte carte-basic shadow" style={{borderLeftColor: color}}>
    <div className="carte-body">
      <Row className="no-gutters align-items-center">
        <Col className="mr-2">
          <div className="text-xs font-weight-bold text-uppercase mb-1" style={{color: color}}>
            {titre}
          </div>
          <div className="h5 mb-0 font-weight-bold text-gray-800">
            {valeur}
          </div>
        </Col>
        <Col className="col-auto">
          <FontAwesomeIcon className="fa-2x text-gray-300" icon={icon} />
        </Col>
      </Row>
    </div>
  </div>
)

Carte.propTypes = {
  color: PropTypes.string,
  titre: PropTypes.string,
  icon: PropTypes.string,
  valeur: PropTypes.number
}

export default Carte
