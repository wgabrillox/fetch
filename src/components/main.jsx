import React, { useState, useEffect, useCallback } from "react";
import { get, post } from "../api";
import { Dog } from "./dog";
import ReactPaginate from "react-paginate";
import { Filters } from "./filters";
import "../styles.css";

const baseFilters = {
  breeds: [],
};

export const Main = () => {
  const [dogList, setDogList] = useState([]);
  const [total, setTotal] = useState(0);
  const [filterList, setFilterList] = useState(baseFilters);
  const [sortOption, setSortOption] = useState("breed:asc");
  const [favorites, setFavorites] = useState({});
  const [favoriteDog, setFavoriteDog] = useState(null);

  const getDogs = useCallback(
    async (pageNumber = 1) => {
      const searchResult = await get("dogs/search", {
        from: 25 * pageNumber,
        sort: sortOption,
        ...Object.keys(filterList).reduce((list, filterKey) => {
          list[filterKey] = filterList[filterKey].map((filter) => filter.value);
          return list;
        }, baseFilters),
      });
      setTotal(searchResult.total);
      const response = await post("dogs", searchResult.resultIds);
      const dogs = await response.json();
      setDogList(dogs);
      setFavoriteDog(null);
    },
    [filterList, sortOption]
  );

  useEffect(() => {
    getDogs();
  }, [getDogs]);

  const favoriteToggle = (dog) => {
    const tempFavorites = favorites;
    if (tempFavorites[dog.id]) {
      delete tempFavorites[dog.id];
    } else {
      tempFavorites[dog.id] = dog;
    }
    setFavorites({ ...tempFavorites });
  };

  const getDogMatch = async () => {
    const response = await post("dogs/match", Object.keys(favorites));
    const dogMatch = await response.json();
    setFavoriteDog(favorites[dogMatch.match]);
  };

  return (
    <div className="container">
      <div className="toolBar">
        <Filters
          filterList={filterList}
          setFilterList={(filterList) => setFilterList(filterList)}
          setSortOption={setSortOption}
        />
        <div className="matchFind">
          <button
            onClick={() => getDogMatch()}
            disabled={Object.keys(favorites).length === 0}
          >
            Find Match!
          </button>
        </div>
      </div>
      {favoriteDog ? (
        <div className="favoriteDog">
          <Dog
            dog={favoriteDog}
            favoriteToggle={favoriteToggle}
            favorites={favorites}
          />
        </div>
      ) : (
        <div className="dogList">
          {dogList.map((dog) => (
            <Dog
              dog={dog}
              key={dog.id}
              favoriteToggle={favoriteToggle}
              favorites={favorites}
            />
          ))}
        </div>
      )}
      <div className="paginate">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={({ selected }) => getDogs(selected)}
          pageRangeDisplayed={10}
          pageCount={Math.ceil(total / 25)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          activeClassName="active"
        />
      </div>
    </div>
  );
};
