/**
 * Legacy entry point re-exporting the canonical portfolioData
 * for backward compatibility.
 */
import { portfolioData } from './data/portfolioData.js';

export const resumeData = {
  personalInfo: portfolioData.personal,
  technicalSkills: Object.entries(portfolioData.skills).map(([category, items]) => ({ category, items })),
  projects: portfolioData.projects,
  achievementsAndHonors: portfolioData.achievements,
  certifications: portfolioData.certifications,
  education: portfolioData.education,
  leadershipAndActivities: portfolioData.leadership
};

export { portfolioData };
