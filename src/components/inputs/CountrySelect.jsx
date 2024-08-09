import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import useCountries from '../../hooks/useCountries';

export default function CountrySelect({ value, onChange }) {
  const [selectCountry, setSelectCountry] = useState(null);
  const { getAll } = useCountries();

  useEffect(() => {
    if (value) {
      setSelectCountry(value);
    }
  }, [value]);

  const options = getAll().map((country) => ({
    value: country.value,
    label: `${country.flag} ${country.label}, ${country.region}`,
    latlng: country.latlng, // Assuming each country object has latlng property
  }));

  const handleSelectChange = (selectedOption) => {
    setSelectCountry(selectedOption);
    onChange(selectedOption); // Pass selected country object back to parent
  };

  return (
    <div>
      <Select
        placeholder="Anywhere"
        options={options}
        value={selectCountry}
        onChange={handleSelectChange}
        isClearable
        classNamePrefix="react-select"
        styles={{
          control: (provided) => ({ ...provided, padding: '10px', border: '2px solid' }),
          input: (provided) => ({ ...provided, fontSize: '1.25rem' }),
          option: (provided, state) => ({
            ...provided,
            fontSize: '1.25rem',
            backgroundColor: state.isSelected ? '#ffe4e6' : state.isFocused ? '#f1f1f1' : null,
            color: state.isSelected ? 'black' : null,
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: '#ffe4e6',
            primary25: '#f1f1f1',
          },
        })}
      />
    </div>
  );
}
