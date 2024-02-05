import React from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';

type TProps = {
  children: React.ReactNode;
  className?: string;
};

// A helper container that centers the content in the middle with  max-width: 960px
// This type of container is pretty standard component, and it's being provided by libraries like MUI/Bootstrap
const Container: React.FC<TProps> = ({ children, className }) => {
  return (
    <div className={styles.root}>
      <div className={clsx(styles.bodyContent, className)}>{children}</div>
    </div>
  );
};

export default Container;
