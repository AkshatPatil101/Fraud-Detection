import React, { useState } from 'react';
import Icon from '@/components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BatchAssessmentTable = ({ transactions, onAssess }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });

  const getRiskColor = (score) => {
    if (score >= 70) return 'text-red-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRiskBadge = (score) => {
    if (score >= 70) return { label: 'High', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    if (score >= 40) return { label: 'Medium', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    return { label: 'Low', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const filteredTransactions = transactions?.filter(t =>
    t?.transactionId?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    t?.userId?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleSelectAll = (e) => {
    if (e?.target?.checked) {
      setSelectedTransactions(filteredTransactions?.map(t => t?.id));
    } else {
      setSelectedTransactions([]);
    }
  };

  const handleSelectTransaction = (id) => {
    setSelectedTransactions(prev =>
      prev?.includes(id) ? prev?.filter(t => t !== id) : [...prev, id]
    );
  };

  const sortedTransactions = [...filteredTransactions]?.sort((a, b) => {
    if (sortConfig?.direction === 'asc') {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 md:mb-6">
        <h3 className="text-base md:text-lg font-semibold text-foreground">Batch Risk Assessment</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="search"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full sm:w-64"
          />
          <Button
            variant="default"
            onClick={() => onAssess(selectedTransactions)}
            disabled={selectedTransactions?.length === 0}
            iconName="Play"
            iconPosition="left"
          >
            Assess Selected ({selectedTransactions?.length})
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-3">
                <input
                  type="checkbox"
                  checked={selectedTransactions?.length === filteredTransactions?.length && filteredTransactions?.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 rounded border-border bg-muted"
                />
              </th>
              <th className="text-left p-3 text-xs md:text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('transactionId')}>
                <div className="flex items-center gap-2">
                  Transaction ID
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-3 text-xs md:text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('userId')}>
                <div className="flex items-center gap-2">
                  User ID
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-3 text-xs md:text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('amount')}>
                <div className="flex items-center gap-2">
                  Amount
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-3 text-xs md:text-sm font-semibold text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => handleSort('riskScore')}>
                <div className="flex items-center gap-2">
                  Risk Score
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-3 text-xs md:text-sm font-semibold text-muted-foreground">Status</th>
              <th className="text-left p-3 text-xs md:text-sm font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions?.map((transaction) => (
              <tr key={transaction?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedTransactions?.includes(transaction?.id)}
                    onChange={() => handleSelectTransaction(transaction?.id)}
                    className="w-4 h-4 rounded border-border bg-muted"
                  />
                </td>
                <td className="p-3 text-xs md:text-sm text-foreground font-medium">{transaction?.transactionId}</td>
                <td className="p-3 text-xs md:text-sm text-muted-foreground">{transaction?.userId}</td>
                <td className="p-3 text-xs md:text-sm text-foreground font-medium whitespace-nowrap">${transaction?.amount?.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`text-sm md:text-base font-bold ${getRiskColor(transaction?.riskScore)}`}>
                    {transaction?.riskScore}
                  </span>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getRiskBadge(transaction?.riskScore)?.color}`}>
                    {getRiskBadge(transaction?.riskScore)?.label}
                  </span>
                </td>
                <td className="p-3">
                  <Button variant="ghost" size="icon">
                    <Icon name="Eye" size={16} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedTransactions?.length === 0 && (
        <div className="text-center py-8 md:py-12">
          <Icon name="Search" size={48} color="var(--color-muted-foreground)" className="mx-auto mb-4" />
          <p className="text-sm text-muted-foreground">No transactions found matching your search</p>
        </div>
      )}
    </div>
  );
};

export default BatchAssessmentTable;