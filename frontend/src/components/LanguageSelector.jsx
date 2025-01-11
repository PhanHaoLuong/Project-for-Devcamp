import { useCodeEditorStore } from "../store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../constants";
import { motion, AnimatePresence } from "framer-motion";

import "../styles/LanguageSelector.css";

function LanguageSelector() {
    const [isOpen, setIsOpen] = useState(false);

    const { language, setLanguage } = useCodeEditorStore();
    const dropdownRef = useRef(null);
    const currentLanguageObj = LANGUAGE_CONFIG[language];

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLanguageSelect = (langId) => {

        setLanguage(langId);
        setIsOpen(false);
    };
    

    return (
      <div className="language-selector" ref={dropdownRef}>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`language-selector-button ${language !== "javascript" ? "disabled" : ""}`}
        >
          <div className="decoration" aria-hidden="true" />
          <span>{currentLanguageObj.label}</span>
        </motion.button>
  
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="language-selector-dropdown"
            >
              <div className="header">
                <p>Select Language</p>
              </div>
  
              <div className="list">
                {Object.values(LANGUAGE_CONFIG).map((lang, index) => (
                  <motion.div
                    key={lang.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="list-item"
                  >
                    <button
                      className={`list-item-button ${language === lang.id ? "selected" : ""}`}
                      onClick={() => handleLanguageSelect(lang.id)}
                    >
                      <div className="decoration" />
                      <div className={`icon ${language === lang.id ? "selected" : ""}`}>
                        <div className="decoration" />
                      </div>
                      <span>{lang.label}</span>
                      {language === lang.id && (
                        <motion.div
                          className="border"
                          transition={{
                            type: "spring",
                            bounce: 0.2,
                            duration: 0.6,
                          }}
                        />
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
}

export default LanguageSelector;
