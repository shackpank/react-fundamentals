////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Make tabs a "pure component" by not managing any of its own state, instead
// add a property to tell it which tab to show, and then have it communicate
// with its owner to get rerendered with a new active tab.
//
// Why would you move that state up? you might have a workflow where they can't
// progress from one step to the next until they've completed some sort of task
// but they can go back if they'd like. If the tabs keep their own state you
// can't control them with your application logic.
//
// Already done?
//
// Make a `StatefulTabs` component that manages some state that is passes as
// props down to `Tabs` (since they should now be stateless)
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import * as styles from './lib/styles'
import data from './lib/data'

const Tabs = React.createClass({

  propTypes: {
    data: React.PropTypes.array.isRequired,
    activeIndex: React.PropTypes.number,
    onTabChange: React.PropTypes.func.isRequired
  },

  handleTabClick(activeTabIndex) {
    this.props.onTabChange(activeTabIndex)
  },

  renderTabs() {
    return this.props.data.map((tab, index) => {
      const style = this.props.activeIndex === index ?
        styles.activeTab : styles.tab
      return (
        <div
          className="Tab"
          key={tab.name}
          style={style}
          onClick={() => this.handleTabClick(index)}
        >{tab.name}</div>
      )
    })
  },

  renderPanel() {
    const tab = this.props.data[this.props.activeIndex]
    return (
      <div>
        <p>{tab.description}</p>
      </div>
    )
  },

  render() {
    return (
      <div style={styles.app}>
        <div style={styles.tabs}>
          {this.renderTabs()}
        </div>
        <div style={styles.tabPanels}>
          {this.renderPanel()}
        </div>
      </div>
    )
  }

})

const StatefulTabs = React.createClass({
  getInitialState() {
    return {
      tabIndex: 0
    }
  },

  tabChanged(tabIndex) {
    this.setState({
      tabIndex: tabIndex
    })
  },

  render() {
    return <Tabs {...this.props} onTabChange={this.tabChanged} activeIndex={this.state.tabIndex} />
  }
});

const App = React.createClass({
  getInitialState() {
    return {
      tabIndex: 0
    }
  },

  tabChanged(tabIndex) {
    this.setState({
      tabIndex: tabIndex
    })
  },

  decrementTab() {
    this.setState({
      tabIndex: this.state.tabIndex - 1
    })
  },

  incrementTab() {
    this.setState({
      tabIndex: this.state.tabIndex + 1
    })
  },

  render() {
    return (
      <div>
        <h1>Props v. State</h1>

        {this.state.tabIndex > 0 ? <button onClick={this.decrementTab}>rewind</button> : ''}<br />
        {this.state.tabIndex < this.props.tabs.length - 1 ? <button onClick={this.incrementTab}>fast forward</button> : ''}

        <h2>The stateless one (controllable above also)</h2>
        <Tabs ref="tabs" data={this.props.tabs} onTabChange={this.tabChanged} activeIndex={this.state.tabIndex} />

        <h2>The stateful one</h2>
        <StatefulTabs ref="tabs" data={this.props.tabs} />
      </div>
    )
  }

})

render(<App tabs={data} />, document.getElementById('app'), function () {
  require('./tests').run(this)
})
