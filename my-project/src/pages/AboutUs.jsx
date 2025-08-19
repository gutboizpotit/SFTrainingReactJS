import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const AboutUs = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState({});

  // Animation on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: "", label: "Employers" },
    { number: "", label: "Candidates" },
    { number: "", label: "Jobs" },
  ];

  const values = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      title: "Quality",
      description:
        "We always ensure high quality in every service, from verification to customer support.",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
      title: "Connection",
      description:
        "We build meaningful connections between employers and candidates, creating great opportunities.",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      ),
      title: "Innovation",
      description:
        "We continuously innovate to provide the best experience for our users.",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  const sectionBg = theme === "dark" ? "bg-gray-900" : "bg-white";
  const sectionText = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const sectionSubText = theme === "dark" ? "text-gray-300" : "text-gray-600";

  const HeroSection = () => (
    <section
      id="hero"
      data-animate
      className={`text-center mb-16 transition-all duration-1000 ${
        isVisible.hero
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      } ${sectionText}`}
    >
      <h1 className="text-5xl font-bold mb-6">About Us</h1>
      <p
        className={`text-xl max-w-3xl mx-auto leading-relaxed ${sectionSubText}`}
      >
        We are a platform connecting employers and candidates, creating
        outstanding career opportunities for everyone.
      </p>
    </section>
  );

  const MissionSection = () => (
    <section
      id="mission"
      data-animate
      className={`mb-16 transition-all duration-1000 delay-200 ${sectionBg} p-12 rounded-2xl shadow-lg ${
        isVisible.mission
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
    >
      <h2 className={`text-3xl font-bold mb-4 ${sectionText}`}>Our Mission</h2>
      <p className={`text-lg leading-relaxed ${sectionSubText}`}>
        We are committed to creating a world where everyone can find a job that
        matches their skills and passion. Through modern technology and
        professional services, we connect top talents with great career
        opportunities.
      </p>
    </section>
  );

  const ValuesSection = () => (
    <section
      id="values"
      data-animate
      className={`mb-16 transition-all duration-1000 delay-300`}
    >
      <h2 className={`text-3xl font-bold text-center mb-12 ${sectionText}`}>
        Core Values
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div
            key={index}
            className="rounded-xl p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
            style={{ backgroundColor: theme === "dark" ? "#1f1f1f" : "#fff" }}
          >
            <div
              className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mb-6 mx-auto`}
            >
              <div className={value.iconColor}>{value.icon}</div>
            </div>
            <h3 className={`text-xl font-bold text-center mb-4 ${sectionText}`}>
              {value.title}
            </h3>
            <p className={`text-center ${sectionSubText}`}>
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );

  const TeamSection = () => (
    <section
      id="team"
      data-animate
      className={`mb-16 transition-all duration-1000 delay-400`}
    >
      <h2 className={`text-3xl font-bold text-center mb-12 ${sectionText}`}>
        Our Team
      </h2>
      <div
        className={`rounded-2xl p-12 text-center shadow-lg transition-all duration-300 ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
        }`}
      >
        <p className="text-xl leading-relaxed max-w-4xl mx-auto mb-2">
          Our team consists of experienced professionals in HR, technology, and
          business. We work passionately to provide efficient and convenient
          recruitment solutions.
        </p>
        {/* <div className="flex justify-center space-x-8 flex-wrap gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold mb-1">{stat.number}</div>
              <div className="text-gray-200">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );

  const ContactSection = () => (
    <section
      id="contact"
      data-animate
      className={`text-center transition-all duration-1000 delay-500`}
    >
      <div
        className={`${sectionBg} rounded-2xl shadow-lg p-12 hover:shadow-2xl transition-shadow duration-300`}
      >
        <h2 className={`text-3xl font-bold mb-6 ${sectionText}`}>Contact Us</h2>
        <p className={`text-lg mb-8 max-w-2xl mx-auto ${sectionSubText}`}>
          Have questions or need support? Don’t hesitate to contact us. We are
          always ready to help!
        </p>
        <div className="flex justify-center space-x-6 flex-wrap gap-4">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Send Email
          </button>
          <button className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Call Us
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gray-900"
          : "bg-gradient-to-br from-blue-50 to-purple-50"
      } min-h-screen`}
    >
      <main className="max-w-6xl mx-auto px-6 py-12">
        <HeroSection />
        <MissionSection />
        <ValuesSection />
        <TeamSection />
        {/* <ContactSection /> */}
      </main>
    </div>
  );
};

export default AboutUs;
