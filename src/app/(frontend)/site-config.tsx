/**
 * Single source of truth for colors, fonts, text sizes, and copy.
 * Edit values here and the whole site updates.
 *
 * Font families themselves are loaded by next/font in layout.tsx — to swap
 * them, edit that file. Everything else lives here.
 */

import type { ReactNode } from 'react'

/* ============================================================================
 * COLORS
 * ========================================================================= */
export const colors = {
  coral: '#EB9586',
  fuchsia: '#BF5665',
  orange: '#E38F53',
  butter: '#F9D89B',
  sage: '#6F7C44',
  mint: '#BBBA9C',
  beige: '#EFE4C5',
  blush: '#F0D2B0',
  pink: '#EEBCAE',
  cream: '#FFFAF0',
  mapSky: '#F2E9D5',
  gateStripe: '#FCE9BE',
  earth: '#394027', // dark text / UI foreground
  error: '#9D3548', // form error text
} as const

/**
 * Injects every color above as a CSS custom property on :root so both
 * stylesheets and tailwind arbitrary values can read them.
 * Rendered once in layout.tsx.
 */
export function ThemeVars() {
  const css = `:root {\n${Object.entries(colors)
    .map(([key, value]) => `  --color-${key}: ${value};`)
    .join('\n')}\n}`
  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

/* ============================================================================
 * FONTS (reference only — swap families in layout.tsx)
 * ========================================================================= */
export const fonts = {
  serif: 'Bodoni Moda', // body text, default
  script: 'Yellowtail', // "Meet us in Montecito", section titles, signatures
}

/* ============================================================================
 * TEXT STYLES — tailwind class strings for the most-tweaked bits
 * ========================================================================= */
export const textStyles = {
  heroTitle:
    'hero-main-title font-script text-7xl leading-[0.9] drop-shadow-md sm:text-8xl',
  heroDate:
    'hero-date mt-3 text-[clamp(1.1rem,2vw,1.6rem)] leading-none tracking-[0.08em] text-white drop-shadow-md',
  heroBody: 'text-xl font-medium leading-[1.4] sm:text-2xl sm:leading-[1.45]',
  heroSignature: 'font-script text-3xl sm:text-4xl',

  gateOverline:
    'mb-2 text-[0.65rem] uppercase tracking-[0.32em] text-[var(--color-sage)] sm:text-xs',
  gateTitle:
    'font-script text-[clamp(3.25rem,10vw,7.4rem)] leading-[0.82] text-[var(--color-orange)]',

  sectionEyebrow: 'eyebrow',
  weekendTitle: 'font-script mt-3 text-7xl text-[var(--color-orange)] sm:text-8xl',
  weekendRow: 'border-b border-[var(--color-earth)]/20 py-4 text-base leading-7 text-[var(--color-earth)] last:border-b-0 sm:text-lg sm:leading-8',

  stayTitle: 'font-script mt-3 text-7xl text-[var(--color-fuchsia)] sm:text-8xl',
  stayBody: 'text-lg leading-8 text-[var(--color-earth)]',

  faqTitle: 'font-script mt-3 text-7xl text-[var(--color-orange)] sm:text-8xl',
  faqQuestion: 'flex w-full items-center justify-between gap-6 py-6 text-left text-lg sm:py-8 sm:text-xl',

  footerScript: 'font-script mt-3 text-3xl text-[var(--color-butter)] sm:text-4xl',

  menuItem: 'text-5xl transition group-hover:translate-x-2 sm:text-7xl',
}

/* ============================================================================
 * CONTENT — all copy that appears on the site
 * ========================================================================= */

export type EventKey = 'welcome' | 'wedding' | 'brunch'

export const content = {
  // SEO / <head>
  seo: {
    title: 'Katie & Ionel · July 31, 2027',
    description: 'Join us in Montecito for our wedding weekend.',
  },

  // Monogram letters (top-left + menu overlay)
  monogram: {
    left: 'K',
    right: 'I',
  },

  // Password gate
  gate: {
    password: 'ktkivi',
    overline: "You're invited",
    title: 'Meet us in Montecito',
    passwordLabel: 'Enter the password to get started:',
    passwordPlaceholder: 'Password',
    wrongPasswordMessage: 'Oops! Check your email for the password',
    headerLeft: 'Katie & Ionel',
    headerRight: '7.31.2027',
  },

  // Hero section
  hero: {
    title: 'Meet us in Montecito',
    date: '7.31.2027',
    body: 'We are thrilled to welcome you to our wedding weekend in our happy place: Santa Barbara, CA. If you are reading this, know that you mean the world to us. We will keep this page updated so check back in with any questions!',
    signature: '— Katie & Ionel',
    rsvpButton: 'RSVP',
    photoAlt: 'Katie and Ionel embracing by the Santa Barbara coast',
  },

  // Header / nav
  header: {
    rsvpButton: 'RSVP',
    backToTopAria: 'Back to top',
    menuAria: 'Open menu',
  },

  // Weekend plan
  weekend: {
    sectionId: 'weekend',
    eyebrow: 'Three days, one big celebration',
    title: 'Weekend Plan',
    mapAlt:
      'Watercolor map of Santa Barbara and Montecito showing the wedding weekend venues',
    schedule: [
      {
        day: 'Friday',
        date: 'July 30, 2027',
        detail: "Welcome party at the Kellers' house on Hodges Lane",
      },
      {
        day: 'Saturday',
        date: 'July 31, 2027',
        detail:
          'Ceremony at All Saints by the Sea, followed by reception at Birnam Wood Golf Club',
      },
      {
        day: 'Sunday',
        date: 'August 1, 2027',
        detail: 'Brunch at La Paloma Café',
      },
    ],
  },

  // Accommodations
  accommodations: {
    sectionId: 'stay',
    eyebrow: 'Where to stay',
    title: 'Accommodations',
    paragraphs: [
      (
        <>
          Hotels in Santa Barbara tend to get expensive during wedding season, so we highly
          recommend getting a jump on hotel booking as soon as possible. Katie and Ionel will be
          staying at{' '}
          <a
            href="https://santabarbarainn.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--color-fuchsia)] underline underline-offset-4"
          >
            Santa Barbara Inn
          </a>{' '}
          and would love to invite our guests to book there as well. After a <em>lot</em> of
          research, we think this hotel does the best job of balancing quality, location, and
          price.
        </>
      ),
      (
        <>
          Another great option (adjacent to Santa Barbara Inn) is{' '}
          <a
            href="https://www.hyatt.com/en-US/hotel/california/mar-monte-hotel/sbaub"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--color-fuchsia)] underline underline-offset-4"
          >
            Mar Monte Hotel
          </a>{' '}
          — perfect if you would like to use Hyatt points! We also love{' '}
          <a
            href="https://www.hotelcalifornian.com/"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-[var(--color-fuchsia)] underline underline-offset-4"
          >
            Hotel Californian
          </a>{' '}
          in the Funk Zone for a top-tier experience.
        </>
      ),
    ] as ReactNode[],
  },

  // FAQ
  faq: {
    sectionId: 'faq',
    eyebrow: 'The little details',
    title: 'FAQ',
    description: "We'll keep this page updated as the weekend gets closer.",
    items: [
      {
        question: 'What is the dress code for the wedding?',
        answer:
          'Summer Formal — long dresses and suits are appropriate. Tuxes are not necessary.' as ReactNode,
      },
      {
        question: 'How should I get to Santa Barbara?',
        answer: (
          <>
            Santa Barbara is a ~5 hour drive from the Bay Area and a ~2 hour drive from LA, so
            driving is a great option for our California-based guests. Otherwise, we recommend
            flying into{' '}
            <a
              href="https://flysba.com/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              SBA
            </a>{' '}
            (the world's cutest airport) or, for long hauls, flying into{' '}
            <a
              href="https://www.flylax.com/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              LAX
            </a>
            . LAX is a 2 hour drive from Santa Barbara, which can be completed in a rental car
            or with the{' '}
            <a
              href="https://sbairbus.com/"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              Santa Barbara Airbus
            </a>{' '}
            shared van service.
          </>
        ) as ReactNode,
      },
    ],
  },

  // Footer
  footer: {
    message: 'See you in Montecito',
    tagline: 'Katie & Ionel · 7.31.2027',
    backToTop: 'Back to top',
  },

  // Side menu
  menu: {
    rsvpButton: 'RSVP',
    closeAria: 'Close menu',
    navigation: [
      { id: 'weekend', label: 'Weekend Plan' },
      { id: 'stay', label: 'Accommodations' },
      { id: 'faq', label: 'FAQ' },
    ],
  },

  // RSVP modal
  rsvp: {
    tagline: 'Katie & Ionel · 7.31.2027',
    closeAria: 'Close RSVP',
    eyebrow: 'Let us know',
    heading: 'Will you join us?',
    description: "Tell us a little about yourself and which events you'll be joining.",
    nameLabel: 'Full name',
    emailLabel: 'Email',
    eventsLegend: 'Which events will you join?',
    notesLabel: 'Dietary or accessibility notes',
    notesOptional: '(optional)',
    sendDefault: 'Send RSVP',
    sendSubmitting: 'Sending…',
    successHeading: 'We got it!',
    successBody:
      "Your RSVP has been saved. We can't wait to celebrate with you in Montecito.",
    successCloseButton: 'Close',
    validationName: 'Please enter your name.',
    validationEmail: 'Please enter a valid email address.',
    networkError: 'Something went wrong. Please try again.',
    events: [
      {
        key: 'welcome' as EventKey,
        label: 'Welcome Party',
        date: 'Friday, July 30, 2027',
        location: "The Kellers' house on Hodges Lane",
      },
      {
        key: 'wedding' as EventKey,
        label: 'Ceremony & Reception',
        date: 'Saturday, July 31, 2027',
        location: 'All Saints by the Sea → Birnam Wood Golf Club',
      },
      {
        key: 'brunch' as EventKey,
        label: 'Farewell Brunch',
        date: 'Sunday, August 1, 2027',
        location: 'La Paloma Café',
      },
    ],
  },
}
