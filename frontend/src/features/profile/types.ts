export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
}

export interface ProfileSettings {
  issueUpdates: boolean;
  communityUpdates: boolean;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}
