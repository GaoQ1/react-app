import React from 'react';

import styles from '../../../../public/less/818/index.less';

function Alert(props) {
  return (
    <div>
      <div class={styles.cover}></div>
      <div class={styles.errorMess}>
          <div class={styles.tishi}>
            <p>会员1和会员2已经登记<br />请勿重复登记</p>
          </div>
          <a href="javascript:;" class={styles.confirmBtn}>确定</a>
      </div>
    </div>
  );
}

export default Alert;
