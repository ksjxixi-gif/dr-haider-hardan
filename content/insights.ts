// Articles. body = array of paragraphs ("## " prefix renders a sub-heading).
// TODO(client): Dr. Haider to review/approve wording before launch.

export type Insight = {
  slug: string
  title: string
  category: string
  date: string // ISO
  excerpt: string
  cover?: { src: string; w: number; h: number; alt: string }
  body: string[]
}

export const insights: Insight[] = [
  {
    slug: 'science-behind-the-biefeld-brown-effect',
    title: 'The Science Behind the Biefeld–Brown Effect',
    category: 'Energy & Physics',
    date: '2026-11-01',
    excerpt: 'Real patent, real physics, and some unanswered questions. What an asymmetric capacitor teaches us about curiosity and evidence.',
    cover: {
      src: '/images/insight-biefeld-brown.webp',
      w: 1358,
      h: 1158,
      alt: 'Illustration of the Biefeld–Brown effect with Thomas Townsend Brown’s patent and Dr. Haider Hardan',
    },
    body: [
      'In the 1920s, the American researcher Thomas Townsend Brown noticed something unusual. When a high voltage was applied across an asymmetric capacitor, the device seemed to move by itself in one direction. The observation became known as the Biefeld–Brown effect, and Brown went on to patent devices based on it, including his “Electrokinetic Apparatus” in 1960.',
      '## What is actually happening?',
      'Most physicists today explain the effect through electrohydrodynamics, often called “ionic wind”. The strong electric field ionises the surrounding air, the ions are pulled toward the other electrode, and they collide with neutral air molecules on the way. Those collisions push air in one direction, and the device moves the opposite way.',
      'The key test is vacuum. If the thrust comes from air, it should largely disappear when there is no air to push, and most controlled experiments in vacuum report exactly that.',
      '## Why it still matters',
      'Ionic wind is not science fiction. The same principle has flown a solid-state, propeller-free model aircraft and is being studied for silent cooling, air movement and propulsion. Some open questions remain about efficiency and scaling, and those questions are where innovation happens.',
      '## The lesson for innovators',
      'Innovation thrives when curiosity meets scientific evidence. An unusual observation is worth investigating, but only careful measurement separates a real opportunity from a myth. That discipline of questioning boldly and verifying rigorously is exactly how we approach every project at SEEH.',
    ],
  },
  {
    slug: 'create-markets-dont-compete',
    title: 'Why the Next Big Markets Will Be Created, Not Competed For',
    category: 'Business',
    date: '2026-10-15',
    excerpt: 'Saturated markets reward the cheapest. New markets reward the first. Why SEEH builds where nobody is standing yet.',
    body: [
      'Most companies enter markets that already exist. They copy a proven product, cut the price and fight for share. It feels safe, but it is the most expensive way to grow: margins shrink, marketing costs climb, and the winner is usually whoever can afford to lose money the longest.',
      '## The alternative',
      'The other path is to create the market. Find a need nobody is properly serving, or combine technologies in a way nobody has tried, and you stop competing on price. You compete on being first, and being first is where the long-term value is.',
      '## How we apply it',
      'At SEEH we look for unconventional angles across clean energy, artificial intelligence and health. We evaluate them honestly, protect the intellectual property, and then build the partnerships needed to manufacture and scale. The goal is not to be slightly better than an existing product. The goal is to give the market something it did not have yet.',
      '## An invitation',
      'This approach only works with partners who can see an opportunity early: investors, manufacturers, technology companies and research institutions. If that is you, we should talk.',
    ],
  },
]

export const getInsight = (slug: string) => insights.find((i) => i.slug === slug)
