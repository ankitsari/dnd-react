import React from 'react';
import PropTypes from 'prop-types'
import MarketCard from './MarketCard';
import '../assets/stylesheets/components/MarketsList.css';

export default function MarketsList({ markets }) {
  const emptyMessage = (
    <p>There are no markets yet in your collection</p>
  );

  const marketsList = (
    <div className="ui four cards card-wrapper">
      { markets && markets.map((item, index) => <MarketCard key={index} bucketItem={item} index={index} />) }
    </div>
  );

  return (
    <div>
      { markets.length === 0 ? emptyMessage : marketsList }
    </div>
  );
}

MarketsList.propTypes = {
  markets: PropTypes.array.isRequired
}
