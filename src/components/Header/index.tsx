import React from 'react';
import Container from '../Container';
import LocationSearchField from 'components/LocationSearchField';
import styles from './styles.module.scss';

const Header: React.FC = () => {
  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        <div className={styles.logo}>Weathery</div>
        <LocationSearchField />
      </Container>
    </div>
  );
};

export default Header;
