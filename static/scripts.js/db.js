// IndexedDB utility for To-Do App
// Provides: openDB, addUser, getUser, addList, getLists, updateList

const DB_NAME = 'todoAppDB';
const DB_VERSION = 1;
let db;

function openDB() {
    return new Promise((resolve, reject) => {
        if (db) return resolve(db);
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onerror = (e) => reject(e);
        request.onsuccess = (e) => {
            db = e.target.result;
            resolve(db);
        };
        request.onupgradeneeded = (e) => {
            db = e.target.result;
            if (!db.objectStoreNames.contains('users')) {
                db.createObjectStore('users', { keyPath: 'username' });
            }
            if (!db.objectStoreNames.contains('lists')) {
                db.createObjectStore('lists', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

function addUser(user) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('users', 'readwrite');
            tx.objectStore('users').add(user);
            tx.oncomplete = () => resolve();
            tx.onerror = (e) => reject(e);
        });
    });
}

function getUser(username) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('users', 'readonly');
            const req = tx.objectStore('users').get(username);
            req.onsuccess = () => resolve(req.result);
            req.onerror = (e) => reject(e);
        });
    });
}

function addList(list) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('lists', 'readwrite');
            tx.objectStore('lists').add(list);
            tx.oncomplete = () => resolve();
            tx.onerror = (e) => reject(e);
        });
    });
}

function getLists(username) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('lists', 'readonly');
            const store = tx.objectStore('lists');
            const req = store.getAll();
            req.onsuccess = () => {
                // Filter lists by username
                resolve(req.result.filter(l => l.username === username));
            };
            req.onerror = (e) => reject(e);
        });
    });
}

function updateList(list) {
    return openDB().then(db => {
        return new Promise((resolve, reject) => {
            const tx = db.transaction('lists', 'readwrite');
            tx.objectStore('lists').put(list);
            tx.oncomplete = () => resolve();
            tx.onerror = (e) => reject(e);
        });
    });
}

// Export functions for use in other scripts
window.todoDB = { addUser, getUser, addList, getLists, updateList };
