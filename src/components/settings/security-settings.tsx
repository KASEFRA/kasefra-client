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
  Trash2,
  MapPin
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
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
          <Shield className="h-5 w-5 text-primary" />
          Security Settings
        </CardTitle>
        <CardDescription className="text-sm sm:text-base">
          Protect your account and financial data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
        {/* Password Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <Key className="h-4 w-4 text-primary" />
            Password & Authentication
          </h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm font-medium">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.current}
                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                    placeholder="Enter current password"
                    className="text-sm h-10 sm:h-11 pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full w-12 px-0"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-sm font-medium">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.new}
                      onChange={(e) => handlePasswordChange('new', e.target.value)}
                      placeholder="Enter new password"
                      className="text-sm h-10 sm:h-11 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full w-12 px-0"
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
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirm}
                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                    placeholder="Confirm new password"
                    className="text-sm h-10 sm:h-11"
                  />
                </div>
              </div>
            </div>

            <Button onClick={handleChangePassword} className="w-full sm:w-auto h-10 sm:h-11">
              Change Password
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 rounded-lg border-2 border-primary/20 bg-primary/5">
            <div className="space-y-2 flex-1">
              <Label className="text-base sm:text-lg font-semibold flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Two-Factor Authentication
              </Label>
              <div className="text-sm sm:text-base text-muted-foreground">
                Add an extra layer of security to your account
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2">
              <Badge variant={preferences.twoFactorEnabled ? "secondary" : "outline"} className="text-sm justify-center">
                {preferences.twoFactorEnabled ? "Enabled" : "Disabled"}
              </Badge>
              {!preferences.twoFactorEnabled ? (
                <Button size="sm" onClick={handleEnable2FA} className="h-9 sm:h-10">
                  Setup 2FA
                </Button>
              ) : (
                <Button size="sm" variant="outline" className="h-9 sm:h-10">
                  Manage 2FA
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Login Settings */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <Smartphone className="h-4 w-4 text-primary" />
            Login Settings
          </h4>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="biometricLogin" className="text-base font-medium">Biometric Login</Label>
                <div className="text-sm text-muted-foreground">
                  Use fingerprint or face ID for quick access
                </div>
              </div>
              <Switch
                id="biometricLogin"
                checked={preferences.biometricLogin}
                onCheckedChange={(checked) => handlePreferenceChange('biometricLogin', checked)}
                className="self-start sm:self-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="loginNotifications" className="text-base font-medium">Login Notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Get notified of new login attempts
                </div>
              </div>
              <Switch
                id="loginNotifications"
                checked={preferences.loginNotifications}
                onCheckedChange={(checked) => handlePreferenceChange('loginNotifications', checked)}
                className="self-start sm:self-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="autoLogout" className="text-base font-medium">Auto Logout</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically log out after period of inactivity
                </div>
              </div>
              <Switch
                id="autoLogout"
                checked={preferences.autoLogout}
                onCheckedChange={(checked) => handlePreferenceChange('autoLogout', checked)}
                className="self-start sm:self-center"
              />
            </div>

            {preferences.autoLogout && (
              <div className="space-y-2 pl-0 sm:pl-6">
                <Label htmlFor="sessionTimeout" className="text-sm font-medium">Session Timeout</Label>
                <Select
                  value={preferences.sessionTimeout.toString()}
                  onValueChange={(value) => handlePreferenceChange('sessionTimeout', parseInt(value))}
                >
                  <SelectTrigger className="w-full h-10 sm:h-11">
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
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <Shield className="h-4 w-4 text-primary" />
            Data Protection
          </h4>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="dataEncryption" className="text-base font-medium">Data Encryption</Label>
                <div className="text-sm text-muted-foreground">
                  Encrypt sensitive financial data (recommended)
                </div>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <Badge variant="secondary">Active</Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="exportProtection" className="text-base font-medium">Export Protection</Label>
                <div className="text-sm text-muted-foreground">
                  Require password for data exports
                </div>
              </div>
              <Switch
                id="exportProtection"
                checked={preferences.exportProtection}
                onCheckedChange={(checked) => handlePreferenceChange('exportProtection', checked)}
                className="self-start sm:self-center"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
              <div className="space-y-1 flex-1">
                <Label htmlFor="deviceTracking" className="text-base font-medium">Device Tracking</Label>
                <div className="text-sm text-muted-foreground">
                  Monitor login attempts from new devices
                </div>
              </div>
              <Switch
                id="deviceTracking"
                checked={preferences.deviceTracking}
                onCheckedChange={(checked) => handlePreferenceChange('deviceTracking', checked)}
                className="self-start sm:self-center"
              />
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <Clock className="h-4 w-4 text-primary" />
            Active Sessions
          </h4>
          <div className="space-y-4">
            {mockSessions.map((session) => (
              <div key={session.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="font-semibold text-base">{session.device}</span>
                    {session.current && (
                      <Badge variant="secondary" className="text-sm self-start sm:self-auto">
                        Current Session
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 mb-1">
                      <MapPin className="h-3 w-3" />
                      {session.location} • {session.lastActive}
                    </div>
                    <div className="text-xs font-mono">
                      IP: {session.ipAddress}
                    </div>
                  </div>
                </div>
                {!session.current && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRevokeSession(session.id)}
                    className="w-full sm:w-auto h-9"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Revoke Session
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full h-10 sm:h-11">
            <Trash2 className="h-4 w-4 mr-2" />
            Revoke All Other Sessions
          </Button>
        </div>

        {/* Security Recommendations */}
        <div className="p-4 sm:p-6 rounded-lg border bg-muted/30">
          <h4 className="font-semibold text-base sm:text-lg mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            Security Recommendations
          </h4>
          <div className="space-y-3 text-sm sm:text-base">
            {!preferences.twoFactorEnabled && (
              <div className="flex items-start gap-3 text-orange-600 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Enable two-factor authentication for better security</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-green-600">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>Strong password requirements met</span>
            </div>
            <div className="flex items-center gap-3 text-green-600">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>Data encryption is active</span>
            </div>
            <div className="flex items-center gap-3 text-green-600">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span>Login notifications are enabled</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}