import React from 'react';
import Icon from '@/components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CertificationsSection = () => {
  const certifications = [
  {
    id: 1,
    name: "SOC 2 Type II",
    issuer: "American Institute of CPAs (AICPA)",
    issueDate: "2024-06-15",
    expiryDate: "2026-06-15",
    status: "Active",
    badge: "https://img.rocket.new/generatedImages/rocket_gen_img_138fe6762-1764670064095.png",
    badgeAlt: "SOC 2 Type II certification badge showing security shield with checkmark on blue background representing service organization control compliance",
    description: "Service Organization Control 2 Type II certification validates our security, availability, processing integrity, confidentiality, and privacy controls",
    scope: "Cloud infrastructure, data processing, and security controls",
    documents: ["SOC 2 Report", "Audit Letter", "Control Matrix"]
  },
  {
    id: 2,
    name: "PCI DSS Level 1",
    issuer: "PCI Security Standards Council",
    issueDate: "2024-03-20",
    expiryDate: "2026-03-20",
    status: "Active",
    badge: "https://img.rocket.new/generatedImages/rocket_gen_img_1929f814f-1764670061561.png",
    badgeAlt: "PCI DSS Level 1 certification badge displaying credit card security symbol with lock icon on professional blue gradient background",
    description: "Payment Card Industry Data Security Standard Level 1 compliance for processing over 6 million transactions annually",
    scope: "Payment processing systems and cardholder data environment",
    documents: ["AOC Document", "SAQ", "ASV Scan Results"]
  },
  {
    id: 3,
    name: "ISO 27001:2022",
    issuer: "International Organization for Standardization",
    issueDate: "2024-09-10",
    expiryDate: "2026-09-10",
    status: "Active",
    badge: "https://img.rocket.new/generatedImages/rocket_gen_img_16de233b7-1764661555596.png",
    badgeAlt: "ISO 27001 certification badge featuring international standards organization logo with security management system symbol on white background",
    description: "Information Security Management System certification demonstrating systematic approach to managing sensitive information",
    scope: "Enterprise information security management and risk assessment",
    documents: ["ISO Certificate", "ISMS Policy", "Risk Assessment"]
  },
  {
    id: 4,
    name: "GDPR Compliance",
    issuer: "European Data Protection Board",
    issueDate: "2024-01-15",
    expiryDate: "Ongoing",
    status: "Active",
    badge: "https://img.rocket.new/generatedImages/rocket_gen_img_1111627e2-1764670065265.png",
    badgeAlt: "GDPR compliance badge showing European Union stars circle with data protection shield icon on blue background representing privacy regulation adherence",
    description: "General Data Protection Regulation compliance framework ensuring data privacy and protection for EU citizens",
    scope: "Data processing, privacy controls, and user rights management",
    documents: ["DPA Agreement", "Privacy Policy", "DPIA Reports"]
  },
  {
    id: 5,
    name: "HIPAA Compliance",
    issuer: "U.S. Department of Health & Human Services",
    issueDate: "2024-05-01",
    expiryDate: "2026-05-01",
    status: "Active",
    badge: "https://img.rocket.new/generatedImages/rocket_gen_img_187c32f31-1764673548953.png",
    badgeAlt: "HIPAA compliance badge displaying medical cross with security shield on professional healthcare blue background representing health information protection",
    description: "Health Insurance Portability and Accountability Act compliance for handling protected health information",
    scope: "Healthcare data processing and electronic health records",
    documents: ["BAA Template", "Security Rule", "Privacy Rule"]
  },
  {
    id: 6,
    name: "FedRAMP Authorized",
    issuer: "U.S. General Services Administration",
    issueDate: "2024-08-20",
    expiryDate: "2026-08-20",
    status: "In Progress",
    badge: "https://img.rocket.new/generatedImages/rocket_gen_img_1ae6d13eb-1764752102925.png",
    badgeAlt: "FedRAMP authorization badge showing US government seal with cloud security symbol on official blue background representing federal cloud compliance",
    description: "Federal Risk and Authorization Management Program authorization for cloud services used by U.S. government agencies",
    scope: "Cloud service offerings for federal government use",
    documents: ["SSP Document", "SAR Report", "POA&M"]
  }];


  const upcomingRenewals = [
  {
    id: 1,
    certification: "PCI DSS Level 1",
    daysUntilExpiry: 90,
    priority: "Medium"
  },
  {
    id: 2,
    certification: "SOC 2 Type II",
    daysUntilExpiry: 180,
    priority: "Low"
  },
  {
    id: 3,
    certification: "ISO 27001",
    daysUntilExpiry: 270,
    priority: "Low"
  }];


  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-foreground">Active Certifications</h2>
              <Button variant="outline" iconName="Plus" iconPosition="left" size="sm">
                Add Certification
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {certifications?.map((cert) =>
              <div key={cert?.id} className="bg-muted rounded-lg p-4 hover:bg-primary/10 transition-colors duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-background">
                      <Image
                      src={cert?.badge}
                      alt={cert?.badgeAlt}
                      className="w-full h-full object-cover" />

                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-base font-semibold text-foreground line-clamp-1">{cert?.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                      cert?.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`
                      }>
                          {cert?.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{cert?.issuer}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{cert?.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={14} />
                      <span>Issued: {cert?.issueDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>Expires: {cert?.expiryDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Icon name="Target" size={14} />
                      <span className="line-clamp-1">Scope: {cert?.scope}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" iconName="Download" fullWidth>
                      Download
                    </Button>
                    <Button variant="ghost" size="sm" iconName="Eye" fullWidth>
                      View
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Upcoming Renewals</h2>
              <Icon name="AlertCircle" size={24} color="var(--color-warning)" />
            </div>
            <div className="space-y-4">
              {upcomingRenewals?.map((renewal) =>
              <div key={renewal?.id} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground line-clamp-2">{renewal?.certification}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                  renewal?.priority === 'High' ? 'bg-error/10 text-error' :
                  renewal?.priority === 'Medium' ? 'bg-warning/10 text-warning' : 'bg-info/10 text-info'}`
                  }>
                      {renewal?.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                    <Icon name="Clock" size={14} />
                    <span>{renewal?.daysUntilExpiry} days until expiry</span>
                  </div>
                  <Button variant="outline" size="sm" iconName="RefreshCw" fullWidth>
                    Start Renewal
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 md:p-6 shadow-lg">
            <h2 className="text-xl font-bold text-foreground mb-4">Certification Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} color="var(--color-success)" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Active</p>
                    <p className="text-xl font-bold text-foreground">5</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Icon name="Clock" size={20} color="var(--color-warning)" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">In Progress</p>
                    <p className="text-xl font-bold text-foreground">1</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} color="var(--color-info)" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Compliance Rate</p>
                    <p className="text-xl font-bold text-foreground">98.5%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default CertificationsSection;