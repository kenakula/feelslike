/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { createBrowserHistory } from 'history';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';

export const browserHistory = createBrowserHistory({ basename: '' });

// export class RouterStore extends BaseRouterStore {
//   history: SynchronizedHistory;
//   params: { [x: string]: string };

//   constructor(history?: History) {
//     super();
//     if (history) {
//       this.history = syncHistoryWithStore(history, this);
//       this.history.subscribe(this.onHistoryChange);
//     }
//     this.params = {};
//   }

//   prevLocation = { ...window.location };

//   onHistoryChange = (location: LocationState): void => {
//     this.params =
//       (qs.parse((location as any).search, {
//         ignoreQueryPrefix: true,
//       }) as any) ?? {};
//     this.prevLocation.pathname = (location as any).pathname;
//     this.prevLocation.search = (location as any).search;
//   };
//   getRoutesPath = (path: string, countBlocks: number): string => {
//     const pathArray: string[] = path.split('/');
//     return `/${pathArray.slice(1, countBlocks + 1).join('/')}`;
//   };
// }

export const routerStore = new RouterStore();
routerStore.history = syncHistoryWithStore(browserHistory, routerStore);
const routerStoreContext = React.createContext(routerStore);
export const useRouterStore = (): RouterStore =>
  React.useContext(routerStoreContext);
