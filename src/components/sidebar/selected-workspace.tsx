'use client';

import React, { useEffect, useState } from 'react';
import { workspace } from '@/lib/supabase/supabase.types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import Image from 'next/image';

interface SelectedWorkspaceProps {
  workspace: workspace;
  onClick?: (option: workspace) => void;
}

const SelectedWorkspace: React.FC<SelectedWorkspaceProps> = ({
  workspace,
  onClick,
}) => {
  const supabase = createClientComponentClient();
  const [workspaceLogo, setWorkspaceLogo] = useState('/upbaseLogo.svg');

  useEffect(() => {
    if (workspace?.logo) {
      const path = supabase.storage
        .from('workspace-logos')
        .getPublicUrl(workspace.logo);
    }
  }, [workspace, supabase.storage]);

  return (
    <Link
      href={`/dashboard/${workspace?.id}`}
      onClick={() => {
        if (onClick) onClick(workspace);
      }}
      className='flex
          rounded-md
          hover:bg-muted transition-all flex-row p-2 gap-4
          justify-center cursor-pointer items-center my-2'
    >
      <Image
        src={workspaceLogo}
        alt='workspace logo'
        width={26}
        height={26}
        objectFit='cover'
      />
      <div className='flex flex-col'>
        <p className='text-lg w-[170px] overlow-hidden overflow-ellipsis whitespace-nowrap'>
          {workspace?.title}
        </p>
      </div>
    </Link>
  );
};

export default SelectedWorkspace;
