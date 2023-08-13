import { createModel } from '@rematch/core';
import type { RootModel } from 'src/models';
type Names = 'custom';
type HomeState = {
  // searchResult: array;
  page: number;
  pagesize: number;
  total: number;
};
const home = createModel<RootModel>()({
  state: {
    searchResult: [],
    page: 0,
    pagesize: 20,
    total: 0
  } as HomeState,
  reducers: {
    // increment(state, payload: number) {
    //   return {
    //     count: state.count + payload,
    //     multiplierName: 'custom'
    //   };
    // }
  }
  // effects: (dispatch) => ({
  //   incrementEffect(payload: number, rootState) {
  //     dispatch.count.increment(payload);
  //   }
  // })
});

export default home;
