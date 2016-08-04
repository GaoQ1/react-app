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
  // constructor(...arg){
  //   super(...arg);
  //   this.state={
  //       filedsStyle:{}
  //   }
  // }
  componentDidMount(){
    this.props.homeLoad();
  }

  bindEvent=(index,type)=>{
    let eventHandle=new Function;
    switch(type){
        case 0 :
            eventHandle= this.touchStartHandler;
            break;
        case 1 :
            eventHandle= this.touchMoveHandler;
            break;
        case 2 :
            eventHandle= this.touchEndHandler;
            break;
        case 3 :
            eventHandle= this.props.removeInputField;
            break;
        case 4 :
            eventHandle=this.cardChangeHandler ;
            break;
        case 5 :
            eventHandle= this.phoneChangeHandler;
            break;

    }

    return (e)=>{
        eventHandle(e,index);
    }

  }

  phoneChangeHandler=(e,index)=>{
    this.props.updateFiled(index,{phone:e.target.value});
  }

  cardChangeHandler=(e,index)=>{
    this.props.updateFiled(index,{card:e.target.value});
  }

  touchStartHandler=(e,index)=>{
    let point=e.touches ? e.touches[0] : e;
    this.maxX=-this.refs['del'+index].offsetWidth;
    this.pointX    = point.pageX;
    this.pointY    = point.pageY;
    this.moved      = false;
    this.distX      = 0;
    this.distY      = 0;
    this.startTime=+new Date();
  }

  touchMoveHandler=(e,index)=>{
    let point       = e.touches ? e.touches[0] : e,
        deltaX      = point.pageX - this.pointX,
        deltaY      = point.pageY - this.pointY,
        timestamp   = +new Date(),
        maxX=this.maxX,
        newX,
        absDistX, absDistY;
    this.pointX     = point.pageX;
    this.pointY     = point.pageY;
    this.distX      += deltaX;
    this.distY      += deltaY;
    absDistX        = Math.abs(this.distX);
    absDistY        = Math.abs(this.distY);

    if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
        return;
    }

    if(absDistX < absDistY){
        return;
    }else
        e.preventDefault();
    newX=this.props.homeData.fields[index].translateX+deltaX/0.5;
    newX=newX<maxX?maxX:newX>0?0:newX;
    this.props.setTranslateX(index,newX);
  }

  touchEndHandler=(e,index)=>{
    let absTranslate=Math.abs(this.props.homeData.fields[index].translateX),
        maxX=this.maxX,
        newX=absTranslate>Math.abs(maxX/2)?maxX:0;
    this.props.setTranslateX(index,newX);
  }

  render() {
    const { homeData} = this.props;

    let fields=homeData.fields.map((field,index)=>{
        let {id,card='',phone='',error,translateX}=field,
            fieldStyle={transform:`translate(${translateX}px)`,'WebkitTransform':`translate(${translateX}px)`};
        return (
            <div key={id} class={styles.messDivBox} >
                    <div class={styles.messDiv} onTouchStart={this.bindEvent(index,0)} onTouchMove={this.bindEvent(index,1)} onTouchEnd={this.bindEvent(index,2)} style={fieldStyle}>
                        <div class={styles.num}>{index+1}</div>
                        <div class={styles.message}>
                            <div class={styles.messBox}>
                                <label class={ error&&error.card?styles.error:''}>{error&&error.card||'万里行卡号'}</label>
                                <input type="text" pattern="[0-9]*" value={card} onChange={this.bindEvent(index,4)} placeholder="请输入万里行卡号" />
                            </div>
                            <div class={styles.messBox}>
                                <label class={ error&&error.phone?styles.error:''}>{error&&error.phone||'手机号'}</label>
                                <input type="text" pattern="[0-9]*" value={phone} onChange={this.bindEvent(index,5)} placeholder="请输入手机号" />
                            </div>
                        </div>
                        <div class={styles.removeBtn} ref={`del${index}`} onClick={this.bindEvent(index,3) }>删除</div>
                    </div>
                </div>
            )
    }),
    addStyle={
        display:fields.length==homeData.max?'none':''
    }


    return (
      <div>
        <div class={styles.container} >
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
                {fields}
            </div>
            <div class={styles.btnBox}>
                <a class={`${styles.blue} ${styles.btn}`} style={addStyle} onClick={this.props.addInputField}>添加会员</a>
                <a class={`${styles.orange} ${styles.btn}`} onClick={this.props.submit}>去支付</a>
                <p></p>
            </div>
        </div>
      </div>
    )
  }
}

export default Home
