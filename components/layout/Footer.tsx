import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Mail, href: 'mailto:hello@vaese.ai', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-border-subtle">
      {/* Top glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(124,92,255,0.4) 40%, rgba(34,211,238,0.2) 60%, transparent)',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Brand */}
          <div>
            <span className="font-display text-xl font-semibold tracking-[0.12em] text-white">
              VAESE
            </span>
            <p className="mt-2 text-sm text-text-muted max-w-xs">
              Building the autonomous layer for the next era of business.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-6" role="list">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-muted hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-border-subtle text-text-muted hover:text-white hover:border-primary/30 transition-all duration-200"
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Vaese AI. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">hello@vaese.ai</p>
        </div>
      </div>
    </footer>
  )
}
