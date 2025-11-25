export type ChatEntry =
  | { type: 'user'; content: string }
  | { type: 'assistant'; content: string }
  | { type: 'ad'; ad: { headline: string; body: string; callToAction?: string; targetUrl?: string } };

export type Scenario = {
  id: string;
  label: string;
  summary: string;
  script: ChatEntry[];
};

export const SCRIPTED_SCENARIOS: Scenario[] = [
  {
    id: 'shopping',
    label: 'Shopping Assistant',
    summary:
      'A user is looking for running shoes. Sponsored suggestions appear only when relevant to the conversation context.',
    script: [
      { type: 'user', content: "I'm looking for lightweight running shoes for daily jogs." },
      { type: 'assistant', content: 'What surface do you typically run on (road, trail, treadmill)?' },
      { type: 'user', content: 'Mostly road. I prefer good cushioning but not too bulky.' },
      {
        type: 'ad',
        ad: {
          headline: 'Try Aeroflow RoadRunner — Cushioned, 220g, neutral support',
          body: 'Optimized for daily road runs with responsive foam and breathable mesh. 30-day fit guarantee.',
          callToAction: 'Shop now',
          targetUrl: 'aeroflow.run/roadrunner',
        },
      },
      { type: 'assistant', content: 'What is your typical distance and budget range?' },
      { type: 'user', content: '5–8 km, budget around $120.' },
      { type: 'assistant', content: 'Got it. I can shortlist a few neutral cushioned models under $120.' },
    ],
  },
  {
    id: 'travel',
    label: 'Travel Planning',
    summary:
      'A traveler is planning a summer trip to Italy and wants help comparing travel insurance options.',
    script: [
      {
        type: 'user',
        content:
          "I'm flying to Italy next month. Can you help me build an itinerary?",
      },
      {
        type: 'assistant',
        content:
          'Absolutely! Tell me the cities you want to visit and the kind of experiences you enjoy so I can recommend a balanced plan.',
      },
      {
        type: 'user',
        content:
          "Rome, Florence, and maybe the Amalfi coast. I'm also wondering if I need travel insurance.",
      },
      {
        type: 'ad',
        ad: {
          headline: 'Protect Your Dream Vacation',
          body: 'Secure comprehensive coverage for medical expenses, cancellations, and baggage with GlobeGuard Travel Insurance. Rated number one by frequent travelers.',
          callToAction: 'Get a Quote',
          targetUrl: 'https://example.com/globeguard-travel',
        },
      },
      {
        type: 'assistant',
        content:
          'Travel insurance is recommended for international trips. You should look for policies that cover medical emergencies and trip interruptions. Ready for day-by-day recommendations?',
      },
    ],
  },
  // {
  //   id: 'productivity',
  //   label: 'Productivity Coaching',
  //   summary:
  //     'A freelance designer is overwhelmed managing clients and deliverables; the assistant suggests workflow tools.',
  //   script: [
  //     {
  //       type: 'user',
  //       content:
  //         "I keep missing client follow-ups. I'm juggling too many projects and it's getting chaotic.",
  //     },
  //     {
  //       type: 'assistant',
  //       content:
  //         "Let's fix that. We can set up a lightweight system so you always know what's due next. How are you tracking tasks today?",
  //     },
  //     {
  //       type: 'user',
  //       content:
  //         "Mostly sticky notes and email reminders. It's not working, but I don't have time to learn complicated software.",
  //     },
  //     {
  //       type: 'assistant',
  //       content:
  //         'Understood. A simple kanban-style tool with calendar sync might help. Interested in a recommendation that is easy to learn?',
  //     },
  //     {
  //       type: 'user',
  //       content: "Yes, something that won't take hours to set up.",
  //     },
  //   ],
  // },
  {
    id: 'wellness',
    label: 'Lifestyle & Wellness',
    summary:
      'A user is working to build a balanced wellness routine and asks about workout ideas that fit a busy schedule.',
    script: [
      {
        type: 'user',
        content:
          'Work has been intense lately. I want to feel healthier but struggle to stay consistent with workouts.',
      },
      {
        type: 'assistant',
        content:
          "Let's customize a plan that fits tight schedules. What's realistic for you—short daily sessions or a few longer workouts each week?",
      },
      {
        type: 'user',
        content:
          "Short sessions sound doable, maybe 20 minutes in the mornings. I also need nutrition tips that aren't overly restrictive.",
      },
      {
        type: 'assistant',
        content:
          "Great. Mini strength circuits and mindful mobility can go a long way. For nutrition, it's about building repeatable meals. Want curated resources to help you stay on track?",
      },
      {
        type: 'ad',
        ad: {
          headline: 'ThriveWell Personalized Plans',
          body: 'Daily 20-minute guided workouts with balanced meal suggestions tailored by coaches. Built for busy professionals who want sustainable change.',
          callToAction: 'View Starter Plan',
          targetUrl: 'https://example.com/thrivewell',
        },
      },
    ],
  },
];

