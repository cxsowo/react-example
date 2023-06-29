import React from 'react';
import SearchBar from './components/SearchBar';

function Home() {
  return <div>
    <SearchBar />
  </div>;
}

export default React.memo(Home);
