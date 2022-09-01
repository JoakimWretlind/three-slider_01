import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *,
    ::after,
    ::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
    }
    
    html {
      font-size: 62.5%;
    }
    
    body {
      box-sizing: border-box;
      font-family: 'syncopate', sans-serif;
      -webkit-font-smooth: antialiased;
      -webkit-osx-font-smooth: grayscale;
    }
    
    a {
      text-decoration: none;
    }
    
    ul, li {
      list-style: none;
    }

    // SLIDER
    .Slideshow{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;

        cursor: pointer;
        font-size: 3em;
        color: #fff;

        display: flex;
        justify-content: center;
        align-items: center;
        align-content: center;
    }

    .Slideshow img{
        display: none;
    }
    .curtains-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
      pointer-events: none;
    }
`;