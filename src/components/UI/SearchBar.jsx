// import React from "react";

// const SearchBar = ({ value, onChange }) => {
//   return (
//     <input
//       type="text"
//       placeholder="Search by title or actor"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="search-input"
//     />
//   );
// };

// export default SearchBar;

import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control w-50"
      placeholder="Search by title or actor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBar;