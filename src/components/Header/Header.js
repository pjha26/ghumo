'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Globe, Menu } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import styles from './Header.module.css';

const Header = () => {
  const { isSignedIn, user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container ${styles.headerContainer}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div style={{ position: 'relative', width: '120px', height: '40px' }}>
            <Image
              src="/logo.png"
              alt="Ghumo"
              fill
              style={{ objectFit: 'contain', objectPosition: 'left' }}
              priority
            />
          </div>
        </Link>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <button className={styles.searchBtn}>Anywhere</button>
          <span className={styles.divider}></span>
          <button className={styles.searchBtn}>Any week</button>
          <span className={styles.divider}></span>
          <button className={`${styles.searchBtn} ${styles.addGuests}`}>Add guests</button>
          <div className={styles.searchIconContainer}>
            <Search size={16} strokeWidth={3} color="white" />
          </div>
        </div>

        {/* User Menu */}
        <div className={styles.userMenu}>
          <div className={styles.hostLink}>Airbnb your home</div>
          <div className={styles.globeIcon}>
            <Globe size={18} />
          </div>

          {isSignedIn ? (
            <div
              className={styles.profileMenu}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ref={menuRef}
            >
              <Menu size={18} />
              <div className={styles.avatar}>
                <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: 'w-8 h-8' } }} />
              </div>

              {isMenuOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.menuItem} style={{ fontWeight: '600' }}>
                    <Link href="/trips" onClick={() => setIsMenuOpen(false)}>My Trips</Link>
                  </div>
                  <div className={styles.menuItem} style={{ fontWeight: '600' }}>
                    <Link href="/wishlists" onClick={() => setIsMenuOpen(false)}>Wishlists</Link>
                  </div>
                  <div className={styles.menuDivider}></div>
                  <div className={styles.menuItem}>Airbnb your home</div>
                  <div className={styles.menuItem}>Account</div>
                  <div className={styles.menuDivider}></div>
                  <div className={styles.menuItem}>Help Center</div>
                </div>
              )}
            </div>
          ) : (
            <div
              className={styles.profileMenu}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ref={menuRef}
            >
              <Menu size={18} />
              <div className={styles.avatar}>
                <Image
                  src="/placeholder-avatar.png"
                  alt="User"
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%' }}
                />
              </div>

              {isMenuOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.menuItem} style={{ fontWeight: '600' }}>
                    <Link href="/sign-in" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                  </div>
                  <div className={styles.menuItem}>
                    <Link href="/sign-up" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
                  </div>
                  <div className={styles.menuDivider}></div>
                  <div className={styles.menuItem}>Airbnb your home</div>
                  <div className={styles.menuItem}>Help Center</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
