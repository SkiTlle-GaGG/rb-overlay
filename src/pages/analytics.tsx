import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Monitor,
  Activity,
  Zap
} from "lucide-react";

export default function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white font-redbull-cond-bold tracking-wider">
            ANALYTICS
          </h1>
          <p className="text-gaming-light-gray font-redbull-book">
            Track performance metrics and gaming statistics
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-redbull-red/20 to-redbull-dark-red/10 border-gaming-slate/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gaming-light-gray font-redbull-book">
                Total Views
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-redbull-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-redbull-cond-bold">2.4M</div>
              <p className="text-xs text-gaming-light-gray/70 font-redbull-book flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-teal/20 to-gaming-slate/10 border-gaming-slate/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gaming-light-gray font-redbull-book">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-gaming-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-redbull-cond-bold">24,847</div>
              <p className="text-xs text-gaming-light-gray/70 font-redbull-book flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-light-gray/20 to-gaming-slate/10 border-gaming-slate/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gaming-light-gray font-redbull-book">
                Overlay Usage
              </CardTitle>
              <Monitor className="h-4 w-4 text-gaming-light-gray" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-redbull-cond-bold">1,247</div>
              <p className="text-xs text-gaming-light-gray/70 font-redbull-book flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                +15.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-redbull-dark-red/20 to-gaming-slate/10 border-gaming-slate/30">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gaming-light-gray font-redbull-book">
                Performance
              </CardTitle>
              <Zap className="h-4 w-4 text-redbull-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white font-redbull-cond-bold">98.7%</div>
              <p className="text-xs text-gaming-light-gray/70 font-redbull-book flex items-center gap-1">
                <Activity className="h-3 w-3" />
                Uptime this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-redbull-red" />
                Team Performance
              </CardTitle>
              <CardDescription className="text-gaming-light-gray font-redbull-book">
                Monthly team statistics and rankings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-redbull-red rounded-full"></div>
                    <span className="text-gaming-light-gray font-redbull-book">Noxus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-redbull-book">1,247,392</span>
                    <Badge className="bg-redbull-red text-white font-redbull-cond-bold">#1</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gaming-teal rounded-full"></div>
                    <span className="text-gaming-light-gray font-redbull-book">Demacia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-redbull-book">1,156,847</span>
                    <Badge className="bg-gaming-teal text-white font-redbull-cond-bold">#2</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gaming-light-gray rounded-full"></div>
                    <span className="text-gaming-light-gray font-redbull-book">Ionia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-redbull-book">1,089,234</span>
                    <Badge className="bg-gaming-light-gray text-redbull-black font-redbull-cond-bold">#3</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <Monitor className="h-5 w-5 text-redbull-red" />
                Overlay Analytics
              </CardTitle>
              <CardDescription className="text-gaming-light-gray font-redbull-book">
                Usage statistics for streaming overlays
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Challenge Ranking:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-redbull-book">847 views</span>
                    <Badge className="bg-redbull-red text-white font-redbull-cond-bold">Active</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Team Stats:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-redbull-book">324 views</span>
                    <Badge className="bg-gaming-teal text-white font-redbull-cond-bold">Active</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Live Leaderboard:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-redbull-book">156 views</span>
                    <Badge className="bg-gaming-light-gray text-redbull-black font-redbull-cond-bold">Beta</Badge>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Total Overlay Views:</span>
                  <span className="text-white font-redbull-cond-bold">1,327</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
          <CardHeader>
            <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-redbull-red" />
              System Performance
            </CardTitle>
            <CardDescription className="text-gaming-light-gray font-redbull-book">
              Real-time system metrics and health status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gaming-light-gray font-redbull-book">CPU Usage:</span>
                  <span className="text-white font-redbull-book">23%</span>
                </div>
                <div className="w-full bg-gaming-slate/30 rounded-full h-2">
                  <div className="bg-redbull-red h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gaming-light-gray font-redbull-book">Memory:</span>
                  <span className="text-white font-redbull-book">67%</span>
                </div>
                <div className="w-full bg-gaming-slate/30 rounded-full h-2">
                  <div className="bg-gaming-teal h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gaming-light-gray font-redbull-book">Network:</span>
                  <span className="text-white font-redbull-book">45%</span>
                </div>
                <div className="w-full bg-gaming-slate/30 rounded-full h-2">
                  <div className="bg-gaming-light-gray h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gaming-light-gray font-redbull-book">Storage:</span>
                  <span className="text-white font-redbull-book">34%</span>
                </div>
                <div className="w-full bg-gaming-slate/30 rounded-full h-2">
                  <div className="bg-redbull-dark-red h-2 rounded-full" style={{ width: '34%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
