import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const UserSection = ({ formData, handleInputChange, handleCheckboxChange, errors }) => {
  const userSegmentOptions = [
    { value: 'premium', label: 'Premium Customer' },
    { value: 'regular', label: 'Regular Customer' },
    { value: 'new', label: 'New Customer' },
    { value: 'vip', label: 'VIP Customer' },
    { value: 'at_risk', label: 'At Risk Customer' }
  ];

  const kycStatusOptions = [
    { value: 'verified', label: 'Verified' },
    { value: 'pending', label: 'Pending Verification' },
    { value: 'not_verified', label: 'Not Verified' },
    { value: 'rejected', label: 'Rejected' }
  ];

  return (
    <section id="section-user" className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-elevation-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-warning/10">
          <Icon name="User" size={20} color="var(--color-warning)" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">User Details</h2>
          <p className="text-sm text-muted-foreground mt-1">Customer profile and behavioral data</p>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-base md:text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="UserCircle" size={18} color="var(--color-muted-foreground)" />
            Account Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="User Signup Date"
              type="date"
              name="user_signup_date"
              value={formData?.user_signup_date}
              onChange={handleInputChange}
              error={errors?.user_signup_date}
              required
              description="Account creation date"
            />

            <Input
              label="User Country"
              type="text"
              name="user_country"
              placeholder="United States"
              value={formData?.user_country}
              onChange={handleInputChange}
              error={errors?.user_country}
              required
              description="User's registered country"
            />

            <Select
              label="User Segment"
              name="user_segment"
              options={userSegmentOptions}
              value={formData?.user_segment}
              onChange={(value) => handleInputChange({ target: { name: 'user_segment', value } })}
              error={errors?.user_segment}
              required
              description="Customer classification"
            />

            <Select
              label="KYC Status"
              name="kyc_status"
              options={kycStatusOptions}
              value={formData?.kyc_status}
              onChange={(value) => handleInputChange({ target: { name: 'kyc_status', value } })}
              error={errors?.kyc_status}
              required
              description="Know Your Customer verification status"
            />
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-base md:text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="Activity" size={18} color="var(--color-muted-foreground)" />
            Transaction History
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Total Transaction Count"
              type="number"
              name="user_total_txn_count"
              placeholder="150"
              value={formData?.user_total_txn_count}
              onChange={handleInputChange}
              error={errors?.user_total_txn_count}
              min="0"
              description="Lifetime transaction count"
            />

            <Input
              label="Total Transaction Amount"
              type="number"
              name="user_total_txn_amount"
              placeholder="25000.00"
              value={formData?.user_total_txn_amount}
              onChange={handleInputChange}
              error={errors?.user_total_txn_amount}
              min="0"
              step="0.01"
              description="Cumulative transaction value"
            />

            <Input
              label="Past Fraud Count"
              type="number"
              name="user_past_fraud_count"
              placeholder="0"
              value={formData?.user_past_fraud_count}
              onChange={handleInputChange}
              error={errors?.user_past_fraud_count}
              min="0"
              description="Number of previous fraud incidents"
            />

            <Input
              label="Days Since Last Transaction"
              type="number"
              name="days_since_last_txn"
              placeholder="5"
              value={formData?.days_since_last_txn}
              onChange={handleInputChange}
              error={errors?.days_since_last_txn}
              min="0"
              description="Days elapsed since last activity"
            />
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-base md:text-lg font-medium text-foreground mb-4 flex items-center gap-2">
            <Icon name="AlertTriangle" size={18} color="var(--color-muted-foreground)" />
            Risk Indicators
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Failed Login Attempts (24h)"
              type="number"
              name="failed_login_attempts_last_24h"
              placeholder="0"
              value={formData?.failed_login_attempts_last_24h}
              onChange={handleInputChange}
              error={errors?.failed_login_attempts_last_24h}
              min="0"
              description="Recent failed authentication attempts"
            />

            <div className="flex items-center h-full pt-8">
              <Checkbox
                label="User Risk Flag"
                description="Mark if user has elevated risk profile"
                checked={formData?.user_risk_flag}
                onChange={handleCheckboxChange}
                name="user_risk_flag"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserSection;