'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, User, Globe } from 'lucide-react';
import styles from './Header.module.css';
import { useUser, useClerk } from '@clerk/nextjs';
import { useState, useRef, useEffect } from 'react';
import ThemeToggle from '../ThemeToggle';
import SearchBar from '../Filters/SearchBar';

import TravelAnimation from '../Animations/TravelAnimation';
import { useRouter } from 'next/navigation';

export default function Header({ currentUser }) {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  const profileImage = currentUser?.image || user?.imageUrl;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setShowAnimation(true);
  };

  const handleAnimationClose = () => {
    setShowAnimation(false);
    router.push('/');
  };

  return (
    <>
      {showAnimation && <TravelAnimation onClose={handleAnimationClose} />}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.content} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
            <div onClick={handleLogoClick} className={styles.logo} style={{ cursor: 'pointer' }}>
              <div style={{ position: 'relative', width: '120px', height: '40px' }}>
                <Image
                  src="/logo.png"
                  alt="Ghumo"
                  fill
                  style={{ objectFit: 'contain', objectPosition: 'left' }}
                  priority
                />
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', maxWidth: '850px' }}>
              <SearchBar />
            </div>

            <div className={styles.userMenu}>
              <div className={styles.hostLink}>Ghumo your home</div>
              <div className={styles.globeIcon}>
                <ThemeToggle />
              </div>

              <div className={styles.profileMenu} onClick={() => setIsOpen(!isOpen)} ref={dropdownRef}>
                <Menu size={18} />
                <div className={styles.avatar}>
                  {isSignedIn ? (
                    <img src={profileImage} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <User size={18} className={styles.userIcon} />
                  )}
                </div>
                {isOpen && (
                  <div className={styles.dropdown}>
                    {isSignedIn ? (
                      <>
                        <div className={styles.menuItem} style={{ fontWeight: 600 }}>Messages</div>
                        <div className={styles.menuItem} style={{ fontWeight: 600 }}>Notifications</div>
                        <Link href="/trips" className={styles.menuItem} onClick={() => setIsOpen(false)} style={{ fontWeight: 600, display: 'block', textDecoration: 'none', color: 'inherit' }}>My Trips</Link>
                        <Link href="/favorites" className={styles.menuItem} onClick={() => setIsOpen(false)} style={{ fontWeight: 600, display: 'block', textDecoration: 'none', color: 'inherit' }}>Favorites</Link>
                        <Link href="/map" className={styles.menuItem} onClick={() => setIsOpen(false)} style={{ fontWeight: 600, display: 'block', textDecoration: 'none', color: 'inherit' }}>🗺️ Smart Map</Link>
                        <div style={{ height: '1px', backgroundColor: '#ddd', margin: '8px 0' }}></div>
                        <Link href="/profile" className={styles.menuItem} onClick={() => setIsOpen(false)} style={{ fontWeight: 600, display: 'block', textDecoration: 'none', color: 'inherit' }}>Account</Link>
                        <div className={styles.menuItem}>Help Center</div>
                        <div className={styles.menuItem} onClick={handleSignOut}>Log out</div>
                      </>
                    ) : (
                      <>
                        <Link href="/sign-up" className={styles.menuItem} onClick={() => setIsOpen(false)} style={{ fontWeight: 600, display: 'block', textDecoration: 'none', color: 'inherit' }}>Sign up</Link>
                        <Link href="/sign-in" className={styles.menuItem} onClick={() => setIsOpen(false)} style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>Log in</Link>
                        <div style={{ height: '1px', backgroundColor: '#ddd', margin: '8px 0' }}></div>
                        <div className={styles.menuItem}>Ghumo your home</div>
                        <div className={styles.menuItem}>Help Center</div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
