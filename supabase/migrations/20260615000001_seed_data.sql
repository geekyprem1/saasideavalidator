-- SaaSRadar AI Database Seed Data
-- Provides rich, production-grade default data for demonstration.

-- 1. Insert Demo User
INSERT INTO users (id, email, created_at)
VALUES ('00000000-0000-0000-0000-000000000000', 'demo@saasradar.ai', NOW())
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Search: "Indian Calorie Counter"
INSERT INTO searches (id, user_id, keyword, status, opportunity_score, confidence_score, revenue_potential, market_demand, created_at)
VALUES (
    '11111111-1111-1111-1111-111111111111', 
    '00000000-0000-0000-0000-000000000000', 
    'Indian Calorie Counter', 
    'completed', 
    88, 
    92, 
    '$15k - $50k/mo MRR', 
    'Very High (82,000+ searches/mo, massive Reddit complaints)', 
    NOW() - INTERVAL '2 days'
) ON CONFLICT (id) DO NOTHING;

-- 2.1 Research Sources for "Indian Calorie Counter"
INSERT INTO research_sources (search_id, source, title, content, author, url, likes, date)
VALUES 
('11111111-1111-1111-1111-111111111111', 'reddit', 'MyFitnessPal is useless for Indian food', 'Seriously, trying to log homemade roti, subzi, or specific regional dishes like upma is a nightmare. Everything is entered by random users with incorrect calorie details. There is no database validation.', 'curry_dev', 'https://reddit.com/r/fitnessindia/comments/12345', 142, NOW() - INTERVAL '5 days'),
('11111111-1111-1111-1111-111111111111', 'play_store', 'HealthifyMe is too expensive and pushes coaches too hard', 'The app has become bloated. It keeps locking basic food logging features behind paywalls and spamming me to hire personal trainers or calorie coaches. I just want a simple, clean app that understands Indian home-cooked meals.', 'Rohan Patel', 'https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765', 89, NOW() - INTERVAL '4 days'),
('11111111-1111-1111-1111-111111111111', 'reddit', 'Need a calorie counter that counts by grams of dough (atta)', 'Logging "1 Roti" is useless. Rotis vary in size, thickness, and oil. We need an app designed for Indian cooking methods where we can input raw ingredients (like grams of dry wheat flour) and calculate batch cooking easily.', 'swasth_bharat', 'https://reddit.com/r/india/comments/54321', 63, NOW() - INTERVAL '3 days');

-- 2.2 Pain Points for "Indian Calorie Counter"
INSERT INTO pain_points (search_id, title, description, mentions, severity, example_quotes)
VALUES 
(
    '11111111-1111-1111-1111-111111111111', 
    'Inaccurate Indian Food Database', 
    'Existing global databases (MyFitnessPal, LoseIt) fail to represent traditional Indian recipes, leading to wild calorie estimation errors.', 
    412, 
    'high', 
    '[{"quote": "Trying to log homemade roti, subzi, or specific regional dishes like upma is a nightmare. Everything is entered by random users with incorrect calorie details.", "source": "Reddit r/fitnessindia", "url": "https://reddit.com/r/fitnessindia/comments/12345", "confidence": 0.95}]'::jsonb
),
(
    '11111111-1111-1111-1111-111111111111', 
    'Aggressive Coach Upselling & Bloat', 
    'Users feel badgered by apps like HealthifyMe which lock core features and constantly push expensive human-coaching models.', 
    285, 
    'medium', 
    '[{"quote": "The app has become bloated. It keeps locking basic food logging features behind paywalls and spamming me to hire personal trainers.", "source": "Play Store Review", "url": "https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765", "confidence": 0.88}]'::jsonb
),
(
    '11111111-1111-1111-1111-111111111111', 
    'Lack of Batch & Ingredient Weight Tracking', 
    'Traditional Indian kitchens prepare batch foods (curries, dal) and variable rotis. Standard apps assume single-portion western items.', 
    167, 
    'high', 
    '[{"quote": "We need an app designed for Indian cooking methods where we can input raw ingredients (like grams of dry wheat flour) and calculate batch cooking easily.", "source": "Reddit r/india", "url": "https://reddit.com/r/india/comments/54321", "confidence": 0.92}]'::jsonb
);

-- 2.3 Competitors for "Indian Calorie Counter"
INSERT INTO competitors (search_id, name, mentions, strengths, weaknesses)
VALUES 
(
    '11111111-1111-1111-1111-111111111111', 
    'HealthifyMe', 
    342, 
    '{"Large local database", "Barcode scanning", "Brand recognition"}', 
    '[{"weakness": "High price, pushy sales calls, feature-gating, slow interface", "quote": "spamming me to hire personal trainers or calorie coaches", "source": "Play Store", "url": "https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765"}]'::jsonb
),
(
    '11111111-1111-1111-1111-111111111111', 
    'MyFitnessPal', 
    195, 
    '{"Global food catalog", "Huge ecosystem integration"}', 
    '[{"weakness": "Unverified user entries for regional Indian foods are highly inaccurate", "quote": "Everything is entered by random users with incorrect calorie details.", "source": "Reddit", "url": "https://reddit.com/r/fitnessindia/comments/12345"}]'::jsonb
);

-- 2.4 Opportunities for "Indian Calorie Counter"
INSERT INTO opportunities (search_id, recommended_saas, problem_solved, target_audience, core_features, features_to_ignore, tech_stack, expected_build_time, pricing_recommendation)
VALUES (
    '11111111-1111-1111-1111-111111111111', 
    'GharKaCalorie', 
    'Verified, recipe-focused Indian calorie logging with accurate raw-ingredient weighing algorithms and zero pushy coaches.', 
    'Health-conscious Indians cooking at home, young fitness enthusiasts, and diabetics managing glycemic load.', 
    '{"Verified Indian ingredients database", "Raw ingredient to cooked recipe calculator", "WhatsApp-based logging assistant", "Sleek, minimalist dark UI"}', 
    '{"AI camera logging (low accuracy for mixed curries)", "Human coach marketplaces", "Forums and social feeds"}', 
    '{"Next.js 15", "Supabase", "Tailwind CSS", "Gemini API"}', 
    '3 weeks', 
    '₹199/month ($2.50 USD/mo) for premium verified tracking, or ₹999/year.'
);

-- 2.5 Report for "Indian Calorie Counter"
INSERT INTO reports (search_id, founder_verdict, claude_prompt, market_overview, market_gaps, buyer_intent_signals)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    '{
        "recommendation": "YES",
        "why": [
            "Massive organic pain surrounding database inaccuracy in existing tools.",
            "Strong willingness to pay for subscription to escape aggressive upselling and bloating.",
            "High search interest and lack of lightweight utility competitors targeting Indian home-cooked meals specifically."
        ],
        "biggest_risk": "Sourcing and verifying a highly accurate regional database (North vs South cuisines).",
        "validation_path": "Launch a free landing page with a Google Sheet calculator; run targeted ads on r/fitnessindia.",
        "mvp_timeline": "14-21 days",
        "revenue_timeline": "Less than 30 days post-launch via micro-subscriptions"
    }'::jsonb,
    'Build a Next.js 15 app with Supabase called "GharKaCalorie". Include an interactive calorie log page where users can input custom weights of raw Indian ingredients (e.g. Atta, Moong Dal) and combine them into custom recipes. Style it with a premium Linear-like dark dashboard. Keep features dead simple: database search, recipe builder, daily diary, and a checkout button using Razorpay.',
    'The Indian fitness tech space is highly dominated by expensive corporate platforms. A massive cohort of tech-savvy individuals seeks a simple, distraction-free tracker focused on the realities of Indian domestic kitchens (batch cooking, variable roti sizes, regional spices).',
    '[
        {
            "gap_name": "Gram-based Roti & Curry Calculator",
            "description": "Ability to calculate calorie breakdown of custom-portioned home meals rather than generalized database entries.",
            "demand_level": "high",
            "evidence": {
                "quote": "We need an app designed for Indian cooking methods where we can input raw ingredients (like grams of dry wheat flour) and calculate batch cooking easily.",
                "source": "Reddit r/india",
                "url": "https://reddit.com/r/india/comments/54321"
            }
        }
    ]'::jsonb,
    '[
        {
            "signal": "Exhausted with coach sales pitches",
            "quote": "The app has become bloated. It keeps locking basic food logging features... I just want a simple, clean app",
            "source": "Play Store Review",
            "url": "https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765",
            "strength": "high"
        }
    ]'::jsonb
);

-- 2.6 Search History entry
INSERT INTO search_history (user_id, search_id, created_at)
VALUES ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', NOW() - INTERVAL '2 days');


-- 3. Insert Search: "AI Habit Tracker"
INSERT INTO searches (id, user_id, keyword, status, opportunity_score, confidence_score, revenue_potential, market_demand, created_at)
VALUES (
    '22222222-2222-2222-2222-222222222222', 
    '00000000-0000-0000-0000-000000000000', 
    'AI Habit Tracker', 
    'completed', 
    64, 
    75, 
    '$2k - $8k/mo MRR', 
    'Moderate (High competition, low retention rates)', 
    NOW() - INTERVAL '1 day'
) ON CONFLICT (id) DO NOTHING;

-- 3.1 Research Sources for "AI Habit Tracker"
INSERT INTO research_sources (search_id, source, title, content, author, url, likes, date)
VALUES 
('22222222-2222-2222-2222-222222222222', 'reddit', 'Every habit tracker is the same checklist', 'I have downloaded 10 different apps. They are all just checklists with calendar grid streaks. The streak system actually stresses me out. If I miss one day, I lose motivation and delete the app.', 'habits_junkie', 'https://reddit.com/r/getdisciplined/comments/9999', 312, NOW() - INTERVAL '3 days'),
('22222222-2222-2222-2222-222222222222', 'play_store', 'Too manual, I forget to log my habits', 'Logging is boring. If I have to open the app, find the habit, and tap complete, I will stop doing it after 3 days. It needs auto-tracking or integration with my calendar.', 'Devon S.', 'https://play.google.com/store/apps/details?id=com.habit.tracker&reviewId=1111', 74, NOW() - INTERVAL '2 days');

-- 3.2 Pain Points for "AI Habit Tracker"
INSERT INTO pain_points (search_id, title, description, mentions, severity, example_quotes)
VALUES 
(
    '22222222-2222-2222-2222-222222222222', 
    'Demotivating Streak Penalties', 
    'Strict calendar streaks trigger stress and demotivation upon a single missed day, leading users to abandon trackers.', 
    312, 
    'medium', 
    '[{"quote": "The streak system actually stresses me out. If I miss one day, I lose motivation and delete the app.", "source": "Reddit r/getdisciplined", "url": "https://reddit.com/r/getdisciplined/comments/9999", "confidence": 0.85}]'::jsonb
),
(
    '22222222-2222-2222-2222-222222222222', 
    'Friction in Manual Logging', 
    'High friction of manual check-ins causes rapid user dropoff within the first week.', 
    215, 
    'high', 
    '[{"quote": "Logging is boring. If I have to open the app, find the habit, and tap complete, I will stop doing it after 3 days.", "source": "Play Store", "url": "https://play.google.com/store/apps/details?id=com.habit.tracker&reviewId=1111", "confidence": 0.90}]'::jsonb
);

-- 3.3 Competitors for "AI Habit Tracker"
INSERT INTO competitors (search_id, name, mentions, strengths, weaknesses)
VALUES 
(
    '22222222-2222-2222-2222-222222222222', 
    'Habitica', 
    188, 
    '{"Gamified RPG components", "Highly engaging for gamers"}', 
    '[{"weakness": "Visual style too retro for professional users, setup is overly complex", "quote": "All just checklists with calendar grids... setup is too much", "source": "Reddit", "url": "https://reddit.com/r/getdisciplined/comments/9999"}]'::jsonb
),
(
    '22222222-2222-2222-2222-222222222222', 
    'Streaks', 
    145, 
    '{"Beautiful iOS integration", "Simple interactions"}', 
    '[{"weakness": "Sticking strictly to rigid checklists creates guilt and fatigue", "quote": "The streak system actually stresses me out.", "source": "Reddit", "url": "https://reddit.com/r/getdisciplined/comments/9999"}]'::jsonb
);

-- 3.4 Opportunities for "AI Habit Tracker"
INSERT INTO opportunities (search_id, recommended_saas, problem_solved, target_audience, core_features, features_to_ignore, tech_stack, expected_build_time, pricing_recommendation)
VALUES (
    '22222222-2222-2222-2222-222222222222', 
    'ElasticHabits AI', 
    'A flexible habit assistant that integrates with calendars/API feeds to auto-track habits and adapts streaks based on life busyness.', 
    'Busy remote workers, software developers, and productivity enthusiasts who hate standard rigid checkboxes.', 
    '{"API integrations (GitHub, RescueTime, Google Calendar)", "Dynamic difficulty adjustment (elastic habit goals)", "Forgiving streak algorithms (grace days)", "AI wellness coach summaries"}', 
    '{"Social feed/competitions", "Manual checklist (keep it automated)", "Complex pixel art gamification"}', 
    '{"Next.js 15", "Supabase", "Tailwind CSS", "Resend API"}', 
    '2 weeks', 
    '$4/month ($29/year) to unlock premium integrations and advanced elasticity configurations.'
);

-- 3.5 Report for "AI Habit Tracker"
INSERT INTO reports (search_id, founder_verdict, claude_prompt, market_overview, market_gaps, buyer_intent_signals)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    '{
        "recommendation": "MAYBE",
        "why": [
            "Extremely crowded market. Acquiring users cost-effectively is highly challenging.",
            "Strong consumer fatigue around manual checklists, but high demand for automated tracking (integrations).",
            "Monetization potential is modest; users are hesitant to pay high subscription prices for basic tracker apps."
        ],
        "biggest_risk": "Extremely low retention rates; users download and uninstall apps within 7 days.",
        "validation_path": "Build a simple browser extension tracking coding hours automatically; offer it to developers on Product Hunt.",
        "mvp_timeline": "10-14 days",
        "revenue_timeline": "45-60 days post-launch"
    }'::jsonb,
    'Build a Next.js 15 landing page and basic user dashboard for "ElasticHabits AI". Allow users to connect their GitHub username to automatically track their coding habit (e.g. at least one commit). If they commit, the habit logs automatically. Provide a visual streak graph that does not reset completely for a single missed day but utilizes a health bar instead. Add Stripe/Razorpay pricing cards.',
    'Habit tracking is a saturated market, but is undergoing a shift from active manual logging to passive background tracking. Products succeeding now integrate into existing browser and calendar activities.',
    '[
        {
            "gap_name": "Forgiving Streak/Health bar",
            "description": "Streak systems that support life volatility and prevent total discouragement on day misses.",
            "demand_level": "medium",
            "evidence": {
                "quote": "If I miss one day, I lose motivation and delete the app.",
                "source": "Reddit r/getdisciplined",
                "url": "https://reddit.com/r/getdisciplined/comments/9999"
            }
        }
    ]'::jsonb,
    '[
        {
            "signal": "Want passive calendar sync",
            "quote": "It needs auto-tracking or integration with my calendar.",
            "source": "Play Store Review",
            "url": "https://play.google.com/store/apps/details?id=com.habit.tracker&reviewId=1111",
            "strength": "medium"
        }
    ]'::jsonb
);

-- 3.6 Search History entry
INSERT INTO search_history (user_id, search_id, created_at)
VALUES ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', NOW() - INTERVAL '1 day');


-- 4. Populate Global Opportunity Moat with Reusable Insights
INSERT INTO global_opportunity_moat (category, insight_type, keyword, content, evidence_quote, evidence_source, evidence_url, mentions)
VALUES 
('health', 'pain_point', 'Indian Calorie Counter', 'Inaccurate Indian database in global calorie apps.', 'Everything is entered by random users with incorrect calorie details.', 'Reddit', 'https://reddit.com/r/fitnessindia/comments/12345', 412),
('health', 'buyer_intent', 'Indian Calorie Counter', 'Users ready to pay subscription to avoid coach upsells.', 'I just want a simple, clean app that understands Indian home-cooked meals.', 'Play Store', 'https://play.google.com/store/apps/details?id=com.healthifyme.basic&reviewId=98765', 89),
('productivity', 'pain_point', 'AI Habit Tracker', 'Strict streak systems demotivate users on missed days.', 'The streak system actually stresses me out. If I miss one day, I lose motivation.', 'Reddit', 'https://reddit.com/r/getdisciplined/comments/9999', 312),
('productivity', 'market_gap', 'AI Habit Tracker', 'Absence of native api/app auto-tracking integrations.', 'If I have to open the app and tap complete, I will stop... It needs auto-tracking.', 'Play Store', 'https://play.google.com/store/apps/details?id=com.habit.tracker&reviewId=1111', 74);
