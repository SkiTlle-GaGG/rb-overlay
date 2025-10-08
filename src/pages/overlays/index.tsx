import { DashboardLayout } from "@/components/layout/DashboardLayout";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Monitor, Eye, Download } from "lucide-react";
import Link from "next/link";

const CARDS_DATA = [
  {
    title: "Challenge Ranking",
    description: "Display team challenge rankings and statistics in real-time",
    href: "/overlays/challenge-ranking",
    icon: Monitor,
    status: "Active",
    resolution: "1920x1080",
    lastUpdated: "2 min ago",
  },
  {
    title: "Team Player Ranking",
    description: "Team players ranking for ionia, demacia and noxus",
    href: "/overlays/team-players-ranking",
    icon: Monitor,
    status: "Active",
    resolution: "1920x1080",
    lastUpdated: "2 min ago",
  },
  {
    title: "Overall Ranking",
    description: "Display team overall rankings and statistics in real-time",
    href: "/overlays/overall-ranking",
    icon: Monitor,
    status: "Active",
    resolution: "1920x1080",
    lastUpdated: "2 min ago",
  },

  {
    title: "OBSESS OVERLAY",
    description: "PARAMS: dev=true, start_at=0, end_at=31, duration=30, overlays_count=4",
    href: "/overlays/streamer/obsess",
    icon: Monitor,
    status: "Active",
    resolution: "1920x1080",
    lastUpdated: "2 min ago",
  },


]
export default function Overlays() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white font-redbull-cond-bold tracking-wider">
            OVERLAYS
          </h1>
          <p className="text-gaming-light-gray font-redbull-book">
            Manage and preview your streaming overlays
          </p>
        </div>

        {/* Overlay Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CARDS_DATA.map((card) => (
            <Card className="bg-gradient-to-br border-gaming-slate/30 hover:border-redbull-red/50 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <card.icon className="h-8 w-8 text-redbull-red" />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 border-gaming-slate/30 text-gaming-light-gray hover:text-white hover:border-redbull-red/50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 w-8 p-0 border-gaming-slate/30 text-gaming-light-gray hover:text-white hover:border-redbull-red/50"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <CardTitle className="text-white font-redbull-cond-bold">
                  {card.title}
                </CardTitle>
                <CardDescription className="text-gaming-light-gray font-redbull-book">
                  {card.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gaming-light-gray font-redbull-book">
                      Status:
                    </span>
                    <span className="text-redbull-red font-redbull-cond-bold">
                      {card.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gaming-light-gray font-redbull-book">
                      Resolution:
                    </span>
                    <span className="text-white font-redbull-book">
                      {card.resolution}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gaming-light-gray font-redbull-book">
                      Last Updated:
                    </span>
                    <span className="text-white font-redbull-book">
                      {card.lastUpdated}
                    </span>
                  </div>
                  <Link href={card.href}>
                    <Button className="w-full cursor-pointer mt-4 bg-gradient-to-r from-redbull-red to-redbull-dark-red hover:from-redbull-red/90 hover:to-redbull-dark-red/90 text-white font-redbull-cond-bold tracking-wider">
                      View Overlay
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Instructions */}
        <Card className="bg-gradient-to-br  border-gaming-slate/30">
          <CardHeader>
            <CardTitle className="text-white font-redbull-cond-bold">
              How to Use Overlays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-gaming-light-gray font-redbull-book">
              <p>
                1. Click &quot; View Overlay&quot; to see the overlay in full
                screen
              </p>
              <p>2. Copy the URL and add it as a Browser Source in OBS</p>
              <p>3. Set the dimensions to 1920x1080 for optimal quality</p>
              <p>
                4. Enable &quot; Shutdown source when not visible&quot; for
                better performance
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
