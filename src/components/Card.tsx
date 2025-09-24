import React from "react";
import CardBg from "@/assets/img/card_bg_new.png";
import Image from "next/image";
import RbLogo from "@/assets/img/rb_logo.png";

export interface CardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function Card({ children, title, subtitle }: CardProps) {
  return (
    <div
      className="card py-4 pt-4 pr-[35px] pl-[25px] w-[360px] h-[342px] relative"
      style={{ backgroundImage: `url(${CardBg.src})` }}
    >
      {/* Header */}
      <div className="z-10">
        {/* Team Icon and Influencer Name */}
        <div className="header flex items-center justify-center w-full relative">
          <div className="text-white text-sm font-bold flex items-center flex-col">
            {/* Influencer Name */}
            <svg width="100%" height="30">
              <text
                x="50%"
                y="50%"
                fontFamily="FuturaforRedBull-CondBold"
                fontSize="22"
                fontWeight="bold"
                fill="white"
                stroke="#5B0000"
                strokeWidth="3"
                paintOrder="stroke"
                textAnchor="middle"
                dominantBaseline="middle"
                letterSpacing="2"
              >
                {title}
              </text>
            </svg>
            <p className="text-xs text-dark-red font-redbull-cond-bold tracking-wider uppercase">
              {subtitle}
            </p>
          </div>
        </div>
      </div>

      <div className="z-10">{children}</div>

      <div className="absolute bottom-[-70px] left-[50%] translate-x-[-50%]">
        <Image
          src={RbLogo.src}
          alt="Red Bull Logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
    </div>
  );
}