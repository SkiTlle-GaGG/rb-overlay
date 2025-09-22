import React from "react";

export interface CardProps {
    children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
    return (
        <div className="card bg-white px-6 py-4 w-[300px] ">
            {/* Header */}
            <div>
                {/* Team Icon and Influencer Name */}
                <div className="header flex items-center justify-center w-full relative">
                    <div className="absolute top-0 left-0 w-full h-full"></div>
                    <div className="text-white text-sm font-bold flex items-center flex-col">
                        {/* Influencer Name */}
                        <svg width="100%" height="36">
                            <text
                                x="50%"
                                y="50%"
                                fontSize="22"
                                fontWeight="bold"
                                fill="white"
                                stroke="#5B0000"
                                strokeWidth="2"
                                paintOrder="stroke"
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                NOWAY
                            </text>
                        </svg>
                        <p className="text-xs text-dark-red">EINZELWERTUNG</p>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <p className="text-sm text-dark-red font-light">CHALLENGE</p>
                    <p className="text-sm text-dark-red font-light">PUNKTE</p>
                </div>
            </div>

            {children}
        </div>
    )
}