'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Globe, Menu, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { motion } from 'framer-motion';
import LoginModal from '../Auth/LoginModal';
import SignUpModal from '../Auth/SignUpModal';
import styles from './Header.module.css';

const Header = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
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

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    setIsLoginOpen(true);
  };

  const handleSignUpClick = () => {
    setIsMenuOpen(false);
    setIsSignUpOpen(true);
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    signOut();
  };

  return (
    <>
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
                src="/logo.jpg"
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
            <div
              className={styles.profileMenu}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              ref={menuRef}
            >
              <Menu size={18} />
              <div className={styles.avatar}>
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="User"
                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <User size={18} fill="currentColor" className={styles.userIcon} />
                )}
              </div>

              {isMenuOpen && (
                <div className={styles.dropdown}>
                  {session ? (
                    <>
                      <div className={styles.menuItem} style={{ fontWeight: '600' }}>Messages</div>
                      <div className={styles.menuItem} style={{ fontWeight: '600' }}>Trips</div>
                      <div className={styles.menuItem} style={{ fontWeight: '600' }}>Wishlists</div>
                      <div className={styles.menuDivider}></div>
                      <div className={styles.menuItem}>Manage listings</div>
                      <div className={styles.menuItem}>Account</div>
                      <div className={styles.menuDivider}></div>
                      <div className={styles.menuItem}>Help Center</div>
                      <div className={styles.menuItem} onClick={handleLogoutClick}>Log out</div>
                    </>
                  ) : (
                    <>
                      <div className={styles.menuItem} onClick={handleLoginClick} style={{ fontWeight: '600' }}>Log in</div>
                      <div className={styles.menuItem} onClick={handleSignUpClick}>Sign up</div>
                      <div className={styles.menuDivider}></div>
                      <div className={styles.menuItem}>Airbnb your home</div>
                      <div className={styles.menuItem}>Help Center</div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
};

export default Header;

