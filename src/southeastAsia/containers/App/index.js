import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import Pop from '../../components/Pop'
import Alert from '../../components/Alert'

import styles from '../../../../public/southeastAsia/less/index.less'

class App extends Component {
  render() {
    return (
      <div>
      	<div id='loading'  class={`${styles['request-load']} ${styles.hideCss}`}>
    	</div>
      <Alert />
      <Pop />
      {this.props.children}
      </div>
    )
  }
}

export default App
