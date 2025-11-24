'use client';

import React, { useState, useEffect } from 'react';
import useAuthModal from '@/hooks/useAuthModal';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';

const AuthModal = () => {
    const { isOpen, onClose } = useAuthModal();
    const [mode, setMode] = useState('login'); // 'login' or 'signup'

    useEffect(() => {
        if (isOpen) {
            setMode('login');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const toggleMode = () => {
        setMode((prev) => (prev === 'login' ? 'signup' : 'login'));
    };

    return (
        <>
            {mode === 'login' ? (
                <LoginModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onSwitchToSignup={toggleMode}
                />
            ) : (
                <SignUpModal
                    isOpen={isOpen}
                    onClose={onClose}
                    onSwitchToLogin={toggleMode}
                />
            )}
        </>
    );
};

export default AuthModal;
