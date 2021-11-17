import React, { useEffect, useState } from 'react';
import TechnicalIssues from './components/TechnicalIssues/TechnicalIssues';
import ThreeBounce from './components/ThreeBounce/ThreeBounce';
import { BootState } from './constants/boot-state';
import {
  MainPageStore,
  MainPageStoreContext,
} from './stores/main-page/mainPageStore';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics } from '@firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { firebaseConfig } from './constants/firebase-config';
import {
  JournalStore,
  JournalStoreContext,
} from './stores/journal-page/JournalStore';
import {
  EditInfoPageStore,
  EditInfoPageStoreContext,
} from './stores/editInfoPage/editInfoPageStore';
const RouterComponent = React.lazy(() => import('./routes/RouterComponent'));

const App = () => {
  const [bootState, setBootState] = useState(BootState.Loading);
  const [mainPageStore, setMainPageStore] = useState<MainPageStore>();
  const [journalPageStore, setJournalPageStore] = useState<JournalStore>();
  const [editInfoPageStore, setEditInfoPageStore] =
    useState<EditInfoPageStore>();
  const loadEnvironment = async () => {
    try {
      const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
      const firebaseAnalitycs = getAnalytics(firebaseApp); // eslint-disable-line
      const firebaseDatabase = getFirestore();
      const firebaseStorage: FirebaseStorage = getStorage();

      const mainPageStore = new MainPageStore(
        firebaseDatabase,
        firebaseStorage,
      );
      const journalPageStore = new JournalStore(mainPageStore);
      const editInfoPageStore = new EditInfoPageStore(firebaseStorage);

      setMainPageStore(mainPageStore);
      setJournalPageStore(journalPageStore);
      setEditInfoPageStore(editInfoPageStore);
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
            <EditInfoPageStoreContext.Provider value={editInfoPageStore}>
              <React.Suspense fallback={<ThreeBounce />}>
                <RouterComponent />
              </React.Suspense>
            </EditInfoPageStoreContext.Provider>
          </JournalStoreContext.Provider>
        </MainPageStoreContext.Provider>
      );
    case BootState.Error:
      return <TechnicalIssues />;
  }
};

export default App;
