"use client";

import React, { useState } from "react";

const visualSteps = [
  {
    id: "cache",
    title: "Request Lifespan & Caching",
    label: "caching blueprint",
    hint: "hover for cache hit",
    description: "Normally, requests pull data from the main Database. Hover over the diagram to see how a Cache intercepts the request to serve it instantly, keeping the database relaxed.",
    render: () => (
      <div className="relative h-48 w-[340px] sm:w-[360px] mx-auto flex items-center justify-center">
        <svg className="absolute inset-0 h-full w-full pointer-events-none overflow-visible" fill="none">
          <path d="M 40 96 L 150 96" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <path 
            d="M 150 96 L 310 146" 
            stroke="rgba(0,0,0,0.15)" 
            strokeWidth="1.5" 
            className="transition-all duration-300 group-hover:stroke-black/5" 
          />
          <path 
            d="M 150 96 L 310 46" 
            stroke="rgba(0,0,0,0.05)" 
            strokeWidth="1.5" 
            className="transition-all duration-300 group-hover:stroke-[#ff4d00]/40" 
          />
          <circle r="4" fill="#ff4d00" className="group-hover:hidden">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 40 96 L 150 96 L 310 146" />
          </circle>
          <circle r="4" fill="#ff4d00" className="hidden group-hover:block">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 40 96 L 150 96 L 310 46" />
          </circle>
        </svg>

        {/* Nodes */}
        <div className="absolute left-2 top-[78px] flex flex-col items-center">
          <div className="h-9 w-9 rounded-full border border-black/15 bg-white flex items-center justify-center font-mono text-[10px] font-semibold text-black/75 shadow-sm">
            User
          </div>
        </div>
        <div className="absolute left-[130px] top-[74px] flex flex-col items-center">
          <div className="h-11 w-11 rounded-full border border-black bg-black flex items-center justify-center font-mono text-[10px] font-semibold text-[#EEE9E3] shadow-md">
            Route
          </div>
        </div>
        <div className="absolute right-2 top-[24px] flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/55 group-hover:text-[#ff4d00] font-semibold transition-colors">Fast Cache</span>
          <div className="h-9 w-9 rounded-full border border-black/10 bg-white group-hover:border-[#ff4d00] transition-colors flex items-center justify-center font-mono text-[10px] font-semibold text-black/60 shadow-sm">
            ⚡
          </div>
        </div>
        <div className="absolute right-2 bottom-[24px] flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/55 group-hover:text-black/20 transition-colors">Database</span>
          <div className="h-9 w-9 rounded-full border border-black/10 bg-white group-hover:border-black/5 transition-colors flex items-center justify-center font-mono text-[10px] font-semibold text-black/60 shadow-sm">
            💾
          </div>
        </div>
      </div>
    )
  },
  {
    id: "loadbalancer",
    title: "Load Balancing & Scaling",
    label: "scale blueprint",
    hint: "hover to balance load",
    description: "When traffic spikes, a Load Balancer distributes incoming requests across multiple servers. Hover to see how requests are rerouted away from overloaded nodes to keep responses fast.",
    render: () => (
      <div className="relative h-48 w-[340px] sm:w-[360px] mx-auto flex items-center justify-center">
        <svg className="absolute inset-0 h-full w-full pointer-events-none overflow-visible" fill="none">
          <path d="M 40 96 L 150 96" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          
          {/* Path to Server A (Overloaded) */}
          <path 
            d="M 150 96 L 310 96" 
            stroke="rgba(0,0,0,0.15)" 
            strokeWidth="1.5" 
            className="transition-all duration-300 group-hover:stroke-black/5" 
          />
          {/* Paths to Server B & C */}
          <path 
            d="M 150 96 L 310 46" 
            stroke="rgba(0,0,0,0.05)" 
            strokeWidth="1.5" 
            className="transition-all duration-300 group-hover:stroke-[#ff4d00]/40" 
          />
          <path 
            d="M 150 96 L 310 146" 
            stroke="rgba(0,0,0,0.05)" 
            strokeWidth="1.5" 
            className="transition-all duration-300 group-hover:stroke-[#ff4d00]/40" 
          />

          {/* Pulses */}
          <circle r="4" fill="#ff4d00" className="group-hover:hidden">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 40 96 L 150 96 L 310 96" />
          </circle>
          <circle r="4" fill="#ff4d00" className="hidden group-hover:block">
            <animateMotion dur="2s" repeatCount="indefinite" path="M 40 96 L 150 96 L 310 46" />
          </circle>
          <circle r="4" fill="#ff4d00" className="hidden group-hover:block">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 40 96 L 150 96 L 310 146" />
          </circle>
        </svg>

        {/* Nodes */}
        <div className="absolute left-2 top-[78px]">
          <div className="h-9 w-9 rounded-full border border-black/15 bg-white flex items-center justify-center font-mono text-[10px] font-semibold text-black/75 shadow-sm">
            Traffic
          </div>
        </div>
        <div className="absolute left-[130px] top-[74px]">
          <div className="h-11 w-11 rounded-full border border-black bg-black flex items-center justify-center font-mono text-[10px] font-semibold text-[#EEE9E3] shadow-md">
            LB
          </div>
        </div>
        {/* Servers */}
        <div className="absolute right-2 top-[24px] flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/55 group-hover:text-[#ff4d00] transition-colors">Server A</span>
          <div className="h-9 w-9 rounded-full border border-black/10 bg-white group-hover:border-[#ff4d00] transition-colors flex items-center justify-center font-mono text-[10px] font-semibold text-black/60 shadow-sm">
            srv
          </div>
        </div>
        <div className="absolute right-2 top-[78px] flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/45 group-hover:text-black/20 transition-colors">Server B (Busy)</span>
          <div className="h-9 w-9 rounded-full border border-red-500/30 bg-white flex items-center justify-center font-mono text-[10px] font-semibold text-red-500/70 shadow-sm">
            ⚠️
          </div>
        </div>
        <div className="absolute right-2 bottom-[24px] flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/55 group-hover:text-[#ff4d00] transition-colors">Server C</span>
          <div className="h-9 w-9 rounded-full border border-black/10 bg-white group-hover:border-[#ff4d00] transition-colors flex items-center justify-center font-mono text-[10px] font-semibold text-black/60 shadow-sm">
            srv
          </div>
        </div>
      </div>
    )
  },
  {
    id: "sharding",
    title: "Database Sharding & Partitioning",
    label: "sharding blueprint",
    hint: "hover to route username hash",
    description: "A single database can run out of space. Sharding splits your tables horizontally. Hover to see how a request for user 'Sarah' routes directly to Shard B based on her username hash.",
    render: () => (
      <div className="relative h-48 w-[340px] sm:w-[360px] mx-auto flex items-center justify-center">
        <svg className="absolute inset-0 h-full w-full pointer-events-none overflow-visible" fill="none">
          <path d="M 40 96 L 150 96" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          <path 
            d="M 150 96 L 310 146" 
            stroke="rgba(0,0,0,0.15)" 
            strokeWidth="1.5" 
            className="transition-all duration-300 group-hover:stroke-black/5" 
          />
          <path 
            d="M 150 96 L 310 46" 
            stroke="rgba(0,0,0,0.05)" 
            strokeWidth="1.5" 
            className="transition-all duration-300 group-hover:stroke-[#ff4d00]/40" 
          />
          <circle r="4" fill="#ff4d00" className="group-hover:hidden">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 40 96 L 150 96 L 310 146" />
          </circle>
          <circle r="4" fill="#ff4d00" className="hidden group-hover:block">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 40 96 L 150 96 L 310 46" />
          </circle>
        </svg>

        {/* Nodes */}
        <div className="absolute left-2 top-[78px] flex flex-col items-center">
          <div className="h-9 w-9 rounded-full border border-black/15 bg-white flex items-center justify-center font-mono text-[10px] font-semibold text-black/75 shadow-sm">
            Query
          </div>
        </div>
        <div className="absolute left-[130px] top-[74px] flex flex-col items-center">
          <div className="h-11 w-11 rounded-full border border-black bg-black flex items-center justify-center font-mono text-[10px] font-semibold text-[#EEE9E3] shadow-md">
            Hash
          </div>
        </div>
        <div className="absolute right-2 top-[24px] flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/45 group-hover:text-[#ff4d00] transition-colors">Shard 2 (N-Z)</span>
          <div className="h-9 w-9 rounded-full border border-black/10 bg-white group-hover:border-[#ff4d00] transition-colors flex items-center justify-center font-mono text-[10px] font-semibold text-black/60 shadow-sm">
            💾
          </div>
        </div>
        <div className="absolute right-2 bottom-[24px] flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/55 group-hover:text-black/20 transition-colors">Shard 1 (A-M)</span>
          <div className="h-9 w-9 rounded-full border border-black/10 bg-white group-hover:border-black/5 transition-colors flex items-center justify-center font-mono text-[10px] font-semibold text-black/60 shadow-sm">
            💾
          </div>
        </div>
      </div>
    )
  },
  {
    id: "queue",
    title: "Asynchronous Message Queues",
    label: "message queue blueprint",
    hint: "hover to process asynchronously",
    description: "Heavy tasks (like generating PDFs) shouldn't block users. An Asynchronous Queue accepts the job, lets the client go immediately, and hands it to a background worker to process in the dark.",
    render: () => (
      <div className="relative h-48 w-[340px] sm:w-[360px] mx-auto flex items-center justify-center">
        <svg className="absolute inset-0 h-full w-full pointer-events-none overflow-visible" fill="none">
          <path d="M 40 96 L 150 96" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
          
          {/* Normal path: client waits */}
          <path 
            d="M 150 96 L 310 96" 
            stroke="rgba(0,0,0,0.15)" 
            strokeWidth="1.5" 
            className="transition-all duration-300 group-hover:stroke-black/5" 
          />
          {/* Async queue handoff */}
          <path 
            d="M 150 96 L 230 46 L 310 46" 
            stroke="rgba(0,0,0,0.05)" 
            strokeWidth="1.5" 
            className="transition-all duration-300 group-hover:stroke-[#ff4d00]/40" 
          />

          {/* Pulses */}
          <circle r="4" fill="#ff4d00" className="group-hover:hidden">
            <animateMotion dur="2.5s" repeatCount="indefinite" path="M 40 96 L 150 96 L 310 96" />
          </circle>
          <circle r="4" fill="#ff4d00" className="hidden group-hover:block">
            <animateMotion dur="1.5s" repeatCount="indefinite" path="M 40 96 L 150 96 L 230 46 L 310 46" />
          </circle>
        </svg>

        {/* Nodes */}
        <div className="absolute left-2 top-[78px]">
          <div className="h-9 w-9 rounded-full border border-black/15 bg-white flex items-center justify-center font-mono text-[10px] font-semibold text-black/75 shadow-sm">
            Task
          </div>
        </div>
        <div className="absolute left-[130px] top-[74px]">
          <div className="h-11 w-11 rounded-full border border-black bg-black flex items-center justify-center font-mono text-[10px] font-semibold text-[#EEE9E3] shadow-md">
            API
          </div>
        </div>
        <div className="absolute right-2 top-[24px] flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/45 group-hover:text-[#ff4d00] transition-colors">Worker</span>
          <div className="h-9 w-9 rounded-full border border-black/10 bg-white group-hover:border-[#ff4d00] transition-colors flex items-center justify-center font-mono text-[10px] font-semibold text-black/60 shadow-sm">
            ⚙️
          </div>
        </div>
        <div className="absolute right-2 top-[78px] flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/55 group-hover:text-black/20 transition-colors">Direct block</span>
          <div className="h-9 w-9 rounded-full border border-black/10 bg-white flex items-center justify-center font-mono text-[10px] font-semibold text-black/60 shadow-sm">
            ⏳
          </div>
        </div>
      </div>
    )
  }
];

export default function HeroVisual() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentStep = visualSteps[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % visualSteps.length);
  };

  return (
    <div className="group w-full max-w-md select-none" aria-label="Interactive request blueprints visualizer">
      {/* Title / Switcher row */}
      <div className="flex items-center justify-between border-b border-black/5 pb-3">
        <div>
          <span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-[#ff4d00] font-semibold">
            {currentStep.label}
          </span>
          <h3 className="text-sm font-semibold text-black transition-all duration-300">
            {currentStep.title}
          </h3>
        </div>
        
        <button
          onClick={handleNext}
          className="font-mono text-[9px] font-semibold uppercase tracking-widest text-black transition hover:text-[#ff4d00]"
        >
          Next Visual →
        </button>
      </div>

      {/* SVG Canvas Container */}
      {currentStep.render()}

      {/* Humanized Explanation Footer */}
      <div className="mt-8 border-t border-black/10 pt-4 px-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#ff4d00] font-semibold">How it works</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/35 font-semibold">
            {currentStep.hint}
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-black/65 min-h-[50px] transition-all duration-300">
          {currentStep.description}
        </p>
      </div>
    </div>
  );
}
