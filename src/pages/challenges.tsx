import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Clock, Award } from "lucide-react";
import withAuth from "@/components/hoc/Auth";

export function Challenges() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white font-redbull-cond-bold tracking-wider">
            CHALLENGES
          </h1>
          <p className="text-gaming-light-gray font-redbull-book">
            Track team challenges and competition progress
          </p>
        </div>

        {/* Active Challenges */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-redbull-dark-red/20 to-redbull-red/10 border-gaming-slate/30 hover:border-redbull-red/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-redbull-red" />
                  <div>
                    <CardTitle className="text-white font-redbull-cond-bold text-lg">
                      WINS CHALLENGE
                    </CardTitle>
                    <CardDescription className="text-gaming-light-gray font-redbull-book">
                      Most victories this season
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-redbull-red text-white font-redbull-cond-bold">
                  ACTIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gaming-light-gray font-redbull-book">Progress:</span>
                    <span className="text-white font-redbull-book">1,242 / 2,000</span>
                  </div>
                  <Progress value={62.1} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Leader:</span>
                  <span className="text-redbull-red font-redbull-cond-bold">NOXUS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Time Left:</span>
                  <span className="text-white font-redbull-book">7 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-teal/20 to-gaming-slate/10 border-gaming-slate/30 hover:border-gaming-teal/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="h-6 w-6 text-gaming-teal" />
                  <div>
                    <CardTitle className="text-white font-redbull-cond-bold text-lg">
                      PORO SNAX
                    </CardTitle>
                    <CardDescription className="text-gaming-light-gray font-redbull-book">
                      Collect the most snacks
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-gaming-teal text-white font-redbull-cond-bold">
                  ACTIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gaming-light-gray font-redbull-book">Progress:</span>
                    <span className="text-white font-redbull-book">242M / 500M</span>
                  </div>
                  <Progress value={48.4} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Leader:</span>
                  <span className="text-gaming-teal font-redbull-cond-bold">NOXUS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Time Left:</span>
                  <span className="text-white font-redbull-book">12 days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-light-gray/20 to-gaming-slate/10 border-gaming-slate/30 hover:border-gaming-light-gray/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-gaming-light-gray" />
                  <div>
                    <CardTitle className="text-white font-redbull-cond-bold text-lg">
                      QUADRAS
                    </CardTitle>
                    <CardDescription className="text-gaming-light-gray font-redbull-book">
                      Most quadra kills
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-gaming-light-gray text-redbull-black font-redbull-cond-bold">
                  ACTIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gaming-light-gray font-redbull-book">Progress:</span>
                    <span className="text-white font-redbull-book">563B / 1T</span>
                  </div>
                  <Progress value={56.3} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Leader:</span>
                  <span className="text-gaming-light-gray font-redbull-cond-bold">IONIA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Time Left:</span>
                  <span className="text-white font-redbull-book">5 days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Challenge Statistics */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <Clock className="h-5 w-5 text-redbull-red" />
                Challenge Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Active Challenges:</span>
                  <span className="text-white font-redbull-cond-bold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Completed:</span>
                  <span className="text-gaming-teal font-redbull-cond-bold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Total Points:</span>
                  <span className="text-white font-redbull-cond-bold">3,493,473</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-redbull-red" />
                Current Leaders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Wins Challenge:</span>
                  <span className="text-redbull-red font-redbull-cond-bold">NOXUS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Poro Snax:</span>
                  <span className="text-gaming-teal font-redbull-cond-bold">NOXUS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gaming-light-gray font-redbull-book">Quadras:</span>
                  <span className="text-gaming-light-gray font-redbull-cond-bold">IONIA</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(Challenges);