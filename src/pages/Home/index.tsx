import React from 'react';
// import { useSelector } from 'react-redux';
import SearchBar from './components/SearchBar';
import Styles from './index.less';

function Home() {
  // const store = useSelector((state) => state);

  return (
    <div className={Styles.home}>
      <h1>占位的页面</h1>
      <SearchBar />
    </div>
  );
}

export default React.memo(Home);
