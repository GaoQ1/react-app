import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import H2 from '../components/H2'
import P from '../components/P'
import Button from '../components/Button'

import styles from './styles.css';

class App extends Component {
  handleClick(){
    console.log("ok");
  }

  render() {
    return (
      <div>
        <div class={styles['panel-header']}>
          <H2>818提前购活动入场券购买说明：</H2>
          <P>818当天“全航线直减”产品在8月17日18:00提前开放销售，但仅限高端全员及有入场券的普卡会员参加。</P>
        </div>
        <Button href="#" class={styles.blue} onClick={this.handleClick}>添加会员</Button>
        <Button class={styles.pink} href="#">去支付</Button>
        <Button class={styles.white} href="#">取消订单</Button>
        {this.props.children}
      </div>
    )
  }
}

export default App
// export default connect(matchStateToProps,matchDispatchToProps)(App)
