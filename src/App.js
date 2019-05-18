import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

import './App.css'
import demandes from './data/demandes'

// import ChoixDates from './components/ChoixDates'
import Selection from './components/Selection'
import Carte from './components/Carte'
import PieGraphe from './components/PieGraphe'
import LineGraphe from './components/LineGraphe'

class App extends Component {
  /*
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
  */

  render() {
    // const { dateDebut, dateFin } = this.state 

    return (
      <Container>
        <Row>
          <h3 className="text-gray-800">GEC'APP Demande</h3>
        </Row>
        <Selection />
        {/*
          <ChoixDates
            dateDebut={dateDebut}
            dateFin={dateFin} 
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
          />
        */}
        <Row className="justify-content-md-center">
          {
            demandes.map(data => {
              if (data.type === 'PieGraph') return <PieGraphe data={ data } key={ data.id } />
              else if (data.type === 'LineGraph') return <LineGraphe data={ data } key={ data.id } />
              else return <Carte data={ data } key={ data.id } />
            })
          }
        </Row>
      </Container>
    )
  }
}

export default App
