import React from 'react';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";
import Home from 'pages/Home';
import About from 'pages/About';
import Poem from 'pages/Poem';
import Chat from 'pages/Chat';
import Navbar from './components/Navbar';
import store from './store';
import Styles from './App.less';

const NoMatch = () => {
  return <h1 style={{ color: '#fff' }}>这个页面还没有写出来owo</h1>;
};

function App() {
  return (
    <ErrorBoundary fallback={<h1>出错啦！手动刷新一下页面重试下吧~owo~</h1>}>
      <Provider store={store}>
        <NextUIProvider>
          <Navbar />
          <div className={Styles.app}>
            <div className={Styles.content}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about_v2" element={<About />} />
                <Route path="/poem_v2" element={<Poem />} />
                <Route path="/chat_v2" element={<Chat />} />
                <Route path="*" element={<NoMatch />} />
              </Routes>
            </div>
          </div>
        </NextUIProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default React.memo(App);
