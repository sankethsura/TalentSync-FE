import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
import { Navbar }             from '@/components/landing/Navbar';
import { HeroSection }        from '@/components/landing/HeroSection';
import { HowItWorks }         from '@/components/landing/HowItWorks';
import { Features }           from '@/components/landing/Features';
import { WhyTalentSync }      from '@/components/landing/WhyTalentSync';
import { CTASection }         from '@/components/landing/CTASection';
import { Footer }             from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <WhyTalentSync />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
