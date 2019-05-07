import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

import './App.css'

import ChoixDates from './components/ChoixDates'
import LigneCartes from './components/LigneCartes'
import Graphiques from './components/Graphiques'

class App extends Component {
  constructor(props) {
    super(props)

    const year = new Date().getFullYear()
    const month = new Date().getMonth()

    this.state = {
      dateDebut: new Date(year, month, 1),
      dateFin: new Date(year, month, new Date(year, month + 1, 0).getDate())
    }

  }

  handleStartDateChange = (date) => {
    this.setState({
      dateDebut: date
    })
  }

  handleEndDateChange = (date) => {
    this.setState({
      dateFin: date
    })
  }

  render() {
    const { dateDebut, dateFin } = this.state 

    return (
      <Container>
        <Row>
          <h3 className="text-gray-800">Tableau de bord GEC'APP Demande</h3>
        </Row>
        <ChoixDates 
          dateDebut={dateDebut}
          dateFin={dateFin} 
          handleStartDateChange={this.handleStartDateChange}
          handleEndDateChange={this.handleEndDateChange}
        />
        <LigneCartes />
        <Graphiques />
      </Container>
    )
  }
}

export default App
