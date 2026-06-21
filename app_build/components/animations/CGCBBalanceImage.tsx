import React from 'react';


export default function CGCBBalanceImage() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white flex items-center justify-center font-sans">
      <div className="relative w-full h-[70%] flex items-center justify-center">
        <img 
          src="/cg_cb_balance.png" 
          alt="Center of Gravity and Center of Buoyancy Balance" 
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
}
