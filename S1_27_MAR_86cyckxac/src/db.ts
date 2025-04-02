import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface UserDB extends DBSchema {
  users: {
    key: string;
    value: { email: string; password: string };
  };
}

let dbPromise: Promise<IDBPDatabase<UserDB>>;

export async function initDB() {
  if (!dbPromise) {
    dbPromise = openDB<UserDB>('user-db', 1, {
      upgrade(db) {
        db.createObjectStore('users', { keyPath: 'email' });
      },
    });
  }
  return dbPromise;
}

export async function addUser(email: string, password: string) {
  const db = await initDB();
  await db.put('users', { email, password });
}

export async function getUser(email: string) {
  const db = await initDB();
  return await db.get('users', email);
}