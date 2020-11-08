import { writable, get } from 'svelte/store';
import { APP_NAME, SPA, SPA_HASHBANG, SSR } from '../config/client.config';

const store = {

   appName: APP_NAME,
   spa: SPA,
   spaHashbang: SPA_HASHBANG,
   ssr: SSR,
   path: writable(''),
   read: key => get( store[ key ]),
};

export const {

   appName,
   spa,
   spaHashbang,
   ssr,
   path,
   read,
} = store;
