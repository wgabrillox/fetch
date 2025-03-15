import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { get } from "../api";

const selectSelects = {
  option: (baseStyles) => ({
    ...baseStyles,
    color: "black",
  }),
  multiValueRemove: (baseStyles) => ({
    ...baseStyles,
    color: "black",
  }),
  container: (baseStyles) => ({
    ...baseStyles,
    width: "300px",
  }),
};

export const Filters = ({ filterList, setFilterList, setSortOption }) => {
  const [breeds, setBreeds] = useState([]);

  const sortFields = [
    "breed:asc",
    "breed:desc",
    "name:asc",
    "name:desc",
    "age:asc",
    "age:desc",
  ];

  const createOptions = (list) => {
    return list.map((data) => ({ value: data, label: data }));
  };

  const getBreeds = useCallback(async () => {
    const breedResult = await get("dogs/breeds");
    const breedOptions = createOptions(breedResult);
    setBreeds(breedOptions);
  }, []);

  useEffect(() => {
    getBreeds();
  }, [getBreeds]);

  const handleChange = (filter, selectedOptions) => {
    setFilterList({
      ...filterList,
      [filter]: selectedOptions,
    });
  };

  return (
    <div className="filterContainer">
      <div>
        <label htmlFor="breedSelect">Breeds</label>
        <Select
          id="breedSelect"
          styles={selectSelects}
          isMulti
          name="Breeds"
          options={breeds}
          onChange={(selectedOptions) =>
            handleChange("breeds", selectedOptions)
          }
        />
      </div>
      <div>
        <label htmlFor="sortBy">Sort By</label>
        <Select
          id="sortBy"
          styles={selectSelects}
          name="Sort by"
          options={createOptions(sortFields)}
          onChange={(selectedOptions) => setSortOption(selectedOptions.value)}
          defaultValue={{ label: "breed:asc", value: "breed:asc" }}
        />
      </div>
    </div>
  );
};
