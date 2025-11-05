/**
 * Mock Persona Data Fixtures
 * Realistic sample personas for development and testing
 */

import { Persona } from "@/types/persona";

export const mockPersonas: Persona[] = [
  {
    id: "persona_001",
    name: "Sarah Chen",
    age: 28,
    occupation: "UX Designer",
    background:
      "Creative professional with 5 years of experience in tech startups. Passionate about making technology accessible to everyone. Based in San Francisco, working remotely for a fintech company.",
    traits: ["empathetic", "creative", "user-focused", "detail-oriented"],
    interests: [
      "design thinking",
      "accessibility",
      "psychology",
      "cognitive science",
    ],
    skills: [
      "Figma",
      "User Research",
      "Prototyping",
      "Information Architecture",
      "Usability Testing",
    ],
    values: ["inclusivity", "innovation", "user-centered design", "empathy"],
    communication_style:
      "Friendly and thoughtful, asks clarifying questions, focuses on user needs",
    personality_type: "INFJ - Advocate",
    goals: [
      "Build products that improve people's lives",
      "Mentor aspiring designers",
      "Lead a design team",
    ],
    challenges: [
      "Balancing creativity with business constraints",
      "Managing stakeholder expectations",
    ],
    relationships: ["Design team", "Product managers", "Developers"],
    metadata: {
      created_at: "2024-11-04T10:00:00Z",
      source_text_blocks: 3,
      source_links: 2,
    },
    raw_data: {
      textBlocks: [
        "Sarah is a UX designer with 5 years of experience...",
        "She's passionate about accessibility and inclusive design...",
      ],
      links: [
        "https://linkedin.com/in/sarah-designer",
        "https://medium.com/@sarah/accessibility-matters",
      ],
    },
  },
  {
    id: "persona_002",
    name: "Marcus Johnson",
    age: 45,
    occupation: "Business Consultant",
    background:
      "20 years of experience helping companies scale from startup to enterprise. Former Fortune 500 executive turned consultant. Specializes in organizational transformation and leadership development.",
    traits: ["strategic", "analytical", "results-driven", "pragmatic"],
    interests: [
      "business strategy",
      "leadership",
      "mentorship",
      "organizational behavior",
    ],
    skills: [
      "Strategic Planning",
      "Team Building",
      "Financial Analysis",
      "Change Management",
      "Executive Coaching",
    ],
    values: [
      "integrity",
      "excellence",
      "continuous improvement",
      "accountability",
    ],
    communication_style:
      "Direct and concise, data-driven, focuses on actionable insights",
    personality_type: "ENTJ - Commander",
    goals: [
      "Help 100 companies achieve sustainable growth",
      "Write a book on modern leadership",
      "Build a consulting firm",
    ],
    challenges: [
      "Adapting traditional methods to modern contexts",
      "Work-life balance",
    ],
    relationships: ["C-suite executives", "Board members", "Entrepreneurs"],
    metadata: {
      created_at: "2024-11-03T14:30:00Z",
      source_text_blocks: 5,
      source_links: 3,
    },
    raw_data: {
      textBlocks: [
        "Marcus has 20 years of experience in business consulting...",
        "Former VP of Operations at a Fortune 500 company...",
      ],
      links: [
        "https://linkedin.com/in/marcus-johnson",
        "https://marcusjohnson.com",
      ],
    },
  },
  {
    id: "persona_003",
    name: "Dr. Elena Rodriguez",
    age: 36,
    occupation: "AI Research Scientist",
    background:
      "Ph.D. in Computer Science from MIT, specializing in machine learning and natural language processing. Currently leading an AI research team at a major tech company. Published over 30 papers in top-tier conferences.",
    traits: ["curious", "methodical", "collaborative", "innovative"],
    interests: [
      "machine learning",
      "natural language processing",
      "ethics in AI",
      "scientific communication",
    ],
    skills: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Research Methodology",
      "Technical Writing",
      "Deep Learning",
    ],
    values: [
      "scientific rigor",
      "open science",
      "ethical AI development",
      "knowledge sharing",
    ],
    communication_style:
      "Precise and academic, enjoys explaining complex topics, asks probing questions",
    personality_type: "INTP - Logician",
    goals: [
      "Advance the field of natural language understanding",
      "Make AI more interpretable and trustworthy",
      "Mentor next generation of researchers",
    ],
    challenges: [
      "Balancing research and practical applications",
      "Addressing AI bias and fairness",
    ],
    relationships: [
      "Research team",
      "Academic collaborators",
      "Industry partners",
    ],
    metadata: {
      created_at: "2024-11-02T09:15:00Z",
      source_text_blocks: 4,
      source_links: 4,
    },
    raw_data: {
      textBlocks: [
        "Dr. Elena Rodriguez is a leading AI researcher...",
        "She completed her Ph.D. at MIT focusing on NLP...",
      ],
      links: [
        "https://scholar.google.com/citations?user=elena",
        "https://twitter.com/elena_ai_research",
      ],
    },
  },
];

/**
 * Generate a mock persona based on input data
 */
export function generateMockPersona(
  input: {textBlocks: string[]; links: string[]}
): Persona {
  // Extract name from first text block if possible
  const firstBlock = input.textBlocks[0] || "";
  const nameMatch = firstBlock.match(/(?:^|\s)([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)/);
  const extractedName = nameMatch ? nameMatch[1] : "John Doe";

  return {
    name: extractedName,
    age: 32,
    occupation: "Professional",
    background: input.textBlocks.join(" ").substring(0, 200) + "...",
    traits: ["analytical", "creative", "detail-oriented", "collaborative"],
    interests: ["technology", "innovation", "continuous learning"],
    skills: ["Problem Solving", "Communication", "Strategic Thinking"],
    values: ["integrity", "excellence", "growth mindset"],
    communication_style: "Clear and professional",
    personality_type: "INTJ - Architect",
    goals: ["Achieve professional excellence", "Make meaningful impact"],
    challenges: ["Work-life balance", "Staying current with trends"],
    relationships: ["Colleagues", "Mentors", "Team members"],
    metadata: {
      created_at: new Date().toISOString(),
      source_text_blocks: input.textBlocks.length,
      source_links: input.links.length,
    },
    raw_data: input,
  };
}
