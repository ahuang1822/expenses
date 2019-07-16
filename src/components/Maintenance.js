import React from 'react';
import styles from './styles.module.scss';

const Maintenance = () => {
  return (
    <div className={styles.maintenanceContainer}>
      <div className={styles.messageContainer}>
        <p className={styles.message}>
          The Expense Tracker is currently under maintenance
        </p>
        <p className={styles.redirect}>
          Feel free to check out our source code{' '}
          <a href="https://github.com/ahuang1822/expenses">here!</a>
        </p>
      </div>
    </div>
  );
};

export default Maintenance;
