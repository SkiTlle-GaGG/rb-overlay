import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, Shield, Sword } from "lucide-react";
import withAuth from "@/components/hoc/Auth";

export function Teams() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white font-redbull-cond-bold tracking-wider">
            TEAMS
          </h1>
          <p className="text-gaming-light-gray font-redbull-book">
            Manage your gaming teams and track their performance
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-redbull-dark-red/20 to-redbull-red/10 border-gaming-slate/30 hover:border-redbull-red/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Sword className="h-8 w-8 text-redbull-red" />
                <div>
                  <CardTitle className="text-white font-redbull-cond-bold">NOXUS</CardTitle>
                  <CardDescription className="text-gaming-light-gray font-redbull-book">
                    Power & Domination
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Members:</span>
                  <Badge variant="outline" className="border-redbull-red/50 text-redbull-red font-redbull-book">
                    8 Players
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Rank:</span>
                  <Badge className="bg-redbull-red text-white font-redbull-cond-bold">#1</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Points:</span>
                  <span className="text-white font-redbull-book">1,247,392</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30 hover:border-gaming-teal/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-gaming-teal" />
                <div>
                  <CardTitle className="text-white font-redbull-cond-bold">DEMACIA</CardTitle>
                  <CardDescription className="text-gaming-light-gray font-redbull-book">
                    Honor & Justice
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Members:</span>
                  <Badge variant="outline" className="border-gaming-teal/50 text-gaming-teal font-redbull-book">
                    8 Players
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Rank:</span>
                  <Badge className="bg-gaming-teal text-white font-redbull-cond-bold">#2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Points:</span>
                  <span className="text-white font-redbull-book">1,156,847</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-light-gray/20 to-gaming-slate/10 border-gaming-slate/30 hover:border-gaming-light-gray/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Crown className="h-8 w-8 text-gaming-light-gray" />
                <div>
                  <CardTitle className="text-white font-redbull-cond-bold">IONIA</CardTitle>
                  <CardDescription className="text-gaming-light-gray font-redbull-book">
                    Balance & Harmony
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Members:</span>
                  <Badge variant="outline" className="border-gaming-light-gray/50 text-gaming-light-gray font-redbull-book">
                    8 Players
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Rank:</span>
                  <Badge className="bg-gaming-light-gray text-redbull-black font-redbull-cond-bold">#3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Points:</span>
                  <span className="text-white font-redbull-book">1,089,234</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Statistics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-redbull-red" />
                Team Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Total Members:</span>
                  <span className="text-white font-redbull-cond-bold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Active Players:</span>
                  <span className="text-white font-redbull-cond-bold">22</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Average Score:</span>
                  <span className="text-white font-redbull-cond-bold">1,164,491</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <Crown className="h-5 w-5 text-redbull-red" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">1. Noxus</span>
                  <span className="text-redbull-red font-redbull-cond-bold">1,247,392 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">2. Demacia</span>
                  <span className="text-gaming-teal font-redbull-cond-bold">1,156,847 pts</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">3. Ionia</span>
                  <span className="text-gaming-light-gray font-redbull-cond-bold">1,089,234 pts</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(Teams);