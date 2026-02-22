import { ledgerAxios } from './axios';

export const ledgerAPI = {
  // Get all ledger entries
  getLedger: async () => {
    const response = await ledgerAxios.get('/ledger');
    return response.data;
  },

  // Get participants
  getParticipants: async () => {
    const response = await ledgerAxios.get('/user/participants');
    console.log(response.data);
    return response.data;
  },

  // Add a participant
  addParticipant: async (participantData) => {
    const response = await ledgerAxios.post('/user/add-users', participantData);
    return response.data;
  },

  // Remove a participant
  removeParticipant: async (participantId) => {
    const response = await ledgerAxios.delete(`/participants/${participantId}`);
    return response.data;
  },

  // Add an expense/amount
  addExpense: async (expenseData) => {
    const response = await ledgerAxios.post('/user/add-amount', expenseData);
    return response.data;
  },

  // Get all expenses
  getExpenses: async () => {
    const response = await ledgerAxios.get('/expenses');
    return response.data;
  },

  // Delete an expense
  deleteExpense: async (expenseId) => {
    const response = await ledgerAxios.delete(`/expenses/${expenseId}`);
    return response.data;
  },

  // Get split calculation from backend
  getSplit: async () => {
    const response = await ledgerAxios.get('/split');
    return response.data;
  },

  // Get balances
  getBalances: async () => {
    const response = await ledgerAxios.get('/balances');
    return response.data;
  },

  // Settle up
  settleUp: async (settlementData) => {
    const response = await ledgerAxios.post('/settle', settlementData);
    return response.data;
  },
};

export default ledgerAPI;
