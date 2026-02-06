import React from 'react';
import { Identity } from '../types';

interface CardProps {
   identity: Identity;
   animateKey: number;
}

export const CleanIDCard: React.FC<CardProps> = ({ identity, animateKey }) => (
   <div key={animateKey} className="w-full aspect-[1.586/1] bg-slate-50 rounded-xl overflow-hidden shadow-lg border border-slate-300 relative select-none group transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-12 transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%] z-20 pointer-events-none"></div>

      {/* Subtle Background */}
      <div className="absolute inset-0 bg-slate-100 opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[rgba(var(--color-primary-rgb),0.1)] to-transparent pointer-events-none"></div>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-[24%] bg-slate-900 flex items-center justify-between px-3 sm:px-5">
         <div className="text-white font-bold tracking-widest text-xs sm:text-sm">USA <span className="text-slate-500 font-normal">ID</span></div>
         <div className="text-[var(--color-primary)] font-bold text-base sm:text-lg">{identity.address.stateAbbr}</div>
      </div>

      {/* Content */}
      <div className="absolute top-[24%] inset-x-0 bottom-0 p-3 sm:p-5 flex gap-3 sm:gap-5">
         {/* Photo */}
         <div className="w-[30%] bg-slate-200 rounded-lg overflow-hidden shadow-inner relative transition-transform duration-500 group-hover:scale-[1.02]">
            <div className={`w-full h-full flex items-center justify-center text-2xl sm:text-4xl font-bold text-white ${identity.gender === 'female' ? 'bg-[rgba(var(--color-purple-rgb),0.5)]' : 'bg-[rgba(var(--color-primary-rgb),0.5)]'}`}>
               {identity.firstName[0]}
            </div>
         </div>

         {/* Text Info */}
         <div className="flex-1 flex flex-col justify-center gap-0.5 sm:gap-1 min-w-0">
            {/* Name */}
            <div className="flex-shrink-0 text-base sm:text-lg font-bold text-slate-900 uppercase tracking-tight leading-none mb-0.5 sm:mb-1 transition-colors group-hover:text-[var(--color-primary)] truncate">
               {identity.lastName}, {identity.firstName}
            </div>

            {/* Address */}
            <div className="text-[10px] sm:text-xs font-medium text-slate-500 leading-snug mb-1 sm:mb-3">
               {identity.address.street}<br />
               {identity.address.street2 && <>{identity.address.street2}<br /></>}
               {identity.address.city}, {identity.address.stateAbbr} {identity.address.zip}
            </div>

            {/* Stats Row */}
            <div className="flex gap-3 sm:gap-6 pt-1 sm:pt-2 border-t border-slate-200">
               <div>
                  <span className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-bold block">DOB</span>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">{identity.birthday}</div>
               </div>
               <div>
                  <span className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-bold block">Sex</span>
                  <div className="text-xs sm:text-sm font-bold text-slate-800">{identity.gender === 'male' ? 'M' : 'F'}</div>
               </div>
               <div className="min-w-0">
                  <span className="text-[8px] sm:text-[10px] text-slate-400 uppercase font-bold block">ID#</span>
                  <div className="text-xs sm:text-sm font-bold text-slate-800 font-mono tracking-tighter group-hover:tracking-normal transition-all duration-300 truncate">
                     {identity.uuid.split('-')[1].toUpperCase()}
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
);

export const CleanCreditCard: React.FC<CardProps> = ({ identity, animateKey }) => (
   <div key={animateKey} className="w-full aspect-[1.586/1] rounded-xl p-4 sm:p-6 shadow-lg relative overflow-hidden bg-slate-800 text-white select-none group transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent -translate-x-[150%] skew-x-12 transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%] z-20 pointer-events-none"></div>

      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-black"></div>

      <div className="relative z-10 flex flex-col h-full justify-between">
         <div className="flex justify-between items-start">
            <div className="w-8 h-5 sm:w-10 sm:h-7 bg-white/10 rounded-md border border-white/20 backdrop-blur-sm shadow-inner"></div>
            <span className="font-bold italic text-base sm:text-lg opacity-80">VISA</span>
         </div>

         <div className="space-y-2 sm:space-y-4">
            <div className="font-mono text-lg sm:text-xl tracking-widest text-white drop-shadow-md group-hover:text-[var(--color-primary)] transition-colors">
               {identity.creditCard.number}
            </div>
            <div className="flex justify-between items-end text-[10px] sm:text-xs opacity-75 group-hover:opacity-100 transition-opacity">
               <div className="uppercase tracking-wider truncate max-w-[70%]">{identity.fullName}</div>
               <div className="font-mono">{identity.creditCard.exp}</div>
            </div>
         </div>
      </div>
   </div>
);