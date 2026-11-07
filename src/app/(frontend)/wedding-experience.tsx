'use client'

import Image from 'next/image'
import { ArrowRight, Check, ChevronDown, Menu, X } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type SVGProps } from 'react'
import { content, textStyles, type EventKey } from './site-config'

type EventChoices = Record<EventKey, boolean>

const scallopedOvalPath = Array.from({ length: 97 }, (_, index) => {
  const angle = (index / 96) * Math.PI * 2 - Math.PI / 2
  const ripple = 1 + Math.sin(angle * 12) * 0.025
  const x = 36 + Math.cos(angle) * 30 * ripple
  const y = 46 + Math.sin(angle) * 40 * ripple
  return `${index === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`
}).join(' ')

export default function WeddingExperience() {
  const heroRef = useRef<HTMLElement>(null)
  const weekendRef = useRef<HTMLElement>(null)
  const stayRef = useRef<HTMLElement>(null)
  const faqRef = useRef<HTMLElement>(null)
  const [unlocked, setUnlocked] = useState(false)
  const [gateReady, setGateReady] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [rsvpOpen, setRsvpOpen] = useState(false)
  const [overHero, setOverHero] = useState(true)

  useEffect(() => {
    setUnlocked(sessionStorage.getItem('ionel-katie-unlocked') === 'yes')
    setGateReady(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || rsvpOpen || !unlocked ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, rsvpOpen, unlocked])

  useEffect(() => {
    const sections = [heroRef, weekendRef, stayRef, faqRef]
    let animationFrame = 0
    const update = () => {
      for (const ref of sections) {
        const el = ref.current
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const scrollable = Math.max(1, el.offsetHeight - window.innerHeight)
        const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
        el.style.setProperty('--section-progress', String(progress))
      }
      const heroRect = heroRef.current?.getBoundingClientRect()
      if (heroRect) setOverHero(heroRect.bottom > window.innerHeight * 0.5)
      animationFrame = 0
    }
    const request = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [unlocked])

  const enterSite = (event: FormEvent) => {
    event.preventDefault()
    if (password.trim() !== content.gate.password) {
      setPassword('')
      setPasswordError(content.gate.wrongPasswordMessage)
      return
    }
    sessionStorage.setItem('ionel-katie-unlocked', 'yes')
    setPasswordError('')
    setUnlocked(true)
  }

  const navigate = (id: string) => {
    setMenuOpen(false)
    window.setTimeout(() => {
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        return
      }
      const el = document.getElementById(id)
      if (!el) return
      const fullScrollOffset = Math.max(0, el.offsetHeight - window.innerHeight)
      window.scrollTo({
        top: el.offsetTop + fullScrollOffset,
        behavior: 'smooth',
      })
    }, 50)
  }

  return (
    <>
      <div
        className={`gate fixed inset-0 z-[100] grid place-items-center overflow-hidden px-6 transition duration-1000 ${
          gateReady && unlocked ? 'pointer-events-none -translate-y-full opacity-0' : 'opacity-100'
        }`}
        aria-hidden={unlocked}
      >
        <div className="absolute inset-x-6 top-6 flex items-center justify-between text-xs uppercase tracking-[0.28em] sm:inset-x-10">
          <span>{content.gate.headerLeft}</span>
          <span>{content.gate.headerRight}</span>
        </div>
        <div className="gate-medallion relative text-center">
          <div className="w-full max-w-md">
            <p className={textStyles.gateOverline}>{content.gate.overline}</p>
            <h1 className={textStyles.gateTitle}>{content.gate.title}</h1>
            <form onSubmit={enterSite} className="mx-auto mt-6 max-w-xs sm:mt-10">
              <label
                htmlFor="wedding-password"
                className="text-[0.72rem] tracking-[0.08em] text-[var(--color-earth)] sm:text-sm"
              >
                {content.gate.passwordLabel}
              </label>
              <div className="mt-1 flex border-b border-[var(--color-earth)] sm:mt-3">
                <input
                  id="wedding-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent px-1 py-2 text-center outline-none placeholder:text-[var(--color-earth)]/40 sm:py-3"
                  placeholder={content.gate.passwordPlaceholder}
                  autoComplete="current-password"
                  disabled={unlocked}
                />
                <button
                  type="submit"
                  className="grid size-10 place-items-center transition hover:translate-x-1 sm:size-12"
                  aria-label="Enter wedding website"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
              <p
                className="mt-2 min-h-5 text-xs text-[var(--color-error)] sm:mt-3 sm:min-h-6 sm:text-sm"
                role="alert"
              >
                {passwordError}
              </p>
            </form>
          </div>
        </div>
      </div>

      <div
        className={unlocked ? 'opacity-100' : 'pointer-events-none opacity-0'}
        aria-hidden={!unlocked}
      >
        <header
          className={`fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 py-5 transition-colors duration-300 sm:px-10 sm:py-7 ${
            overHero ? 'text-white' : 'text-[var(--color-coral)]'
          }`}
        >
          <button
            onClick={() => navigate('top')}
            className="drop-shadow-sm"
            aria-label={content.header.backToTopAria}
          >
            <Monogram className="h-14 w-11" />
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRsvpOpen(true)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur-sm transition ${
                overHero
                  ? 'border-white/70 bg-white/10 hover:bg-white hover:text-[var(--color-sage)]'
                  : 'border-[var(--color-coral)]/70 bg-white/20 hover:bg-[var(--color-coral)] hover:text-white'
              }`}
            >
              {content.header.rsvpButton}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className={`grid size-10 place-items-center rounded-full border backdrop-blur-sm transition ${
                overHero
                  ? 'border-white/70 bg-white/10 hover:bg-white hover:text-[var(--color-sage)]'
                  : 'border-[var(--color-coral)]/70 bg-white/20 hover:bg-[var(--color-coral)] hover:text-white'
              }`}
              aria-label={content.header.menuAria}
              aria-expanded={menuOpen}
            >
              <Menu size={19} />
            </button>
          </div>
        </header>

        <main id="top">
          <section
            ref={heroRef}
            id="welcome"
            className="relative min-h-[270svh] bg-[var(--color-sage)] text-white"
          >
            <div className="sticky top-0 h-[100svh] overflow-hidden">
              <Image
                src="/images/ionel-katie-hero.webp"
                alt={content.hero.photoAlt}
                fill
                priority
                sizes="100vw"
                className="hero-photo object-cover"
              />

              <div className="hero-title-motion absolute inset-x-4 z-10 text-center sm:inset-x-10">
                <h1 className={textStyles.heroTitle}>{content.hero.title}</h1>
                <p className={textStyles.heroDate}>{content.hero.date}</p>
              </div>

              <div className="hero-copy-motion pointer-events-auto absolute inset-x-0 top-[45svh] z-20 mx-auto max-w-5xl px-4 sm:top-[66svh] sm:px-8">
                <div className="bg-white/60 px-6 py-5 text-[var(--color-fuchsia)] sm:px-10 sm:py-6">
                  <p className={textStyles.heroBody}>{content.hero.body}</p>
                  <div className="mt-4 flex flex-col items-center gap-3 sm:mt-3 sm:flex-row sm:justify-center sm:gap-10">
                    <p className={`${textStyles.heroSignature} text-[var(--color-fuchsia)]`}>
                      {content.hero.signature}
                    </p>
                    <button onClick={() => setRsvpOpen(true)} className="primary-button">
                      {content.hero.rsvpButton} <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            ref={weekendRef}
            id={content.weekend.sectionId}
            className="relative"
            style={{
              backgroundImage: "url('/images/mapbackground.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="px-5 pt-[10svh] pb-6 text-center sm:px-10 sm:pt-[11svh] sm:pb-8">
              <div className="mx-auto w-full max-w-4xl">
                <p className={textStyles.sectionEyebrow}>{content.weekend.eyebrow}</p>
                <h2 className={textStyles.weekendTitle}>{content.weekend.title}</h2>
                <div className="mx-auto mt-6 grid max-w-4xl grid-cols-3 gap-3 sm:mt-8 sm:gap-10">
                  {content.weekend.schedule.map((item) => (
                    <div key={item.day} className="text-center">
                      <p className="text-xs font-semibold text-[var(--color-earth)] sm:text-sm">
                        {item.day}, {item.date}
                      </p>
                      <p className="mt-1.5 text-[0.7rem] leading-snug text-[var(--color-earth)]/80 sm:mt-2 sm:text-sm sm:leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Image
              src="/images/croppedimage.jpg"
              alt={content.weekend.mapAlt}
              width={1536}
              height={1024}
              sizes="100vw"
              className="block h-auto w-full"
            />
          </section>

          <section
            ref={stayRef}
            id={content.accommodations.sectionId}
            className="relative min-h-[200svh]"
          >
            <div className="stripe-soft sticky top-0 h-[100svh] overflow-hidden">
              <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-5 sm:px-10">
                <div className="max-w-3xl">
                  <div className="section-title-motion">
                    <p className={textStyles.sectionEyebrow}>{content.accommodations.eyebrow}</p>
                    <h2 className={textStyles.stayTitle}>{content.accommodations.title}</h2>
                  </div>
                  <div className="section-body-motion mt-8 space-y-5">
                    {content.accommodations.paragraphs.map((paragraph, index) => (
                      <p key={index} className={textStyles.stayBody}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            ref={faqRef}
            id={content.faq.sectionId}
            className="relative min-h-[200svh]"
          >
            <div className="sticky top-0 h-[100svh] overflow-hidden bg-[var(--color-cream)]">
              <div className="mx-auto grid h-full max-w-6xl content-center gap-10 px-5 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
                <div>
                  <div className="section-title-motion">
                    <p className={textStyles.sectionEyebrow}>{content.faq.eyebrow}</p>
                    <h2 className={textStyles.faqTitle}>{content.faq.title}</h2>
                  </div>
                  <p className="section-body-motion mt-6 max-w-sm leading-7 text-[var(--color-earth)]/70">
                    {content.faq.description}
                  </p>
                </div>
                <div className="section-body-motion border-t border-[var(--color-earth)]/25">
                  {content.faq.items.map((item, index) => (
                    <FaqItem
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                      open={index === 0}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[var(--color-fuchsia)] px-5 py-10 text-center text-[var(--color-cream)] sm:px-10 sm:py-14">
          <PoolUmbrella className="mx-auto text-[var(--color-butter)]" size={36} strokeWidth={1.2} />
          <p className={textStyles.footerScript}>{content.footer.message}</p>
          <p className="mt-4 text-xs uppercase tracking-[0.3em]">{content.footer.tagline}</p>
          <button
            onClick={() => navigate('top')}
            className="mt-6 border-b border-white/60 pb-1 text-xs uppercase tracking-[0.2em]"
          >
            {content.footer.backToTop}
          </button>
        </footer>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-[80] bg-[var(--color-sage)] px-6 py-6 text-[var(--color-cream)]"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            <div className="flex items-center justify-between">
              <Monogram className="h-16 w-12 text-[var(--color-butter)]" />
              <button
                onClick={() => setMenuOpen(false)}
                className="grid size-11 place-items-center rounded-full border border-white/50"
                aria-label={content.menu.closeAria}
              >
                <X size={20} />
              </button>
            </div>
            <nav className="my-auto flex flex-col items-start gap-3">
              {content.menu.navigation.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className="group flex items-baseline gap-5 text-left"
                >
                  <span className="text-xs text-[var(--color-butter)]">0{index + 1}</span>
                  <span className={textStyles.menuItem}>{item.label}</span>
                </button>
              ))}
            </nav>
            <button
              onClick={() => {
                setMenuOpen(false)
                setRsvpOpen(true)
              }}
              className="self-start rounded-full bg-[var(--color-butter)] px-7 py-3 text-xs uppercase tracking-[0.2em] text-[var(--color-earth)]"
            >
              {content.menu.rsvpButton}
            </button>
          </div>
        </div>
      )}

      {rsvpOpen && <RsvpModal onClose={() => setRsvpOpen(false)} />}
    </>
  )
}

function PoolUmbrella({
  size = 48,
  strokeWidth = 1.5,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M32 7v4" />
      <path d="M7 29c3-11 13-18 25-18s22 7 25 18" />
      <path d="M7 29c4-5 8-5 12 0 4-5 9-5 13 0 4-5 9-5 13 0 4-5 8-5 12 0" />
      <path d="M32 29v27" />
      <path d="M23 56h18" />
    </svg>
  )
}

function Monogram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 72 92" fill="currentColor" aria-hidden="true">
      <path
        d={`${scallopedOvalPath} Z`}
        fill="none"
        stroke="currentColor"
        strokeWidth="0.65"
        strokeLinejoin="round"
      />
      <text
        x="16"
        y="61"
        fill="currentColor"
        fontFamily="var(--font-bodoni), Georgia, serif"
        fontSize="44"
        fontWeight="500"
      >
        {content.monogram.left}
      </text>
      <text
        x="39"
        y="68"
        fill="currentColor"
        fontFamily="var(--font-bodoni), Georgia, serif"
        fontSize="40"
        fontWeight="500"
      >
        {content.monogram.right}
      </text>
    </svg>
  )
}

function FaqItem({
  question,
  answer,
  open = false,
}: {
  question: string
  answer: React.ReactNode
  open?: boolean
}) {
  const [expanded, setExpanded] = useState(open)
  const id = useId()
  return (
    <div className="border-b border-[var(--color-earth)]/25">
      <button
        onClick={() => setExpanded(!expanded)}
        className={textStyles.faqQuestion}
        aria-expanded={expanded}
        aria-controls={id}
      >
        {question}
        <ChevronDown className={`shrink-0 transition ${expanded ? 'rotate-180' : ''}`} size={20} />
      </button>
      <div
        id={id}
        hidden={!expanded}
        className="max-w-2xl pb-7 leading-7 text-[var(--color-earth)]/70"
      >
        {answer}
      </div>
    </div>
  )
}

function RsvpModal({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [choices, setChoices] = useState<EventChoices>({
    welcome: false,
    wedding: false,
    brunch: false,
  })
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => closeRef.current?.focus(), [])

  const toggle = (key: EventKey) =>
    setChoices((current) => ({ ...current, [key]: !current[key] }))

  const submit = async (event: FormEvent) => {
    event.preventDefault()
    if (name.trim().length < 2) {
      setMessage(content.rsvp.validationName)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage(content.rsvp.validationEmail)
      return
    }
    setStatus('submitting')
    setMessage('')
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          welcome: choices.welcome,
          wedding: choices.wedding,
          brunch: choices.brunch,
          notes: notes.trim(),
        }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok || !data.ok)
        throw new Error(data.message || 'We could not save your RSVP.')
      setStatus('success')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : content.rsvp.networkError)
      setStatus('idle')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] overflow-y-auto bg-[var(--color-earth)]/65 p-0 backdrop-blur-sm sm:p-6"
      role="presentation"
    >
      <div
        className="mx-auto min-h-full max-w-2xl bg-[var(--color-cream)] px-5 py-6 sm:min-h-0 sm:rounded-[2rem] sm:px-10 sm:py-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-title"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-sage)]">
            {content.rsvp.tagline}
          </p>
          <button
            ref={closeRef}
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-[var(--color-earth)]/30"
            aria-label={content.rsvp.closeAria}
          >
            <X size={18} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="grid min-h-[60vh] place-items-center text-center">
            <div>
              <div className="mx-auto grid size-16 place-items-center rounded-full bg-[var(--color-sage)] text-white">
                <Check size={28} />
              </div>
              <h2 id="rsvp-title" className="font-script mt-6 text-7xl text-[var(--color-fuchsia)]">
                {content.rsvp.successHeading}
              </h2>
              <p className="mx-auto mt-4 max-w-md leading-7 text-[var(--color-earth)]/75">
                {content.rsvp.successBody}
              </p>
              <button onClick={onClose} className="primary-button mx-auto mt-8">
                {content.rsvp.successCloseButton}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="py-8 sm:py-10">
            <p className={textStyles.sectionEyebrow}>{content.rsvp.eyebrow}</p>
            <h2
              id="rsvp-title"
              className="font-script mt-3 text-6xl leading-none text-[var(--color-fuchsia)] sm:text-8xl"
            >
              {content.rsvp.heading}
            </h2>
            <p className="mt-5 leading-7 text-[var(--color-earth)]/70">
              {content.rsvp.description}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label>
                <span className="text-sm">{content.rsvp.nameLabel}</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoFocus
                  required
                  className="mt-2 w-full rounded-xl border border-[var(--color-earth)]/20 bg-white px-4 py-3 outline-none focus:border-[var(--color-fuchsia)]"
                />
              </label>
              <label>
                <span className="text-sm">{content.rsvp.emailLabel}</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="mt-2 w-full rounded-xl border border-[var(--color-earth)]/20 bg-white px-4 py-3 outline-none focus:border-[var(--color-fuchsia)]"
                />
              </label>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm">{content.rsvp.eventsLegend}</legend>
              <div className="mt-3 space-y-3">
                {content.rsvp.events.map((item) => {
                  const checked = choices[item.key]
                  return (
                    <label
                      key={item.key}
                      className={`flex cursor-pointer items-start gap-4 rounded-2xl border px-5 py-4 transition ${
                        checked
                          ? 'border-[var(--color-sage)] bg-[var(--color-sage)] text-white'
                          : 'border-[var(--color-earth)]/20 bg-white'
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggle(item.key)}
                      />
                      <span
                        aria-hidden="true"
                        className={`mt-1 grid size-5 shrink-0 place-items-center rounded border ${
                          checked
                            ? 'border-white bg-white text-[var(--color-sage)]'
                            : 'border-[var(--color-earth)]/40'
                        }`}
                      >
                        {checked && <Check size={14} strokeWidth={3} />}
                      </span>
                      <span>
                        <span className="block text-base">{item.label}</span>
                        <span
                          className={`mt-1 block text-xs ${checked ? 'text-white/80' : 'text-[var(--color-earth)]/60'}`}
                        >
                          {item.date} · {item.location}
                        </span>
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <label className="mt-6 block">
              <span className="text-sm">
                {content.rsvp.notesLabel}{' '}
                <span className="text-[var(--color-earth)]/50">{content.rsvp.notesOptional}</span>
              </span>
              <textarea
                maxLength={500}
                rows={3}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="mt-2 w-full resize-none rounded-xl border border-[var(--color-earth)]/20 bg-white px-4 py-3 outline-none focus:border-[var(--color-fuchsia)]"
              />
            </label>

            <p className="mt-5 min-h-7 text-sm text-[var(--color-error)]" role="status">
              {message}
            </p>
            <button
              disabled={status === 'submitting'}
              className="primary-button mt-2 disabled:opacity-60"
            >
              {status === 'submitting' ? content.rsvp.sendSubmitting : content.rsvp.sendDefault}{' '}
              <ArrowRight size={17} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
