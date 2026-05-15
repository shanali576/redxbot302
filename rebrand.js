/*****************************************************************************
 *  REDXBOT302 v7.0 ULTRA — Rebrand Script                                  *
 *  Developed By Abdul Rehman Rajpoot                                        *
 *****************************************************************************/
'use strict';

const fs   = require('fs');
const path = require('path');

const datamainPath = path.join(__dirname, 'datamain.txt');
if (!fs.existsSync(datamainPath)) {
    console.error('❌ datamain.txt not found!');
    process.exit(1);
}
const dm = fs.readFileSync(datamainPath, 'utf8');

function extract(pattern) {
    const m = dm.match(pattern);
    return m ? m[1].trim() : '';
}

const brand = {
    ownerName:       extract(/ownername\s+(.+)/i)                         || 'Abdul Rehman Rajpoot',
    ownerNumber:     extract(/watsapp number owner number\s+([+\d]+)/i)   || '923009842133',
    whatsappGroup:   extract(/watsapp group\s+(https?.+)/i)               || 'https://chat.whatsapp.com/LhSmx2SeXX75r8I2bxsNDo',
    githubRepo:      extract(/botgithub\s+(https?.+)/i)                   || 'https://github.com/AbdulRehman19721986/redxbot302',
    githubMain:      extract(/\* GitHub:\s+(https?.+)/i)                  || 'https://github.com/AbdulRehman19721986/REDXBOT-MD',
    whatsappChannel: extract(/\* WhatsApp Channel:\s+(https?.+)/i)        || 'https://whatsapp.com/channel/0029VbCPnYf96H4SNehkev10',
    telegramGroup:   extract(/\* Telegram Group:\s+(https?.+)/i)          || 'https://t.me/TeamRedxhacker2',
    youtube:         extract(/\* YouTube:\s+(https?.+)/i)                 || 'https://youtube.com/@rootmindtech',
    botDp:           extract(/botdp image\s+(https?.+)/i)                 || 'https://files.catbox.moe/s36b12.jpg',
    channelJid:      extract(/my group news letter id\s*=\s*([^\s]+)/i)   || '120363405513439052@newsletter',
    pairSite:        'https://redxpair3.vercel.app',
};

// All names/numbers to replace with REDXBOT302 / Abdul Rehman Rajpoot
const REPLACEMENTS = [
    // Bot names
    ['MUZAMIL-XD',   'REDXBOT302'],
    ['Muzamil Khan', 'Abdul Rehman Rajpoot'],
    ['Muzamil',      'Abdul Rehman Rajpoot'],
    ['MUZAMIL',      'REDXBOT302'],
    ['muzamil',      'redxbot302'],
    ['MEGA-MD',      'REDXBOT302'],
    ['MEGA MD',      'REDXBOT302'],
    ['MEGA PRO',     'REDXBOT302'],
    ['GlobalTechInfo','REDXBOT302'],
    ['GlobalTechBots','TeamRedxhacker2'],
    ['Qasim Ali',    'Abdul Rehman Rajpoot'],

    // Remove co-owner mentions
    ['co-owner',     'owner'],
    ['coowner',      'owner'],
    ['Co-Owner',     'Owner'],
    ['CoOwner',      'Owner'],

    // Numbers — replace all foreign numbers
    ['923076411099', brand.ownerNumber],
    ['923000000000', brand.ownerNumber],
    ['923051391007', brand.ownerNumber],
    ['923306137477', brand.ownerNumber],
    ['923051391005', brand.ownerNumber],
    ['923183928892', brand.ownerNumber],
    ['61468259338',  brand.ownerNumber],
    ['923213509846', brand.ownerNumber],

    // Pair sites
    ['http://redxpair.gt.tc', brand.pairSite],
    ['redxpair.gt.tc',        brand.pairSite],

    // URLs
    ['https://whatsapp.com/channel/0029VagJIAr3bbVBCpEkAM07', brand.whatsappChannel],
    ['https://t.me/Global_TechInfo',                           brand.telegramGroup],
    ['https://t.me/GlobalTechBots',                            brand.telegramGroup],
    ['https://youtube.com/@GlobalTechInfo',                    brand.youtube],
    ['https://github.com/GlobalTechInfo/MEGA-MD',              brand.githubMain],
    ['https://github.com/GlobalTechInfo',                      brand.githubMain.replace(/\/[^/]+$/, '')],
    ['https://github.com/AbdulRehman19721986/REDXBOT-MD',      brand.githubMain],

    // Newsletter JIDs
    ['120363319098372999@newsletter', brand.channelJid],
    ['120363408012795386@newsletter', brand.channelJid],
];

// Process all .js files in plugins/ and lib/
let processed = 0;
for (const folder of ['plugins', 'lib']) {
    const dir = path.join(__dirname, folder);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter(f => f.endsWith('.js'))) {
        const fp = path.join(dir, file);
        try {
            let code = fs.readFileSync(fp, 'utf8');
            let changed = false;
            for (const [from, to] of REPLACEMENTS) {
                if (code.includes(from)) {
                    code = code.split(from).join(to);
                    changed = true;
                }
            }
            if (changed) { fs.writeFileSync(fp, code, 'utf8'); processed++; }
        } catch {}
    }
}

console.log(`✅ Rebranding done: ${processed} files updated`);
console.log(`👑 Owner: ${brand.ownerName} | ${brand.ownerNumber}`);
