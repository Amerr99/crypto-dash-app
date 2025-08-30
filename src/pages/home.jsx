import CoinCard from "../components/CoinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";
import SortSelector from "../components/SortSelector";
const HomePage = ({
  coins,
  loading,
  error,
  filter,
  setFilter,
  limit,
  setLimit,
  sortBy,
  setSortBy,
}) => {
  const filteredcoins = coins
    .filter((coin) => {
      return (
        coin.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLocaleLowerCase())
      );
    })
    .slice()
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
      }
    });

  return (
    <div>
      <h1>Crypto Dash</h1>
      {loading && <p>Loading....</p>}
      {error && <div className="error">{error} </div>}

      <div className="top-controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
        <SortSelector sortBy={sortBy} onSortbyChange={setSortBy} />
      </div>

      {!loading && !error && (
        <main className="grid">
          {filteredcoins.length > 0 ? (
            filteredcoins.map((coin) => <CoinCard coin={coin} key={coin.id} />)
          ) : (
            <p className="no-match-text">Sorry, No Matching Coins</p>
          )}
        </main>
      )}
    </div>
  );
};

export default HomePage;
