/*****************************************************************************
 *  REDXBOT302 v7.0 ULTRA - Settings                                        *
 *  Owner: Abdul Rehman Rajpoot | +923009842133                              *
 *  GitHub: https://github.com/AbdulRehman19721986/redxbot302               *
 *****************************************************************************/
'use strict';
const fs = require('fs');

let platform = 'local';
if (process.env.RAILWAY_SERVICE_NAME || process.env.RAILWAY_PROJECT_NAME) platform = 'railway';
else if (process.env.DYNO || process.env.HEROKU_APP_NAME) platform = 'heroku';
else if (process.env.RENDER_EXTERNAL_URL) platform = 'render';
else if (process.env.KOYEB_APP_NAME) platform = 'koyeb';
else if (fs.existsSync('/.fly')) platform = 'flyio';

module.exports = {
    // Bot Identity
    botName:    process.env.BOT_NAME    || 'REDXBOT302',
    botDesc:    process.env.BOT_DESC    || '🔥 Advanced WhatsApp Bot v7.0 ULTRA',
    botDp:      process.env.BOT_DP      || 'https://files.catbox.moe/s36b12.jpg',
    version:    '7.0.0',
    description: 'REDXBOT302 v7.0 ULTRA – 500+ Features, 24/7 Online',

    // SINGLE OWNER — Abdul Rehman Rajpoot (no co-owner)
    botOwner:    process.env.BOT_OWNER    || 'Abdul Rehman Rajpoot',
    ownerNumber: process.env.OWNER_NUMBER || '923009842133',
    ownerName:   process.env.OWNER_NAME   || 'Abdul Rehman Rajpoot',
    ownerVideo:  process.env.OWNER_VIDEO  || 'https://files.catbox.moe/sqyj68.mp4',

    // Command
    prefixes:    ['.'],
    commandMode: process.env.COMMAND_MODE || 'public',
    packname:    process.env.PACKNAME     || 'REDXBOT302',
    author:      process.env.AUTHOR       || 'Abdul Rehman Rajpoot',
    timeZone:    process.env.TIMEZONE     || 'Asia/Karachi',

    // Performance
    maxStoreMessages:    parseInt(process.env.MAX_STORE_MESSAGES)  || 20,
    tempCleanupInterval: 20 * 60 * 1000,
    storeWriteInterval:  parseInt(process.env.STORE_WRITE_INTERVAL) || 10000,

    // Socials
    channelLink:    process.env.CHANNEL_LINK   || 'https://whatsapp.com/channel/0029VbCPnYf96H4SNehkev10',
    ytch:           'rootmindtech',
    pairSite:       process.env.PAIR_SITE       || 'https://redxpair3.vercel.app',
    githubRepo:     'https://github.com/AbdulRehman19721986/redxbot302',
    telegramGroup:  'https://t.me/TeamRedxhacker2',
    youtubeChannel: 'https://youtube.com/@rootmindtech',
    whatsappGroup:  process.env.WHATSAPP_GROUP  || 'https://chat.whatsapp.com/LhSmx2SeXX75r8I2bxsNDo',
    channelJid:     process.env.CHANNEL_JID     || '120363405513439052@newsletter',
    welcomeAudio:   'https://files.catbox.moe/voio3f.m4a',
    ownerSongUrl:   'https://files.catbox.moe/voio3f.m4a',
    updateZipUrl:   'https://github.com/AbdulRehman19721986/redxbot302/archive/refs/heads/main.zip',

    // APIs
    giphyApiKey:    process.env.GIPHY_API_KEY   || 'qnl7ssQChTdPjsKta2Ax2LMaGXz303tq',
    openWeatherKey: process.env.OPENWEATHER_KEY || '',

    platform,
};
