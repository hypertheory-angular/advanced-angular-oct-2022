import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  routerReducer,
  getSelectors,
  RouterReducerState,
} from '@ngrx/router-store';
export const featureName = 'shared';

export interface SharedState {
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<SharedState> = {
  router: routerReducer,
};

// Step 1  - feature selector
const selectFeature = createFeatureSelector<SharedState>(featureName);

// Step 2 - Get a selector per branch

const selectRouterReducerBranch = createSelector(
  selectFeature,
  (f) => f.router,
);

export const { selectUrl, selectRouteParam, selectRouteParams } = getSelectors(
  selectRouterReducerBranch,
);
