import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield,
  Monitor
} from "lucide-react";
import withAuth from "@/components/hoc/Auth";

export function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white font-redbull-cond-bold tracking-wider">
            SETTINGS
          </h1>
          <p className="text-gaming-light-gray font-redbull-book">
            Configure your gaming dashboard and preferences
          </p>
        </div>

        {/* Settings Sections */}
        <div className="grid gap-6">
          {/* Profile Settings */}
          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <User className="h-5 w-5 text-redbull-red" />
                Profile Settings
              </CardTitle>
              <CardDescription className="text-gaming-light-gray font-redbull-book">
                Manage your account information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gaming-light-gray font-redbull-book">
                    Username
                  </Label>
                  <Input 
                    id="username" 
                    placeholder="Enter your username"
                    className="bg-gaming-slate/20 border-gaming-slate/30 text-white placeholder:text-gaming-light-gray/50"
                    defaultValue="RedBullGamer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gaming-light-gray font-redbull-book">
                    Email
                  </Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gaming-slate/20 border-gaming-slate/30 text-white placeholder:text-gaming-light-gray/50"
                    defaultValue="gamer@redbull.com"
                  />
                </div>
              </div>
              <Button className="bg-gradient-to-r from-redbull-red to-redbull-dark-red hover:from-redbull-red/90 hover:to-redbull-dark-red/90 text-white font-redbull-cond-bold tracking-wider">
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <Bell className="h-5 w-5 text-redbull-red" />
                Notifications
              </CardTitle>
              <CardDescription className="text-gaming-light-gray font-redbull-book">
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gaming-light-gray font-redbull-book">
                    Challenge Updates
                  </Label>
                  <p className="text-sm text-gaming-light-gray/70 font-redbull-book">
                    Get notified when challenge rankings change
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gaming-slate/30" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gaming-light-gray font-redbull-book">
                    Team Activity
                  </Label>
                  <p className="text-sm text-gaming-light-gray/70 font-redbull-book">
                    Notifications for team member activities
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gaming-slate/30" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gaming-light-gray font-redbull-book">
                    System Alerts
                  </Label>
                  <p className="text-sm text-gaming-light-gray/70 font-redbull-book">
                    Important system and performance alerts
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <Monitor className="h-5 w-5 text-redbull-red" />
                Display Settings
              </CardTitle>
              <CardDescription className="text-gaming-light-gray font-redbull-book">
                Customize your dashboard appearance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gaming-light-gray font-redbull-book">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-gaming-light-gray/70 font-redbull-book">
                    Use dark theme for better gaming experience
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gaming-slate/30" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gaming-light-gray font-redbull-book">
                    Red Bull Branding
                  </Label>
                  <p className="text-sm text-gaming-light-gray/70 font-redbull-book">
                    Show Red Bull branding and colors
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-gaming-slate/30" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gaming-light-gray font-redbull-book">
                    Animations
                  </Label>
                  <p className="text-sm text-gaming-light-gray/70 font-redbull-book">
                    Enable smooth animations and transitions
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-gradient-to-br from-gaming-slate/20 to-gaming-teal/10 border-gaming-slate/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <Shield className="h-5 w-5 text-redbull-red" />
                Security
              </CardTitle>
              <CardDescription className="text-gaming-light-gray font-redbull-book">
                Manage your account security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password" className="text-gaming-light-gray font-redbull-book">
                  Current Password
                </Label>
                <Input 
                  id="current-password" 
                  type="password"
                  placeholder="Enter current password"
                  className="bg-gaming-slate/20 border-gaming-slate/30 text-white placeholder:text-gaming-light-gray/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-gaming-light-gray font-redbull-book">
                  New Password
                </Label>
                <Input 
                  id="new-password" 
                  type="password"
                  placeholder="Enter new password"
                  className="bg-gaming-slate/20 border-gaming-slate/30 text-white placeholder:text-gaming-light-gray/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gaming-light-gray font-redbull-book">
                  Confirm Password
                </Label>
                <Input 
                  id="confirm-password" 
                  type="password"
                  placeholder="Confirm new password"
                  className="bg-gaming-slate/20 border-gaming-slate/30 text-white placeholder:text-gaming-light-gray/50"
                />
              </div>
              <Button className="bg-gradient-to-r from-redbull-red to-redbull-dark-red hover:from-redbull-red/90 hover:to-redbull-dark-red/90 text-white font-redbull-cond-bold tracking-wider">
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-gradient-to-br from-redbull-dark-red/20 to-redbull-red/10 border-redbull-red/30">
            <CardHeader>
              <CardTitle className="text-white font-redbull-cond-bold flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-redbull-red" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-gaming-light-gray font-redbull-book">
                Irreversible actions that affect your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gaming-light-gray font-redbull-book">
                    Reset Dashboard
                  </Label>
                  <p className="text-sm text-gaming-light-gray/70 font-redbull-book">
                    Reset all dashboard settings to default
                  </p>
                </div>
                <Button variant="outline" className="border-redbull-red/50 text-redbull-red hover:bg-redbull-red/10 font-redbull-cond-bold">
                  Reset
                </Button>
              </div>
              <Separator className="bg-redbull-red/30" />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-gaming-light-gray font-redbull-book">
                    Delete Account
                  </Label>
                  <p className="text-sm text-gaming-light-gray/70 font-redbull-book">
                    Permanently delete your account and all data
                  </p>
                </div>
                <Button variant="outline" className="border-redbull-red/50 text-redbull-red hover:bg-redbull-red/10 font-redbull-cond-bold">
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default withAuth(Settings);