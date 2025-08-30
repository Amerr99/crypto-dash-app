
const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        value={filter}
        placeholder="search coins"
        onChange={(e) => onFilterChange(e.target.value)}
      />
    </div>
  );
};

export default FilterInput;
