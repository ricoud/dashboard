import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'

class Graphiques extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {
        labels: [
          'Red',
          'Green',
          'Yellow'
        ],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
          ]
        }]
      }
    }
  }

  render () {
    const { data } = this.state
    return (
      <Row>
        <Col xl="8" lg="7">
          <div className="carte shadow mb-4">
            <div className="carte-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold text-xs text-uppercase" style={{color: '#4e73df'}}>
                Répartition des demandes ouvertes
              </h6>
            </div>
            <div className="carte-body">
              <Pie data={data} />
            </div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Graphiques
