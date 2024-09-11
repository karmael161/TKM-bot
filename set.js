const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUVRaERGQUpQdGJnYUN0TXpnb1Y5V2lxcWFQWnlxdlgyWXRTZ3ZRT1hHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiemhGY01oZnZSZkFGUG9VZkZTRUJ4bE4veXFFcmhveWw1QTNkWVlOeThEOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJR2NIYlYxeTA1NFV2OE5MaU9MRVdNTjUxNWJwV1lxWU5oTGIvb1N5cm1NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOemdjcTJsL05rZElpdUxiNStNMnlqdEI1SitkNWgvYndWR2l3dGFUMWgwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitPWExvWUtKU1EzZ01aVkJNb2dLcUpvVmc4OVlZQU9CT3IvSTZENmJXbkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNmV2dFclNRblBFcFpaZXFPVkVUbjFVa3pHVmdnemZjUnRMbjNNRlhwajA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUswQ3F1dXBJbk9BUTVvbU9YR3pYcFFnNmM0RVhJYk56QWhOODR6VERXTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNWo5ZDZGeUJock9WbjFZNC9PaVRnb25OTTRHM3lIcC9YRGxUNE9JaGRnVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFvOTgvWTl6bGF4VEdyOUkwc1p1UTNobTVoWnJRdFNpdVRNYzRvS0lHY3ZhR3pIUXZwa3Nxd01oKzlGTHUra01TdU44NjlCY2k3TkNEUGhuUnErVUNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTUzLCJhZHZTZWNyZXRLZXkiOiJGL250RmRTVWVqN01kRVZDQ2lkNEhsSmpzWW5UWEZwdHRMTGxWS3pwMDJRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJLaVJ3T0VER1FidTg2NUE3X3BZYTlnIiwicGhvbmVJZCI6ImEwYmJkYTY4LWEyMTAtNDk3MC1iYjMzLTY0YTU4NTgzYmY5MyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwT0ZVT2xlaSswVVdYT0FWZXBvM0JpNnYybGc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieEJ4Z2xEbXNlMWdPOFpYTFhHT2l2Y1dOcjhnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik1ZVlRTUzNHIiwibWUiOnsiaWQiOiIyMzc2NzIwODA2MDg6NTRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05DUHJvNEVFSm1JaUxjR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImczMkQ1UTFVeWQzSVpiUHFrbTI3RjJkdkdKY0QyR2pZbU56R2JZeWtyQmc9IiwiYWNjb3VudFNpZ25hdHVyZSI6Img3VllZbDFITmRjbFFJSHhzYWVZdWhxR3ZERkNGcHRTaDZqMlhPK2VZVDNxU2krb25VUGpBNXRHZEJnQTIxN1NVV29YVVNTTS9QZUNGdE84T0MxU0RRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJaQllIZjEyY3pzOGV2V0JRSXJmdXlreURtVHIvcU1vLy9VY1M3clNUUHBrZXdwSlV6dFpndmM5SlpUZEJ6NmNNd05PN2tlb1dlT0RJUGwwSGZzR1BDQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY3MjA4MDYwODo1NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZTjlnK1VOVk1uZHlHV3o2cEp0dXhkbmJ4aVhBOWhvMkpqY3htMk1wS3dZIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI2MDg4MjMwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVBTdyJ9',
    PREFIXE: process.env.PREFIX || "✓",
    OWNER_NAME: process.env.OWNER_NAME || "𝑲𝑨𝑹𝑴𝑨𝑬𝑳 𝑺𝑨𝑺𝑨𝑲𝑰",
    NUMERO_OWNER : process.env.OWNER_NUM || "237672080608",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TKM bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/5daa899775aad57b76d54.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TZ : process.env.TIME_ZONE || 'Etc/GMT',
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    BOOM_MESSAGE_LIMIT : process.env.BOOM_MESSAGE_LIMIT || 100,
    PORT : process.env.PORT || 8000,
    LINK : process.env.LINK || 'https://telegra.ph/file/5daa899775aad57b76d54.jpg',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa" : "postgresql://tkm:Aqi6tqwyv5IwDHncTtVi5XtMGZvfndDJ@dpg-cqahogtds78s739sl81g-a.oregon-postgres.render.com/takudzwa",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
