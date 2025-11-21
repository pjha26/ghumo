'use client';

import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { signIn } from 'next-auth/react';
import styles from './AuthModal.module.css';

const SignUpModal = ({ isOpen, onClose, onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate signup by just logging in with the provided credentials
        // In a real app, you would call a registration API first
        try {
            await signIn('credentials', {
                id: email,
                password: password,
                redirect: false,
            });
            onClose();
            window.location.reload();
        } catch (error) {
            console.error('Signup failed:', error);
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
                    <div className={styles.title}>Sign up</div>
                    <div style={{ width: 32 }}></div>
                </div>

                <div className={styles.body}>
                    <h3 className={styles.welcomeText}>Welcome to Airbnb</h3>

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

                        <div style={{ fontSize: '12px', color: '#717171', marginTop: '8px' }}>
                            By selecting Agree and continue, I agree to Airbnb&apos;s Terms of Service, Payments Terms of Service, and Nondiscrimination Policy and acknowledge the Privacy Policy.
                        </div>

                        <button type="submit" className={styles.submitBtn} disabled={isLoading}>
                            Agree and continue
                        </button>
                    </form>

                    <div className={styles.divider}>or</div>

                    <button className={styles.socialBtn} onClick={onSwitchToLogin}>
                        Already have an account? Log in
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;
