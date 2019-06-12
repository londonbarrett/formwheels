import React from 'react';
import { createGlobalStyle } from 'styled-components';
import AppHeader from './components/AppHeader';
import CommentForm from './components/CommentForm';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background: #1FF0DA;
    color: #007367;
    font-family: sans-serif;
    margin: 0;
    padding: 0;
  }
`;

const App = () => {
  const submitHandler = values => console.log(values);
  return (
    <section>
      <GlobalStyle />
      <AppHeader />
      <CommentForm
        accept
        firstName="Joe"
        lastName="Strummer"
        age="666"
        rating={4}
        region="356"
        onSubmit={submitHandler}
      />
    </section>
  );
};

export default App;
