'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, Globe, Menu, User } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
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
      <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block', height: '32px', width: '32px', fill: 'var(--primary)' }}
              aria-label="Airbnb homepage"
              role="img"
              focusable="false"
            >
              <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.353c.667 1.591.91 3.162.723 4.691-.279 2.28-1.69 4.125-3.877 5.07l-.418.168c-1.267.477-2.638.716-4.087.716-2.137 0-4.16-.513-6.011-1.524l-.459-.262-1.4-.833-1.4.833c-1.851 1.011-3.874 1.524-6.011 1.524-1.449 0-2.82-.239-4.087-.716l-.418-.168C2.594 29.011 1.183 27.166.904 24.886c-.187-1.529.056-3.1.723-4.691l.145-.353c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C10.737 1.963 12.192 1 14.2 1h1.8zm11.2 22.647c.393-.916.467-1.87.218-2.836l-.066-.236c-.238-.808-.78-1.915-1.69-3.707l-.213-.416-5.833-11.372C18.97 3.87 18.1 3 17.2 3h-2.4c-.9 0-1.77.87-2.417 2.08l-5.832 11.372c-.91 1.792-1.452 2.899-1.69 3.707l-.066.236c-.249.966-.175 1.92.218 2.836.457 1.065 1.377 1.802 2.52 2.019l.376.058c.836.113 1.708.113 2.544 0l.376-.058a3.037 3.037 0 0 0 1.738-1.275l.16-.244.573-.989 1.12-2.184c.131-.23.36-.374.616-.374.256 0 .485.144.616.374l1.12 2.184.573.989.16.244a3.037 3.037 0 0 0 1.738 1.275l.376.058c.836.113 1.708.113 2.544 0l.376-.058c1.143-.217 2.063-.954 2.52-2.019z"></path>
            </svg>
            <span className={styles.logoText}>ghumo</span>
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
      </header>

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

