// components/Contact.js
import React from "react";
import styles from "../LandingPage.module.css";
function Contact() {
  return (
    <section className="text-center text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="w-full mx-auto">
          <div className="flex items-center justify-center mb-8">
            {/* Left Line */}
            <span className="h-px w-20 bg-green-600 mr-3"></span>

            <h2 className="text-4xl md:text-4xl font-bold relative inline-block text-green-600 tracking-tight">
              Contact
            </h2>

            <span className="h-px w-20 bg-green-600 ml-3"></span>
          </div>

          <div className="text-gray-900 text-md leading-relaxed">
            <p className="mb-2">
              Hoa Lac High-Tech Park - KM29 Thang Long Boulevard, Thach That
              District, Hanoi City
            </p>
            <p className="mb-2">
              Email:{" "}
              <a
                href="mailto:sqbmsupport@fpt.edu.vn"
                className="text-cyan-600 hover:underline"
              >
                sqbmsupport@fpt.edu.vn
              </a>
            </p>
            <p className="mb-8">Phone: 09090090909</p>
            <p className="text-gray-500 text-sm">&copy; Powered by SEP490-G2</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
