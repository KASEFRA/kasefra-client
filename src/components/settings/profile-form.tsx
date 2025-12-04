"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  User,
  Edit,
  Upload,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  Save,
  X
} from "lucide-react"

interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  nationality: string
  emirate: string
  occupation: string
  avatar: string
}

const mockProfile: UserProfile = {
  firstName: "Areeb",
  lastName: "Hafeel",
  email: "areeb@kasefra.io",
  phone: "+971 50 123 4567",
  dateOfBirth: "1990-03-15",
  nationality: "UAE",
  emirate: "Dubai",
  occupation: "Software Engineer",
  avatar: "/profile.jpeg"
}

const uaeEmirates = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain"
]

const nationalities = [
  "UAE", "Saudi Arabia", "Egypt", "Jordan", "Lebanon", "Syria", "India",
  "Pakistan", "Philippines", "Bangladesh", "United States", "United Kingdom",
  "Canada", "Australia", "Germany", "France", "Other"
]

export function ProfileForm() {
  const [profile, setProfile] = useState<UserProfile>(mockProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    console.log('Saving profile:', profile)
    setIsEditing(false)
    setHasChanges(false)
    // Here you would typically make an API call to save the profile
  }

  const handleCancel = () => {
    setProfile(mockProfile)
    setIsEditing(false)
    setHasChanges(false)
  }

  const getInitials = () => {
    return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`
  }

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
        <div className="flex flex-col gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg lg:text-xl">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription className="text-sm sm:text-base mt-1">
              Manage your personal details and contact information
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3">
            {hasChanges && (
              <Badge variant="outline" className="text-xs sm:text-sm self-start sm:self-auto">
                Unsaved Changes
              </Badge>
            )}
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-sm h-9 sm:h-10 w-full sm:w-auto"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancel}
                  className="text-sm h-9 sm:h-10 flex-1 sm:flex-none"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="text-sm h-9 sm:h-10 flex-1 sm:flex-none"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-4 sm:px-6">
        {/* Avatar Section */}
        <div className="flex flex-col items-center sm:flex-row sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-muted/30 rounded-lg">
          <Avatar className="h-20 w-20 sm:h-24 sm:w-24">
            <AvatarImage src={profile.avatar} alt={`${profile.firstName} ${profile.lastName}`} />
            <AvatarFallback className="text-lg sm:text-xl font-semibold bg-primary text-primary-foreground">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-3 text-center sm:text-left flex-1">
            <h3 className="text-lg sm:text-xl font-semibold">
              {profile.firstName} {profile.lastName}
            </h3>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{profile.emirate}, {profile.nationality}</span>
            </div>
            {isEditing && (
              <Button variant="outline" size="sm" className="text-sm h-9 w-full sm:w-auto">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Photo
              </Button>
            )}
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <Calendar className="h-4 w-4 text-primary" />
            Personal Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                disabled={!isEditing}
                className="text-sm h-10 sm:h-11"
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                disabled={!isEditing}
                className="text-sm h-10 sm:h-11"
                placeholder="Enter your last name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                disabled={!isEditing}
                className="text-sm h-10 sm:h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation" className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Occupation
              </Label>
              <Input
                id="occupation"
                value={profile.occupation}
                onChange={(e) => handleInputChange('occupation', e.target.value)}
                disabled={!isEditing}
                className="text-sm h-10 sm:h-11"
                placeholder="Enter your occupation"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <Mail className="h-4 w-4 text-primary" />
            Contact Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
                className="text-sm h-10 sm:h-11"
                placeholder="Enter your email address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                className="text-sm h-10 sm:h-11"
                placeholder="Enter your phone number"
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="space-y-4">
          <h4 className="font-semibold text-base sm:text-lg flex items-center gap-2 border-b pb-2">
            <MapPin className="h-4 w-4 text-primary" />
            Location Information
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-2">
              <Label htmlFor="nationality" className="text-sm font-medium">Nationality</Label>
              <Select
                value={profile.nationality}
                onValueChange={(value) => handleInputChange('nationality', value)}
                disabled={!isEditing}
              >
                <SelectTrigger className="text-sm h-10 sm:h-11">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nationality) => (
                    <SelectItem key={nationality} value={nationality} className="text-sm">
                      {nationality}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emirate" className="text-sm font-medium">Emirate/City</Label>
              <Select
                value={profile.emirate}
                onValueChange={(value) => handleInputChange('emirate', value)}
                disabled={!isEditing}
              >
                <SelectTrigger className="text-sm h-10 sm:h-11">
                  <SelectValue placeholder="Select emirate" />
                </SelectTrigger>
                <SelectContent>
                  {uaeEmirates.map((emirate) => (
                    <SelectItem key={emirate} value={emirate} className="text-sm">
                      {emirate}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* UAE Specific Information */}
        <div className="p-4 sm:p-6 bg-primary/5 dark:bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm self-start">
              UAE Resident
            </Badge>
            <span className="font-semibold text-base sm:text-lg">UAE Resident Information</span>
          </div>
          <div className="space-y-3 text-sm sm:text-base">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="text-muted-foreground font-medium">Visa Status:</span>
              <span className="font-semibold">Employment Visa</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="text-muted-foreground font-medium">Emirates ID:</span>
              <span className="font-semibold font-mono">784-****-*******-*</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="text-muted-foreground font-medium">Residency Since:</span>
              <span className="font-semibold">2018</span>
            </div>
          </div>
          {isEditing && (
            <Button variant="outline" size="sm" className="mt-4 text-sm h-9 w-full sm:w-auto">
              Update UAE Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}