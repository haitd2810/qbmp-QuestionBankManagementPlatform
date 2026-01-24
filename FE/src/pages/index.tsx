import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Header  from "@/components/landingPage/Header";
import Slider  from "@/components/landingPage/Slider";
import About  from "@/components/landingPage/About";
import FQA  from "@/components/landingPage/FQA";
import Contact  from "@/components/landingPage/Contact";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
        <div className="App">
            <Header />
            <Slider />
            <About />
            <FQA />
            <Contact />
        </div>
    );
}
