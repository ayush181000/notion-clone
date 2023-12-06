import React from 'react';

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { getFolders, getUserSubscriptionStatus } from '@/lib/supabase/queries';
import { redirect } from 'next/navigation';

interface SidebarProps {
  params: { workspaceId: string };
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = async ({ className, params }) => {
  const supabase = createServerComponentClient({ cookies });

  //user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  //subsr
  const { data: subscriptionData, error: subscriptionError } =
    await getUserSubscriptionStatus(user.id);

  //folders
  const { data: workspaceFolderData, error: workspaceFolderError } =
    await getFolders(params.workspaceId);

  //error
  //   if (subscriptionError || workspaceFolderError) redirect('/dashboard');

  // get all the different workspaces private collaboratin shared

  return <div>Sidebar</div>;
};

export default Sidebar;
