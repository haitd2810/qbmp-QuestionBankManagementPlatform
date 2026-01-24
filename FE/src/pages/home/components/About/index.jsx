import React from "react";
import styles from "../LandingPage.module.css";
function About() {
  return (
    <section id="about" className="text-center">
      <div className="container mx-auto px-4 py-12">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center mb-6">
            <span className="h-px w-20 bg-blue-600 mr-3"></span>

            <h2 className={`text-4xl md:text-4xl font-bold relative inline-block tracking-tight ${styles['text-blue']}`}>
              ABOUT
            </h2>

            <span className="h-px w-20 bg-blue-600 ml-3"></span>
          </div>

          <p className="text-md text-gray-900 leading-relaxed max-w-4xl mx-auto">
            In the context of digital transformation, in order to support FPT
            lecturers in optimizing the compilation and management of question
            banks, we have developed the Smart Question Bank Management System.
            The system has a friendly, easy-to-use interface, integrating smart
            features such as: automatic question creation, question set
            creation, duplicate checking and exporting question sets compatible
            with the school's examination system, helping lecturers save
            significant time and effort. With this powerful tool, FPT lecturers
            can improve the efficiency of student quality assessment,
            contributing to training high-quality human resources, ready to meet
            the needs of the labor market.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
