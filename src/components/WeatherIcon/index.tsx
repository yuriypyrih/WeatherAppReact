import React from 'react';
import { Weather } from '../../types/weather.ts';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store.ts';

type TProps = {
  weather: Weather;
};

const WeatherIcon: React.FC<TProps> = ({ weather }) => {
  const { unitSystem } = useSelector((state: RootState) => state.app);
  return (
    <div className={styles.root}>
      <img alt={'weather icon'} src={`https://openweathermap.org/img/wn/${weather.icon}.png`} />
      <div>
        {weather.temp}
        {unitSystem === 'metric' ? '°C' : 'F'}
      </div>
    </div>
  );
};

export default WeatherIcon;
