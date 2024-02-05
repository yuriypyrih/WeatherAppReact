import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store.ts';
import Layout from 'components/Layout';
import CityCard from '../../components/CityCard';
import styles from './styles.module.scss';
import { dummyFavorites } from '../../utils/dummy.ts';
import { clean, fetchFavorite } from '../../redux/slices/favoriteSlice.ts';

const HomePage: React.FC = () => {
  // A list
  const dispatch = useDispatch<AppDispatch>();
  const { favouriteCities } = useSelector((state: RootState) => state.favorite);

  useEffect(() => {
    // A little bit of hard coded list of favorite cities. I would love to implement the backend side
    // myself but since it's outside the scope of this project I had to go for compromises.
    dummyFavorites.forEach((favorite) => {
      dispatch(fetchFavorite({ lat: favorite[0], lon: favorite[1] }));
    });
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clean());
    };
  }, [dispatch]);

  return (
    <Layout>
      <div>
        <div className={styles.label}>Favorite Cities</div>
        <div className={styles.cityList}>
          {favouriteCities.length
            ? favouriteCities.map((city, index) => <CityCard key={index} city={city} />)
            : 'You have no favorites'}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
