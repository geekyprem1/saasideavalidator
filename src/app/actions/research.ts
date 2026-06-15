'use strict';

'use server';

import { ResearchPipelineService } from '../../services/pipeline';
import { db } from '../../lib/db';

export async function triggerResearchAction(keyword: string) {
  try {
    if (!keyword || keyword.trim().length < 3) {
      return { success: false, error: 'Keyword must be at least 3 characters long.' };
    }
    const searchId = await ResearchPipelineService.run(keyword);
    return { success: true, searchId };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Failed to complete analysis pipeline.' };
  }
}

export async function getRecentSearchesAction() {
  try {
    const list = await db.getRecentSearches();
    return { success: true, data: list };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Failed to retrieve history.' };
  }
}

export async function getReportDetailsAction(searchId: string) {
  try {
    const search = await db.getSearchById(searchId);
    if (!search) {
      return { success: false, error: 'Search report not found.' };
    }

    const [sources, painPoints, competitors, opportunity, report] = await Promise.all([
      db.getResearchSources(searchId),
      db.getPainPoints(searchId),
      db.getCompetitors(searchId),
      db.getOpportunity(searchId),
      db.getReport(searchId)
    ]);

    return {
      success: true,
      data: {
        search,
        sources,
        painPoints,
        competitors,
        opportunity,
        report
      }
    };
  } catch (error: any) {
    return { success: false, error: error?.message || 'Failed to fetch report details.' };
  }
}
