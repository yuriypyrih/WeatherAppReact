import React, { useState, FC, useEffect, useRef } from 'react';

import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'redux/store.ts';
import { Location } from 'types/location.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import { fetchLocations } from '../../redux/slices/locationSlice.ts';
import { useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside.ts';

const LocationSearchField: FC = () => {
  const { locations } = useSelector((state: RootState) => state.location);
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const debouncedInputValue = useDebounce(inputValue, 200);

  useEffect(() => {
    dispatch(fetchLocations(debouncedInputValue));
  }, [debouncedInputValue, dispatch]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setInputValue(userInput);
    if (inputValue.length) {
      setShowSuggestions(true);
    }
  };

  const reset = () => {
    setInputValue('');
    setShowSuggestions(false);
  };

  useOnClickOutside(ref, reset);

  const onSelect = (location: Location) => {
    navigate(`/city?lat=${location.lat}&lon=${location.lon}`);
  };

  const SuggestionsListComponent: FC = () => {
    return showSuggestions ? (
      locations.length ? (
        <div className={styles.dropdown}>
          <div className={styles.closeBtn} onClick={() => reset()}>
            x
          </div>
          {locations.map((location, index) => {
            return (
              <div key={index} className={styles.item} onClick={() => onSelect(location)}>
                {location.name}, {location.state ? location.state + ',' : undefined} {location.country}
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.dropdown}>
          <div className={styles.closeBtn} onClick={() => reset()}>
            x
          </div>
          <div className={styles.noOptions}>No suggestions available.</div>
        </div>
      )
    ) : null;
  };

  return (
    <div className={styles.root} ref={ref}>
      <input
        type="text"
        onChange={onChange}
        value={inputValue}
        className={styles.inputField}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Search"
      />
      <SuggestionsListComponent />
    </div>
  );
};

export default LocationSearchField;
