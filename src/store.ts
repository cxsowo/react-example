import immerPlugin from '@rematch/immer';
import { Models } from '@rematch/core';
import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import home from 'pages/Home/store';

export interface RootModel extends Models<RootModel> {
  home: typeof home;
}

const store = init({
  models: {
    home
  } as RootModel,
  plugins: [immerPlugin()]
});

export default store;
export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
