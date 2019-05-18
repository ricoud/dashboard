import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import {Typeahead} from 'react-bootstrap-typeahead'
import { map } from 'lodash'

import 'react-bootstrap-typeahead/css/Typeahead.css'

import api from '../services/api'
import store from '../services/store'

class Selection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      demandeParams: null,
      form: {
        groupe: 0,
        responsable: 0,
        groupeOptions: [],
        responsableOptions: []
      },
      observers: null,
      error: null
    }

    this.observers = []
  }

  onSelectGroup = (val) => (selection) => {
    const { form }= this.state
    val = (val[0] && val[0].id) ? val[0].id : null
    this.setState({ form: { ...form, [selection]: val } })
    val = (selection === 'responsable' && val) ? parseInt(val) : val
    const demandeParams = { ...this.state.demandeParams }
    if (demandeParams[selection] && !val) delete demandeParams[selection]
    else demandeParams[selection] = val
    this.setState({ demandeParams })
    store.demande$.next(demandeParams)
  }

  async componentDidMount() {
    this.state.observers = store.demande$.subscribe(value => {
      this.setState({ demandeParams: value })
    })
    try  {
      let res = await api.get('demandes/groupes')
      let data = []
      map(res.data, r => {
        data.push({ id: r.groupe, texte: r.groupe })
      })
      this.setState({ form: { ...this.state.form, groupeOptions: data } })
      res = await api.get('demandes/responsables')
      data = []
      map(res.data, r => {
        data.push({ id: r.id, texte: r.nom })
      })
      this.setState({ form: { ...this.state.form, responsableOptions: data } })
    } catch(error) {
      this.setState({ error })
    }
  }

  componentWillUnmount() {
    this.observer.unsubscribe()
  }

  render() {
    const { form } = this.state

    return (
      <Row>
        <Col xs="6" md="3">
          <Form>
            <Form.Group controlId="groupeId">
              <Form.Label>Groupe</Form.Label>
              <Typeahead
                id="groupeSelect"
                clearButton
                onChange={(selected) => this.onSelectGroup(selected)('groupe')}
                value={form.groupe}
                options={form.groupeOptions}
                labelKey="texte"
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs="6" md="3">
          <Form>
            <Form.Group controlId="responsableId">
              <Form.Label>Responsable</Form.Label>
              <Typeahead
                id="responsableSelect"
                clearButton
                onChange={(selected) => this.onSelectGroup(selected)('responsable')}
                value={form.responsable}
                options={form.responsableOptions}
                labelKey="texte"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    )
  }

}

export default Selection