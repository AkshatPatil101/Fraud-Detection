import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const MerchantSection = ({ formData, handleInputChange, errors }) => {
  const merchantCategoryOptions = [
    { value: 'retail', label: 'Retail' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'fashion', label: 'Fashion & Apparel' },
    { value: 'food', label: 'Food & Beverage' },
    { value: 'travel', label: 'Travel & Hospitality' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'services', label: 'Professional Services' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'other', label: 'Other' }
  ];

  const paymentMethodOptions = [
    { value: 'credit_card', label: 'Credit Card' },
    { value: 'debit_card', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank_transfer', label: 'Bank Transfer' },
    { value: 'digital_wallet', label: 'Digital Wallet' },
    { value: 'cryptocurrency', label: 'Cryptocurrency' },
    { value: 'cash', label: 'Cash' },
    { value: 'other', label: 'Other Method' }
  ];

  return (
    <section id="section-merchant" className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-elevation-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-success/10">
          <Icon name="Store" size={20} color="var(--color-success)" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Merchant Details</h2>
          <p className="text-sm text-muted-foreground mt-1">Merchant and payment information</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="Merchant ID"
          type="text"
          name="merchant_id"
          placeholder="MERCH-456789"
          value={formData?.merchant_id}
          onChange={handleInputChange}
          error={errors?.merchant_id}
          required
          description="Unique merchant identifier"
        />

        <Input
          label="Merchant Name"
          type="text"
          name="merchant_name"
          placeholder="TechStore Inc."
          value={formData?.merchant_name}
          onChange={handleInputChange}
          error={errors?.merchant_name}
          required
          description="Registered business name"
        />

        <Select
          label="Merchant Category"
          name="merchant_category"
          options={merchantCategoryOptions}
          value={formData?.merchant_category}
          onChange={(value) => handleInputChange({ target: { name: 'merchant_category', value } })}
          error={errors?.merchant_category}
          required
          searchable
          description="Business category classification"
        />

        <Input
          label="Merchant Country"
          type="text"
          name="merchant_country"
          placeholder="United States"
          value={formData?.merchant_country}
          onChange={handleInputChange}
          error={errors?.merchant_country}
          required
          description="Country of merchant registration"
        />

        <Select
          label="Payment Method"
          name="payment_method"
          options={paymentMethodOptions}
          value={formData?.payment_method}
          onChange={(value) => handleInputChange({ target: { name: 'payment_method', value } })}
          error={errors?.payment_method}
          required
          description="Method used for payment"
          className="md:col-span-2"
        />
      </div>
    </section>
  );
};

export default MerchantSection;