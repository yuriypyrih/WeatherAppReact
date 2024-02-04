import React from 'react';
import { City } from 'types/city.ts';
import WeatherIcon from 'components/WeatherIcon';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

type TProps = {
  city: City;
};

const CityCard: React.FC<TProps> = ({ city }) => {
  const { location, weather } = city;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/city?lat=${location?.lat}&lon=${location?.lon}`);
  };

  return (
    <div className={styles.root} onClick={handleClick}>
      {location && (
        <div className={styles.location}>
          <div className={styles.name}>{location.name}</div>
          <div className={styles.country}>
            {location.state ? location.state + ',' : undefined} {location.country}
          </div>
        </div>
      )}
      {weather && (
        <>
          <div className={styles.description}>{weather.description}</div>
          <div className={styles.weatherContainer}>
            <WeatherIcon weather={weather} />
          </div>
        </>
      )}
    </div>
  );
};

export default CityCard;
