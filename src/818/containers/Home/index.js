import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { alert } from '../../utils/alert'
import * as homeAction from '../../actions/home'

import styles from '../../../../public/less/818/index.less'

function matchStateToProps(state) {
  return {
    homeData: state.homeLoad
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    ...homeAction
  }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)

class Home extends Component {
  constructor(...arg){
    super(...arg);
  }
  componentDidMount(){
    this.props.homeLoad();
  }

  render() {
    const { homeData } = this.props;

    return (
      <div>
        <div class={styles.container}>
            <div class={styles.explain}>
                <h5>818提前购活动入场券购买说明:</h5>
                <p>818当天"全航线直减"产品在8月17号18:00提前开发销售,但仅限高端会员及有入场券的普卡会员参加。</p>
            </div>
            <div class={styles.memberClass}>
                <div class={`${styles.lay} ${styles.first}`}>
                    <h5>高端会员(白金卡/金卡/银卡)</h5>
                    <p>可免费提前入场直接购买</p>
                </div>
                <div class={styles.lay}>
                    <h5>普卡会员</h5>
                    <p>可使用1000积分兑换</p>
                </div>
                <div class={styles.lay}>
                    <h5>无入场券会员</h5>
                    <p>待8月18日0点才能参与818直减大促</p>
                </div>
            </div>
            <div class={styles.fillMess}>
                <div class={styles.fillHeader}>
                    <h5>兑换信息填写(最多5人)</h5>
                    <div class={styles.jifen}>
                        <span>可用积分</span>
                        <p>{homeData.TotalPoint}</p>
                    </div>
                </div>
                <div class={styles.messDivBox}>
                    <div class={styles.messDiv}>
                        <div class={styles.num}>1</div>
                        <div class={styles.message}>
                            <div class={styles.messBox}>
                                <label class={styles.error}>万里行卡号</label>
                                <input type="text" pattern="[0-9]" placeholder="请输入万里行卡号" />
                            </div>
                            <div class={styles.messBox}>
                                <label>手机号</label>
                                <input type="text" pattern="[0-9]" placeholder="请输入手机号" />
                            </div>
                        </div>
                        <div class={styles.removeBtn}>删除</div>
                    </div>
                </div>
                <div class={styles.messDivBox}>
                    <div class={styles.messDiv}>
                        <div class={styles.num}>2</div>
                        <div class={styles.message}>
                            <div class={styles.messBox}>
                                <label>万里行卡号</label>
                                <input type="text" placeholder="请输入万里行卡号" />
                            </div>
                            <div class={styles.messBox}>
                                <label>手机号</label>
                                <input type="text" placeholder="请输入手机号" />
                            </div>
                        </div>
                        <div class={styles.removeBtn}>删除</div>
                    </div>
                </div>
            </div>
            <div class={styles.btnBox}>
                <a class={`${styles.blue} ${styles.btn}`}>添加会员</a>
                <a class={`${styles.orange} ${styles.btn}`}>去支付</a>
                <p></p>
            </div>
        </div>
      </div>
    )
  }
}

export default Home
