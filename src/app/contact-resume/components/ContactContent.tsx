'use client';

import React, { useState } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ExternalLink,
  Send,
  Loader2,
  CheckCircle,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  FileText,
  Phone,
} from 'lucide-react';
import Icon from '@/components/ui/AppIcon';



interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  type: string;
  message: string;
}

const socialLinks = [
  {
    label: 'LinkedIn',
    handle: 'ejiofor-mgboh-01381a334',
    url: 'https://linkedin.com/in/ejiofor-mgboh-01381a334',
    icon: Linkedin,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/20',
    hoverBorder: 'hover:border-blue-400/40',
    note: 'Connect on LinkedIn',
  },
  {
    label: 'GitHub',
    handle: 'mgboh-freddie',
    url: 'https://github.com/mgboh-freddie',
    icon: Github,
    color: 'text-zinc-300',
    bg: 'bg-zinc-800',
    border: 'border-zinc-700',
    hoverBorder: 'hover:border-zinc-500',
    note: 'View code repositories',
  },
  {
    label: 'Email',
    handle: 'mgbohfrederick@mail.com',
    url: 'mailto:mgbohfrederick@mail.com',
    icon: Mail,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    hoverBorder: 'hover:border-emerald-400/40',
    note: 'Usually responds within 24h',
  },
  {
    label: 'Phone',
    handle: '08059931642',
    url: 'tel:08059931642',
    icon: Phone,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    hoverBorder: 'hover:border-cyan-400/40',
    note: 'Available for calls',
  },
];

const faqItems = [
  {
    question: 'Are you available for full-time roles?',
    answer:
      'Yes — I\'m actively looking for data analyst, data engineering, or software engineering roles. I\'m based in Enugu, Nigeria and open to remote opportunities. My availability is immediate.',
  },
  {
    question: 'Are you open to freelance or contract work?',
    answer:
      'Absolutely. I\'m happy to take on data cleaning, analysis, automation, or software engineering projects. Reach out with project details and we can discuss scope and timeline.',
  },
  {
    question: 'What kind of collaboration are you interested in?',
    answer:
      'I\'m especially interested in collaborating on data analytics projects, automation workflows, and software development. I have experience across ICT support, telecommunications, and software engineering.',
  },
  {
    question: 'What is your technical background?',
    answer:
      'I hold a B.Eng. in Electronic and Computer Engineering from the University of Nigeria, Nsukka (2017–2023). I have hands-on experience with Python, pandas, SQL, Excel, Git, networking, and hardware/software support.',
  },
  {
    question: 'What\'s your preferred tech stack?',
    answer:
      'Python with pandas and NumPy for data work, SQL for database queries, Microsoft Excel (Power Query, Pivot Tables) for reporting, and Git/GitHub for version control. I\'m actively expanding my data science skills.',
  },
];

const messageTypes = [
  { value: 'job-opportunity', label: 'Job Opportunity' },
  { value: 'freelance', label: 'Freelance / Contract' },
  { value: 'collaboration', label: 'Collaboration' },
  { value: 'mentorship', label: 'Mentorship' },
  { value: 'feedback', label: 'Project Feedback' },
  { value: 'other', label: 'Other' },
];

export default function ContactContent() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactFormValues>({
    name: '', email: '', subject: '', type: '', message: ''
  });
  const [errors, setErrors] = useState<Partial<ContactFormValues>>({});

  const validate = () => {
    const newErrors: Partial<ContactFormValues> = {};
    if (!formData.name || formData.name.length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.type) newErrors.type = 'Please select a message type';
    if (!formData.subject || formData.subject.length < 5) newErrors.subject = 'Subject must be at least 5 characters';
    if (!formData.message || formData.message.length < 30) newErrors.message = 'Message must be at least 30 characters';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', type: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10 2xl:px-16 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Contact &amp; Resume</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Let&apos;s connect — whether it&apos;s a job, collaboration, or just a chat about data
        </p>
      </div>

      {/* Availability Banner */}
      <div className="mb-8 p-4 rounded-xl bg-emerald-400/5 border border-emerald-400/20 flex items-center gap-3">
        <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse-slow flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-emerald-400">Open to Opportunities</p>
          <p className="text-xs text-zinc-400 mt-0.5">
            Actively looking for data analyst, software engineering, or ICT roles. Based in Enugu, Nigeria. Available immediately.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left: Social + Resume */}
        <div className="space-y-6">
          {/* Social Links */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Find Me Online</h2>
            <div className="space-y-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      flex items-center gap-3 p-3 rounded-xl border transition-all duration-150
                      ${link.bg} ${link.border} ${link.hoverBorder}
                      hover:scale-[1.01] group
                    `}
                  >
                    <div className="w-8 h-8 rounded-lg bg-zinc-900/50 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className={link.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-semibold ${link.color}`}>{link.label}</p>
                      <p className="text-xs text-zinc-400 font-mono truncate">{link.handle}</p>
                      <p className="text-xs text-zinc-600 mt-0.5">{link.note}</p>
                    </div>
                    <ExternalLink size={13} className="text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Resume Download */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
            <div className="flex items-center gap-2 mb-3">
              <FileText size={15} className="text-cyan-400" />
              <h2 className="text-sm font-semibold text-white">Resume</h2>
            </div>
            <div className="p-3.5 rounded-lg bg-zinc-950/50 border border-zinc-800 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-10 rounded-md bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                  <FileText size={14} className="text-zinc-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-zinc-200">Mgboh_Ejiofor_Fredrick_CV.pdf</p>
                  <p className="text-xs text-zinc-500 font-mono">Updated 2025 · 1 page</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['Python', 'Pandas', 'SQL', 'Excel', 'Data Cleaning'].map((tag) => (
                  <span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href="/assets/resume.pdf"
              download="Mgboh_Ejiofor_Fredrick_CV.pdf"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-cyan-400 hover:bg-cyan-300 text-zinc-950 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95"
            >
              <Download size={15} />
              Download Resume (PDF)
            </a>
            <p className="text-xs text-zinc-500 text-center mt-2">
              Available for interviews immediately
            </p>
          </div>

          {/* FAQ */}
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle size={15} className="text-zinc-400" />
              <h2 className="text-sm font-semibold text-white">FAQ</h2>
            </div>
            <div className="space-y-2">
              {faqItems.map((item, i) => (
                <div key={i} className="border border-zinc-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-start justify-between gap-3 p-3.5 text-left hover:bg-zinc-800/40 transition-colors"
                  >
                    <p className="text-xs font-medium text-zinc-300 leading-relaxed">{item.question}</p>
                    {openFaq === i ? (
                      <ChevronUp size={13} className="text-zinc-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown size={13} className="text-zinc-500 flex-shrink-0 mt-0.5" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-3.5 pb-3.5 border-t border-zinc-800">
                      <p className="text-xs text-zinc-400 leading-relaxed pt-3">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="xl:col-span-2">
          <div className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare size={18} className="text-cyan-400" />
              <h2 className="text-base font-semibold text-white">Send a Message</h2>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4">
                  <CheckCircle size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">Message sent!</h3>
                <p className="text-sm text-zinc-400 max-w-xs">
                  Thanks for reaching out. I typically respond within 24 hours. Looking forward to connecting!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Full Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 bg-zinc-950/60 border rounded-xl text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-150 ${errors.name ? 'border-rose-400/60 focus:ring-rose-400/30' : 'border-zinc-700 focus:border-cyan-400/50 focus:ring-cyan-400/20'}`}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Email Address <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 bg-zinc-950/60 border rounded-xl text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-150 ${errors.email ? 'border-rose-400/60 focus:ring-rose-400/30' : 'border-zinc-700 focus:border-cyan-400/50 focus:ring-cyan-400/20'}`}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Type + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="type" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Message Type <span className="text-rose-400">*</span>
                    </label>
                    <select
                      id="type"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className={`w-full px-4 py-3 bg-zinc-950/60 border rounded-xl text-sm text-zinc-200 focus:outline-none focus:ring-1 transition-all duration-150 appearance-none cursor-pointer ${errors.type ? 'border-rose-400/60 focus:ring-rose-400/30' : 'border-zinc-700 focus:border-cyan-400/50 focus:ring-cyan-400/20'}`}
                    >
                      <option value="" className="bg-zinc-900">Select type...</option>
                      {messageTypes.map((t) => (
                        <option key={t.value} value={t.value} className="bg-zinc-900">{t.label}</option>
                      ))}
                    </select>
                    {errors.type && <p className="mt-1.5 text-xs text-rose-400">{errors.type}</p>}
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Subject <span className="text-rose-400">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      placeholder="Data Analyst opening at your company"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className={`w-full px-4 py-3 bg-zinc-950/60 border rounded-xl text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-150 ${errors.subject ? 'border-rose-400/60 focus:ring-rose-400/30' : 'border-zinc-700 focus:border-cyan-400/50 focus:ring-cyan-400/20'}`}
                    />
                    {errors.subject && <p className="mt-1.5 text-xs text-rose-400">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Message <span className="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Hi Fredrick, I came across your portfolio and was impressed by your data cleaning work. We have an opening at..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 bg-zinc-950/60 border rounded-xl text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:ring-1 transition-all duration-150 resize-none ${errors.message ? 'border-rose-400/60 focus:ring-rose-400/30' : 'border-zinc-700 focus:border-cyan-400/50 focus:ring-cyan-400/20'}`}
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>}
                </div>

                <p className="text-xs text-zinc-600"><span className="text-rose-400">*</span> Required fields</p>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-cyan-400 hover:bg-cyan-300 disabled:bg-zinc-700 disabled:text-zinc-500 text-zinc-950 rounded-xl text-sm font-semibold transition-all duration-150 active:scale-95 min-w-[160px]"
                  >
                    {submitting ? (
                      <><Loader2 size={15} className="animate-spin" />Sending...</>
                    ) : (
                      <><Send size={15} />Send Message</>
                    )}
                  </button>
                  <p className="text-xs text-zinc-500">Typically replies within 24 hours</p>
                </div>
              </form>
            )}
          </div>

          {/* Quick contact note */}
          <div className="mt-5 p-4 rounded-xl bg-zinc-900 border border-zinc-800">
            <p className="text-xs text-zinc-400 leading-relaxed">
              <span className="text-zinc-200 font-medium">Prefer email?</span>{' '}
              Reach me directly at{' '}
              <a
                href="mailto:mgbohfrederick@mail.com"
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-mono"
              >
                mgbohfrederick@mail.com
              </a>
              {' '}— I check it every morning and respond same day for job inquiries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}