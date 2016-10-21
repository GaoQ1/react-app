import React, { Component } from 'react';
import { pop, addPopEvent, removePopEvent } from '../../utils/alert';

import styles from '../../../../public/818/less/818/index.less';

class Pop extends Component {

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
    addPopEvent(this.setAlertShow)
  }

  comfirm = () => {
    this.setState({alertStyle: styles.hide});
    if(typeof this.comfirmHandler=='function')
      setTimeout(this.comfirmHandler,0);
  }

  componentDidUpdate(){
    if(this.state.alertStyle == styles.hide){
      return
    }
    setTimeout(() => {
      this.comfirm();
    },2000)
  }

  componentWillUnmount(){
    removePopEvent(this.setAlertShow)
  }

  render(){
    return (
      <div>
        <div class={`${styles.cover} ${this.state.alertStyle}`}></div>
        <div class={`${styles.popMess} ${this.state.alertStyle}`}>
            <div class={styles.popMsg}>
              <p>{this.state.msg}</p>
            </div>
        </div>
      </div>
    );
  }
}

export default Pop;
