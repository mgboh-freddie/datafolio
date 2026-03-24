import React from 'react';
import AppLayout from '@/components/AppLayout';
import HeroBanner from './components/HeroBanner';
import StatsRow from './components/StatsRow';
import FeaturedProjects from './components/FeaturedProjects';
import SkillsRadarSection from './components/SkillsRadarSection';
import ActivityFeed from './components/ActivityFeed';
import GitHubChart from './components/GitHubChart';

export default function HomeDashboardPage() {
  return (
    <AppLayout>
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-8 space-y-8">
        <HeroBanner />
        <StatsRow />
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <FeaturedProjects />
            <GitHubChart />
          </div>
          <div className="space-y-6">
            <SkillsRadarSection />
            <ActivityFeed />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}