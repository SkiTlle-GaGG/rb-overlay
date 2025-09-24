import Dashboard from "@/components/layout/Dashboard";
import Card from "@/components/Card";
import ChallengeStats from "@/components/ChallengeStats";

export default function Home() {
  return (
    <Dashboard>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="redbull-title text-6xl mb-4">RED BULL GAMING</h1>
          <p className="text-xl text-redbull-silver font-redbull-book tracking-wider max-w-2xl mx-auto">
            Welcome to the ultimate gaming experience where energy meets
            competition
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {/* <Card title="NOXUS TEAM" subtitle="Power & Domination">
            <ChallengeStats />
          </Card>

          <Card title="DEMACIA TEAM" subtitle="Honor & Justice">
            <ChallengeStats />
          </Card>

          <Card title="IONIA TEAM" subtitle="Balance & Harmony">
            <ChallengeStats />
          </Card> */}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="redbull-card p-8 max-w-md mx-auto">
            <h2 className="redbull-text-gradient text-2xl mb-4 font-redbull-cond-bold">
              JOIN THE COMPETITION
            </h2>
            <p className="text-redbull-silver mb-6 font-redbull-book">
              Ready to prove your skills? Enter the arena and show what you're
              made of.
            </p>
            <button className="redbull-button">Start Gaming Now</button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
