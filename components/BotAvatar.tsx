import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'

type Props = {}

const BotAvatar = (props: Props) => {
  return (
    <Avatar className='h-8 w-8'>
      <AvatarImage className='p-1' src="/logo.png " />
    </Avatar>
  )
}

export default BotAvatar