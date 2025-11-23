import React from 'react';
import { Globe } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.footerContainer}`}>
                <div className={styles.linksSection}>
                    <div className={styles.linkColumn}>
                        <h4>Support</h4>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">AirCover</a></li>
                            <li><a href="#">Anti-discrimination</a></li>
                            <li><a href="#">Disability support</a></li>
                            <li><a href="#">Cancellation options</a></li>
                            <li><a href="#">Report neighborhood concern</a></li>
                        </ul>
                    </div>
                    <div className={styles.linkColumn}>
                        <h4>Hosting</h4>
                        <ul>
                            <li><a href="#">Airbnb your home</a></li>
                            <li><a href="#">AirCover for Hosts</a></li>
                            <li><a href="#">Hosting resources</a></li>
                            <li><a href="#">Community forum</a></li>
                            <li><a href="#">Hosting responsibly</a></li>
                            <li><a href="#">Airbnb-friendly apartments</a></li>
                        </ul>
                    </div>
                    <div className={styles.linkColumn}>
                        <h4>Airbnb</h4>
                        <ul>
                            <li><a href="#">Newsroom</a></li>
                            <li><a href="#">New features</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Investors</a></li>
                            <li><a href="#">Gift cards</a></li>
                            <li><a href="#">Airbnb.org emergency stays</a></li>
                        </ul>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.bottomSection}>
                    <div className={styles.left}>
                        <span>© 2023 Airbnb, Inc.</span>
                        <span className={styles.dot}>·</span>
                        <a href="#">Privacy</a>
                        <span className={styles.dot}>·</span>
                        <a href="#">Terms</a>
                        <span className={styles.dot}>·</span>
                        <a href="#">Sitemap</a>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.globeItem}>
                            <Globe size={16} />
                            <span>English (US)</span>
                        </div>
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
