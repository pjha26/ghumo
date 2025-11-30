'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguageStore } from '@/store/languageStore';
import { getTranslation, getAvailableLanguages } from '@/data/translations';
import styles from './Footer.module.css';

const Footer = () => {
    const { language, setLanguage } = useLanguageStore();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const t = getTranslation(language);
    const languages = getAvailableLanguages();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (langCode) => {
        setLanguage(langCode);
        setIsDropdownOpen(false);
    };

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.linksSection}>
                    {/* Support Section */}
                    <div className={styles.linkColumn}>
                        <h4>{t.footer.support.title}</h4>
                        <ul>
                            {t.footer.support.links.map((link, index) => (
                                <li key={index}>
                                    <a href="#">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Hosting Section */}
                    <div className={styles.linkColumn}>
                        <h4>{t.footer.hosting.title}</h4>
                        <ul>
                            {t.footer.hosting.links.map((link, index) => (
                                <li key={index}>
                                    <a href="#">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Airbnb Section */}
                    <div className={styles.linkColumn}>
                        <h4>{t.footer.airbnb.title}</h4>
                        <ul>
                            {t.footer.airbnb.links.map((link, index) => (
                                <li key={index}>
                                    <a href="#">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.bottomSection}>
                    <div className={styles.left}>
                        <span>{t.footer.bottom.copyright}</span>
                        <span className={styles.dot}>·</span>
                        <a href="#">{t.footer.bottom.privacy}</a>
                        <span className={styles.dot}>·</span>
                        <a href="#">{t.footer.bottom.terms}</a>
                        <span className={styles.dot}>·</span>
                        <a href="#">{t.footer.bottom.sitemap}</a>
                    </div>
                    <div className={styles.right}>
                        {/* Language Switcher */}
                        <div className={styles.languageSwitcher} ref={dropdownRef}>
                            <div
                                className={styles.globeItem}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <Globe size={16} />
                                <span>{t.name}</span>
                                <ChevronDown
                                    size={16}
                                    className={`${styles.chevron} ${isDropdownOpen ? styles.chevronOpen : ''}`}
                                />
                            </div>

                            {/* Language Dropdown */}
                            {isDropdownOpen && (
                                <div className={styles.languageDropdown}>
                                    {languages.map((lang) => (
                                        <div
                                            key={lang.code}
                                            className={`${styles.languageOption} ${language === lang.code ? styles.active : ''
                                                }`}
                                            onClick={() => handleLanguageChange(lang.code)}
                                        >
                                            <span>{lang.name}</span>
                                            {language === lang.code && (
                                                <span className={styles.checkmark}>✓</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Currency */}
                        <div className={styles.currency}>
                            <span>₹ INR</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
