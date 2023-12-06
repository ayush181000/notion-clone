'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import { AuthUser } from '@supabase/supabase-js';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import EmojiPicker from '../global/emoji-picker';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Subscription } from '@/lib/supabase/supabase.types';
import { CreateWorkspaceFormSchema } from '@/lib/types';

interface DashboardSetupProps {
  user: AuthUser;
  subscription: Subscription | null;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
  subscription,
  user,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState('💼');
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting: isLoading, errors },
  } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: 'onChange',
    defaultValues: {
      logo: '',
      workspaceName: '',
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof CreateWorkspaceFormSchema>
  > = async (value) => {};

  return (
    <Card className='w-[800px] h-screen sm:h-auto'>
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={() => {}}>
          <div className='flex flex-col gap-4'>
            <div
              className='flex
            items-center
            gap-4'
            >
              <div className='text-5xl'>
                <EmojiPicker
                  getValue={(emoji) => {
                    setSelectedEmoji(emoji);
                  }}
                >
                  {selectedEmoji}
                </EmojiPicker>
              </div>
              <div className='w-full'>
                <Label
                  htmlFor='workspaceName'
                  className='text-sm text-muted-foreground'
                >
                  Name
                </Label>
                <Input
                  id='workspaceName'
                  type='text'
                  placeholder='Workspace Name'
                  disabled={isLoading}
                  {...register('workspaceName', {
                    required: 'Workspace name isrequired',
                  })}
                />
                <small className='text-red-600'>
                  {errors?.workspaceName?.message?.toString()}
                </small>
              </div>
            </div>
            <div>
              <Label htmlFor='logo' className='text-sm text-muted-foreground'>
                Workspace Logo
              </Label>
              <Input
                id='logo'
                type='file'
                accept='image/*'
                placeholder='Workspace Logo'
                disabled={isLoading || subscription?.status !== 'active'}
                {...register('logo', {
                  required: 'Workspace name isrequired',
                })}
              />
              <small className='text-red-600'>
                {errors?.logo?.message?.toString()}
              </small>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;
