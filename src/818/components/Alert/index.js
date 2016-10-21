import React, { Component } from 'react';
import { alert, addAlertEvent, removeAlertEvent } from '../../utils/alert';

import styles from '../../../../public/818/less/818/index.less';

class Alert extends Component {

  constructor(...state){
      super(...state);
      this.state = {
        alertStyle : styles.hide,
        msg: ''
      };
  }

  setAlertShow = (msg,fn) => {
    this.comfirmHandler=fn;
    this.setState({
      alertStyle:'',
      msg
    })
  }

  componentWillMount(){
    addAlertEvent(this.setAlertShow)
  }

  comfirm = () => {
    this.setState({alertStyle: styles.hide});
    if(typeof this.comfirmHandler=='function')
      setTimeout(this.comfirmHandler,0);
  }

  componentWillUnmount(){
    removeAlertEvent(this.setAlertShow)
  }
  render(){
    return (
      <div>
        <div class={`${styles.cover} ${this.state.alertStyle}`}></div>
        <div class={`${styles.errorMess} ${this.state.alertStyle}`}>
            <div class={styles.tishi}>
              <p>{this.state.msg}</p>
            </div>
            <a onClick={ this.comfirm } class={styles.confirmBtn}>确定</a>
        </div>
      </div>
    );
  }
}

export default Alert;
