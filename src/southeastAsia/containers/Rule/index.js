import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { alert } from '../../utils/alert'

import banner1 from '../../../../public/southeastAsia/images/banner1.jpg'
import banner2 from '../../../../public/southeastAsia/images/banner2.jpg'

import styles from '../../../../public/southeastAsia/less/index.less'

class Rule extends Component {

  componentDidMount(){
    let fsize = parseInt(document.querySelector('html').style.fontSize);
    document.querySelector('.'+ styles.container).style['min-height'] = window.screen.height * window.dpr / fsize + 'rem';
  }

    render() {
        return (
            <div>
                <div class={styles.container}>
                    <div class={styles.banner}>
                        <img src={banner1} />
                        <img src={banner2} />
                    </div>
                    <div class={styles.ruleInner}>
                        <h5>活动规则</h5>
                        <p>每个用户每天都可以参与一次抽奖活动；</p>
                        <p>中奖后请下载【东方航空】APP，并用抽奖时填写的手机号码登录，即可查看或使用红包；</p>
                        <p>所有参与抽奖的用户均有机会赢取1000元旅游度假红包。</p>
                    </div>
                </div>
            </div>
        );
    }
}


export default Rule
