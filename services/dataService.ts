import { Transaction, ImpactStory, TransactionType } from '../types';
import { MOCK_TRANSACTIONS, MOCK_IMPACT, USE_MOCK_DATA, SHEET_TRANSACTIONS_URL, SHEET_IMPACT_URL } from '../constants';

// Helper to parse CSV string to JSON
const parseCSV = (csvText: string) => {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  
  const result = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // Handle commas inside quotes
    const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
    const currentLine = lines[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g) || lines[i].split(',');

    const obj: any = {};
    headers.forEach((header, index) => {
        let val = currentLine[index] ? currentLine[index].trim() : '';
        val = val.replace(/^"|"$/g, ''); // Remove quotes
        obj[header] = val;
    });
    result.push(obj);
  }
  return result;
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_TRANSACTIONS.map((t, i) => ({
          ...t,
          id: i.toString(),
          type: t.type as TransactionType
        })));
      }, 800);
    });
  }

  try {
    const response = await fetch(SHEET_TRANSACTIONS_URL);
    const text = await response.text();
    const data = parseCSV(text);
    
    return data.map((row: any, index: number) => ({
      id: `trans-${index}`,
      date: row.Date || '',
      description: row.Description || '',
      category: row.Category || 'General',
      amount: parseFloat(row.Amount ? row.Amount.replace(/,/g, '') : '0'),
      type: row.Type === 'Credit' ? TransactionType.CREDIT : TransactionType.DEBIT,
      proofLink: row.ProofLink || undefined
    }));
  } catch (error) {
    console.error("Failed to fetch transactions", error);
    return [];
  }
};

export const fetchImpactStories = async (): Promise<ImpactStory[]> => {
  if (USE_MOCK_DATA) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_IMPACT.map((s, i) => ({ ...s, id: i.toString() })));
      }, 800);
    });
  }

  try {
    const response = await fetch(SHEET_IMPACT_URL);
    const text = await response.text();
    const data = parseCSV(text);
    
    return data.map((row: any, index: number) => ({
      id: `story-${index}`,
      date: row.Date || '',
      title: row.Title || '',
      description: row.Description || '',
      imageUrl: row.ImageUrl || undefined
    }));
  } catch (error) {
    console.error("Failed to fetch impact stories", error);
    return [];
  }
};