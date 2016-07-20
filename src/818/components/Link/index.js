import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

function Links() {
  return (
    <nav class={styles.navbar}>
      <Link class={styles.nav} activeClassName={styles.active} to="/">未使用</Link>
      <Link class={styles.nav} activeClassName={styles.active} to="/about">已过期</Link>
      <Link class={styles.nav} activeClassName={styles.active} to="/contact">已使用</Link>
    </nav>
  );
}

export default Links;
