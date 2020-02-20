import AsyncStorageFactory from '@react-native-community/async-storage';
import LegacyStorage from '@react-native-community/async-storage-backend-legacy';

const legacyStorage = new LegacyStorage();

export type StorageModel = {
  auth: {
    token: string;
  };
  navState: string;
};

const storage = AsyncStorageFactory.create<StorageModel>(legacyStorage);

export default storage;

export const saveToken = async (token: string) => {
  await storage.set('auth', token);
};
