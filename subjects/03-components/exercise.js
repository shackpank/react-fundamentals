////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// - Render the data as tabs, with their `name` as the label in the tab
//   and their `description` inside the tab panel
// - Make it so that you can click a tab label and the panel renders
//   the correct content
// - Make sure the active tab has the active styles
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'

const styles = {}

styles.tab = {
  display: 'inline-block',
  padding: 10,
  margin: 10,
  borderBottom: '4px solid',
  borderBottomColor: '#ccc',
  cursor: 'pointer'
}

styles.activeTab = {
  ...styles.tab,
  borderBottomColor: '#000'
}

styles.panel = {
  padding: 10
}


const DATA = [
  { id: 1, name: 'USA', description: 'Land of the Free, Home of the brave' },
  { id: 2, name: 'Brazil', description: 'Sunshine, beaches, and Carnival' },
  { id: 3, name: 'Russia', description: 'World Cup 2018!' },
  { id: 4, name: 'UK', description: 'Current Location' }
]

const Tabs = React.createClass({
  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      id: React.PropTypes.number.isRequired,
      name: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired
    }))
  },

  getInitialState() {
    return {
      currentCountry: this.props.data[0]
    }
  },

  chooseCountry(countryName) {
    this.setState({
      currentCountry: countryName
    })
  },

  render() {
    return (
      <div className="Tabs">
        {this.props.data.map((country) => {
          return (
            <div className="Tab" onClick={this.chooseCountry.bind(this, country)} style={country === this.state.currentCountry ? styles.activeTab : styles.tab} key={country.id}>
              {country.name}
            </div>
          )
        })}
        <div className="TabPanel" style={styles.panel}>
          {this.props.data.filter(country => ( country === this.state.currentCountry )).map( (country) => {
            return <p>{country.description}</p>;
          })[0]}
        </div>
      </div>
    )
  }
})

const App = React.createClass({
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Tabs data={this.props.countries} />
      </div>
    )
  }
})


render(<App countries={DATA} />, document.getElementById('app'), function () {
  require('./tests').run(this)
})
