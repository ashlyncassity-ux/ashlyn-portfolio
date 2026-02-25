import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================
// ASHLYN CASSITY PORTFOLIO v4
// Phosphor icons, real reviews only, DoD copy
// ============================================

const ACCENT = '#E86A33';
const ACCENT_SECONDARY = '#D927FF';
const ACCENT_GLOW = 'rgba(232, 106, 51, 0.4)';

// Phosphor-style thin line SVG icons
const Icons = {
  MagnifyingGlass: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="112" cy="112" r="80"/>
      <line x1="168" y1="168" x2="224" y2="224"/>
    </svg>
  ),
  Flask: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <path d="M160,40V88.69a8,8,0,0,0,2.34,5.65l58.35,58.35A8,8,0,0,1,223,158.34V208a8,8,0,0,1-8,8H41a8,8,0,0,1-8-8V158.34a8,8,0,0,1,2.34-5.65L94,94.34A8,8,0,0,0,96,88.69V40"/>
      <line x1="96" y1="40" x2="160" y2="40"/>
      <line x1="64" y1="168" x2="192" y2="168"/>
    </svg>
  ),
  Sparkle: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <path d="M128,16,148.29,92.16a8,8,0,0,0,5.55,5.55L232,118l-78.16,20.29a8,8,0,0,0-5.55,5.55L128,222l-20.29-78.16a8,8,0,0,0-5.55-5.55L24,118l78.16-20.29a8,8,0,0,0,5.55-5.55Z"/>
    </svg>
  ),
  ArrowsClockwise: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="176 48 208 48 208 80"/>
      <path d="M192,128a64,64,0,0,1-109.25,45.25"/>
      <polyline points="80 208 48 208 48 176"/>
      <path d="M64,128A64,64,0,0,1,173.25,82.75"/>
    </svg>
  ),
  TreeStructure: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <rect x="24" y="104" width="48" height="48" rx="8"/>
      <rect x="24" y="184" width="48" height="48" rx="8"/>
      <rect x="120" y="24" width="48" height="48" rx="8"/>
      <line x1="168" y1="48" x2="208" y2="48"/>
      <line x1="208" y1="48" x2="208" y2="208"/>
      <line x1="72" y1="128" x2="208" y2="128"/>
      <line x1="72" y1="208" x2="208" y2="208"/>
    </svg>
  ),
  PlusCircle: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="128" cy="128" r="96"/>
      <line x1="88" y1="128" x2="168" y2="128"/>
      <line x1="128" y1="88" x2="128" y2="168"/>
    </svg>
  ),
  FilmStrip: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <rect x="32" y="48" width="192" height="160" rx="8"/>
      <line x1="32" y1="88" x2="224" y2="88"/>
      <line x1="32" y1="168" x2="224" y2="168"/>
      <line x1="80" y1="48" x2="80" y2="88"/>
      <line x1="176" y1="48" x2="176" y2="88"/>
      <line x1="80" y1="168" x2="80" y2="208"/>
      <line x1="176" y1="168" x2="176" y2="208"/>
    </svg>
  ),
  FileText: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <path d="M200,224H56a8,8,0,0,1-8-8V40a8,8,0,0,1,8-8h96l56,56V216A8,8,0,0,1,200,224Z"/>
      <polyline points="152 32 152 88 208 88"/>
      <line x1="96" y1="136" x2="160" y2="136"/>
      <line x1="96" y1="168" x2="160" y2="168"/>
    </svg>
  ),
  Palette: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <path d="M128,192a24,24,0,0,1-24,24H80a72,72,0,1,1,91.82-89.46"/>
      <circle cx="128" cy="128" r="24"/>
      <circle cx="84" cy="108" r="12"/>
      <circle cx="108" cy="68" r="12"/>
      <circle cx="168" cy="92" r="12"/>
    </svg>
  ),
  CurrencyDollar: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <line x1="128" y1="24" x2="128" y2="232"/>
      <path d="M184,88a40,40,0,0,0-40-40H108a40,40,0,0,0,0,80h44a40,40,0,0,1,0,80H104a40,40,0,0,1-40-40"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="88" cy="108" r="52"/>
      <path d="M152,108a52,52,0,1,1,0,0"/>
      <path d="M21.14,208a88,88,0,0,1,133.72,0"/>
      <path d="M172.69,154.69a88.06,88.06,0,0,1,62.17,53.31"/>
    </svg>
  ),
  ChartBar: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <line x1="228" y1="208" x2="28" y2="208"/>
      <rect x="48" y="136" width="48" height="72"/>
      <rect x="104" y="104" width="48" height="104"/>
      <rect x="160" y="72" width="48" height="136"/>
    </svg>
  ),
  Star: () => (
    <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
      <path d="M128,16,156.69,92.69h80.62L168,138.84l28.62,76.85L128,170.84,59.38,215.69,88,138.84l-69.31-46.15h80.62Z"/>
    </svg>
  )
};

// Case studies data - ordered as requested, ready for real content
const caseStudies = [
  {
    id: 'apex',
    title: 'APEX',
    client: 'Boeing / Plexsys (U.S. Navy & Marine Corps)',
    category: 'Defense Training • UX Research & Design',
    description: 'Deployable training platform delivering high-fidelity simulation for Navy and Marine Corps operators onboard ship or ashore—end-to-end UX design across instructor workflows, tactical track interaction, and mission-accurate UI conventions aligned with AEGIS/SSDS systems.',
    overview: 'APEX is a modern, deployable training platform designed to deliver high-fidelity, operator-centered simulation for the U.S. Navy and Marine Corps. Built in partnership with Boeing, Plexsys, and fleet operators, APEX enables mission-ready Air Intercept Controller (AIC) and surface warfare training both onboard ship and ashore, without reliance on large schoolhouses or fixed infrastructure. As Senior UX Designer and Researcher, I led end-to-end experience design across instructor workflows, operator console interfaces, and scalable training configurations—translating complex tactical requirements into intuitive, modern digital systems that support operational readiness.',
    challenge: 'Operators training in contested environments must build proficiency in high-pressure, time-sensitive scenarios using systems that are traditionally hardware-heavy, legacy-driven, and difficult to deploy. APEX needed to support distributed training anywhere in the world, rapid scenario setup with minimal friction, interface conventions aligned with real combat systems (AEGIS/SSDS), and instructor control without overwhelming operators. The design challenge was balancing tactical realism with modern interaction clarity—ensuring the platform felt authentic to warfighters while remaining scalable and software-driven.',
    process: 'Led UX research grounded in direct operator engagement and mission-context validation. Conducted SME working sessions with surface warfare and aviation teams, scenario-driven task analysis for AIC intercept and engagement workflows, and integrated field study feedback from NAS Key West and fleet deployments. Designed structured instructor lobby workflows for scenario configuration, tactical track interaction patterns including context menus and Quick Tag toggles, and mission-accurate display conventions with AEGIS/SSDS parity. Established scalable design ops through standardized Figma handoffs, SharePoint documentation, and Jira cross-linking for sprint traceability across MAWTS, ATO, EWTGLANT, and XLUUV programs.',
    outcome: 'Reduced instructor setup time from 5–7 minutes to under 2 minutes per session through structured lobby workflows and "Save as Default Experience" functionality. Increased repeat session throughput by 30–50% and reduced task completion time from 10 clicks to 3 clicks via streamlined tactical track interaction patterns. Decreased identification errors by 20–40% in evaluation runs through combat-system-aligned UI behavior including point symbol conversion and reformatted hooked track data blocks. Replaced $20–50K travel and demo logistics with a sub-one-minute walkthrough asset. Built modular design patterns supporting rapid adaptation across multiple mission programs with a 9-month idea-to-launch turnaround using agile two-week sprints.',
    metrics: { 'setup time': '<2 min', 'throughput': '+30–50%', 'id errors': '−20–40%' },
    tags: ['Defense Training', 'UX Research', 'Interaction Design', 'Tactical UI', 'Design Systems', 'AEGIS/SSDS', 'Agile UX', 'Human Factors'],
    color: '#1a1a2e',
    images: [
      '/images/APEX_logo_bg2.png',
      '/images/APEX_91865.png',
      '/images/APEX_91863.png',
      '/images/APEX_91864.png',
      '/images/APEX_91868.png',
      '/images/APEX_91866.png',
      '/images/APEX_91869.png',
      '/images/Apex_UserCentric.png',
      '/images/Apex_xluuv.png',
      '/images/Apex_worldmap.png',
      '/images/APEX_Desktop_Home_Partner_1.png'
    ]
  },
  {
    id: 'veridian',
    title: 'Veridian',
    client: 'CDAO/Intrinsic',
    category: 'Defense AI • UX Research',
    description: 'Designing trustworthy agentic AI for mission command—human-centered formal reasoning systems for high-stakes decision environments with active CDAO SBIR engagement.',
    overview: 'Veridian is a production-grade agentic AI decision-support platform for mission command environments. It accelerates the OODA loop (Observe–Orient–Decide–Act) while preserving human oversight and operational correctness across Air, Land, Sea, and Space domains. Unlike traditional LLM systems, Veridian integrates formal type systems, conversational AI, and simulation-backed verification.',
    challenge: 'Modern command environments suffer from data overload, fragmented tools, voice-heavy coordination, time-compressed decisions, and distrust of AI systems. Round 1 research quantified pain points: PAIN_DATA (29.8%), TIME_CONSTRAINT (26.3%), PAIN_WORKFLOW (24.6%), COG_OVERLOAD (19.3%). Operators will use AI only if they can inspect reasoning, verify constraints, and override confidently.',
    process: 'Led structured mixed-method research program with hierarchical tag taxonomy, inter-rater reliability QA (≥75% agreement threshold), and cross-interview co-occurrence analysis. Created a standardized interview codebook comprising 38 UX and operational tags across 6 categories, enabling consistent cross-interview analysis and pattern extraction. Developed a 4-factor scoring model evaluating each finding on Frequency, Impact, Design Opportunity, and Testability (each scored 1–5), with High Priority findings requiring a total score of 15 or above. Achieved 78% coverage across 18 of 23 research questions, ensuring comprehensive insight capture. Conducted operator interviews to validate mental models for AI vs. manual tools, identify mission-critical scenarios, test IA and iconography recognition, and define appropriate AI agency levels. Built from the ground up: naming strategy, wireframes, design system, and hi-fi prototypes.',
    outcome: 'Delivered 25–30 validated mission-critical scenarios, feature prioritization matrix, AI agency appropriateness model, and usability test roadmap. Defined 3 distinct conversation modes—Start New, Condense & Continue, and Branch Conversation—to support flexible operator interaction with agentic AI. Established conversation health monitoring with Green, Yellow, and Red degradation states, giving operators and supervisors real-time visibility into AI session reliability. Produced C2 explainability guidance including a BLUF-first AI response model and progressive disclosure tiers, balancing speed, trust, and accountability in operational command centers. Designed irreversible-action protections for active mission zones, reducing the likelihood of operator error during time-sensitive operations. Translated commander feedback into prioritized mission workflows for agentic support and measurable UX intervention. Research was directly embedded into SBIR cycles, engineering decisions, and deployment readiness—moving Veridian from "intelligent system" to "trustworthy operator partner."',
    metrics: { scenarios: '25-30', 'research tags': '38', 'priority score': '15+' },
    tags: ['Defense AI', 'UX Research', 'Human-AI Interaction', 'Mission Command', 'Design Systems', 'SBIR'],
    color: '#16213e',
    images: [
      '/images/Veridian_logo_bg.png',
      '/images/Veridian_Testing_Plan_Template.png',
      '/images/Screenshot_2025-09-03_at_11_38_46_PM.png',
      '/images/Screenshot_2025-09-04_at_10_09_43_PM.png',
      '/images/Screenshot_2026-02-13_at_5_02_27_PM.png',
      '/images/Screenshot_2025-11-14_at_9_20_26_AM.png',
      '/images/3.png',
      '/images/Veridian_Clients.png'
    ]
  },
  {
    id: 'intrinsic',
    title: 'Intrinsic',
    client: 'Intrinsic',
    category: 'UX Research • Marketing Enablement',
    description: 'End-to-end UX design, research, and marketing enablement work translating complex AI-driven simulation technologies into clear, compelling narratives for product adoption across DoD and commercial audiences.',
    overview: 'Operated at the intersection of product design, user research, and go-to-market strategy—bridging product teams, users, and marketing by synthesizing real user insights into design decisions and outward-facing materials for AI-driven training tools and cloud-based deployment platforms.',
    challenge: 'Intrinsic\'s products—AI-driven training acceleration tools, aircraft simulation environments, and cloud-based deployment platforms like SkyHub—are technically complex and serve highly specialized users. The challenge was making these tools understandable, credible, and approachable without oversimplifying their value, while supporting internal teams with materials that accelerate adoption and sales conversations.',
    process: 'Gathered qualitative insights from product users, SMEs, and internal stakeholders. Cross-analyzed user feedback with product capabilities to identify adoption friction. Translated research findings into clear messaging, visuals, and narratives. Designed marketing and training assets grounded in real user workflows. Applied UX storytelling principles to social media content, demos, and thought leadership materials.',
    outcome: 'Improved clarity and consistency of product messaging across marketing and training materials. Supported easier product adoption by aligning demos and collateral with real user needs. Organically grew LinkedIn following to 8,000+ followers in one year, increasing visibility and engagement. Enabled sales, training, and leadership teams with reusable, high-impact materials.',
    metrics: { linkedin: '8K+', 'website traffic': '80%+', adoption: 'High' },
    tags: ['UX Research', 'Marketing Enablement', 'Product Strategy', 'Content Design', 'Technical Communication', 'DoD'],
    color: '#0f3460',
    images: [
      '/images/Intrinsic_logo_bg2.png',
      '/images/booklayout.jpg',
      '/images/bookletmock_open1.png',
      '/images/bookletmock_open2.png',
      '/images/bookletmock_open3.png',
      '/images/20251128_Intrinsic_IITSEC_v1.jpg',
      '/images/20251205_Intrinsic_IITSEC_v2.jpg',
      '/images/Intrinsic_AUSA_Day1.jpg',
      '/images/Intrinsic_Main_Display_Dark_Mode_1.png',
      '/images/Intrinsic_APEX_flyer_front_v1.png'
    ]
  },
  {
    id: 'moody',
    title: 'Moody',
    client: 'Moody (Thesis)',
    category: 'Digital Health • Product Strategy',
    description: 'Thesis-driven digital health concept for pediatric emotional regulation, designed to strengthen collaboration between parents, behavioral therapists, and children ages 4–10 through gamified emotional tracking.',
    overview: 'Moody is a behavioral ecosystem addressing communication gaps between caregivers and professionals. It bridges telehealth scheduling, emotional tracking, gamified child engagement, and parent education—unlike siloed solutions that focus only on therapy OR classroom behavior. The platform includes AI-powered emotion tracking via smart bracelet, personalized digital activities, and secure therapist communication.',
    challenge: 'The market is fragmented: existing platforms are siloed (education-only, therapy-only, or parent-only). Multi-stakeholder UX complexity required designing for children ages 4–10, parents, behavioral therapists, and potentially educators without increasing cognitive load. Breaking into education technology is highly competitive, and emotional AI technology is still emerging.',
    process: 'Conducted competitive analysis across telehealth, gamified ed-tech, and emotional regulation tools (Talkspace, ClassDojo, Mightier, Zones of Regulation). Created feature comparison matrix to identify gaps. Analyzed industry data: 33% of children using online therapy, 87% parent-reported improvement with gamified breathing exercises, $140B affective computing market by 2025. Developed MVP concept, prototype roadmap, and IA structure.',
    outcome: 'Established validated product opportunity in pediatric behavioral health with clear differentiation from classroom-only or therapy-only tools. Defined feature ecosystem grounded in competitor gap analysis. Created child-friendly Moodcast interface using weather metaphors (Stormy to Clear Skies) for emotional states. Delivered strategic roadmap aligned with emerging wellness tech investment trends.',
    metrics: { market: '$140B', adoption: '33%', improvement: '87%' },
    tags: ['Digital Health', 'Product Strategy', 'Competitive Analysis', 'Behavioral UX', 'Pediatric', 'Multi-Stakeholder'],
    color: '#0f3460',
    heroBackground: '#f0f0f0',
    images: [
      '/images/Moody_hero2.png',
      '/images/Rectangle_16.png',
      '/images/Rectangle_18.png',
      '/images/Rectangle_21.png',
      '/images/Rectangle_22.png',
      '/images/Rectangle_19.png',
      '/images/Rectangle_24.png'
    ]
  },
  {
    id: 'mindful',
    title: 'Mindfull',
    client: 'Mindfull',
    category: 'Behavioral UX • Product Design',
    description: 'Cross-platform boundary and habit architecture tool designed for remote professionals, helping them reclaim time, energy, and connection through enforced behavioral boundaries.',
    overview: 'Mindfull is a behavioral system for remote professionals struggling with blurred work-life boundaries. It integrates focus timers with screen lock, app/notification restriction, calendar sync, health habit reminders, smartwatch nudges, and social accountability features. Rather than tracking productivity, it enforces intentional pause and structured transitions.',
    challenge: 'Remote professionals don\'t lack productivity tools—they lack enforced boundaries. Research revealed 70% work weekends and 45% work more hours than pre-pandemic. User testing uncovered three behavioral tensions: users feel guilty taking breaks, overwork due to no environmental cues to stop, and find gamification confusing without clear explanation.',
    process: 'Led research design including 12 in-depth interviews and persona development for three archetypes: Time Boundary User, Social Connector, and Habit Builder. Conducted 8 moderated usability tests across 8 flows. Quantified adoption friction: 100% onboarding success, 71% homepage navigation clarity, 62% stats confusion, 75% ad friction discouragement.',
    outcome: 'Post-iteration testing achieved 100% stats discoverability and 100% contact flow completion. Reframed boundary enforcement language to feel supportive rather than punitive. Clarified visual ring semantics and color hierarchy. Users described the product as supportive rather than controlling.',
    metrics: { interviews: '12', tests: '8', flows: '8' },
    tags: ['Behavioral UX', 'User Research', 'Usability Testing', 'Mobile Design', 'Multi-Platform', 'Design Systems'],
    color: '#1a1a2e',
    images: [
      '/images/Mindfull_logo_bg.png',
      '/images/Rectangle_33.png',
      '/images/Rectangle_25.png',
      '/images/Rectangle_28.png',
      '/images/Rectangle_29.png',
      '/images/Rectangle_30.png',
      '/images/Rectangle_32.png',
      '/images/Rectangle_31.png',
      '/images/Rectangle_34.png'
    ]
  },
  {
    id: 'blossm',
    title: 'Blossm',
    client: 'Blossm',
    category: 'UX Research • Product Design',
    description: 'UX redesign and prototyping initiative transforming a plant marketplace into a secure, community-driven platform unifying e-commerce and community engagement in one cohesive ecosystem.',
    overview: 'Blossm is a mobile marketplace and community platform for plant enthusiasts, combining peer-to-peer buying/selling, plant swaps, event hosting, and secure in-app checkout. Unlike traditional retailers or informal marketplaces, Blossm was positioned as a specialized, trust-driven ecosystem for plant lovers.',
    challenge: 'The platform needed to seamlessly integrate commerce and community—allowing users to buy, swap, sell, and host events without fragmenting the experience. Original flows lacked secure checkout clarity, transaction transparency, and clear terminology. Usability testing revealed 100% confusion around "garden sale" terminology and 40% confusion about the bottom navigation camera button.',
    process: 'Conducted competitive analysis and undercover buying experiments. Developed proto-personas for beginners, experts, and event coordinators. Created low-to-high fidelity prototypes for buyer, seller, and event flows. Ran 2 rounds of usability testing with 8 participants in 30-minute moderated Zoom sessions. Iterated based on quantified feedback.',
    outcome: 'Delivered secure checkout with multiple payment options and increased trust signals. Resolved confusion between community events, sale events, and garden sales. Added difficulty-level definitions after 67% of users needed clarification. Reworked navigation to reduce cognitive friction. Delivered complete branding style guide and component library.',
    metrics: { tests: '8', rounds: '2', flows: '3' },
    tags: ['UX Research', 'Prototyping', 'Usability Testing', 'Mobile Design', 'E-commerce', 'Community Platform'],
    color: '#16213e',
    images: [
      '/images/Blossm_logo_bg.png',
      '/images/Copy_of_2021-10-21_Group1_Assignment7_pptx__1_.jpg',
      '/images/Copy_of_2021-10-21_Group1_Assignment7_pptx.jpg',
      '/images/Copy_of_2021-10-21_Group1_Assignment7_pptx__3_.jpg',
      '/images/Copy_of_2021-10-21_Group1_Assignment7_pptx__2_.jpg',
      '/images/Copy_of_2021-10-21_Group1_Assignment7_pptx__4_.jpg',
      '/images/Copy_of_2021-10-21_Group1_Assignment7_pptx__6_.jpg'
    ]
  },
  {
    id: 'mutesix',
    title: 'MuteSix',
    client: 'MuteSix',
    category: 'Performance Marketing • Design Systems',
    description: 'Led creative strategy and execution for 50+ DTC brands at the leading full-funnel performance marketing agency, driving measurable growth through data-backed media buying and creative strategies.',
    overview: 'MuteSix is the leading full-funnel performance marketing agency accelerating growth for disruptor brands. Managed dozens of clients across email marketing, paid social creative, and landing page design—collaborating with clients to determine quarterly goals and develop data-driven strategies.',
    challenge: 'Each brand required unique creative approaches while maintaining performance accountability. Scaling creative production across 50+ simultaneous clients demanded systematic workflows without sacrificing quality or brand voice. Fast iteration cycles were critical for testing and optimization.',
    process: 'Developed comprehensive email marketing systems, paid social ad creative, and conversion-optimized landing pages. Built component libraries and design systems to enable rapid iteration. Analyzed performance data to inform creative strategy and A/B testing priorities. Collaborated cross-functionally with media buyers, copywriters, and account managers.',
    outcome: 'Achieved 6.32 average ROAS across client portfolio. Denver Modern: $800K revenue in 30 days with 127% YOY sales increase. Merinos: 8.63 ROAS with 49% improvement. Increased creative output by 40% without additional headcount. Reduced revision cycles from 5 rounds to 2 on average.',
    metrics: { roas: '6.32', output: '+40%', brands: '50+' },
    tags: ['Performance Marketing', 'Email Marketing', 'Paid Social', 'Landing Pages', 'Design Systems', 'DTC'],
    color: '#0f3460',
    heroBackground: '#ffffff',
    images: [
      '/images/Mutesix_hero3.png',
      '/images/Mutesix_21.png',
      '/images/Mutesix_18.png',
      '/images/Mutesix_19.png',
      '/images/Mutesix_25.png',
      '/images/Mutesix_26.png',
      '/images/Mutesix_20.png',
      '/images/Mutesix_15.png',
      '/images/Mutesix_16.png',
      '/images/Mutesix_22.png',
      '/images/Mutesix_23.png',
      '/images/Mutesix_24.png'
    ]
  },
  {
    id: 'epic',
    title: 'Epic Marketing',
    client: 'Epic Marketing (Agency)',
    category: 'Multi-Client • Brand & Campaign',
    description: 'Multi-client brand, web, and campaign execution at a full-service marketing agency, spanning DTC, healthcare, SaaS, fitness, and financial services—delivering brand systems, responsive websites, and conversion-driven creative across diverse industries.',
    overview: 'This body of work represents integrated marketing and design across brand identity development, responsive web design, UI design, conversion optimization, and multi-channel campaign execution. Projects ranged from early-stage startups requiring foundational identity systems to enterprise-scale campaigns supported by quantitative research and performance metrics. Clients spanned fitness, financial services, SaaS cloud storage, healthcare, and DTC—each requiring unique positioning, visual systems, and digital strategies delivered under tight timelines with measurable performance accountability.',
    challenge: 'Each client presented distinct creative and strategic challenges. VASA Fitness needed to scale its brand across 40+ locations while driving online membership conversions. Complete Student Loans required a full website redesign that communicated complex financial information to a young audience in a stylish, modern way—balancing minimalism with the density of content expected from a serious financial institution. CrowdStorage, a SaaS company delivering distributed cloud storage at nearly half the cost of competitors, needed a website that explained innovative storage architecture without losing sight of their core value proposition: affordability. Across all clients, maintaining brand consistency, conversion strategy alignment, and technical integration standards while juggling multi-client demands was the constant challenge.',
    process: 'Operated in a hybrid capacity spanning visual design, brand identity, UI/web design (WordPress & Shopify), and campaign asset production. For VASA Fitness: interviewed management, conducted internal focus groups, then developed landing pages, paid ads, email campaigns, and executed branded photo shoots supporting growth from 26 to 40+ locations with signage and interior design. For Complete Student Loans: delivered a complete web update combining minimalism with organic shapes and structured brutalism—creating an experience that was visually restrained but stylish, informative and pleasant to use, with the elegance of a serious financial institution designed for a bright young audience. For CrowdStorage: conducted deep-dive brand research, competitive analysis, and audience identification as part of a larger digital strategy including paid ads and email automation. Delivered a comprehensive brand style guide, logo design, social media marketing assets, responsive and HTML5 ad creative, landing pages, email marketing, commercial spot storyboards, motion graphics, GIF animation, and NFT animation. Across all clients, graphic design processes included iterative brand explorations, component-based design systems, and close collaboration with copywriters, media buyers, and account teams to ensure cohesive execution from concept through delivery.',
    outcome: 'VASA Fitness: Online join rate increased from 10% to 26%, with a 60.64% YOY increase in online joins, 17.86% increase in site traffic, and 42.34% increase in goal conversions. Complete Student Loans: Launched a modern, information-rich website that balanced accessibility with institutional credibility for students and parents navigating financial decisions. CrowdStorage: Delivered a full-funnel organic and paid strategy grounded in brand identity research, driving high-quality leads through targeted content and multi-format creative. Additional clients received cohesive brand systems, conversion-optimized websites, and research-informed campaign creative across digital and print touchpoints.',
    metrics: { joins: '+160%', traffic: '+18%', 'locations signage & interior design': '40+' },
    tags: ['Brand Identity', 'Web Design', 'UI Design', 'Campaign Design', 'Motion Graphics', 'Performance Marketing', 'SaaS', 'CRO'],
    color: '#1a1a2e',
    images: [
      '/images/epic_yellow.jpeg',
      '/images/Mask_Group_5910_2x.png',
      '/images/Mask_Group_5911.png',
      '/images/Mask_Group_5907_2x.png',
      '/images/Mask_Group_5908_2x.png',
      '/images/Mask_Group_5909_2x.png',
      '/images/Appiconsedits_2x.png',
      '/images/CSlanding.png',
      '/images/CSL_6555_2x.png',
      '/images/Mask_CSL_5881_2x.png',
      '/images/CSFBAD_2x.png',
      '/images/02-hexamed-branding-mockup.png',
      '/images/Twobacksides_businesscard_mock_v1.png',
      '/images/Group_6586_2x.png',
      '/images/BeeHomeColors2.png',
      '/images/ESD_bottles.png',
      '/images/ESD_stationery.png',
      '/images/ESD_logo_herbs.png',
      '/images/ESD_brochure.png',
      '/images/ESD_brochure2.png'
    ]
  },
  {
    id: 'liv',
    title: 'LIV Aesthetics & Wellness',
    client: 'LIV',
    category: 'Brand Identity • Visual Design',
    description: 'Created a refined brand identity and visual system for a modern aesthetics and wellness clinic, establishing a cohesive foundation spanning logo design, typography, color systems, and real-world applications across digital, print, and social touchpoints.',
    overview: 'LIV is a health, aesthetics, and wellness clinic offering services through a mind–body–skin philosophy. The brand positions itself as modern, calming, and premium while remaining approachable and grounded in natural wellness values inspired by the Utah landscape.',
    challenge: 'The primary challenge was differentiating LIV in a competitive and rapidly growing Utah aesthetics market while avoiding overly trendy or generic wellness visuals. The brand needed to feel elevated and trustworthy, feminine but not limiting, and adaptable across physical and digital experiences—essentially, it needed to feel like "a deep breath."',
    process: 'Defined a core brand idea ("Be-utah-ful") to anchor visual and narrative direction. Researched regional competitors, wellness trends, and audience demographics. Developed a typographic system balancing elegance and readability. Built a nature-inspired color palette drawn from Utah landscapes and natural tones. Iterated logo concepts to ensure versatility across signage, packaging, and social. Created mockups to validate real-world usability before final delivery.',
    outcome: 'Delivered a cohesive, premium brand system ready for launch and growth. Provided flexible logo and color options for long-term scalability. Established a recognizable visual identity aligned with LIV\'s wellness philosophy. Enabled consistent branding across web, social media, print, and in-clinic materials. Positioned LIV as a confident, modern player in the regional aesthetics market.',
    metrics: { deliverables: '15+', touchpoints: '5+', system: 'Full' },
    tags: ['Brand Identity', 'Logo Design', 'Visual Systems', 'Typography', 'Color Theory', 'Creative Direction'],
    color: '#16213e',
    images: [
      '/images/LIV_logo_bg.png',
      '/images/LIVBrand.png',
      '/images/LIVPitch.png'
    ]
  },
  {
    id: 'editorial',
    title: 'Editorial Design',
    client: 'Multiple Publications',
    category: 'Editorial Design • Print',
    description: 'Editorial design and print production for Utah-based publications including The Daily Utah Chronicle, Wasatch Magazine, and Salt Lily Magazine—spanning weekly newspapers, monthly magazines, and independent zine publishing.',
    overview: 'Delivered high-quality editorial layouts across multiple publications with distinct editorial voices, production constraints, and audiences. Work ranged from bold sports spreads to organic artistic zine layouts to clean outdoor lifestyle features.',
    challenge: 'Each publication had unique requirements: The Daily Utah Chronicle demanded rapid turnaround for weekly deadlines, Wasatch Magazine required a visual refresh while maintaining brand consistency, and Salt Lily Magazine needed to be built from scratch as a new independent publication. The common thread was delivering visually cohesive, print-ready layouts under tight deadlines while meeting strict CMYK production requirements.',
    process: 'Developed rapid layout iteration workflows using Adobe InDesign with strong typographic hierarchy and grid systems. Collaborated closely with editors, writers, photographers, and illustrators. Conducted design critiques and QA reviews to ensure print accuracy. For Salt Lily, took on project management and creative direction responsibilities, coordinating web, social, and promotional materials alongside the print publication.',
    outcome: 'Successfully shipped weekly and monthly print publications over multiple years. Co-launched the first edition of Salt Lily Magazine as an independent zine showcasing emerging Utah artists. Helped lead a visual refresh of Wasatch Magazine. Received First Place "Epics" Prize for Best Page Design from the Daily Utah Chronicle. Mentored junior designers, improving team consistency and establishing design standards.',
    metrics: { publications: '3+', award: '1st Place', years: '3+' },
    tags: ['Editorial Design', 'Print Production', 'Typography', 'InDesign', 'Creative Direction', 'Art Direction'],
    color: '#1a1a2e',
    images: [
      '/images/Chronicle1.jpg',
      '/images/Chronicle2.jpg',
      '/images/Salt_Lily1.png',
      '/images/Salt_Lily3.jpg',
      '/images/Salt_Lily4.jpg',
      '/images/wasatch1.png',
      '/images/wasatch2.jpg',
      '/images/wasatach3.jpg'
    ]
  }
];

// Services with Phosphor icons
const services = [
  {
    title: 'UX/UI Design And Research',
    description: 'User experience is at the heart of everything I do. As an experienced UX designer serving enterprise clients, DoD contractors, and aerospace companies, I engineer digital experiences that prioritize user satisfaction and operational efficiency. Through in-depth research, usability testing, and user-centric design principles, I create intuitive interfaces for complex systems—from AI-driven simulations to cloud-based software solutions.',
    image: '/images/UXResearch_Service.png',
    expertise: [
      { icon: 'MagnifyingGlass', label: 'User Research Methods' },
      { icon: 'Flask', label: 'Usability Testing' },
      { icon: 'Sparkle', label: 'Interaction Design' },
      { icon: 'ArrowsClockwise', label: 'User Flow Optimization' },
      { icon: 'TreeStructure', label: 'Information Architecture' }
    ],
    cta: 'I need this'
  },
  {
    title: 'High Performance Graphic Design Marketing',
    description: 'High Performance Graphic Design delivers visually compelling, conversion-driven creative tailored to elevate brands in competitive markets. By combining strategic messaging with clean, scalable design systems, I help businesses stand out, connect with their target audience, and drive measurable results across digital and print platforms. Experienced with B2B, D2C, tech, finance, healthcare, and global performance marketing agencies.',
    image: '/images/GraphicDesign_Service.png',
    expertise: [
      { icon: 'PlusCircle', label: 'Paid and Organic Media' },
      { icon: 'FilmStrip', label: 'Motion Graphics' },
      { icon: 'FileText', label: 'Traditional Print Materials' },
      { icon: 'Palette', label: 'Asset Curation' }
    ],
    cta: 'I need this'
  },
  {
    title: 'Design Consultation Or Mentorship',
    description: 'Navigating the ever-changing landscape of design—especially in AI/ML product development and emerging technologies—can be daunting. With over a decade of expertise across enterprise software, consumer products, and agile environments, I provide strategic guidance to take your design practice to the next level. From design system architecture to research methodology, I help teams build human-centered capabilities.',
    image: '/images/UXConsult_Service.png',
    expertise: [
      { icon: 'CurrencyDollar', label: 'Stakeholder Demos' },
      { icon: 'Users', label: 'Branding Workshops' },
      { icon: 'ChartBar', label: 'Competitive Analysis' }
    ],
    cta: 'I need this'
  }
];

// REAL LinkedIn testimonials ONLY - no AI generated
const testimonials = [
  {
    quote: "Ashlyn is an absolute graphic design & UI/UX rock star and an incredible person to work with. She is able to juggle multiple clients spanning from vertical to vertical, and still have time to help her fellow designers with their workload. She would fit in perfectly in any team, and you'd be lucky to have her on yours!",
    author: "Danielle B.",
    role: "Art Director",
    company: "MuteSix"
  },
  {
    quote: "Ashlyn is a User Experience extraordinaire. Her knowledge of user experience practices was invaluable for our team's growth toward more human-focused, and data-driven design. Outside of her UX skills she is constantly over-performing in her daily duties while taking time to educate our team on how to approach design with empathy.",
    author: "Andy C.",
    role: "Senior Designer",
    company: "MuteSix"
  },
  {
    quote: "Ashlyn is a talented UX researcher and Designer with a genuine passion for data-driven user research. She thrives on complex research challenges, which is exactly what we need. Through our UX workshops, we've refined the methodology around research execution, tradeoffs, and how findings translate into feature design. I've set high standards for research design rigor on this team—and Ashlyn has risen to meet those expectations with professionalism and dedication.",
    author: "Ashley Deal",
    role: "Technical Project Manager",
    company: "Intrinsic"
  },
  {
    quote: "I worked with Ashlyn for about a year on a variety of different projects to include UI/UX design, clickable mockups, product naming workshops, marketing material creation, and end user engagement workshops. Ashlyn's work is very complete and professional. She always prepares with market or consumer research. I cannot recommend Ashlyn enough for her hard work, premier designs, and timeliness.",
    author: "Kayla Broyles",
    role: "Technical Project Manager",
    company: "Intrinsic"
  }
];

// Real client data - only clients with logo assets
const clients = [
  { name: 'Epic', display: 'epic', logo: '/images/Asset_5_2x.png' },
  { name: 'Intrinsic', display: 'INTRINSIC', logo: '/images/Intrinsic_logo_outlined_2024_white.svg' },
  { name: 'Denver Modern', display: 'DENVER MODERN', logo: '/images/Asset_3_2x.png' },
  { name: 'Graf Lantz', display: 'graf lantz', logo: '/images/Asset_7_2x.png' },
  { name: 'Art Naturals', display: 'artnaturals', logo: '/images/Asset_1_2x.png' },
  { name: 'CLMBR', display: 'CLMBR', logo: '/images/whiteclmbr_1.png' }
];

// Gradient Hover Text Component
const GradientHoverText = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontWeight: 400,
        cursor: 'default',
        transition: 'all 0.3s ease',
        ...(isHovered ? {
          background: 'linear-gradient(90deg, #811389, #D927FF, #E86A33, #DAA520)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        } : {
          color: ACCENT
        })
      }}
    >
      {children}
    </span>
  );
};

const stats = [
  { value: '11+', label: 'Years in multi-media design and strategy' },
  { value: '100+', label: 'Tools in creative and productivity toolkit' },
  { value: '6.32', label: 'Average ROAS for clients' }
];

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }) => {
  const [display, setDisplay] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  // Parse value into numeric part and suffix
  const match = value.match(/^([\d.]+)(.*)$/);
  const targetNum = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const hasDecimal = match ? match[1].includes('.') : false;
  const decimalPlaces = hasDecimal ? match[1].split('.')[1].length : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = targetNum * eased;
            
            if (hasDecimal) {
              setDisplay(current.toFixed(decimalPlaces));
            } else {
              setDisplay(Math.floor(current).toString());
            }
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplay(hasDecimal ? targetNum.toFixed(decimalPlaces) : targetNum.toString());
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasAnimated, targetNum, duration, hasDecimal, decimalPlaces]);

  return <span ref={ref}>{display}{suffix}</span>;
};

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Glowing Button Component
const GlowButton = ({ children, onClick, variant = 'primary', style = {} }) => {
  const isPrimary = variant === 'primary';
  const [isHovered, setIsHovered] = useState(false);
  const gradientColor = 'linear-gradient(90deg, #811389, #D927FF, #E86A33, #DAA520)';
  
  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: isPrimary 
          ? `0 0 20px ${ACCENT_GLOW}, 0 0 40px ${ACCENT_GLOW}, inset 0 0 20px rgba(255,255,255,0.1)`
          : `0 0 15px rgba(255,255,255,0.1), inset 0 0 20px rgba(255,255,255,0.05)`
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        position: 'relative',
        padding: '0.875rem 1.75rem',
        background: isPrimary ? ACCENT : 'transparent',
        border: isPrimary ? 'none' : '1px solid rgba(255, 255, 255, 0.15)',
        borderRadius: isHovered ? '4px' : '100px',
        color: isPrimary ? '#fff' : 'rgba(255, 255, 255, 0.8)',
        fontSize: '0.875rem',
        fontWeight: 500,
        letterSpacing: '0.02em',
        cursor: 'pointer',
        fontFamily: "'Inter', sans-serif",
        transition: 'all 0.3s ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        ...style
      }}
    >
      {/* Crosshair corners - visible on hover */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
        <span
          key={pos}
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            ...(pos.includes('top') ? { top: '-6px' } : { bottom: '-6px' }),
            ...(pos.includes('left') ? { left: '-6px' } : { right: '-6px' }),
          }}
        >
          {/* Horizontal line */}
          <span style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: '1.5px',
            background: gradientColor,
            transform: 'translateY(-50%)'
          }} />
          {/* Vertical line */}
          <span style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            width: '1.5px',
            height: '100%',
            background: gradientColor,
            transform: 'translateX(-50%)'
          }} />
        </span>
      ))}
      {/* Gradient border on hover */}
      <span style={{
        position: 'absolute',
        inset: '-1px',
        borderRadius: isHovered ? '4px' : '100px',
        padding: '1px',
        background: isHovered ? gradientColor : 'transparent',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none'
      }} />
      {children}
    </motion.button>
  );
};

// Testimonial Carousel Component
const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
      }, 6000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying]);

  const goTo = (index) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const next = () => goTo((current + 1) % testimonials.length);
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length);

  return (
    <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
          style={{
            padding: '3rem',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '20px',
            textAlign: 'center'
          }}
        >
          <div style={{ 
            fontSize: '3rem', 
            color: ACCENT, 
            marginBottom: '1.5rem',
            opacity: 0.3
          }}>
            "
          </div>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.05rem',
            fontWeight: 300,
            lineHeight: 1.8,
            color: 'rgba(255, 255, 255, 0.8)',
            marginBottom: '2rem'
          }}>
            {testimonials[current].quote}
          </p>
          <div>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#f5f5f5'
            }}>
              {testimonials[current].author}
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)'
            }}>
              {testimonials[current].role}, {testimonials[current].company}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        gap: '1rem',
        marginTop: '2rem'
      }}>
        <motion.button
          whileHover={{ scale: 1.1, color: ACCENT }}
          onClick={prev}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          ←
        </motion.button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? ACCENT : 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.1, color: ACCENT }}
          onClick={next}
          style={{
            background: 'none',
            border: 'none',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          →
        </motion.button>
      </div>

      <p style={{
        textAlign: 'center',
        marginTop: '1.5rem'
      }}>
        <a 
          href="https://www.linkedin.com/in/ashlyn-cassity/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            color: ACCENT,
            textDecoration: 'none'
          }}
        >
          Read more reviews on LinkedIn →
        </a>
      </p>
    </div>
  );
};

// Client Logos Component - animated scrolling marquee
const ClientLogos = () => {
  // Double the array for seamless loop
  const doubledClients = [...clients, ...clients];
  
  return (
    <div style={{
      overflow: 'hidden',
      padding: '1rem 0',
      maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
    }}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '5rem',
        animation: 'marquee 20s linear infinite',
        width: 'max-content'
      }}>
        {doubledClients.map((client, idx) => (
          <div
            key={`${client.name}-${idx}`}
            style={{
              opacity: 0.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '160px',
              height: '80px',
              flexShrink: 0
            }}
          >
            {client.logo ? (
              <img 
                src={client.logo} 
                alt={client.name}
                style={{
                  maxHeight: client.name === 'Intrinsic' ? '80px' : '64px',
                  maxWidth: client.name === 'Intrinsic' ? '240px' : '200px',
                  objectFit: 'contain',
                  opacity: 0.7
                }}
              />
            ) : (
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: client.display === 'graf lantz' ? '1.4rem' : '1.2rem',
                fontWeight: client.display === 'graf lantz' ? 300 : 600,
                letterSpacing: client.display === 'graf lantz' ? '0.15em' : '0.08em',
                color: 'rgba(255, 255, 255, 0.5)',
                whiteSpace: 'nowrap'
              }}>
                {client.display}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '1.25rem 4vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrolled ? 'rgba(8, 8, 10, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
        transition: 'all 0.3s ease'
      }}
    >
      <motion.div 
        whileHover={{ opacity: 0.8 }}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        onClick={() => setCurrentPage('home')}
      >
        <img 
          src="/images/A_logo_mark.svg" 
          alt="AC Logo" 
          style={{ width: '24px', height: '24px' }} 
        />
        <span style={{ 
          fontFamily: "'Inter', sans-serif",
          fontSize: '1rem',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          color: '#f5f5f5'
        }}>
          Ashlyn Cassity
        </span>
      </motion.div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {['Work', 'About'].map((item) => (
          <motion.button
            key={item}
            whileHover={{ color: '#f5f5f5' }}
            onClick={() => setCurrentPage(item.toLowerCase())}
            style={{
              background: 'none',
              border: 'none',
              color: currentPage === item.toLowerCase() ? '#f5f5f5' : 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.875rem',
              fontWeight: 400,
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              transition: 'color 0.3s ease'
            }}
          >
            {item}
          </motion.button>
        ))}
        <GlowButton onClick={() => setCurrentPage('contact')} variant="secondary">
          Contact
        </GlowButton>
      </div>
    </motion.nav>
  );
};

// Icon renderer helper
const renderIcon = (iconName) => {
  const IconComponent = Icons[iconName];
  return IconComponent ? <IconComponent /> : null;
};

// Service Section Component
const ServiceSection = ({ service, index, isReversed }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={stagger}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
        padding: '5rem 0',
        borderBottom: index < services.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none'
      }}
    >
      {/* Image Side */}
      <motion.div variants={fadeUp} style={{ order: isReversed ? 2 : 1 }}>
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden'
        }}>
          {/* Main image */}
          <div style={{
            borderRadius: '20px',
            overflow: 'hidden',
            height: '380px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {service.image ? (
              <img
                src={service.image}
                alt={service.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            ) : (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'rgba(255, 255, 255, 0.15)'
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  letterSpacing: '0.05em'
                }}>
                  Image Coming Soon
                </span>
              </div>
            )}
          </div>

          {/* Floating expertise card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              position: 'absolute',
              top: 'auto',
              bottom: '-2rem',
              left: isReversed ? 'auto' : '1.5rem',
              right: isReversed ? '1.5rem' : 'auto',
              background: 'rgba(12, 12, 14, 0.6)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}
          >
            {service.expertise.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0',
                borderBottom: i < service.expertise.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                color: 'rgba(255, 255, 255, 0.6)'
              }}>
                {renderIcon(item.icon)}
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}>
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Content Side */}
      <motion.div variants={fadeUp} style={{ order: isReversed ? 1 : 2 }}>
        <h2 style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          fontWeight: 300,
          lineHeight: 1.2,
          color: '#f5f5f5',
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em'
        }}>
          {service.title}
        </h2>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '1rem',
          lineHeight: 1.8,
          color: 'rgba(255, 255, 255, 0.6)',
          marginBottom: '2rem'
        }}>
          {service.description}
        </p>
        <GlowButton>
          {service.cta} <span>→</span>
        </GlowButton>
      </motion.div>
    </motion.div>
  );
};

// Home Page
const HomePage = ({ setCurrentPage, setSelectedCase }) => {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '100px 8vw 6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '50vw',
          height: '50vw',
          background: `radial-gradient(circle, ${ACCENT_GLOW} 0%, transparent 60%)`,
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.3,
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Text Side */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p 
              variants={fadeUp}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: ACCENT_SECONDARY,
                marginBottom: '1.25rem'
              }}
            >
              Available for Creative Projects
            </motion.p>

            <motion.h1 
              variants={fadeUp}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 200,
                lineHeight: 1.1,
                color: '#f5f5f5',
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em'
              }}
            >
              Hi, I'm Ashlyn Cassity.
            </motion.h1>

            <motion.p 
              variants={fadeUp}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                fontWeight: 300,
                lineHeight: 1.6,
                color: '#f5f5f5',
                letterSpacing: '-0.01em',
                marginBottom: '2.5rem'
              }}
            >
              I blend <GradientHoverText>research rigor</GradientHoverText>, {' '}
              <GradientHoverText>visual craftsmanship</GradientHoverText>, and{' '}
              <GradientHoverText>operational understanding</GradientHoverText> to 
              deliver UX systems that strengthen product performance and organizational effectiveness.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '1rem' }}>
              <GlowButton onClick={() => setCurrentPage('contact')}>
                Contact Ashlyn
              </GlowButton>
              <GlowButton onClick={() => setCurrentPage('work')} variant="secondary">
                Explore Portfolio →
              </GlowButton>
            </motion.div>

            {/* Scroll indicator - below text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                marginTop: '3rem'
              }}
            >
              <span style={{ 
                fontSize: '0.7rem', 
                letterSpacing: '0.2em', 
                color: 'rgba(255, 255, 255, 0.3)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500
              }}>
                SCROLL
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: '1px',
                  height: '40px',
                  background: `linear-gradient(to bottom, ${ACCENT}, transparent)`
                }}
              />
            </motion.div>
          </motion.div>

          {/* Spline 3D Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            {/* Drag me callout */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: '1px',
                  height: '30px',
                  background: `linear-gradient(to top, ${ACCENT}, transparent)`
                }}
              />
              <span style={{ 
                fontSize: '0.7rem', 
                letterSpacing: '0.2em', 
                color: 'rgba(255, 255, 255, 0.3)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500
              }}>
                DRAG ME
              </span>
            </motion.div>
            <div style={{
              height: '500px',
              width: '100%',
              borderRadius: '24px',
              overflow: 'hidden'
            }}>
              <iframe
                src="https://my.spline.design/abstractradialloader-JzxBhrBRNs1U3T29EE09aJw0/"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '24px'
                }}
                title="3D Interactive Element"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section style={{ padding: '6rem 8vw', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <motion.h2 
            variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 200,
              lineHeight: 1.15,
              color: '#f5f5f5',
              marginBottom: '2rem',
              letterSpacing: '-0.02em'
            }}
          >
            <span style={{ color: ACCENT }}>Let's start building together.</span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              fontWeight: 400,
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.6)',
              maxWidth: '900px'
            }}
          >
            With a background spanning user experience design, research, and creative strategy, 
            I specialize in translating complex problems into intuitive, human-centered digital 
            experiences that balance usability, business objectives, and long-term product vision. 
            I've led UX/UI design across major programs—including CDAO, Navy Surface AIC, USMC MAWTS, 
            and Air Force talent-management platforms, transforming legacy systems into intuitive, 
            mission-ready digital products.
          </motion.p>
        </motion.div>
      </section>

      {/* UX Process Image */}
      <section style={{ padding: '2rem 8vw 4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <img
            src="/images/UXprocessdraft1.png"
            alt="UX Design Process - Discover, Define, Design, Validate, Launch"
            style={{
              maxWidth: '100%',
              width: '1000px',
              height: 'auto',
              borderRadius: '20px',
              display: 'block'
            }}
          />
        </motion.div>
      </section>

      {/* Services Section */}
      <section style={{ padding: '2rem 8vw 6rem' }}>
        {services.map((service, index) => (
          <ServiceSection 
            key={service.title}
            service={service}
            index={index}
            isReversed={index % 2 === 1}
          />
        ))}
      </section>

      {/* Stats Banner */}
      <section style={{ 
        padding: '5rem 8vw', 
        background: `linear-gradient(135deg, ${ACCENT}08 0%, rgba(8, 8, 10, 1) 50%, rgba(99, 102, 241, 0.05) 100%)`,
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p 
            variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 300,
              color: '#f5f5f5',
              textAlign: 'center',
              marginBottom: '3rem',
              letterSpacing: '-0.02em'
            }}
          >
            Relax, you're supported<br />
            <span style={{ color: ACCENT }}>by a decade of proficiency</span>
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            textAlign: 'center'
          }}>
            {stats.map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 200,
                  color: ACCENT,
                  marginBottom: '0.5rem'
                }}>
                  <AnimatedCounter value={stat.value} />
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.5)',
                  maxWidth: '180px',
                  margin: '0 auto'
                }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Featured Work Preview */}
      <section style={{ padding: '6rem 8vw' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: ACCENT_SECONDARY,
                marginBottom: '0.75rem'
              }}>
                Selected Work
              </p>
              <h2 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                fontWeight: 300,
                color: '#f5f5f5',
                letterSpacing: '-0.02em'
              }}>
                Enterprise products, defense systems,<br />
                <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>and consumer experiences.</span>
              </h2>
            </div>
            <motion.button
              whileHover={{ x: 5, color: ACCENT }}
              onClick={() => setCurrentPage('work')}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'color 0.3s ease'
              }}
            >
              View All Projects →
            </motion.button>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}>
            {caseStudies.slice(0, 4).map((study) => (
              <motion.div
                key={study.id}
                variants={fadeUp}
                whileHover={{ y: -8, borderColor: 'rgba(232, 106, 51, 0.3)' }}
                onClick={() => {
                  setSelectedCase(study);
                  setCurrentPage('case-study');
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div style={{
                  height: '200px',
                  background: `linear-gradient(135deg, ${study.color}, rgba(8, 8, 10, 0.9))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {study.images && study.images.length > 0 ? (
                    <img
                      src={study.images[0]}
                      alt={study.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.25rem',
                      fontWeight: 300,
                      color: 'rgba(255, 255, 255, 0.12)'
                    }}>
                      {study.title}
                    </span>
                  )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: ACCENT,
                    marginBottom: '0.5rem'
                  }}>
                    {study.category}
                  </p>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 400,
                    color: '#f5f5f5',
                    marginBottom: '0.5rem'
                  }}>
                    {study.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    lineHeight: 1.6
                  }}>
                    {study.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Carousel */}
      <section style={{ padding: '6rem 8vw', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p 
            variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.4)',
              marginBottom: '2.5rem',
              textAlign: 'center'
            }}
          >
            LinkedIn Recommendations
          </motion.p>
          
          <motion.div variants={fadeUp}>
            <TestimonialCarousel />
          </motion.div>
        </motion.div>
      </section>

      {/* Client Logos */}
      <section style={{ 
        padding: '4rem 8vw',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.p 
            variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.3)',
              marginBottom: '2rem',
              textAlign: 'center'
            }}
          >
            Trusted By
          </motion.p>
          <motion.div variants={fadeUp}>
            <ClientLogos />
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section - CENTERED button */}
      <section style={{ 
        padding: '6rem 8vw',
        background: `linear-gradient(135deg, ${ACCENT}15 0%, rgba(8, 8, 10, 1) 100%)`,
        textAlign: 'center'
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          style={{ 
            position: 'relative', 
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <motion.h2 
            variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
              fontWeight: 200,
              color: '#f5f5f5',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}
          >
            Ready to elevate your<br />
            <span style={{ color: ACCENT }}>digital experience?</span>
          </motion.h2>
          <motion.p 
            variants={fadeUp}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.5)',
              marginBottom: '2rem',
              maxWidth: '450px'
            }}
          >
            Let's discuss how research-driven design can solve your complex challenges.
          </motion.p>
          <motion.div variants={fadeUp}>
            <GlowButton onClick={() => setCurrentPage('contact')}>
              Start a Project →
            </GlowButton>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

// Work Page
const WorkPage = ({ setCurrentPage, setSelectedCase }) => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <section style={{ padding: '3rem 8vw' }}>
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.p variants={fadeUp} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: ACCENT_SECONDARY,
            marginBottom: '0.75rem'
          }}>
            Portfolio
          </motion.p>
          <motion.h1 variants={fadeUp} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
            fontWeight: 200,
            color: '#f5f5f5',
            marginBottom: '1rem'
          }}>
            Selected Work
          </motion.h1>
          <motion.p variants={fadeUp} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255, 255, 255, 0.5)',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            From AI-driven enterprise solutions to consumer products, I've partnered with 
            DoD contractors, aerospace companies, Fortune 500 enterprises, and high-growth 
            startups to create research-backed digital experiences.
          </motion.p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem'
          }}>
            {caseStudies.map((study) => (
              <motion.div
                key={study.id}
                variants={fadeUp}
                whileHover={{ y: -8, borderColor: 'rgba(232, 106, 51, 0.3)' }}
                onClick={() => {
                  setSelectedCase(study);
                  setCurrentPage('case-study');
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.4s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                }}
              >
                <div style={{
                  height: '200px',
                  background: `linear-gradient(135deg, ${study.color}, rgba(8, 8, 10, 0.9))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  {study.images && study.images.length > 0 ? (
                    <img
                      src={study.images[0]}
                      alt={study.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  ) : (
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.5rem',
                      fontWeight: 200,
                      color: 'rgba(255, 255, 255, 0.1)'
                    }}>
                      {study.title}
                    </span>
                  )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: ACCENT
                    }}>
                      {study.category}
                    </p>
                    {study.client && (
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.7rem',
                        color: 'rgba(255, 255, 255, 0.4)'
                      }}>
                        {study.client}
                      </p>
                    )}
                  </div>
                  <h3 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.2rem',
                    fontWeight: 400,
                    color: '#f5f5f5',
                    marginBottom: '0.5rem'
                  }}>
                    {study.title}
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.5)',
                    lineHeight: 1.6
                  }}>
                    {study.description}
                  </p>
                  <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                    {Object.entries(study.metrics).map(([key, value]) => (
                      <div key={key}>
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '1.1rem',
                          fontWeight: 500,
                          color: '#f5f5f5'
                        }}>
                          {value}
                        </span>
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.65rem',
                          color: 'rgba(255, 255, 255, 0.4)',
                          marginLeft: '0.25rem',
                          textTransform: 'capitalize'
                        }}>
                          {key}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

// Case Study Page
const CaseStudyPage = ({ caseStudy, setCurrentPage, setSelectedCase }) => {
  if (!caseStudy) return null;

  const currentIndex = caseStudies.findIndex(c => c.id === caseStudy.id);
  const nextCase = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <section style={{ padding: '3rem 8vw' }}>
        <motion.div initial="hidden" animate="visible" variants={stagger}>
          <motion.button
            variants={fadeUp}
            whileHover={{ x: -5, color: ACCENT }}
            onClick={() => setCurrentPage('work')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontFamily: "'Inter', sans-serif",
              marginBottom: '2rem'
            }}
          >
            ← Back to Work
          </motion.button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <motion.p variants={fadeUp} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: ACCENT_SECONDARY,
                marginBottom: '0.75rem'
              }}>
                {caseStudy.category}
              </motion.p>

              <motion.h1 variants={fadeUp} style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(2.5rem, 5.5vw, 4rem)',
                fontWeight: 200,
                color: '#f5f5f5',
                marginBottom: '1rem'
              }}>
                {caseStudy.title}
              </motion.h1>

              {caseStudy.client && (
                <motion.p variants={fadeUp} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '1.5rem'
                }}>
                  Client: {caseStudy.client}
                </motion.p>
              )}
            </div>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '2rem' }}>
              {Object.entries(caseStudy.metrics).map(([key, value]) => (
                <div key={key} style={{ textAlign: 'right' }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '2rem',
                    fontWeight: 300,
                    color: ACCENT
                  }}>
                    {value}
                  </p>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    color: 'rgba(255, 255, 255, 0.4)',
                    textTransform: 'capitalize'
                  }}>
                    {key}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.p variants={fadeUp} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.15rem',
            color: 'rgba(255, 255, 255, 0.7)',
            maxWidth: '700px',
            lineHeight: 1.8,
            marginTop: '1rem',
            marginBottom: '2rem'
          }}>
            {caseStudy.overview || caseStudy.description}
          </motion.p>

          {caseStudy.tags && (
            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
              {caseStudy.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  color: 'rgba(255, 255, 255, 0.5)',
                  padding: '0.4rem 0.8rem',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '100px',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Hero Image - use first image if available */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            height: caseStudy.images && caseStudy.images.length > 0 ? 'auto' : '50vh',
            maxHeight: '60vh',
            background: caseStudy.images && caseStudy.images.length > 0 
              ? (caseStudy.heroBackground || 'transparent')
              : `linear-gradient(135deg, ${caseStudy.color}, rgba(8, 8, 10, 0.9))`,
            borderRadius: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '4rem',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            overflow: 'hidden'
          }}
        >
          {caseStudy.images && caseStudy.images.length > 0 ? (
            <img 
              src={caseStudy.images[0]} 
              alt={caseStudy.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '60vh',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          ) : (
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.5rem',
              fontWeight: 200,
              color: 'rgba(255, 255, 255, 0.1)'
            }}>
              [Project Hero Image]
            </span>
          )}
        </motion.div>
      </section>

      <section style={{ padding: '2rem 8vw 4rem' }}>
        {[
          { title: 'The Challenge', content: caseStudy.challenge },
          { title: 'The Process', content: caseStudy.process },
          { title: 'The Outcome', content: caseStudy.outcome }
        ].map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ 
            display: 'grid', 
            gridTemplateColumns: '180px 1fr', 
            gap: '4rem',
            marginBottom: i < 2 ? '4rem' : 0,
            paddingBottom: i < 2 ? '4rem' : 0,
            borderBottom: i < 2 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none'
          }}>
            <h3 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: ACCENT_SECONDARY
            }}>
              {section.title}
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.7)',
              lineHeight: 1.8
            }}>
              {section.content}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Additional Images Gallery */}
      <section style={{ padding: '2rem 4vw 4rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {caseStudy.images && caseStudy.images.length > 1 ? (
            caseStudy.images.slice(1).map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 60, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  overflow: 'hidden',
                  background: 'rgba(255, 255, 255, 0.02)'
                }}
              >
                <img 
                  src={img} 
                  alt={`${caseStudy.title} - Image ${i + 2}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </motion.div>
            ))
          ) : (
            [1, 2].map((i) => (
              <div key={i} style={{
                height: '300px',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.15)'
                }}>
                  [Process/Result Image {i}]
                </span>
              </div>
            ))
          )}
        </div>
      </section>

      <section style={{ 
        padding: '4rem 8vw',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.4)',
          marginBottom: '0.75rem'
        }}>
          Next Project
        </p>
        <motion.div
          whileHover={{ x: 10 }}
          onClick={() => {
            setSelectedCase(nextCase);
            window.scrollTo(0, 0);
          }}
          style={{ cursor: 'pointer' }}
        >
          <h2 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
            fontWeight: 300,
            color: '#f5f5f5',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {nextCase.title} <span style={{ color: ACCENT }}>→</span>
          </h2>
        </motion.div>
      </section>
    </div>
  );
};

// About Page with full skills from resume
const AboutPage = () => {
  // Full skills list from resume
  const skills = {
    'Research Methods': [
      'User Interviews', 'Usability Testing', 'A/B Testing', 'Survey Design', 
      'Contextual Inquiry', 'Card Sorting', 'Tree Testing', 'Journey Mapping',
      'Persona Development', 'Competitive Analysis', 'Heuristic Evaluation',
      'Diary Studies', 'Focus Groups', 'Analytics Review'
    ],
    'Design': [
      'Interaction Design', 'Visual Design', 'Information Architecture',
      'Wireframing', 'Prototyping', 'Design Systems', 'Responsive Design',
      'Accessibility (WCAG)', 'Motion Design', 'Brand Identity',
      'Typography', 'Layout Design', 'Icon Design', 'Graphic Design', 'Editorial'
    ],
    'Tools': [
      'Figma', 'Claude', 'ChatGPT', 'Optimal', 'Framer', 'Lovable', 'Unbounce',
      'Nanobanana/AI Imaging', 'Adobe Creative Suite', 'Sketch',
      'Maze', 'Sprig', 'UserTesting', 'Hotjar',
      'Mural', 'Miro', 'Notion', 'Jira', 'Confluence',
      'Webflow', 'Wordpress', 'Shopify', 'HTML/CSS', 'Docker'
    ],
    'Collaboration': [
      'Agile/Scrum', 'Design Sprints', 'Stakeholder Management',
      'Cross-functional Teams', 'Workshop Facilitation', 'Presentation',
      'Documentation', 'Mentorship'
    ]
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <section style={{ padding: '3rem 8vw' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}
        >
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: ACCENT_SECONDARY,
              marginBottom: '0.75rem'
            }}>
              About
            </motion.p>
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 200,
              color: '#f5f5f5',
              marginBottom: '2rem',
              lineHeight: 1.15
            }}>
              UX Designer, Researcher,<br />
              <span style={{ color: ACCENT }}>& Creative Strategist</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: 1.8,
              marginBottom: '1.25rem'
            }}>
              I'm a senior UX researcher and UI designer with 10 years of multimedia digital 
              design experience and advanced academic training (MA in UX Design & Research, 
              BFA in Graphic Design, BS in Human Development). I've led UX/UI design across 
              major DoD programs—including Navy Surface AIC, USMC MAWTS, XLUUV mission planning, 
              UAE Patriot C2 systems, and the Air Force's Skypatch talent-management platform—guiding 
              projects from discovery through launch in 9–12-month cycles.
            </motion.p>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: 1.8,
              marginBottom: '1.25rem'
            }}>
              My work spans operator workflows, scenario-planning tools, training interfaces, 
              and enterprise readiness dashboards, consistently transforming legacy systems 
              into intuitive, mission-ready digital products. I blend research rigor, visual 
              craftsmanship, and operational understanding to deliver UX systems that strengthen 
              user performance and organizational effectiveness.
            </motion.p>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: 1.8,
              marginBottom: '2rem'
            }}>
              My expertise includes AI-driven training acceleration tools, Air Intercept Controller 
              simulation training, and cloud-based software solutions. I thrive in agile environments, 
              collaborating with multidisciplinary teams to bring digital products from concept to execution.
            </motion.p>

            {/* LeadAFI Feature Link */}
            <motion.div variants={fadeUp} style={{
              padding: '1.25rem 1.5rem',
              background: `linear-gradient(135deg, ${ACCENT}10, rgba(99, 102, 241, 0.05))`,
              border: `1px solid ${ACCENT}30`,
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: ACCENT,
                marginBottom: '0.5rem'
              }}>
                Featured In
              </p>
              <a 
                href="https://leadafi.com/executive-biography/ashlyn-cassity-ux-designer-researcher-and-creative-strategist/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  color: '#f5f5f5',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                LeadAFI Executive Biography →
              </a>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              style={{ marginBottom: '2rem' }}>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '1rem'
              }}>
                Education
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'MPS in UX Design & Research — Maryland Institute College of Art',
                  'BFA in Graphic Design — University of Utah',
                  'BS in Human Development & Family Studies — University of Utah'
                ].map((item, i) => (
                  <li key={i} style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    padding: '0.6rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                  }}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Recognition */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '1rem'
              }}>
                Recognition
              </h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  { year: '2024', title: 'Team Champion Award — Intrinsic' },
                  { year: '2022', title: 'Best Digital Graphic Design Specialist — MuteSix' },
                  { year: '2019', title: 'Utah Museum of Fine Arts Scholarship' },
                  { year: '2018', title: 'First Place "Epics" Prize Best Page Design — Daily Utah Chronicle' }
                ].map((item, i) => (
                  <li key={i} style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    color: 'rgba(255, 255, 255, 0.6)',
                    padding: '0.6rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    gap: '1rem'
                  }}>
                    <span style={{ color: ACCENT, minWidth: '40px', fontWeight: 500 }}>{item.year}</span>
                    {item.title}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              style={{
              height: '400px',
              borderRadius: '24px',
              overflow: 'hidden',
              marginBottom: '2.5rem',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <img
                src="/images/envato-labs-image-edit.jpg"
                alt="Ashlyn Cassity"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block'
                }}
              />
            </motion.div>

            {/* Full Skills & Tools from Resume */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '1.25rem'
              }}>
                Skills & Tools
              </h3>
              
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} style={{ marginBottom: '1.5rem' }}>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    color: '#f5f5f5',
                    marginBottom: '0.6rem'
                  }}>
                    {category}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {items.map((skill, i) => (
                      <span key={i} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.7rem',
                        color: 'rgba(255, 255, 255, 0.5)',
                        padding: '0.35rem 0.65rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderRadius: '100px',
                        border: '1px solid rgba(255, 255, 255, 0.06)'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Clients */}
      <section style={{ 
        padding: '5rem 8vw',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.p variants={fadeUp} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.4)',
            marginBottom: '2rem',
            textAlign: 'center'
          }}>
            Trusted By
          </motion.p>
          <motion.div variants={fadeUp}>
            <ClientLogos />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

// Contact Page - EMAIL HIDDEN, form will send to it (TODO: connect form submission)
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  // TODO: Connect form to send emails to ashlyn.e.cassity@gmail.com
  const handleSubmit = (e) => {
    e.preventDefault();
    // Future: integrate with Formspree, Netlify Forms, or custom backend
    // Target email: ashlyn.e.cassity@gmail.com
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px' }}>
      <section style={{ padding: '3rem 8vw' }}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }}
        >
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: ACCENT,
              marginBottom: '0.75rem'
            }}>
              Get in Touch
            </motion.p>
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(2rem, 4.5vw, 3rem)',
              fontWeight: 200,
              color: '#f5f5f5',
              marginBottom: '1.5rem',
              lineHeight: 1.15
            }}>
              Let's build something<br />
              <span style={{ color: ACCENT }}>meaningful together</span>
            </motion.h1>

            <motion.p variants={fadeUp} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              color: 'rgba(255, 255, 255, 0.6)',
              lineHeight: 1.8,
              marginBottom: '2.5rem'
            }}>
              Whether you're looking to improve an existing product, launch something new, 
              or need strategic UX consultation for your enterprise team, I'd love to hear 
              about your project.
            </motion.p>

            <motion.div variants={fadeUp}>
              <h3 style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '1rem'
              }}>
                Connect
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a href="https://www.linkedin.com/in/ashlyn-cassity/" target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none'
                }}>
                  LinkedIn →
                </a>
                <a href="https://www.behance.net/ashlyncassity" target="_blank" rel="noopener noreferrer" style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none'
                }}>
                  Behance →
                </a>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3 style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.4)',
                  marginBottom: '0.6rem'
                }}>
                  Location
                </h3>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.6)'
                }}>
                  Salt Lake City, UT<br />
                  Available for remote collaboration
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp}>
            {!submitted ? (
              <form onSubmit={handleSubmit} style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '24px',
                padding: '2.5rem'
              }}>
                {['name', 'email'].map((field) => (
                  <div key={field} style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'rgba(255, 255, 255, 0.4)',
                      display: 'block',
                      marginBottom: '0.6rem'
                    }}>
                      {field === 'email' ? 'Your Email' : 'Name'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '0.875rem 1rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '12px',
                        color: '#f5f5f5',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.95rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                ))}

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.4)',
                    display: 'block',
                    marginBottom: '0.6rem'
                  }}>
                    Message
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    style={{
                      width: '100%',
                      padding: '0.875rem 1rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      color: '#f5f5f5',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.95rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <GlowButton style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message →
                </GlowButton>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '24px',
                  padding: '4rem 2.5rem',
                  textAlign: 'center'
                }}
              >
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.75rem',
                  fontWeight: 300,
                  color: '#f5f5f5',
                  marginBottom: '0.75rem'
                }}>
                  Thank you!
                </p>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  color: 'rgba(255, 255, 255, 0.5)'
                }}>
                  I'll be in touch within 24-48 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive 3D Element */}
      <section style={{ padding: '2rem 0 4rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            height: '500px',
            overflow: 'hidden'
          }}
        >
          <iframe
            src="https://my.spline.design/glowbubbleslgw02-53xT7Mhd6w80eqD6wua7tYrm/"
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            title="Interactive 3D Element"
          />
        </motion.div>
      </section>
    </div>
  );
};
const Footer = () => (
  <motion.footer
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{
    padding: '2.5rem 8vw',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }}>
    <p style={{
      fontFamily: "'Inter', sans-serif",
      fontSize: '0.8rem',
      color: 'rgba(255, 255, 255, 0.3)'
    }}>
      © Ashlyn Cassity 2026
    </p>
    <div style={{ display: 'flex', gap: '2rem' }}>
      <a href="https://www.linkedin.com/in/ashlyn-cassity/" target="_blank" rel="noopener noreferrer" style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.8rem',
        color: 'rgba(255, 255, 255, 0.4)',
        textDecoration: 'none'
      }}>
        LinkedIn
      </a>
      <a href="https://www.behance.net/ashlyncassity" target="_blank" rel="noopener noreferrer" style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.8rem',
        color: 'rgba(255, 255, 255, 0.4)',
        textDecoration: 'none'
      }}>
        Behance
      </a>
    </div>
  </motion.footer>
);

// Main App
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCase, setSelectedCase] = useState(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedCase]);

  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#08080a',
      color: '#f5f5f5',
      fontFamily: "'Inter', sans-serif",
      position: 'relative'
    }}>
      {/* Cursor-following radial gradient */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(129, 19, 137, 0.15), rgba(232, 106, 51, 0.08) 40%, rgba(218, 165, 32, 0.04) 60%, transparent 80%)`,
        transition: 'background 0.3s ease'
      }} />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(232, 106, 51, 0.3); }
        input:focus, textarea:focus {
          border-color: rgba(232, 106, 51, 0.5) !important;
          box-shadow: 0 0 0 3px rgba(232, 106, 51, 0.1) !important;
        }
        a:hover { 
          background: linear-gradient(90deg, #811389, #D927FF, #E86A33, #DAA520) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1 }}>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HomePage setCurrentPage={setCurrentPage} setSelectedCase={setSelectedCase} />
          </motion.div>
        )}
        {currentPage === 'work' && (
          <motion.div key="work" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WorkPage setCurrentPage={setCurrentPage} setSelectedCase={setSelectedCase} />
          </motion.div>
        )}
        {currentPage === 'case-study' && (
          <motion.div key="case-study" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CaseStudyPage caseStudy={selectedCase} setCurrentPage={setCurrentPage} setSelectedCase={setSelectedCase} />
          </motion.div>
        )}
        {currentPage === 'about' && (
          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AboutPage />
          </motion.div>
        )}
        {currentPage === 'contact' && (
          <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ContactPage />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      </div>
    </div>
  );
}
