import React, { useState } from "react";

const SearchContext = React.createContext({
  searchedTerm: "",
  onSearchTermChanged: () => {},
});

export const SearchContextProvider = (props) => {
  const [searchedTerm, setSearchedTerm] = useState("");

  const searchBarChangedHandler = (event) => {
    setSearchedTerm(event.target.value);
    console.log(searchedTerm);
  };

  return (
    <SearchContext.Provider
      value={{
        searchedTerm: searchedTerm,
        onSearchTermChanged: searchBarChangedHandler,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
