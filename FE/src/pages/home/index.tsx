import Header from "./components/Header";
import Slider from "./components/Slider";
import About from "./components/About";
import FQA from "./components/FQA";
import Contact from "./components/Contact";
import { LoginProvider } from "./components/LoginProvider";
export default function Home() {
  return (
    <div className="App w-screen">
      <LoginProvider>
        <Header />
        <Slider />
        <About />
        <FQA />
        <Contact />
      </LoginProvider>
    </div>
  );
}
