import React from 'react';

import styles from './styles.css';

function P(props) {
  return (
    <p class={styles.p} {...props} />
  );
}

export default P;
