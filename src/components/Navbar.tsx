import React, { useState } from 'react';
import { Navbar as ReactNavbar, Button, Text } from '@nextui-org/react';
import { useNavigate } from 'react-router';

const navBarCss = {
  background: 'transparent'
};

const containerCss = {
  position: 'relative',
  top: '20px'
};

const selectedCss = {
  margin: 'auto',
  color: '#fff'
};

const unselectedCss = {
  margin: 'auto',
  textGradient: '145deg, $pink600 30%, $blue600 80%'
};

const menus = [
  {
    name: '写诗',
    link: '/poem_v2'
  },
  {
    name: '写小说',
    link: '/write-novel_v2'
  },
  {
    name: 'chat',
    link: '/chat_v2'
  }
];

function Navbar() {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(
    menus.findIndex(({ link }) => link === window.location.pathname)
  );

  return (
    <ReactNavbar variant="floating" containerCss={containerCss} css={navBarCss}>
      <ReactNavbar.Content>
        {menus.map(({ name, link }, index) => {
          const selected = selectedIndex === index;
          return (
            <ReactNavbar.Item key={name}>
              <Button
                auto
                light={!selected}
                color={selected ? 'gradient' : 'secondary'}
                onClick={() => {
                  navigate(link);
                  setSelectedIndex(index);
                }}
              >
                <Text
                  h1
                  size={28}
                  css={selected ? selectedCss : unselectedCss}
                  weight="bold"
                >
                  {name}
                </Text>
              </Button>
            </ReactNavbar.Item>
          );
        })}
      </ReactNavbar.Content>
    </ReactNavbar>
  );
}

export default React.memo(Navbar);
