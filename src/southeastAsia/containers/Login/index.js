import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { bindActionCreators } from 'redux'

import { alert } from '../../utils/alert'
import { pop } from '../../utils/alert'
import * as getNoteAction from '../../actions/getNote'
import { sessionStorage } from '../../../common/storage'
import { registerInit } from '../../../common/pageViewStat'
import { parse_url } from '../../../common/utility_fn'

import banner1 from '../../../../public/southeastAsia/images/banner1.jpg'
import banner2 from '../../../../public/southeastAsia/images/banner2.jpg'
import yzm from '../../../../public/southeastAsia/images/yzm.jpg'

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


class Login extends Component {
    constructor(...state){
      super(...state);
      this.state = {
        imgsrc: `${window.ImgApiUrl}ValidateCode.aspx?${Date.now()}`,
        noteMsg: '获取验证码',
        disable: { 'pointer-events' :'auto' }
      }
    }

    componentDidMount(){
      let fsize = parseInt(document.querySelector('html').style.fontSize);
      document.querySelector('.'+ styles.container).style['min-height'] = window.screen.height * window.dpr / fsize + 'rem';
    }

    reloadImg = () => {
      this.setState({ imgsrc: `${window.ImgApiUrl}ValidateCode.aspx?${Date.now()}` })
    }

    inputPhone = (e) => {
      this.props.update({phoneValue: e.target.value});
    }

    inputNote = (e) => {
      this.props.update({noteValue: e.target.value});
    }

    inputCode = (e) => {
      this.props.update({codeValue: e.target.value});
    }

    getNote = (e) => {
      let inputPhone = document.getElementById('inputPhone').value;
      let flag = /^1[0-9]{10}$/.test(inputPhone);

      if(!inputPhone){
        alert('请输入手机号！');
      }else{
        if(flag){
          this.props.fetchNote({ type:1, phone:inputPhone, src: parse_url(location.href).src }).then(() => {
            if(this.props.noteData.toObject().note.Message){
              pop(this.props.noteData.toObject().note.Message);
            }
          });

          var time = 60;
          this.timer = setInterval(() => {
            time--;
            if( time < 0){
              clearInterval(this.timer);
              this.setState({noteMsg: '获取验证码'});
              this.setState({disable: { 'pointer-events' :'auto' }});
            }else{
              this.setState({noteMsg: `${time}s`});
              this.setState({disable: { 'pointer-events' :'none' }});
            }
          },1000)

        }else{
          alert('手机号码有误！');
        }
      }
    }

    login = () => {
      let inputPhone = document.getElementById('inputPhone').value;
      let inputNote = document.getElementById('inputNote').value;
      let inputCode = document.getElementById('inputCode').value;

      if(!inputPhone || !inputNote || !inputCode){
        alert('填写有误！')
      }else{
        let number = {'phone':inputPhone, 'code':inputNote, 'authcode':inputCode, 'type':2};

        //注册代码统计
        registerInit(inputPhone, Date.now());

        this.props.getAward(number).then(() => {//只是判断是否登录
          if(this.props.noteData.toObject().award.SuccessCode == -1){
            pop(this.props.noteData.toObject().award.Message)
          }else{
              sessionStorage.setJson('award',{'award': this.props.noteData.toObject().award.Message});
              window.location.href = '#/award';
          }
        });
      }
    }

    render() {
      let noteData = this.props.noteData.toObject();
      return (
              <div class={styles.container}>
                  <div class={styles.banner}>
                      <img src={banner1} />
                      <img src={banner2} />
                  </div>
                  <div class={styles.pocket}>
                      <div>
                          <label>输入手机号</label>
                          <input type="text" pattern="[0-9]" id="inputPhone" value={noteData.phoneValue} onChange={this.inputPhone} />
                      </div>
                      <div>
                          <label>短信验证码</label>
                          <input type="text" id="inputNote" value={noteData.noteValue} onChange={this.inputNote} />
                          <button onClick={this.getNote} style={this.state.disable}>{this.state.noteMsg}</button>
                      </div>
                      <div>
                          <label>动态验证码</label>
                          <input type="text" id="inputCode" value={noteData.codeValue} onChange={this.inputCode} />
                          <img src={this.state.imgsrc} onClick={this.reloadImg} />
                      </div>
                      <a href="javascript:;" class={styles.tryBtn} onClick={this.login}>去试试手气</a>
                      <Link class={styles.rule} to="/rule">&gt; 活动规则 &lt;</Link>
                  </div>
              </div>
      )
    }
}


export default Login
