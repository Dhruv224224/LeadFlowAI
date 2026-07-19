import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBadges from './components/TrustBadges';
import ToastNotifications from './components/ToastNotifications';
import CursorSpotlight from './components/CursorSpotlight';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import LoadingScreen from './components/LoadingScreen';

const WorkflowSection = lazy(() => import('./components/WorkflowSection'));
const TryWorkflow = lazy(() => import('./components/TryWorkflow'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const Services = lazy(() => import('./components/Services'));
const WhyLeadFlow = lazy(() => import('./components/WhyLeadFlow'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const FAQ = lazy(() => import('./components/FAQ'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-text-main font-sans antialiased">
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <Suspense fallback={<div className="h-40" aria-hidden="true" />}>
          <WorkflowSection />
          <TryWorkflow />
          <HowItWorks />
          <Services />
          <WhyLeadFlow />
          <Testimonials />
          <FAQ />
          <Contact />
          <Footer />
        </Suspense>
      </main>
      <ToastNotifications />
      <BackToTop />
      <CursorSpotlight />
    </div>
  );
}
