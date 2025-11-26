'use client';

import React, { useState, useTransition } from 'react';
import { Trash2, Edit, MoreHorizontal } from 'lucide-react';
import { deleteListing } from '@/app/admin/listings/actions';

const ListingActions = ({ listingId }) => {
    const [isPending, startTransition] = useTransition();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteListing(listingId);
            if (result.success) {
                setShowConfirm(false);
            } else {
                alert('Failed to delete listing');
            }
        });
    };

    if (showConfirm) {
        return (
            <div className="flex items-center gap-2">
                <span className="text-sm text-red-600 font-medium">Are you sure?</span>
                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                >
                    {isPending ? '...' : 'Yes'}
                </button>
                <button
                    onClick={() => setShowConfirm(false)}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded hover:bg-gray-300"
                >
                    No
                </button>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <button className="p-1 text-gray-500 hover:text-blue-600 transition-colors">
                <Edit size={18} />
            </button>
            <button
                onClick={() => setShowConfirm(true)}
                className="p-1 text-gray-500 hover:text-red-600 transition-colors"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
};

export default ListingActions;
