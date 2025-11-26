'use client';

import React, { useTransition } from 'react';
import { Ban, CheckCircle } from 'lucide-react';
import { toggleBlockUser } from '@/app/admin/users/actions';

const UserActions = ({ userId, isBlocked }) => {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            const result = await toggleBlockUser(userId, isBlocked);
            if (!result.success) {
                alert(result.error || 'Failed to update user status');
            }
        });
    };

    return (
        <button
            onClick={handleToggle}
            disabled={isPending}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${isBlocked
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                } disabled:opacity-50`}
        >
            {isBlocked ? (
                <>
                    <CheckCircle size={14} /> Unblock
                </>
            ) : (
                <>
                    <Ban size={14} /> Block
                </>
            )}
        </button>
    );
};

export default UserActions;
