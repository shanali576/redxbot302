// ============================================================
//  config.js  —  REDXBOT302 (FIXED: full mode support)
//  Persistent MODE getter/setter + all original config
// ============================================================

try { require('dotenv').config(); } catch (e) { console.warn('[CONFIG] dotenv not available, continuing with process.env as-is:', e.message); }
const { existsSync, readFileSync, writeFileSync, mkdirSync } = require('fs');
const { join } = require('path');

// ── Persistent mode store ─────────────────────────────────────
const MODE_FILE = join(__dirname, 'data', 'mode.json');

function loadMode() {
  try {
    if (existsSync(MODE_FILE)) {
      const data = JSON.parse(readFileSync(MODE_FILE, 'utf-8'));
      const m = (data.mode || '').toLowerCase();
      if (['public', 'groups', 'inbox', 'private', 'self'].includes(m)) return m;
    }
  } catch {}
  // Env fallback, then hard default = public
  return (process.env.MODE || 'public').toLowerCase();
}

function saveMode(mode) {
  try {
    const dir = join(__dirname, 'data');
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(MODE_FILE, JSON.stringify({ mode }, null, 2));
    // Keep global in sync
    global.MODE = mode;
  } catch (e) {
    console.error('[MODE] Save failed:', e.message);
  }
}

// ── Session & pairing ─────────────────────────────────────────
global.SESSION_ID      = process.env.SESSION_ID || 'REDXBOT302~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiME90bC8wKzJ4OUszc2czVk1CK2JxSGN2NHRocjdDdUszLzhrL0lMUWYxQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkNtaEl4bVZVb2JlVmNncGkxRWNaYXVIdUNhdUZzSE1PVTRPSWNtZjduaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0QXE2dFRTeUg3K3BiaGdQUjZVbENRaGRyWGpHcXJ3ajFUK3hsNnpUUFhzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNOG94T2F6RlhoUVNBYloyRy9SQnphdEo0eGhkVVRKYTBRQ2tzM0k2dFFjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllEZFA2aTJzKy95U2p0L2pxeTR6Q3lOUzQwaGxuQUFjWnZwNTBpRzBIV0k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5PV2VXTGhIdGRTUEVPZk1WWTI2Y21sVWRqeXpZYmU2RTJadEVaVS9mUzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0UrdDlZV0Y2SStWZXhHU3pxRzRybWdFYVRWcDlSMk5CTnA4ZmlLNVJFST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaklKZjhHcU9kMTVTMGVkUnc3Sk53NnNNS0crUS9OclpRZzFuY1VjdU1UMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikdqc1RkbXZqajU5Uy93YWRKWkh6VnpKOVZrWVpFdXRxQllEeW5iU0Z2UkJPOXM3TlJxem5McDB6QUNROHNQNmx5Rk5HTEdYRWN2QU1BcCtpTW56NGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIxLCJhZHZTZWNyZXRLZXkiOiJkVG9FMGxPZVNDakR6eHZtcmlHVk03Mm55T0tSaFJsNjArMFArK3lnS1F3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjkyMzA2MDk5OTU3NkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBQzk0MjEyNzY0N0I3MEU2QjhCMkUxMzJEMDk4N0FDMyIsInBhcnRpY2lwYW50IjoiIiwiYWRkcmVzc2luZ01vZGUiOiJwbiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzgxNjc1ODUxfV0sIm5leHRQcmVLZXlJZCI6ODEzLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6ODEzLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IkE0UktQOEZTIiwibWUiOnsiaWQiOiI5MjMwNjA5OTk1NzY6MTBAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxNjcwNzA2NzEwOTM3OTQ6MTBAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLTFNuYlVFRUx2dXlORUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJjZzVJTlRjZmhCWHY3ZmlDTW5IN0R5YmRNZ3BCcDIyeXowZzV1ei9jL0drPSIsImFjY291bnRTaWduYXR1cmUiOiJFTkZrZVpjWEh4a0RzVXRBVzNWYUVKN2MyWmZ3NVBZb25tek5mbG9CcElzSWhrVFoxdkRwa0lEbVhpdkZUdmhDT0xRQzl4SDBvbDRDRVZFVXNRYUtCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoidmxmUjZlczU3ZlJ1SE9TcnZFZnRpZW9qR2hka095dXFpc3F3VXBkeUJna2pRS2ZPN1JxVDJzSGtPT1g5SHowWGFYd1J5R1BMcTNvakNTTk1lUlMvZ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIxNjcwNzA2NzEwOTM3OTQ6MTBAbGlkIiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhJT1NEVTNINFFWNyszNGdqSngrdzhtM1RJS1FhZHRzczlJT2JzLzNQeHAifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBZ0lFZ2dOIn0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc4MTY3NTg0NiwibGFzdFByb3BIYXNoIjoiNFBjVU1sIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFLVjgifQ==';
global.PAIRING_NUMBER  = '+923009842133';

// ── Newsletter JID ────────────────────────────────────────────
global.NEWSLETTER_JID = process.env.NEWSLETTER_JID || '120363426816577327@newsletter';

// ── APIs ──────────────────────────────────────────────────────
global.APIs = {
  xteam:    'https://api.xteam.xyz',
  dzx:      'https://api.dhamzxploit.my.id',
  lol:      'https://api.lolhuman.xyz',
  violetics:'https://violetics.pw',
  neoxr:    'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari:   'https://api.akuari.my.id',
  akuari2:  'https://apimu.my.id',
  nrtm:     'https://fg-nrtm.ddns.net',
  bg:       'http://bochil.ddns.net',
  fgmods:   'https://api-fgmods.ddns.net',
};

global.APIKeys = {
  'https://api.xteam.xyz':        'd90a9e986e18778b',
  'https://api.lolhuman.xyz':     '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id':      'yourkey',
  'https://violetics.pw':         'beta',
  'https://zenzapis.xyz':         'yourkey',
  'https://api-fgmods.ddns.net':  'fg-dylux',
};

// ── Module exports ────────────────────────────────────────────
module.exports = {
  // Bot identity
  BOT_NAME:    process.env.BOT_NAME    || 'REDXBOT302',
  BOT_VERSION: process.env.BOT_VERSION || '7.1.0',
  PREFIX:      process.env.PREFIX      || '.',

  // Owner / sudo
  OWNER_NUM:   process.env.OWNER_NUM || process.env.OWNER_NUMBER || '923009842133',
  OWNER_NAME:  process.env.OWNER_NAME  || 'Abdul Rehman Rajpoot',
  SUDO:        process.env.SUDO
                 ? process.env.SUDO.split(',').map(s => s.trim()).filter(Boolean)
                 : [],

  // ─── MODE ────────────────────────────────────────────────────
  //   public  → everyone (all chats)          DEFAULT
  //   groups  → groups only (owner always passes)
  //   inbox   → private/DM only (owner always passes)
  //   private → owner + sudo only (any chat)
  //   self    → owner ONLY (strictest)
  // ─────────────────────────────────────────────────────────────
  get MODE()    { return loadMode(); },
  set MODE(val) { saveMode(val.toLowerCase()); },

  loadMode,
  saveMode,

  // Legacy / compat
  WARN_COUNT:     3,
  NEWSLETTER_JID: global.NEWSLETTER_JID,
  APIs:           global.APIs,
  APIKeys:        global.APIKeys,

  // Server
  PORT:       process.env.PORT       || 3000,
  SESSION_ID: process.env.SESSION_ID || '',
};
