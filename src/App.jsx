import gsap from "gsap";
import { useCurtains } from "react-curtains";
import { Slideshow } from "./components/slideshow";
import { GlobalStyle } from "./style/globalStyle";

function App() {
  useCurtains((curtains) => {
    // use gsap ticker to render our curtains scene
    gsap.ticker.add(curtains.render.bind(curtains));
  });

  return (
    <>
      <GlobalStyle />
      <Slideshow />
    </>
  );
}

export default App;
