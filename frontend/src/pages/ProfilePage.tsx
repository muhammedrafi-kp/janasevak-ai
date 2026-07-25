import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { Bell, CheckCircle2, LoaderCircle, LockKeyhole, Settings, ShieldCheck, UserRound } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { changePassword, getProfile, updateProfile, updateProfileSettings } from '../features/profile/services/profile.service';
import type { ProfileSettings, UserProfile } from '../features/profile/types';

type ProfileTab = 'information' | 'password' | 'settings';
type Notice = { type: 'success' | 'error'; message: string } | null;

const EMPTY_PROFILE: UserProfile = { fullName: '', email: '', phone: '', location: '', bio: '' };

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('information');
  const [profile, setProfile] = useState<UserProfile>(EMPTY_PROFILE);
  const [settings, setSettings] = useState<ProfileSettings>({ issueUpdates: false, communityUpdates: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    let isActive = true;
    getProfile()
      .then(({ profile: loadedProfile, settings: loadedSettings }) => {
        if (!isActive) return;
        setProfile(loadedProfile);
        setSettings(loadedSettings);
      })
      .catch(() => isActive && setNotice({ type: 'error', message: 'Unable to load your profile. Please refresh and try again.' }))
      .finally(() => isActive && setIsLoading(false));
    return () => { isActive = false; };
  }, []);

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (profile.fullName.trim().length < 2 || profile.phone.trim().length < 7 || !profile.location.trim()) {
      setNotice({ type: 'error', message: 'Enter a valid name, phone number, and location.' });
      return;
    }
    setIsSaving(true);
    setNotice(null);
    try {
      const savedProfile = await updateProfile({ ...profile, fullName: profile.fullName.trim(), phone: profile.phone.trim(), location: profile.location.trim(), bio: profile.bio.trim() });
      setProfile(savedProfile);
      setNotice({ type: 'success', message: 'Profile changes saved locally. API integration is pending.' });
    } catch {
      setNotice({ type: 'error', message: 'Your profile could not be saved. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const savePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwords.newPassword.length < 8) {
      setNotice({ type: 'error', message: 'Your new password must contain at least 8 characters.' });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setNotice({ type: 'error', message: 'The new passwords do not match.' });
      return;
    }
    setIsSaving(true);
    setNotice(null);
    try {
      await changePassword({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setNotice({ type: 'success', message: 'Password change passed frontend validation. API integration is pending.' });
    } catch {
      setNotice({ type: 'error', message: 'Your password could not be changed. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    setNotice(null);
    try {
      const savedSettings = await updateProfileSettings(settings);
      setSettings(savedSettings);
      setNotice({ type: 'success', message: 'Notification preferences saved locally. API integration is pending.' });
    } catch {
      setNotice({ type: 'error', message: 'Your preferences could not be saved. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const updateField = <Key extends keyof UserProfile>(key: Key, value: UserProfile[Key]) => setProfile((current) => ({ ...current, [key]: value }));

  return (
    <div className="mx-auto w-full max-w-[1340px] px-5 py-10 lg:py-12">
      <div className="mb-8"><h1 className="text-3xl font-bold text-slate-900">Profile</h1><p className="mt-2 text-slate-500">Manage your account information and preferences.</p></div>

      {notice && <div role="status" className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm ${notice.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}><CheckCircle2 size={18} />{notice.message}</div>}

      {isLoading ? <div className="grid gap-7 lg:grid-cols-[295px_1fr]"><div className="h-[520px] animate-pulse rounded-2xl bg-slate-200" /><div className="h-[520px] animate-pulse rounded-2xl bg-slate-200" /></div> : <div className="grid gap-7 lg:grid-cols-[295px_1fr]">
        <Card className="h-fit"><CardContent className="p-5"><div className="flex flex-col items-center border-b border-slate-100 pb-7"><div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-50 text-primary"><UserRound size={52} strokeWidth={1.4} /></div><h2 className="mt-4 text-lg font-bold text-slate-900">{profile.fullName}</h2><p className="mt-1 text-sm text-slate-500">{profile.email}</p></div><nav aria-label="Profile settings" className="mt-5 space-y-1">{[{ id: 'information' as const, label: 'Profile Information', icon: UserRound }, { id: 'password' as const, label: 'Change Password', icon: LockKeyhole }, { id: 'settings' as const, label: 'Settings', icon: Settings }].map(({ id, label, icon: Icon }) => <button type="button" key={id} onClick={() => { setActiveTab(id); setNotice(null); }} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === id ? 'bg-primary-50 text-primary' : 'text-slate-600 hover:bg-slate-50'}`}><Icon size={20} />{label}</button>)}</nav></CardContent></Card>

        <Card><CardContent className="p-6 sm:p-9">
          {activeTab === 'information' && <form onSubmit={saveProfile}><h2 className="text-xl font-bold text-slate-900">Profile Information</h2><p className="mt-1 text-sm text-slate-500">Update your personal information.</p><div className="mt-7 grid gap-5 sm:grid-cols-2"><Field label="Full Name" value={profile.fullName} onChange={(value) => updateField('fullName', value)} required /><Field label="Email Address" value={profile.email} onChange={() => undefined} type="email" disabled /><Field label="Phone Number" value={profile.phone} onChange={(value) => updateField('phone', value)} type="tel" className="sm:col-span-2" required /><Field label="Location" value={profile.location} onChange={(value) => updateField('location', value)} className="sm:col-span-2" required /></div><label className="mt-5 block text-sm font-semibold text-slate-700">Bio <span className="font-normal text-slate-400">(Optional)</span><textarea value={profile.bio} onChange={(event) => updateField('bio', event.target.value)} maxLength={300} rows={4} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" /></label><div className="mt-7 flex justify-end"><SaveButton isSaving={isSaving} label="Save Changes" /></div></form>}
          {activeTab === 'password' && <form onSubmit={savePassword} className="max-w-xl"><h2 className="text-xl font-bold text-slate-900">Change Password</h2><p className="mt-1 text-sm text-slate-500">Choose a strong password with at least 8 characters.</p><div className="mt-7 space-y-5"><PasswordField label="Current Password" value={passwords.currentPassword} onChange={(value) => setPasswords((current) => ({ ...current, currentPassword: value }))} /><PasswordField label="New Password" value={passwords.newPassword} onChange={(value) => setPasswords((current) => ({ ...current, newPassword: value }))} /><PasswordField label="Confirm New Password" value={passwords.confirmPassword} onChange={(value) => setPasswords((current) => ({ ...current, confirmPassword: value }))} /></div><div className="mt-7"><SaveButton isSaving={isSaving} label="Update Password" /></div></form>}
          {activeTab === 'settings' && <section className="max-w-xl"><h2 className="text-xl font-bold text-slate-900">Settings</h2><p className="mt-1 text-sm text-slate-500">Choose how you want to receive updates.</p><div className="mt-7 space-y-4"><PreferenceToggle label="Issue status updates" description="Get notified when an authority updates one of your reports." checked={settings.issueUpdates} onChange={(checked) => setSettings((current) => ({ ...current, issueUpdates: checked }))} /><PreferenceToggle label="Community updates" description="Receive local civic news and community announcements." checked={settings.communityUpdates} onChange={(checked) => setSettings((current) => ({ ...current, communityUpdates: checked }))} /></div><div className="mt-7"><SaveButton isSaving={isSaving} label="Save Preferences" onClick={saveSettings} /></div></section>}
        </CardContent></Card>
      </div>}
      <div className="mt-7 flex items-center gap-4 rounded-2xl border border-primary/10 bg-primary-50/40 p-5 text-sm"><ShieldCheck className="shrink-0 text-primary" size={28} /><div><h2 className="font-semibold text-slate-900">Your data is safe with us.</h2><p className="mt-1 text-slate-500">We never share your personal information with anyone.</p></div></div>
    </div>
  );
};

function Field({ label, value, onChange, type = 'text', disabled = false, className = '', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; disabled?: boolean; className?: string; required?: boolean }) {
  return <label className={`block text-sm font-semibold text-slate-700 ${className}`}>{label}<input type={type} value={value} disabled={disabled} required={required} onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500" /></label>;
}

function PasswordField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}<input type="password" value={value} required onChange={(event) => onChange(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3 text-sm font-normal outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label>;
}

function PreferenceToggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-slate-200 p-4"><span><span className="flex items-center gap-2 font-semibold text-slate-800"><Bell size={17} className="text-primary" />{label}</span><span className="mt-1 block text-sm text-slate-500">{description}</span></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5 accent-primary" /></label>;
}

function SaveButton({ isSaving, label, onClick }: { isSaving: boolean; label: string; onClick?: () => void }) {
  return <Button type={onClick ? 'button' : 'submit'} onClick={onClick} disabled={isSaving} className="gap-2">{isSaving && <LoaderCircle className="animate-spin" size={17} />}{label}</Button>;
}
