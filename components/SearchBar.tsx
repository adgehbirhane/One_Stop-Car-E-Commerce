"use client";

import React, { useState } from "react";
import { SearchManufacturer } from ".";
import SearchButton from "./SearchButton";

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState("");
  const handleSearch = () => {};

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <SearchManufacturer
          manufacturer={manufacturer}
          setManufacturer={setManufacturer}
        />
         otherClasses="sm:hidden"
        <SearchButton/>
      </div>
    </form>
  );
};

export default SearchBar;
