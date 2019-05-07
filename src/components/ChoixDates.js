import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import fr from 'date-fns/locale/fr'

import 'react-datepicker/dist/react-datepicker.css'
import '../css/ChoixDates.css'

class ChoixDates extends React.Component {
  constructor(props) {
    super(props)

    registerLocale('fr', fr)
    setDefaultLocale('fr')
  }

  render() {
    const { dateDebut, dateFin, handleStartDateChange, handleEndDateChange } = this.props
    return (
      <Row className="justify-content-md-center choixDate text-center">
        <Col xs="12" md="6">
          Date début:&nbsp;
          <DatePicker
            selected={dateDebut}
            onChange={handleStartDateChange}
            placeholderText="Date de début"
            dateFormat="dd/MM/yyyy"
          />
        </Col>
        <Col xs="12" md="6">
          Date fin:&nbsp;
          <DatePicker
            selected={dateFin}
            onChange={handleEndDateChange}
            placeholderText="Date de fin"
            dateFormat="dd/MM/yyyy"
          />
        </Col>
      </Row>
    )
  }
}

ChoixDates.propTypes = {
  dateDebut: PropTypes.instanceOf(Date).isRequired,
  dateFin: PropTypes.instanceOf(Date).isRequired,
  handleStartDateChange: PropTypes.func.isRequired,
  handleEndDateChange: PropTypes.func.isRequired
}


export default ChoixDates
