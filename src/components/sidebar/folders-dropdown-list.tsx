/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useEffect, useState } from 'react';
import { useAppState } from '@/lib/providers/state-provider';
import { Folder } from '@/lib/supabase/supabase.types';
import TooptipComponent from '../global/tooltip-component';
import { PlusIcon } from 'lucide-react';
import { useSupabaseUser } from '@/lib/providers/supabase-user-provider';

interface FoldersDropdownListProps {
  workspaceFolders: Folder[] | [];
  workspaceId: string;
}

const FoldersDropdownList: React.FC<FoldersDropdownListProps> = ({
  workspaceFolders,
  workspaceId,
}) => {
  // loacal state folders
  // setup real time updates
  const { state, dispatch } = useAppState();
  const [folders, setFolders] = useState(workspaceFolders);
  const { subscription } = useSupabaseUser();

  // effect set initial sate server app state

  useEffect(() => {
    if (workspaceFolders.length > 0) {
      dispatch({
        type: 'SET_FOLDERS',
        payload: {
          workspaceId,
          folders: workspaceFolders.map((folder) => ({
            ...folder,
            files:
              state.workspaces
                .find((workspace) => workspace.id === workspaceId)
                ?.folders.find((f) => f.id === folder.id)?.files || [],
          })),
        },
      });
    }
  }, [workspaceFolders, workspaceId]);

  // state

  useEffect(() => {
    setFolders(
      state.workspaces.find((workspace) => workspace.id === workspaceId)
        ?.folders || []
    );
  }, [state]);

  // add folder
  const addFolderHandler = async () => {
    if (folders.length >= 3 && !subscription) {
    }
  };

  return (
    <>
      <div className='flex sticky z-20 top-0 bg-background w-full h-10 group/title justify-between items-center pr-4 text-Neutrals/neutrals-8'>
        <span className='text-Neutrals-8 font-bold text-xs'>FOLDERS</span>
        <TooptipComponent message='Create Folder'>
          <PlusIcon
            onClick={addFolderHandler}
            size={16}
            className='group-hover/title:inline-block
          hidden
          cursor-pointer
          hover:dark:text-white'
          />
        </TooptipComponent>
      </div>
    </>
  );
};

export default FoldersDropdownList;
