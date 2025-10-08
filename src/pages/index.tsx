import withAuth from "@/components/hoc/Auth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trophy, Users, Monitor, BarChart3 } from "lucide-react";
function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white font-redbull-cond-bold tracking-wider">
            WELCOME TO RED BULL GAMING
          </h1>
          <p className="text-gaming-light-gray font-redbull-book">
            Manage your gaming overlays and team statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30 hover:border-redbull-red/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gaming-light-gray font-redbull-book">
                Active Overlays
              </CardTitle>
              <Monitor className="h-4 w-4 text-redbull-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-redbull-cond-bold">
                12
              </div>
              <p className="text-xs text-gaming-light-gray/70 font-redbull-book">
                Currently streaming
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30 hover:border-redbull-red/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gaming-light-gray font-redbull-book">
                Team Members
              </CardTitle>
              <Users className="h-4 w-4 text-redbull-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-redbull-cond-bold">
                24
              </div>
              <p className="text-xs text-gaming-light-gray/70 font-redbull-book">
                Across all teams
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30 hover:border-redbull-red/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gaming-light-gray font-redbull-book">
                Challenges
              </CardTitle>
              <Trophy className="h-4 w-4 text-redbull-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-redbull-cond-bold">
                8
              </div>
              <p className="text-xs text-gaming-light-gray/70 font-redbull-book">
                Active challenges
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30 hover:border-redbull-red/50 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gaming-light-gray font-redbull-book">
                Analytics
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-redbull-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-redbull-cond-bold">
                95%
              </div>
              <p className="text-xs text-gaming-light-gray/70 font-redbull-book">
                Performance score
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
          <CardHeader>
            <CardTitle className="text-white font-redbull-cond-bold">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gaming-light-gray font-redbull-book">
              Latest updates from your gaming dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-redbull-red"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-white font-redbull-book">
                    Challenge ranking updated
                  </p>
                  <p className="text-xs text-gaming-light-gray/70 font-redbull-book">
                    2 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-gaming-teal"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-white font-redbull-book">
                    New team member joined Noxus
                  </p>
                  <p className="text-xs text-gaming-light-gray/70 font-redbull-book">
                    15 minutes ago
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-gaming-light-gray"></div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-white font-redbull-book">
                    Overlay performance optimized
                  </p>
                  <p className="text-xs text-gaming-light-gray/70 font-redbull-book">
                    1 hour ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(Home);