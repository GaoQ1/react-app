import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import Alert from '../../components/Alert'
import styles from '../../../../public/less/818/index.less'

class App extends Component {
  render() {
    return (
      <div>
        <Alert />
        {this.props.children}
      </div>
    )
  }
}

export default App
