import { readable, writable, get } from 'svelte/store';
import { APP_NAME, SPA, SPA_HASHBANG, SSR } from '../config/client.cfg';

const store = {

   appName: readable( APP_NAME ),
   spa: readable( SPA ),
   spaHashbang: readable( SPA_HASHBANG ),
   ssr: readable( SSR ),
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
