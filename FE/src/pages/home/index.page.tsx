import Header from "./_components/Header";
import Slider from "./_components/Slider";
import About from "./_components/About";
import FQA from "./_components/FQA";
import Contact from "./_components/Contact";
import { LoginProvider } from "./_components/LoginProvider";
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
