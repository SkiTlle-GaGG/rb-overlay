import Link from "next/link";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black p-8 relative overflow-hidden">
      {/* Red Bull Energy Lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-redbull-red to-transparent opacity-30"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-redbull-yellow to-transparent opacity-20"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-redbull-red to-transparent opacity-30"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Enhanced Navigation */}
        <nav className="redbull-card mb-8 p-0">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl">RED BULL GAMING</div>
              <div className="flex space-x-4">
                <Link href="/" className="redbull-button text-sm">
                  Home
                </Link>
                <Link
                  href="/challenge/ranking"
                  className="redbull-button text-sm"
                >
                  Challenge Ranking
                </Link>
                <Link href="/overlays" className="redbull-button text-sm">
                  Overlays
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="mt-12 flex justify-center">
          <div className="w-full max-w-6xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
