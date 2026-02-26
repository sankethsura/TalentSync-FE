import { ProfileSetupProvider } from '@/contexts/ProfileSetupContext';

export default function ProfileSetupLayout({ children }: { children: React.ReactNode }) {
  return <ProfileSetupProvider>{children}</ProfileSetupProvider>;
}
