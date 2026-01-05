import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Command Dashboard', path: '/command-dashboard' },
       { label: 'Fraud Detection', path: '/fraud-detection-form' },
      { label: 'Detection Analytics', path: '/detection-analytics' },
      { label: 'Risk Scoring', path: '/risk-scoring-engine' },
      { label: 'Alert Management', path: '/alert-management-center' },
    ],
    company: [
      { label: 'About Us', path: '/about' },
      { label: 'Careers', path: '/careers' },
      { label: 'Contact', path: '/contact' },
      { label: 'Blog', path: '/blog' },
    ],
    resources: [
      { label: 'Documentation', path: '/docs' },
      { label: 'API Reference', path: '/api' },
      { label: 'Security', path: '/security' },
      { label: 'Compliance', path: '/compliance-reporting' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
      { label: 'Cookie Policy', path: '/cookies' },
      { label: 'GDPR', path: '/gdpr' },
    ],
  };

  const socialLinks = [
    { icon: 'Linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: 'Twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'Github', url: 'https://github.com', label: 'GitHub' },
    { icon: 'Mail', url: 'mailto:contact@fraudguardpro.com', label: 'Email' },
  ];

  const certifications = [
    { name: 'SOC 2 Type II', icon: 'ShieldCheck' },
    { name: 'PCI DSS', icon: 'CreditCard' },
    { name: 'ISO 27001', icon: 'Award' },
    { name: 'GDPR Compliant', icon: 'Lock' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Link to="/homepage" className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary to-secondary shadow-glow">
                <Icon name="Shield" size={28} color="var(--color-accent)" />
              </div>
              <span className="text-xl font-bold text-foreground font-heading">
                FraudGuard Pro
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
              Intelligent fraud detection powered by AI. Protect your business with predictive analytics and real-time threat monitoring.
            </p>
            <div className="flex gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary flex items-center justify-center transition-colors duration-300"
                  aria-label={social?.label}
                >
                  <Icon name={social?.icon} size={18} color="var(--color-foreground)" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 font-heading">Product</h3>
            <ul className="space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 font-heading">Company</h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 font-heading">Resources</h3>
            <ul className="space-y-3">
              {footerLinks?.resources?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 font-heading">Legal</h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.path}>
                  <Link
                    to={link?.path}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {certifications?.map((cert) => (
                <div
                  key={cert?.name}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted"
                >
                  <Icon name={cert?.icon} size={16} color="var(--color-success)" />
                  <span className="text-xs font-medium text-muted-foreground">
                    {cert?.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              © {currentYear} FraudGuard Pro. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;