import React from 'react';
import Container from '@mui/material/Container';
import Header from './components/Header';
import Content from './components/Content';

function App() {
  return (
    <>
      <Header />
      <Container>
        <Content />
      </Container>
    </>
  );
}

export default App;
