import React, { Component } from 'react';

import styles from '../../../../public/less/818/index.less';

class Alert extends Component {

  constructor(...state){
      super(...state);
      this.state = {
        alertStyle : styles.hide,
        msg: ''
      };
  }

  setAlertShow(msg){
    this.setState({
      alertStyle:'',
      msg
    })
  }

  componentWillMount(){

  }

  comfirm(){
    this.setState({alertStyle: styles.hide})
  }

  componentWillUnmount(){

  }
  render(){
    return (
      <div>
        <div class={`${styles.cover} ${this.state.alertStyle}`}></div>
        <div class={`${styles.errorMess} ${styles.hide}`}>
            <div class={styles.tishi}>
              <p>{this.state.msg}</p>
            </div>
            <a href="javascript:;" class={styles.confirmBtn} onClick={ this.props.confirm}>确定</a>
        </div>
      </div>
    );
  }
}

export default Alert;
