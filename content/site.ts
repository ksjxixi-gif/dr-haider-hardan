// Global site content. Edit here; every page reads from this file.

export const site = {
  name: 'SEEH',
  fullName: 'SEEH, Sustainability for Energy & Health',
  tagline: 'Sustainability for Energy & Health',
  url: 'https://seeh.company',
  founder: 'Dr. Haider N. Hardan',
  location: 'Amman, Jordan',
  email: 'drhaider@seeh.company',
  description:
    'Dr. Haider N. Hardan, entrepreneur, inventor and founder of SEEH, develops ventures, products and technologies in clean energy, artificial intelligence and health for global markets.',
  socials: {
    linkedin: 'https://www.linkedin.com/in/dr-haider-n-hardan-352517180/',
    x: 'https://x.com/DrHaiderHardan1',
    instagram: 'https://www.instagram.com/drhaiderhardan',
    facebook: 'https://www.facebook.com/share/1Hw5rGUQ24/',
  },
}

export const nav = [
  { href: '/about', label: 'About' },
  { href: '/innovation', label: 'Innovation' },
  { href: '/projects', label: 'Projects' },
  { href: '/investment', label: 'Investment' },
  { href: '/partnerships', label: 'Partnerships' },
  { href: '/insights', label: 'Insights' },
] as const

export const sectors = [
  {
    key: 'energy',
    title: 'Clean & Renewable Energy',
    short: 'Clean Energy',
    body: 'A multi-technology energy system that combines solar and other renewable sources with artificial intelligence to raise efficiency and output while cutting cost and environmental impact.',
  },
  {
    key: 'ai',
    title: 'Artificial Intelligence & Technology',
    short: 'Artificial Intelligence',
    body: 'Intelligent applications and new concepts for commercial, industrial and service use, including smart solutions for businesses and facilities.',
  },
  {
    key: 'health',
    title: 'Health & Healthy Nutrition',
    short: 'Health & Nutrition',
    body: 'Food products and technologies for healthy nutrition, weight management and appetite control, grounded in research and development.',
  },
  {
    key: 'inventions',
    title: 'Inventions & Product Development',
    short: 'Inventions',
    body: 'New products, devices and solutions carried from first concept through research, evaluation, development and manufacturing to market, with intellectual property protected along the way.',
  },
  {
    key: 'business',
    title: 'Consulting & Business Development',
    short: 'Business Development',
    body: 'Creative, unconventional solutions to real problems, and new markets opened instead of competing in saturated ones.',
  },
] as const

export type SectorKey = (typeof sectors)[number]['key']

export const process = [
  { title: 'Idea', body: 'Spotting unmet needs and the unconventional angle others miss.' },
  { title: 'Research', body: 'Market, technical and intellectual-property landscape study.' },
  { title: 'Evaluation', body: 'Feasibility, economics and risk, tested honestly before money is spent.' },
  { title: 'Development', body: 'Prototyping, testing and iteration with the right specialists.' },
  { title: 'Manufacturing', body: 'Industrial partners and a production path that can scale.' },
  { title: 'Market', body: 'Commercial launch, licensing and international growth.' },
] as const

export const audiences = [
  { title: 'Investors', body: 'Early access to ventures with international commercial potential.' },
  { title: 'Manufacturers', body: 'New products ready to be industrialised and brought to scale.' },
  { title: 'Technology partners', body: 'Co-development and integration of emerging technologies.' },
  { title: 'Research & universities', body: 'Joint research, validation and applied development.' },
] as const

export const gallery = [
  {
    src: '/images/aqaba-conference-podium.webp',
    w: 960,
    h: 581,
    alt: 'Dr. Haider Hardan speaking at the 1st Aqaba Dental Conference, Jordan, 2016',
    caption: 'Speaking at the 1st Aqaba Dental Conference & 2nd Mediterranean and Middle East Dental Conference, Aqaba, 2016.',
  },
  {
    src: '/images/trade-fair-medical-devices.webp',
    w: 1125,
    h: 2000,
    alt: 'Dr. Haider Hardan at a medical-device manufacturer’s stand at an international trade fair',
    caption: 'Meeting medical-device manufacturers at an international trade exhibition.',
  },
  {
    src: '/images/poster-endodontic-1.webp',
    w: 960,
    h: 720,
    alt: 'Dr. Haider Hardan beside his invention poster at a scientific conference',
    caption: 'Presenting the Rubber Balloon Endodontic Obturation invention at a scientific conference.',
  },
  {
    src: '/images/poster-endodontic-2.webp',
    w: 720,
    h: 960,
    alt: 'Dr. Haider Hardan with a colleague at his invention poster',
    caption: 'Discussing the invention and its injection device with fellow specialists.',
  },
  {
    src: '/images/event-dinner.webp',
    w: 1280,
    h: 720,
    alt: 'Dr. Haider Hardan with a colleague at a professional event',
    caption: 'With colleagues at a professional gathering.',
  },
  {
    src: '/images/event-lecture.webp',
    w: 960,
    h: 720,
    alt: 'Dr. Haider Hardan with a colleague after a lecture',
    caption: 'After a lecture and knowledge-exchange session.',
  },
  {
    src: '/images/trade-fair-manufacturers.webp',
    w: 1125,
    h: 2000,
    alt: 'Dr. Haider Hardan with an industrial manufacturer at an international trade fair',
    caption: 'Building relationships with industrial manufacturers abroad.',
  },
  {
    src: '/images/conference-speaker.webp',
    w: 960,
    h: 720,
    alt: 'Dr. Haider Hardan with an international speaker at a scientific conference',
    caption: 'With an international keynote speaker at a scientific conference.',
  },
] as const
