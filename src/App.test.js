import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'

import App from './App'
import ChoixDates from './components/ChoixDates'
import LigneCartes from './components/LigneCartes'
import Graphiques from './components/Graphiques'

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).to.contain(<ChoixDates />)
  })
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).to.contain(<LigneCartes />)
  })
  it('renders without crashing', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).to.contain(<Graphiques />)
  })
  /*
  it('has 36 cards', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('Carte')).to.have.length(36)
  })
  */
})