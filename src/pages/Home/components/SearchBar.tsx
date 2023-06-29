import React from 'react';
import Styles from './SearchBar.less';

function SearchBar() {
  return <div className={Styles.searchBar}>
    <input className={Styles.input} />
    <div className={Styles.searchButton}>
      Search
    </div>
  </div>;
}

export default React.memo(SearchBar);
