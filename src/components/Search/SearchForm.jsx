import React from "react";

const SearchForm = React.forwardRef(
  ({ label, placeholder, onSearch, loading }, ref) => {
    return (
      <div className="mb-3 d-flex justify-content-center">
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <label className="form-label mb-0">{label}</label>
          <div
            className="input-group"
            style={{ flex: "1 1 auto", maxWidth: "400px" }}
          >
            <input
              ref={ref}
              type="text"
              placeholder={placeholder}
              className="form-control"
            />
            <button
              className="btn btn-warning"
              type="button"
              onClick={onSearch}
              disabled={loading}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default SearchForm;
