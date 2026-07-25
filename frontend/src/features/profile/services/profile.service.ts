import type { PasswordChangeRequest, ProfileSettings, UserProfile } from '../types';

const DEMO_PROFILE: UserProfile = {
  fullName: 'Muhammed Nihal',
  email: 'nihal@example.com',
  phone: '+91 98765 43210',
  location: 'Kochi, Kerala, India',
  bio: 'Citizen. Concerned about better communities.',
};

const DEMO_SETTINGS: ProfileSettings = { issueUpdates: true, communityUpdates: false };

const delay = () => new Promise<void>((resolve) => window.setTimeout(resolve, 350));

/** Temporary demo adapter. Replace these functions with Axios calls when profile APIs are available. */
export async function getProfile(): Promise<{ profile: UserProfile; settings: ProfileSettings }> {
  await delay();
  return { profile: DEMO_PROFILE, settings: DEMO_SETTINGS };
}

export async function updateProfile(profile: UserProfile): Promise<UserProfile> {
  await delay();
  Object.assign(DEMO_PROFILE, profile);
  return DEMO_PROFILE;
}

export async function changePassword(request: PasswordChangeRequest): Promise<void> {
  void request;
  await delay();
}

export async function updateProfileSettings(settings: ProfileSettings): Promise<ProfileSettings> {
  await delay();
  Object.assign(DEMO_SETTINGS, settings);
  return DEMO_SETTINGS;
}
