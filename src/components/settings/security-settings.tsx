"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Shield,
  Key,
  Smartphone,
  Eye,
  EyeOff,
  Clock,
  AlertTriangle,
  CheckCircle,
  Trash2
} from "lucide-react"

interface SecurityPreferences {
  twoFactorEnabled: boolean
  biometricLogin: boolean
  sessionTimeout: number
  loginNotifications: boolean
  deviceTracking: boolean
  autoLogout: boolean
  dataEncryption: boolean
  exportProtection: boolean
}

const mockSecurityPreferences: SecurityPreferences = {
  twoFactorEnabled: false,
  biometricLogin: true,
  sessionTimeout: 30,
  loginNotifications: true,
  deviceTracking: true,
  autoLogout: true,
  dataEncryption: true,
  exportProtection: true
}

const mockSessions = [
  {
    id: "1",
    device: "iPhone 13 Pro",
    location: "Dubai, UAE",
    lastActive: "2 minutes ago",
    current: true,
    ipAddress: "192.168.1.100"
  },
  {
    id: "2",
    device: "MacBook Pro",
    location: "Dubai, UAE",
    lastActive: "1 hour ago",
    current: false,
    ipAddress: "192.168.1.101"
  },
  {
    id: "3",
    device: "Chrome on Windows",
    location: "Abu Dhabi, UAE",
    lastActive: "3 days ago",
    current: false,
    ipAddress: "185.23.42.15"
  }
]

export function SecuritySettings() {
  const [preferences, setPreferences] = useState<SecurityPreferences>(mockSecurityPreferences)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: ""
  })

  const handlePreferenceChange = (key: keyof SecurityPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }))
  }

  const handlePasswordChange = (field: keyof typeof passwordData, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }))
  }

  const handleChangePassword = () => {
    console.log('Changing password...')
    // Here you would typically make an API call to change the password
  }

  const handleRevokeSession = (sessionId: string) => {
    console.log('Revoking session:', sessionId)
    // Here you would typically make an API call to revoke the session
  }

  const handleEnable2FA = () => {
    console.log('Setting up 2FA...')
    // Here you would typically show a 2FA setup flow
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Security Settings
        </CardTitle>
        <CardDescription>
          Protect your account and financial data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Password Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Key className="h-4 w-4" />
            Password & Authentication
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.new}
                    onChange={(e) => handlePasswordChange('new', e.target.value)}
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <Button onClick={handleChangePassword}>
              Change Password
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border-2 border-primary/20 bg-primary/5">
            <div className="space-y-0.5">
              <Label className="text-base font-medium flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Two-Factor Authentication
              </Label>
              <div className="text-sm text-muted-foreground">
                Add an extra layer of security to your account
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={preferences.twoFactorEnabled ? "secondary" : "outline"}>
                {preferences.twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
              {!preferences.twoFactorEnabled ? (
                <Button size="sm" onClick={handleEnable2FA}>
                  Setup 2FA
                </Button>
              ) : (
                <Button size="sm" variant="outline">
                  Manage 2FA
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Login Settings */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Login Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="biometricLogin" className="text-base">Biometric Login</Label>
                <div className="text-sm text-muted-foreground">
                  Use fingerprint or face ID for quick access
                </div>
              </div>
              <Switch
                id="biometricLogin"
                checked={preferences.biometricLogin}
                onCheckedChange={(checked) => handlePreferenceChange('biometricLogin', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="loginNotifications" className="text-base">Login Notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Get notified of new login attempts
                </div>
              </div>
              <Switch
                id="loginNotifications"
                checked={preferences.loginNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('loginNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="autoLogout" className="text-base">Auto Logout</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically log out after period of inactivity
                </div>
              </div>
              <Switch
                id="autoLogout"
                checked={preferences.autoLogout}
                onCheckedChange={(checked) => handlePreferenceChange('autoLogout', checked)}
              />
            </div>

            {preferences.autoLogout && (
              <div className="space-y-2 pl-6">
                <Label htmlFor="sessionTimeout">Session Timeout</Label>
                <Select
                  value={preferences.sessionTimeout.toString()}
                  onValueChange={(value) => handlePreferenceChange('sessionTimeout', parseInt(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>

        {/* Data Protection */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm">Data Protection</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="dataEncryption" className="text-base">Data Encryption</Label>
                <div className="text-sm text-muted-foreground">
                  Encrypt sensitive financial data (recommended)
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-secondary" />
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="exportProtection" className="text-base">Export Protection</Label>
                <div className="text-sm text-muted-foreground">
                  Require password for data exports
                </div>
              </div>
              <Switch
                id="exportProtection"
                checked={preferences.exportProtection}
                onCheckedChange={(checked) => handlePreferenceChange('exportProtection', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="deviceTracking" className="text-base">Device Tracking</Label>
                <div className="text-sm text-muted-foreground">
                  Monitor login attempts from new devices
                </div>
              </div>
              <Switch
                id="deviceTracking"
                checked={preferences.deviceTracking}
                onCheckedChange={(checked) => handlePreferenceChange('deviceTracking', checked)}
              />
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="space-y-4">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Active Sessions
          </h4>
          <div className="space-y-3">
            {mockSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{session.device}</span>
                    {session.current && (
                      <Badge variant="secondary" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {session.location} • {session.lastActive}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    IP: {session.ipAddress}
                  </div>
                </div>
                {!session.current && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRevokeSession(session.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full">
            Revoke All Other Sessions
          </Button>
        </div>

        {/* Security Recommendations */}
        <div className="p-4 rounded-lg border bg-muted/30">
          <h4 className="font-medium text-sm mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-accent" />
            Security Recommendations
          </h4>
          <div className="space-y-2 text-sm">
            {!preferences.twoFactorEnabled && (
              <div className="flex items-center gap-2 text-accent">
                <span>•</span>
                <span>Enable two-factor authentication for better security</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle className="h-3 w-3" />
              <span>Strong password requirements met</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle className="h-3 w-3" />
              <span>Data encryption is active</span>
            </div>
            <div className="flex items-center gap-2 text-secondary">
              <CheckCircle className="h-3 w-3" />
              <span>Login notifications are enabled</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}