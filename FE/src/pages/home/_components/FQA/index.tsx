// components/FQA.js
import React, { useState, useRef, useEffect } from "react";
import styles from "../LandingPage.module.css";

function FQA() {
  const faqData = [
    {
      id: 1,
      question:
        "How does this system support lecturers in managing the question bank, and what are its advantages compared to traditional methods?",
      answer:
        "The system is designed to digitize the entire process of creating and managing the question bank, helping lecturers save significant time and effort compared to manual work on paper or Excel spreadsheets. With features such as categorizing questions by topic, cognitive level, or course module, lecturers can easily retrieve, edit, and reuse questions when needed. In addition, AI integration supports generating questions based on teaching materials, enhancing work efficiency and ensuring consistency across the system.",
    },
    {
      id: 2,
      question:
        "What smart and outstanding features of the system help improve efficiency in test creation?",
      answer:
        "The system offers a range of modern features, from automatically generating questions based on course content to organizing and creating exams aligned with learning outcomes. Lecturers can create topic-based question sets, assign difficulty levels, apply Bloom's taxonomy classification, shuffle questions, and publish exam templates in formats compatible with the university’s internal systems such as LMS or online testing platforms. Furthermore, the similar question suggestion function and question usage statistics help ensure diversity and balance in each exam.",
    },
    {
      id: 3,
      question:
        "Who are the main users of this system, and how does it meet their diverse needs?",
      answer:
        "The main users of the system are lecturers and academic officers at FPT University, who are frequently involved in designing and assessing students’ learning quality. However, the system can also be extended to serve department heads, subject leaders, or the university’s management board for purposes such as reporting, monitoring, and ensuring the quality of the question bank. With a user-friendly interface and detailed permission settings, each user can perform actions appropriate to their role—from creating and reviewing to approving and analyzing learning data.",
    },
    {
      id: 4,
      question:
        "How does the system help lecturers manage and optimize the question bank during teaching and student assessment?",
      answer:
        "The system provides a centralized platform for managing the question bank, allowing lecturers to easily search, edit, tag, or categorize questions by criteria such as course, semester, difficulty level, or learning outcomes. Additionally, AI analyzes question quality based on student feedback or correct/incorrect answer rates, helping lecturers remove unsuitable questions and continuously improve the question bank over time. As a result, the system not only serves as a storage tool but also acts as an advisor in enhancing exam quality and improving lecturers’ assessment capabilities.",
    },
  ];

  const [openQuestionId, setOpenQuestionId] = useState<number | null>(null);
  const contentRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleToggle = (id: number) => {
    setOpenQuestionId(openQuestionId === id ? null : id);
  };

  useEffect(() => {
    Object.entries(contentRefs.current).forEach(([id, el]) => {
      if (!el) return;

      if (parseInt(id) === openQuestionId) {
        el.style.maxHeight = el.scrollHeight + "px";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      } else {
        el.style.maxHeight = "0px";
        el.style.opacity = "0";
        el.style.transform = "translateY(-8px)";
      }
    });
  }, [openQuestionId]);

  return (
    <section className="bg-white text-center">
      <div className="container mx-auto px-4 py-12">
        <div className="w-full mx-auto">
          <div className="flex justify-center items-center">
            <span className="h-px w-20 bg-orange-500 mr-3"></span>

            <h2 className="text-4xl md:text-4xl font-bold relative inline-block text-orange-500 tracking-tight">
              FQA
            </h2>

            <span className="h-px w-20 bg-orange-500 ml-3"></span>
          </div>

          <div className="grid grid-cols-1 gap-4 mt-10">
            {faqData.map((item) => (
              <div
                className="w-full md:w-10/12 mx-auto cursor-pointer"
                key={item.id}
                onClick={() => handleToggle(item.id)}
              >
                <div className="bg-white shadow-sm border-0 rounded-lg overflow-hidden">
                  <div className="p-6 flex items-center justify-center bg-orange-500">
                    <span className="text-white font-medium">
                      {item.question}
                    </span>
                  </div>

                  <div
                    ref={(el: HTMLDivElement | null) => {
                      contentRefs.current[item.id] = el;
                    }}
                    className="text-left transition-all duration-300 ease-in-out"
                  >
                    <p className="p-6 m-0 text-gray-700">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FQA;
