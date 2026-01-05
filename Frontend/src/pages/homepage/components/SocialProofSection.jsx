import React from 'react';
import Icon from '@/components/AppIcon';

const SocialProofSection = () => {
  const metrics = [
  {
    value: '94.7%',
    label: 'Fraud Reduction Rate',
    description: 'Average fraud prevention improvement',
    icon: 'TrendingDown',
    color: '#00e676'
  },
  {
    value: '87%',
    label: 'False Positive Decrease',
    description: 'Reduction in unnecessary alerts',
    icon: 'CheckCircle',
    color: '#2196f3'
  },
  {
    value: '$12.4M',
    label: 'Average Annual Savings',
    description: 'Cost reduction per enterprise client',
    icon: 'DollarSign',
    color: '#ffd700'
  },
  {
    value: '2.3s',
    label: 'Detection Response Time',
    description: 'Average threat identification speed',
    icon: 'Zap',
    color: '#ff9800'
  }];


  const certifications = [
  { name: 'SOC 2 Type II', icon: 'ShieldCheck', description: 'Security & Compliance' },
  { name: 'PCI DSS Level 1', icon: 'CreditCard', description: 'Payment Security' },
  { name: 'ISO 27001', icon: 'Award', description: 'Information Security' },
  { name: 'GDPR Compliant', icon: 'Lock', description: 'Data Protection' }];


  const testimonials = [
  {
    quote: "FraudGuard Pro reduced our false positives by 89% while catching 99.8% of actual fraud attempts. The ROI was evident within the first quarter.",
    author: "Sarah Chen",
    role: "Chief Security Officer",
    company: "GlobalPay Financial",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fa6f3c24-1763294517102.png",
    avatarAlt: "Professional Asian woman with shoulder-length black hair wearing navy blue business suit with confident smile"
  },
  {
    quote: "The AI-powered detection adapts faster than any solution we\'ve tested. It\'s like having a dedicated fraud team working 24/7 with perfect accuracy.",
    author: "Michael Rodriguez",
    role: "VP of Risk Management",
    company: "SecureBank International",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17c31c353-1763294749604.png",
    avatarAlt: "Hispanic male executive with short dark hair in charcoal gray suit with professional demeanor"
  },
  {
    quote: "Implementation was seamless, and the compliance reporting features saved us hundreds of hours during our last audit. Absolutely transformative.",
    author: "Emily Thompson",
    role: "Director of Compliance",
    company: "FinTech Innovations Ltd",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b24a7c2e-1763296129552.png",
    avatarAlt: "Caucasian woman with blonde hair in elegant black blazer with warm professional smile"
  }];


  return (
    <section className="py-12 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-[#0f1419] to-[#1a237e]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#283593] bg-opacity-30 border border-[#ffd700] border-opacity-30 mb-4 md:mb-6">
            <Icon name="Award" size={16} color="#ffd700" />
            <span className="text-xs md:text-sm text-[#ffd700] font-medium">Proven Results</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            Trusted by <span className="text-[#ffd700]">Industry Leaders</span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto">
            Join hundreds of financial institutions protecting billions in transactions daily
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {metrics?.map((metric, index) =>
          <div
            key={index}
            className="bg-[#1e2328] rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-[#ffd700] hover:border-opacity-50 transition-all duration-300">

              <div className="flex items-center gap-3 mb-4">
                <div
                className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${metric?.color}20` }}>

                  <Icon name={metric?.icon} size={20} color={metric?.color} />
                </div>
                <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">{metric?.value}</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">{metric?.label}</h3>
              <p className="text-xs md:text-sm text-gray-400">{metric?.description}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {certifications?.map((cert, index) =>
          <div
            key={index}
            className="bg-[#1e2328] rounded-xl p-4 md:p-6 border border-gray-800 flex flex-col items-center text-center hover:border-[#00e676] hover:border-opacity-50 transition-all duration-300">

              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#00e676] bg-opacity-10 flex items-center justify-center mb-3 md:mb-4">
                <Icon name={cert?.icon} size={24} color="#00e676" />
              </div>
              <h4 className="text-sm md:text-base font-bold text-white mb-1 md:mb-2">{cert?.name}</h4>
              <p className="text-xs text-gray-400">{cert?.description}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials?.map((testimonial, index) =>
          <div
            key={index}
            className="bg-[#1e2328] rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-[#ffd700] hover:border-opacity-50 transition-all duration-300">

              <div className="flex items-center gap-2 mb-4 md:mb-6">
                {[...Array(5)]?.map((_, i) =>
              <Icon key={i} name="Star" size={16} color="#ffd700" className="fill-current" />
              )}
              </div>
              <p className="text-sm md:text-base text-gray-300 mb-6 md:mb-8 leading-relaxed italic">
                "{testimonial?.quote}"
              </p>
              <div className="flex items-center gap-4">
                <img
                src={testimonial?.avatar}
                alt={testimonial?.avatarAlt}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#ffd700]" />

                <div>
                  <h4 className="text-sm md:text-base font-bold text-white">{testimonial?.author}</h4>
                  <p className="text-xs md:text-sm text-gray-400">{testimonial?.role}</p>
                  <p className="text-xs text-[#ffd700]">{testimonial?.company}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

};

export default SocialProofSection;