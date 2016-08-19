import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { alert } from '../../utils/alert'
import * as orderAction from '../../actions/order'

import styles from '../../../../public/less/818/index.less'

function matchStateToProps(state){
  return {
    orderData: state.orderListLoad
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    ...orderAction
  }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)

class Order extends Component {
  componentDidMount(){
    this.props.orderList(1,1000);
  }

  payStatus=(status) => {
    switch (status) {
      case '10050':
        return '待支付';
      case '10051':
        return '已完成';
      case '10052':
        return '支付处理中';
      case '10053':
        return '差错退款';
      case '10054':
        return '已完成';
      case '10055':
        return '交易异常';
      case '10056':
        return '交易取消';
      case '10057':
        return '等待确认';
      case '10058':
        return '预订失败';
    }
  }

  isTopay=(status,obj={}) => {
    if(status === '10051' || status === '10054'){
      obj.styles = styles.okPay;
      obj.show = {display:'none'};
    }else if(status === '10050'){
      obj.styles = '';
      obj.show = {display:'inherit'};
    }else{
      obj.styles = '';
      obj.show = {display:'none'};
    }
    return obj;
  }

  render() {
    const {orderData=[]} = this.props;

    let orderLists = orderData.map((value,index) => {
      return (
        <div key={index} class={styles.orderBox}>
           <div class={styles.orderTit}>
               <div>订单号：{value.orderNo}</div>
               <div class={`${styles.payGo} ${this.isTopay(value.orderStatus).styles}`}>{this.payStatus(value.orderStatus)}</div>
           </div>
            <div class={styles.orderCenter}>
                <div class={styles.orderLeft}>
                    818提前购入场券
                    <p>订单时间:{value.orderCrtDate}</p>
                </div>
                <div class={styles.orderRight}>
                    <p>数量: {value.orderNum}张</p>
                    <div class={styles.jifen}>{value.pointAmount}积分</div>
                </div>
            </div>

            <div class={`${styles.zhifu}`} style={this.isTopay(value.orderStatus).show}>
                <a class={styles.btnCopy} data-id={value.orderNo} onClick={()=>this.props.submitOrder(value.orderNo)}>去支付</a>
            </div>

        </div>
      )
    })


    return (
      <div>
        <div class={styles.container}>
            {orderLists}
        </div>
      </div>
    )
  }
}

export default Order
