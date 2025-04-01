import Image from "next/image";
import { useState, useEffect } from "react";

export default function AbilityIcon({ ability, isDead, size = "24px" }) {
  if (!ability) return null;
  
  // Don't show ability if level is 0
  if (ability.level === 0) {
    return (
      <div className={`w-6 h-6 bg-gray-800/50 rounded-full relative border border-zinc-800`}>
        <div className="absolute inset-0 bg-black/80 rounded-full">
        </div>
      </div>
    );
  }

  // Calculate the cooldown progress (0 to 1)
  const cooldownProgress = ability.cooldown > 0 
    ? ability.cooldown / ability.maxCooldown
    : 0;
  
  // Calculate the rotation degree based on the progress
  const rotationDegree = cooldownProgress * 360;

  return (
    <div className={`w-6 h-6 bg-gray-800/50 rounded-full relative border border-zinc-800 overflow-hidden`}>
      <Image
        src={`http://localhost:58869/${ability.iconPath}`}
        alt={ability.name || "Ability"}
        layout="fill"
        style={{
          filter: isDead ? "grayscale(100%)" : "none",
          objectFit: "cover"
        }}
      />
      
      {ability.cooldown > 0 && (
        <div className="absolute inset-0 rounded-full">
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-black/60 rounded-full"></div>
          
          {/* Cooldown progress with circular reveal */}
          <div 
            className="absolute inset-0 rounded-full" 
            style={{
              background: 'conic-gradient(transparent 0deg, transparent ' + rotationDegree + 'deg, rgba(0,0,0,0.7) ' + rotationDegree + 'deg, rgba(0,0,0,0.7) 360deg)',
              transform: 'rotate(-90deg)'
            }}
          ></div>
          
          {/* Show the countdown number only when < 11 seconds */}
          {ability.cooldown < 11 && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
              {Math.ceil(ability.cooldown)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}