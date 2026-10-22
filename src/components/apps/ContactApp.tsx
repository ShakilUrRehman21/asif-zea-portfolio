import React, { useState } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  FingerprintPattern,
  Globe,
  Mail,
  Phone,
  Send,
  Shield
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Reveal, SectionHead, Tag } from '../ui';
import { sound } from '../../utils/audio';

const LinkedInMark: React.FC = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ContactApp: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [draftOpened, setDraftOpened] = useState(false);

  const copyValue = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement('textarea');
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      document.body.removeChild(area);
    }
    sound.playEnterBeep();
    setCopied(key);
    window.setTimeout(() => setCopied((current) => (current === key ? null : current)), 2200);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Security engagement enquiry — ${form.name || 'Portfolio'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    sound.playChirp();
    setDraftOpened(true);
  };

  const update = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));

  return (
    <div className="app">
      <SectionHead
        index="10"
        eyebrow="Channel"
        title="Let's talk"
        accent="security."
        description="Available for application security reviews, penetration testing, red-team planning and technical consultations. Direct channels, no gatekeepers."
        meta={
          <div className="tag-row">
            <Tag tone="acid">
              <span className="live-dot" /> Open to engagements
            </Tag>
            <Tag>Replies within 24–48 hours</Tag>
            <Tag>New Delhi · IN</Tag>
          </div>
        }
      />

      <div className="contact-grid">
        <Reveal>
          <div className="panel panel--interactive is-acid contact-card" style={{ height: '100%' }}>
            <div className="contact-card__top">
              <span className="contact-card__label">Primary email</span>
              <Mail size={15} className="contact-card__icon" />
            </div>
            <div className="contact-card__value">{PERSONAL_INFO.email}</div>
            <div className="contact-card__desc">Direct inbox for security and consulting enquiries.</div>
            <div className="contact-card__actions">
              <a className="btn btn--sm btn--primary" href={`mailto:${PERSONAL_INFO.email}`}>
                <Mail size={12} /> Compose
              </a>
              <button
                type="button"
                className="btn btn--sm"
                onClick={() => copyValue(PERSONAL_INFO.email, 'email')}
              >
                {copied === 'email' ? <Check size={12} /> : <Copy size={12} />}
                {copied === 'email' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <div className="panel panel--interactive is-acid contact-card" style={{ height: '100%' }}>
            <div className="contact-card__top">
              <span className="contact-card__label contact-card__label--amber">Phone</span>
              <Phone size={15} className="contact-card__icon" />
            </div>
            <div className="contact-card__value">{PERSONAL_INFO.phone}</div>
            <div className="contact-card__desc">Direct mobile — India standard time, 09:00–20:00.</div>
            <div className="contact-card__actions">
              <a className="btn btn--sm" href={`tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}`}>
                <Phone size={12} /> Call direct
              </a>
              <button
                type="button"
                className="btn btn--sm"
                onClick={() => copyValue(PERSONAL_INFO.phone, 'phone')}
              >
                {copied === 'phone' ? <Check size={12} /> : <Copy size={12} />}
                {copied === 'phone' ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="panel panel--interactive is-acid contact-card" style={{ height: '100%' }}>
            <div className="contact-card__top">
              <span className="contact-card__label contact-card__label--cyan">Professional network</span>
              <span className="contact-card__icon">
                <LinkedInMark />
              </span>
            </div>
            <div className="contact-card__value">{PERSONAL_INFO.linkedinDisplay}</div>
            <div className="contact-card__desc">Verified professional profile, experience and endorsements.</div>
            <div className="contact-card__actions">
              <a
                className="btn btn--sm"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open profile <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="panel panel--interactive is-acid contact-card" style={{ height: '100%' }}>
            <div className="contact-card__top">
              <span className="contact-card__label">Research writing</span>
              <Globe size={15} className="contact-card__icon" />
            </div>
            <div className="contact-card__value">{PERSONAL_INFO.mediumDisplay}</div>
            <div className="contact-card__desc">Security write-ups, methodology notes and analysis.</div>
            <div className="contact-card__actions">
              <a
                className="btn btn--sm"
                href={PERSONAL_INFO.medium}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read articles <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <form className="panel contact-form" onSubmit={submit}>
          <div className="contact-form__head">
            <div className="contact-form__title">Send a secure brief</div>
            <span className="tag">Opens your mail client</span>
          </div>

          <div className="contact-form__grid">
            <label className="contact-form__field">
              <span className="contact-form__label">Your name</span>
              <span className="field">
                <input
                  type="text"
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Doe"
                  required
                />
              </span>
            </label>
            <label className="contact-form__field">
              <span className="contact-form__label">Work email</span>
              <span className="field">
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@company.com"
                  required
                />
              </span>
            </label>
          </div>

          <label className="contact-form__field">
            <span className="contact-form__label">Engagement brief</span>
            <span className="field field--area">
              <textarea
                value={form.message}
                onChange={update('message')}
                placeholder="Scope, target surface, timeline — a few lines is enough."
                required
              />
            </span>
          </label>

          <div className="contact-form__actions">
            <button type="submit" className="btn btn--primary">
              <Send size={13} /> Open mail draft
            </button>
            <span className="contact-form__hint">
              Nothing is stored or transmitted by this site.
            </span>
          </div>

          {draftOpened ? (
            <div className="app-note">
              <Check size={12} />
              <span>
                Draft handed off to your mail client. If nothing opened, email{' '}
                {PERSONAL_INFO.email} directly.
              </span>
            </div>
          ) : null}
        </form>
      </Reveal>

      <Reveal>
        <div className="panel pgp">
          <div className="pgp__head">
            <Shield size={12} />
            <span>Verification & references</span>
          </div>
          <div className="pgp__value pgp__value--text">
            <span>
              Credential verification, client references and a PGP public key are available on
              request.
            </span>
            <a
              className="icon-btn"
              href={`mailto:${PERSONAL_INFO.email}?subject=Verification%20request`}
              title="Request verification"
              aria-label="Request verification"
            >
              <Mail size={13} />
            </a>
          </div>
          <div className="pgp__head" style={{ textTransform: 'none', letterSpacing: 0 }}>
            <FingerprintPattern size={11} />
            <span>Always verify key fingerprints out of band before sharing sensitive material.</span>
          </div>
        </div>
      </Reveal>
    </div>
  );
};
