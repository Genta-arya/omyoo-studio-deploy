import React, { useState, useEffect } from "react";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Header from "./Component/Header";
import ContactLinks from "./Component/Contact";
import ProjectContent from "./Component/Gallery";
import Content from "./Component/Content";
import { Element, animateScroll as scroll, scroller } from "react-scroll";

import FloatingMessageButton from "./Component/FNQ";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion"; 

function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    document.title = `OmYoo-Studio`;
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToProject = () => {
    scroller.scrollTo("projectSection", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

 

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
  });

  const [projectRef, projectInView] = useInView({
    triggerOnce: true,
  });

  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
  });

  const contentControls = useAnimation();
  const projectControls = useAnimation();
  const contactControls = useAnimation();

  useEffect(() => {
    if (contentInView) {
      contentControls.start("visible");
    }
  }, [contentInView, contentControls]);

  useEffect(() => {
    if (projectInView) {
      projectControls.start("visible");
    }
  }, [projectInView, projectControls]);

  useEffect(() => {
    if (contactInView) {
      contactControls.start("visible");
    }
  }, [contactInView, contactControls]);


  const contentVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const projectVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  const contactVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 2 } },
  };

  return (
    <div className={`theme-${theme}`} style={{ paddingBottom: "60px" }}>
      <Navbar scrollToProject={scrollToProject} />
      <Header />
      <Element name="contentSection">
        <motion.div
          ref={contentRef}
          className="content-component"
          initial="hidden"
          animate={contentControls}
          variants={contentVariant}
        >
          <Content />
        </motion.div>
      </Element>

      <Element name="projectSection">
        <motion.div
          ref={projectRef}
          className="project-component"
          initial="hidden"
          animate={projectControls}
          variants={projectVariant}
        >
          <ProjectContent />
        </motion.div>
      </Element>

      <Element name="contactSection">
        <motion.div
          ref={contactRef}
          className="contact-component"
          initial="hidden"
          animate={contactControls}
          variants={contactVariant}
        >
          <ContactLinks scrollToProject={scrollToProject} />
        </motion.div>
      </Element>

      <Footer />

      <FloatingMessageButton
        isChatVisible={isChatVisible}
        setIsChatVisible={setIsChatVisible}
        className="fixed bottom-10 left-10"
      />
    </div>
  );
}

export default Home;
