import Link from "next/link";
import React from "react";

export default function Overlays() {
  return (
    <div className="overlay-container">
      <div className="min-h-screen bg-black p-8">
        <div className="container mx-auto">
          <div className="space-y-8">
            <h1 className="redbull-title text-4xl mb-8 text-center">
              OVERLAYS
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              <div className="redbull-card p-6 w-full max-w-sm">
                <h2 className="redbull-text-gradient text-xl mb-4 font-redbull-cond-bold text-center">
                  CHALLENGE RANKING
                </h2>
                <p className="text-redbull-silver mb-6 font-redbull-book text-center text-sm">
                  Display team challenge rankings and statistics
                </p>
                <div className="text-center">
                  <Link
                    href="/overlays/challenge-ranking"
                    className="redbull-button"
                  >
                    View Overlay
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
