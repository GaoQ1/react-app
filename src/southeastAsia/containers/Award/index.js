import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as getNoteAction from '../../actions/getNote'
import { sessionStorage } from '../../../common/storage'

import banner1 from '../../../../public/southeastAsia/images/banner1.jpg'
import banner2 from '../../../../public/southeastAsia/images/banner2.jpg'

import styles from '../../../../public/southeastAsia/less/index.less'

function matchStateToProps(state){
  return {
    noteData: state.NoteList
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    ...getNoteAction
  }, dispatch)
}

@connect(matchStateToProps, matchDispatchToProps)

  class Award extends Component {
    share(){
      sessionStorage.setJson('share',{'share' : 1});
      window.location.href = '#/';
    }

    componentWillMount(){
      this.props.update({award: sessionStorage.getJson('award').award});
    }

    componentDidMount(){
      let fsize = parseInt(document.querySelector('html').style.fontSize);
      document.querySelector('.'+ styles.container).style['min-height'] = window.screen.height * window.dpr / fsize + 'rem';
    }

    render() {
      let award = (this.props.noteData.get('award') || '') + '';
      return (
          <div>
            <div class={styles.container}>
              <div class={styles.banner}>
                <img src={banner1} />
                <img src={banner2} />
              </div>
              <div class={styles.luckGame}>

                <p class={styles.firP}>{award}</p>

                <div class={`${styles.btnBox} ${styles.justify}`}>
                  <a href="http://eb.ceair.com/activity/shuidengjie/app/index.html" class={styles.buy}>立即购买</a>&nbsp;
                  <a href="javascript:;" class={styles.telParent} onClick={this.share}>告诉小伙伴</a>
                </div>
                <div class={styles.bgLuck}>
                  <p>中奖后请下载【东方航空】APP，并用抽奖时<br />填写的手机号码登录，即可查看或使用红包；</p>
                </div>
                <a href="http://mobile.ceair.com/?src=dny" class={styles.rule}>&gt; 下载APP &lt;</a>
              </div>
            </div>
          </div>
      );
    }
}


export default Award
