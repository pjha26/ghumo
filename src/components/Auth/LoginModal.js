'use client';

import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './AuthModal.module.css';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await signIn('credentials', {
                id: email,
                password: password,
            });
            onClose();
            router.refresh();
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={16} />
                    </button>
                    <div className={styles.title}>Log in</div>
                    <div style={{ width: 32 }}></div> {/* Spacer */}
                </div>

                <div className={styles.body}>
                    <h3 className={styles.welcomeText}>Welcome back to Airbnb</h3>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder="Email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <input
                                type="password"
                                placeholder="Password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Continue'}
                        </button>
                    </form>

                    <div className={styles.divider}>or</div>

                    <button className={styles.socialBtn}>
                        <Mail size={20} className={styles.socialIcon} />
                        Continue with Email
                    </button>

                    <div className={styles.divider}></div>

                    <button className={styles.socialBtn} onClick={onSwitchToSignup}>
                        Don&apos;t have an account? Sign up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
