import React from 'react';
import styles from './styles.module.scss';
import Header from 'components/Header';
import Container from 'components/Container';

type TProps = {
  children: React.ReactNode;
};
const Layout: React.FC<TProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />
      <Container className={styles.container}>{children}</Container>
    </div>
  );
};

export default Layout;
