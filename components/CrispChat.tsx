'use client';


import React, { useEffect } from 'react'
import { Crisp } from 'crisp-sdk-web';

type Props = {}

const CrispChat = (props: Props) => {
  useEffect(() => {
    Crisp.configure("2487316f-d6fe-4115-b95b-128038a187ed");
  }, []);

  return null
}

export default CrispChat