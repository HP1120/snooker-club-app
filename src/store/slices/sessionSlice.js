import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSessions: {},  // Keyed by tableId
  sessionHistory: [],
  rates: {
    hourly: 200,
    fixed: 500
  }
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    startSession: (state, action) => {
      const { tableId, players, rateType, startTime } = action.payload;
      state.activeSessions[tableId] = {
        players: players.map(name => ({
          name,
          score: 0,
          isWinner: false
        })),
        rateType,
        startTime,
        endTime: null,
        duration: 0,
        status: 'active',
        orders: [],
        totalAmount: 0,
        paymentStatus: 'pending'
      };
    },
    updateScore: (state, action) => {
      const { tableId, playerIndex, score } = action.payload;
      if (state.activeSessions[tableId]) {
        state.activeSessions[tableId].players[playerIndex].score = score;
      }
    },
    determineWinner: (state, action) => {
      const { tableId } = action.payload;
      const session = state.activeSessions[tableId];
      if (session) {
        const maxScore = Math.max(...session.players.map(p => p.score));
        session.players.forEach(player => {
          player.isWinner = player.score === maxScore;
        });
      }
    },
    endSession: (state, action) => {
      const { tableId, endTime, duration, totalAmount } = action.payload;
      const session = state.activeSessions[tableId];
      if (session) {
        session.endTime = endTime;
        session.duration = duration;
        session.totalAmount = totalAmount;
        session.status = 'completed';
        
        // Move to history
        state.sessionHistory.push({
          ...session,
          tableId,
          endTime,
          duration,
          totalAmount
        });
        
        // Remove from active sessions
        delete state.activeSessions[tableId];
      }
    },
    updatePaymentStatus: (state, action) => {
      const { tableId, status } = action.payload;
      const session = state.activeSessions[tableId];
      if (session) {
        session.paymentStatus = status;
      }
    }
  }
});

export const {
  startSession,
  updateScore,
  determineWinner,
  endSession,
  updatePaymentStatus
} = sessionSlice.actions;

export default sessionSlice.reducer; 