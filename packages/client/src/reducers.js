import {
  WEB3_NETWORK_ID,
  WEB3_AVAILABLE,
  WEB3_UNLOCK_ACCOUNT,
  WEB3_LOCK_ACCOUNT,
  WEB3_TRST_BALANCE,
  WEB3_CONTRACTS,
  WEB3_USERS_STATS,
  WEB3_CAUSES_STATS,
  UNSTAKE_EXIT,
  UNSTAKE_WARNING,
  UNSTAKE_PENDING,
  UNSTAKE_PENDING_BACKGROUND,
  UNSTAKE_SUCCESS_CACHE,
  UNSTAKE_FAILURE,
  UNSTAKE_SUCCESS,
} from './actions';

const initialState = {
  networkId: 'unknown',
  account: null,
  web3: null,
  trstBalance: '0',
  contracts: {},
  // Loading all stakers info for the leaderboard
  // however, the current design does not show that info
  usersStats: {}, // {<user>: {yourStakes: []}}
  causesStats: {}, // {<stakingId>:{amount, stakers, rank, name, isOnSpring}}
  unstakeProcess: { activity: {} }, // { step, activity }
  unstakeSuccessCache: {}, // { activityId, txHash }
};

function reducers(state = initialState, action) {
  switch (action.type) {
    case WEB3_NETWORK_ID:
      return Object.assign({}, state, {
        networkId: String(action.networkId),
      });
    case WEB3_AVAILABLE:
      return Object.assign({}, state, {
        web3: action.web3,
      });
    case WEB3_UNLOCK_ACCOUNT:
      return Object.assign({}, state, {
        account: action.account,
      });
    case WEB3_LOCK_ACCOUNT:
      return Object.assign({}, state, {
        account: null,
      });
    case WEB3_TRST_BALANCE:
      return Object.assign({}, state, {
        trstBalance: action.trstBalance,
      });
    case WEB3_CONTRACTS:
      return Object.assign({}, state, {
        contracts: action.contracts,
      });
    case WEB3_CAUSES_STATS:
      return Object.assign({}, state, {
        causesStats: action.causesStats,
      });
    case WEB3_USERS_STATS:
      return Object.assign({}, state, {
        usersStats: action.usersStats,
      });
    case UNSTAKE_EXIT:
      return Object.assign({}, state, {
        unstakeProcess: { activity: {} },
      });
    case UNSTAKE_SUCCESS_CACHE:
      return Object.assign({}, state, {
        unstakeSuccessCache: {
          activityId: action.activityId,
          txHash: action.txHash,
        },
      });
    case UNSTAKE_PENDING:
    case UNSTAKE_PENDING_BACKGROUND:
    case UNSTAKE_FAILURE:
    case UNSTAKE_SUCCESS:
    case UNSTAKE_WARNING:
      return Object.assign({}, state, {
        unstakeProcess: {
          step: action.type,
          activity: action.activity,
        },
      });
    default:
      return state;
  }
}

export default reducers;
