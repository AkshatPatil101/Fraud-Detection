import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TransactionSection = ({ formData, handleInputChange, errors }) => {
  const transactionTypeOptions = [
    { value: 'purchase', label: 'Purchase' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'transfer', label: 'Transfer' },
    { value: 'refund', label: 'Refund' },
    { value: 'payment', label: 'Payment' }
  ];

  const channelOptions = [
    { value: 'web', label: 'Web' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'pos', label: 'Point of Sale' },
    { value: 'atm', label: 'ATM' },
    { value: 'api', label: 'API' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'INR', label: 'INR - Indian Rupee' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' }
  ];

  return (
    <section id="section-transaction" className="bg-card rounded-xl border border-border p-6 md:p-8 shadow-elevation-2">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10">
          <Icon name="CreditCard" size={20} color="var(--color-primary)" strokeWidth={2.5} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Transaction Details</h2>
          <p className="text-sm text-muted-foreground mt-1">Basic transaction information and identifiers</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Input
          label="Transaction ID"
          type="text"
          name="transaction_id"
          placeholder="TXN-2025-001234"
          value={formData?.transaction_id}
          onChange={handleInputChange}
          error={errors?.transaction_id}
          required
          description="Unique identifier for this transaction"
        />

        <Input
          label="User ID"
          type="text"
          name="user_id"
          placeholder="USR-789456"
          value={formData?.user_id}
          onChange={handleInputChange}
          error={errors?.user_id}
          required
          description="Customer account identifier"
        />

        <Input
          label="Transaction Timestamp"
          type="datetime-local"
          name="timestamp"
          value={formData?.timestamp}
          onChange={handleInputChange}
          error={errors?.timestamp}
          required
          description="Date and time of transaction"
        />

        <Input
          label="Transaction Amount"
          type="number"
          name="amount"
          placeholder="1500.00"
          value={formData?.amount}
          onChange={handleInputChange}
          error={errors?.amount}
          required
          min="0"
          step="0.01"
          description="Transaction value in selected currency"
        />

        <Select
          label="Currency"
          name="currency"
          options={currencyOptions}
          value={formData?.currency}
          onChange={(value) => handleInputChange({ target: { name: 'currency', value } })}
          error={errors?.currency}
          required
          searchable
          description="Transaction currency code"
        />

        <Select
          label="Transaction Type"
          name="transaction_type"
          options={transactionTypeOptions}
          value={formData?.transaction_type}
          onChange={(value) => handleInputChange({ target: { name: 'transaction_type', value } })}
          error={errors?.transaction_type}
          required
          description="Category of transaction"
        />

        <Select
          label="Transaction Channel"
          name="channel"
          options={channelOptions}
          value={formData?.channel}
          onChange={(value) => handleInputChange({ target: { name: 'channel', value } })}
          error={errors?.channel}
          required
          description="Platform used for transaction"
          className="md:col-span-2"
        />
      </div>
    </section>
  );
};

export default TransactionSection;