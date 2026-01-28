// components/Slider.js
import React from 'react';
import illustration from '@/assets/illustration.png';
import styles from "../LandingPage.module.css";
import Image from 'next/image';
function Slider() {
  return (
    <section className="container mx-auto p-12 lg:py-0 text-center lg:text-left">
      <div className="w-full my-12"> 
        <div className="grid grid-cols-12 items-center gap-4">
          <div className="col-span-12 lg:col-span-6">
            <h1 className={`text-[clamp(1.8rem,5vw,3.5rem)] font-bold uppercase mb-4 ${styles['text-org']}`}>
              Question Bank Management Platform
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Image src={illustration} alt="Illustration" className="img-fluid d-block mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slider;