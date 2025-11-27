import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Used by Skiper UI components for dynamic styling
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
