import { openDB } from 'idb';

let db;

const initdb = async () => {
  db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
};

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  if (!db) {
    await initdb();
  }
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const result = await store.put({ id: 1, value: content });
  console.log(result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  if (!db) {
    await initdb();
  }
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const items = await store.get(1);
  return items?.value;
};

initdb().catch(err => {
  console.error("Failed to initialize the database:", err);
});
