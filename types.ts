export enum TransactionType {
  CREDIT = 'Credit',
  DEBIT = 'Debit'
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
  proofLink?: string;
}

export interface ImpactStory {
  id: string;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface FinancialSummary {
  totalCollected: number;
  totalSpent: number;
  remainingBalance: number;
}