import { Link, useParams } from "react-router";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_COIN_API_URL;

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("failed to fetch data");
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoin();
  }, [id]);

  return (
    <div className="coin-details-container">
      <Link to="/">Back To Home</Link>
      <p className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}
      </p>
      {loading && <p>Loading...</p>}
      {error && <div className="erro">{error}</div>}

      {!loading && !error && (
        <>
          <img
            src={coin.image.large}
            alt={coin.name}
            className="coin-details-image"
          />
          <p>{coin.description.en.split(". ")[0] + "."}</p>
          <div className="coin-details-info">
            <h3> Rank: #{coin.market_cap_rank} </h3>
            <h4>
              Current Price : $
              {coin.market_data.current_price.usd.toLocaleString()}
            </h4>
            <h5>
              Market Cap : ${coin.market_data.market_cap.usd.toLocaleString()}
            </h5>
          </div>
          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <p>
                <a
                  href={coin.links.homepage[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                <a
                  href={coin.links.blockchain_site[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Blockchain Explorer
                </a>
              </p>
            )}
          </div>
        </>
      )}
      {!loading && !error && !coin && <p>NO DATA FOUND!!</p>}
    </div>
  );
};

export default CoinDetailsPage;
