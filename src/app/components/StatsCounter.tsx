"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface StatsCounterProps {
  end: number;
  label: string;
}

export default function StatsCounter({ end, label }: StatsCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-[#4CC9F0] mb-2">
        {inView ? <CountUp start={0} end={end} duration={2.5} /> : "0"}+
      </div>
      <div className="text-gray-300">{label}</div>
    </div>
  );
}
