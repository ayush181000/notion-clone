import Link from 'next/link';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import UpbaseHomeIcon from '../icons/upbaseHomeIcon';
import UpbaseSettingsIcon from '../icons/upbaseSettingsIcon';
import UpbaseTrashIcon from '../icons/upbaseTrashIcon';

interface NativeNavigationProps {
  myWorkspaceId: string;
  className?: string;
}

const NativeNavigation: React.FC<NativeNavigationProps> = ({
  myWorkspaceId,
  className,
}) => {
  return (
    <nav className={twMerge('my-2', className)}>
      <ul className='flex flex-col gap-2'>
        <li>
          <Link
            className='group/native 
            flex gap-2
            text-Neutrals/neutrals-7 
            transition-all'
            href={`/dashboard/${myWorkspaceId}`}
          >
            <UpbaseHomeIcon />
            <span>My workspace</span>
          </Link>
        </li>

        <li>
          <Link
            className='group/native 
            flex gap-2
            text-Neutrals/neutrals-7 
            transition-all'
            href={`/dashboard/${myWorkspaceId}`}
          >
            <UpbaseSettingsIcon />
            <span>Settings</span>
          </Link>
        </li>

        <li>
          <Link
            className='group/native 
            flex gap-2
            text-Neutrals/neutrals-7 
            transition-all'
            href={`/dashboard/${myWorkspaceId}`}
          >
            <UpbaseTrashIcon />
            <span>Trash</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NativeNavigation;
