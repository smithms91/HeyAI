'use client';

import React, { useState } from 'react'
import { Button } from './ui/button';
import { Zap } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Props {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: Props) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong :(")
    } finally {
      setLoading(true);
    }
  }

  return (
    <Button disabled={loading} onClick={onClick} variant={isPro ? 'default' : 'premium'}>
      {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
      {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  )
}

export default SubscriptionButton