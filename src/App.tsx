import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MobileShell } from './components/layout/MobileShell';
import { MobileTopBar } from './components/layout/MobileTopBar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { PrayerTimesScreen } from './components/screens/PrayerTimesScreen';
import { EventsScreen } from './components/screens/EventsScreen';
import { ServicesScreen } from './components/screens/ServicesScreen';
import { RegistrationScreen } from './components/screens/RegistrationScreen';
import { ConnectMuslimScreen } from './components/screens/ConnectMuslimScreen';
import { MasjidLocatorScreen } from './components/screens/MasjidLocatorScreen';
import { QiblaScreen } from './components/screens/QiblaScreen';
import { TasbeehScreen } from './components/screens/TasbeehScreen';
import { NotificationScreen } from './components/screens/NotificationScreen';
import { MasjidAboutScreen } from './components/screens/MasjidAboutScreen';
import { DonationScreen } from './components/screens/DonationScreen';
import { QuranContentScreen } from './components/screens/QuranContentScreen';
import { DailyDuaScreen } from './components/screens/DailyDuaScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { LostFoundScreen } from './components/screens/LostFoundScreen';

const MainAppContent: React.FC = () => {
  const { overlayScreen, activeTab } = useApp();

  // Full screen overlays (Splash and Onboarding take over the mobile canvas)
  if (overlayScreen === 'splash') {
    return <SplashScreen />;
  }

  if (overlayScreen === 'onboarding') {
    return <OnboardingScreen />;
  }

  // Active Screen Selector
  const renderCurrentScreen = () => {
    // Check overlay screens first
    if (overlayScreen) {
      switch (overlayScreen) {
        case 'qibla':
          return <QiblaScreen />;
        case 'tasbeeh':
          return <TasbeehScreen />;
        case 'locator':
          return <MasjidLocatorScreen />;
        case 'connect_muslim':
          return <ConnectMuslimScreen />;
        case 'notifications':
          return <NotificationScreen />;
        case 'donation':
          return <DonationScreen />;
        case 'registration':
          return <RegistrationScreen />;
        case 'quran':
          return <QuranContentScreen />;
        case 'duas':
          return <DailyDuaScreen />;
        case 'settings':
          return <SettingsScreen />;
        case 'about_masjid':
          return <MasjidAboutScreen />;
        case 'lost_found':
          return <LostFoundScreen />;
        default:
          break;
      }
    }

    // Main 5-destination tabs
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'prayers':
        return <PrayerTimesScreen />;
      case 'events':
        return <EventsScreen />;
      case 'services':
        return <ServicesScreen />;
      case 'masjid':
        return <MasjidAboutScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileShell>
      <MobileTopBar />
      <main className="w-full flex-1 flex flex-col pt-[calc(52px+env(safe-area-inset-top,0px))] sm:pt-[calc(56px+env(safe-area-inset-top,0px))] pb-[calc(80px+env(safe-area-inset-bottom,0px))]">
        {renderCurrentScreen()}
      </main>
      <MobileBottomNav />
    </MobileShell>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
