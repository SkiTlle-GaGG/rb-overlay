import React from "react";
import CardBg from "@/assets/img/card_bg_new.png";
import Image from "next/image";
import RbLogo from "@/assets/img/rb_logo.png";
import styles from "./Card.module.css";

export interface CardProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function Card({ children, title, subtitle }: CardProps) {
  return (
    <div
      className={styles.overlayCard}
      style={{ backgroundImage: `url(${CardBg.src})` }}
    >
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleContainer}>
          <div className={styles.cardTitleWrapper}>
            <svg className={styles.cardTitle} height={30}>
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
            <p className={styles.cardSubtitle}>{subtitle}</p>
          </div>
        </div>
      </div>

      <div className={styles.cardContent}>{children}</div>

      <div className={styles.cardLogoContainer}>
        <Image
          src={RbLogo.src}
          alt="Red Bull Logo"
          className={styles.cardLogo}
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}