import React from 'react';
import Image from 'next/image';

export default function CGCBBalanceImage() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex items-center justify-center font-sans">
      <div className="relative w-full h-[70%]">
        <Image 
          src="/cg_cb_balance.png" 
          alt="Center of Gravity and Center of Buoyancy Balance" 
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}
