import React, { useEffect, useState } from 'react';
import TechnicalIssues from './components/TechnicalIssues/TechnicalIssues';
import ThreeBounce from './components/ThreeBounce/ThreeBounce';
import { BootState } from './constants/boot-state';
import {
  MainPageStore,
  MainPageStoreContext,
} from './stores/main-page/mainPageStore';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from '@firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './constants/firebase-config';
import {
  JournalStore,
  JournalStoreContext,
} from './stores/journal-page/JournalStore';

const RouterComponent = React.lazy(() => import('./routes/RouterComponent'));

const App = () => {
  const [bootState, setBootState] = useState(BootState.Loading);
  const [mainPageStore, setMainPageStore] = useState<MainPageStore>();
  const [journalPageStore, setJournalPageStore] = useState<JournalStore>();

  const loadEnvironment = async () => {
    try {
      const firebaseApp = initializeApp(firebaseConfig);
      const firebaseAnalitycs = getAnalytics(firebaseApp); // eslint-disable-line
      const firebaseDatabase = getFirestore();

      const mainPageStore = new MainPageStore(firebaseDatabase);
      const journalPageStore = new JournalStore(mainPageStore);

      setMainPageStore(mainPageStore);
      setJournalPageStore(journalPageStore);
      mainPageStore.init();

      setBootState(BootState.Success);
    } catch (err) {
      console.log(err);
      setBootState(BootState.Error);
    }
  };

  useEffect(() => {
    loadEnvironment();
  }, []); // eslint-disable-line

  switch (bootState) {
    case BootState.None:
    case BootState.Loading:
      return <ThreeBounce />;
    case BootState.Success:
      return (
        <MainPageStoreContext.Provider value={mainPageStore}>
          <JournalStoreContext.Provider value={journalPageStore}>
            <React.Suspense fallback={<ThreeBounce />}>
              <RouterComponent />
            </React.Suspense>
          </JournalStoreContext.Provider>
        </MainPageStoreContext.Provider>
      );
    case BootState.Error:
      return <TechnicalIssues />;
  }
};

export default App;
