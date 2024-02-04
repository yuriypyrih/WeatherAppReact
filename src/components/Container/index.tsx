import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type TProps = {
  children: React.ReactNode;
  className?: string;
};
const Container: React.FC<TProps> = ({ children, className }) => {
  return (
    <div className={styles.root}>
      <div className={clsx(styles.bodyContent, className)}>{children}</div>
    </div>
  );
};

export default Container;
