import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router';

import { alert } from '../../utils/alert'
import { sessionStorage } from '../../../common/storage'

import banner1 from '../../../../public/southeastAsia/images/banner1.jpg'
import banner2 from '../../../../public/southeastAsia/images/banner2.jpg'
import redPocket from '../../../../public/southeastAsia/images/redPocket.png'
import pic1 from '../../../../public/southeastAsia/images/pic1.jpg'
import pic2 from '../../../../public/southeastAsia/images/pic2.jpg'
import pic3 from '../../../../public/southeastAsia/images/pic3.jpg'
import pic4 from '../../../../public/southeastAsia/images/pic4.jpg'
import sharePic from '../../../../public/southeastAsia/images/sharePic.png'

import styles from '../../../../public/southeastAsia/less/index.less'

class Home extends Component {
    constructor(...state){
      super(...state);
      this.state = {
        hideCss: { display:'none' }
      }
    }

    componentWillMount(){//渲染之前判断share
      if((sessionStorage.getJson('share', true) || {}).share == 1){
        this.setState({hideCss: {display: 'inheret'}})
      }else{
        this.setState({hideCss: {display: 'none'}})
      }
    }

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
            <div class={styles.redPocket}>
              <Link to="/login"><img src={redPocket} /></Link>
            </div>
            <div class={styles.proList}>
                <div class={`${styles.proBox} ${styles.firstBox}`}>
                    <img src={pic1}/>
                    <div class={styles.des}>
                        <h5>曼谷6天自由行</h5>
                        <p>东航直飞含税往返机票+曼谷豪华酒店2晚</p>
                    </div>
                </div>
                <div class={styles.proBox}>
                    <img src={pic2} />
                    <div class={styles.des}>
                        <h5>清迈 泰北玫瑰清新小城</h5>
                        <p>东航独家白天航班 古迹悠闲游</p>
                    </div>
                </div>
                <div class={styles.proBox}>
                    <img src={pic3} />
                    <div class={styles.des}>
                        <h5>曼谷 包罗万象繁华之都</h5>
                        <p>多家豪华酒店可选 饱览曼谷震撼夜景</p>
                    </div>
                </div>
                <div class={styles.proBox}>
                    <img src={pic4} />
                    <div class={styles.des}>
                        <h5>普吉岛 唯美浪漫蜜月海岛</h5>
                        <p>酒店位置优越 多家豪华酒店可选</p>
                    </div>
                </div>
            </div>
            <div id="shareFriend" class={`${styles.cover}`} style={this.state.hideCss}>
              <div class={styles.share}>
                <img src={sharePic} />
              </div>
            </div>
          </div>
        </div>
      );
    }
}


export default Home
