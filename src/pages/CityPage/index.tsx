import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import BackIcon from 'assets/back.svg?react';
import FullHeart from 'assets/full-heart.svg?react';
import EmptyHeart from 'assets/empty-heart.svg?react';

import styles from './styles.module.scss';
import WeatherIcon from '../../components/WeatherIcon';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchWeather, setFavorite } from '../../redux/slices/citySlice.ts';
import { dummyFavorites } from '../../utils/dummy.ts';
const CityPage: React.FC = () => {
  // This page displays all additional info about the city weather plus the add-favorite functionality
  const { selectedCity, isLoading } = useSelector((state: RootState) => state.city);
  const { location, weather, favorite } = selectedCity || {};
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  const { unitSystem } = useSelector((state: RootState) => state.app);

  useEffect(() => {
    if (lat && lon) {
      dispatch(fetchWeather({ lat: Number(lat), lon: Number(lon) }));
    }
  }, [dispatch, lat, lon]);

  const handleAddFavorite = () => {
    if (location) {
      dummyFavorites.push([location.lat, location.lon]);
      dispatch(setFavorite(true));
    }
  };
  const handleRemoveFavorite = () => {
    if (location) {
      const foundIndex = dummyFavorites.findIndex((dummy) => location.lat === dummy[0]);

      if (foundIndex !== -1) {
        dummyFavorites.splice(foundIndex, 1);
        dispatch(setFavorite(false));
      }
    }
  };
  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Layout>
      <div>
        <div className={styles.flexContainer}>
          <BackIcon className={styles.button} onClick={handleGoBack} />
          {location && (
            <div className={styles.label}>
              <span className={styles.name}>{location.name}</span>
              <span className={styles.country}>
                , {location.state ? location.state + ',' : undefined} {location.country}
              </span>
            </div>
          )}
          {favorite ? (
            <FullHeart className={styles.button} onClick={handleRemoveFavorite} />
          ) : (
            <EmptyHeart className={styles.button} onClick={handleAddFavorite} />
          )}
        </div>
        {weather && !isLoading && (
          <div className={styles.detailsContainer}>
            <div className={styles.weatherIcon}>
              <div>
                <WeatherIcon weather={weather} />
              </div>
            </div>
            <div className={styles.description}>{weather.description}</div>
            <div className={styles.stats}>
              <div>Humidity {weather.humidity}%</div>
              <div>
                Wind {weather.windSpeed} {unitSystem === 'metric' ? 'met/sec' : 'mil/hour'}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CityPage;
