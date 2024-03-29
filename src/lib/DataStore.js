import { writable } from 'svelte/store'
import { invoke } from '@tauri-apps/api/tauri';

/**
 * @typedef {Object} FileInfo
 * @property {string} path - The text property.
 * @property {string} last_backup - The text property.
 */

/**
 * @typedef {Object} Bachy 
 * @property {number} id - The count property.
 * @property {string} name - The count property.
 * @property {string} icon - The count property.
 * @property {string} target - The text property.
 * @property {FileInfo[]} files - The text property.
 */

/**
 * @typedef {Object} BackupFile 
 * @property {string} name - The count property.
 * @property {string} path - The count property.
 * @property {Bachy[]} bachys - The count property.
 */

// export let hasChangedStore = writable(false);

export let selectedStore = writable(-1);

/**
 * @type {import('svelte/store').Writable<(BackupFile|null)>}
 */
export let dataStore = writable(null);

/**
 * @type {Bachy} 
 */
export let defaultBachy = {
    "id": -1,
    "name": '',
    "icon": '',
    "target": '',
    "files": []
};

export async function getDefaultBackupFile() {
    let defaultBackup = await invoke('get_default_command');
    return JSON.parse(defaultBackup);
}

/**
 * Create a new FileInfo
 * @returns {FileInfo}
 */
export function newFileInfo() {
    return { path: "", last_backup: "" }
}

// setup datastore
let newBackup;
getDefaultBackupFile().then(
    (val) => {
        newBackup = val;
        newBackup.name = 'My Backup';
        dataStore.set(newBackup);
    }
).catch(
    (err) => console.log(err)
);
