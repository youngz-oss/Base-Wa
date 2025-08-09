//========HELO FRIEND========//
require('./system/config');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const chalk = require('chalk')
const readline = require("readline")
const { smsg, fetchJson, await, sleep } = require('./system/lib/myfunction');
//======================
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const usePairingCode = true
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, resolve)
})};
//======================
async function Startzenn() {
const { state, saveCreds } = await useMultiFileAuthState('./session')
const zenn = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]
});
//======================
const manualUsername = 'BASE'; // Ganti Sesuai Username
const manualPassword = '123'; // Ganti Sesuai Password
console.log(chalk.cyan('𝘔𝘈𝘚𝘜𝘒𝘐𝘕 𝘜𝘚𝘌𝘙 𝘚𝘈𝘔𝘈 𝘗𝘞 𝘋𝘌𝘙'));
        console.log(chalk.cyan('=========================='));
if (!zenn.authState.creds.registered) {
    const inputUsername = await question(chalk.yellow('USERNAME SCRIPT :\n'));
    if (inputUsername !== manualUsername) {
        console.log('𝘠𝘈𝘏𝘈𝘏𝘏𝘈 𝘚𝘐𝘏 𝘛𝘖𝘓𝘖𝘓 𝘔𝘈𝘓𝘐𝘕𝘎 𝘚𝘊\n𝘎𝘞 𝘙𝘌𝘚𝘛𝘈𝘙𝘛 𝘓𝘈𝘏 𝘉𝘌𝘎𝘖');
        deleteFiles();
        process.exit();
    }
    const inputPassword = await question(chalk.yellow('PASSWORD SCRIPT:\n'));
    if (inputPassword !== manualPassword) {
        console.log('𝘠𝘈𝘏𝘈𝘏𝘏𝘈 𝘚𝘐𝘏 𝘛𝘖𝘓𝘖𝘓 𝘔𝘈𝘓𝘐𝘕𝘎 𝘚𝘊\n𝘎𝘞 𝘙𝘌𝘚𝘛𝘈𝘙𝘛 𝘓𝘈𝘏 𝘉𝘌𝘎𝘖');
        deleteFiles();
        process.exit();
    }
    console.log(chalk.cyan(`SUCCESFULLY ACCESS SCRIPT ✅`));
const pair = "BASECODE" // only 8 alphanumeric (no more or less)
const phoneNumber = await question('𝘮𝘢𝘴𝘶𝘬𝘪𝘯 𝘯𝘰𝘮𝘰𝘳 𝘵𝘰𝘨𝘦𝘭 𝘭𝘶 𝘥𝘦𝘳 :\n');
let code = await zenn.requestPairingCode(phoneNumber, pair);
code = code?.match(/.{1,4}/g)?.join("") || code;
console.log(`𝘯𝘰𝘮𝘰𝘳 𝘵𝘰𝘨𝘦𝘭 𝘭𝘶 𝘯𝘪𝘩 𝘢𝘯𝘫𝘪𝘯𝘨 :`, code);
}
zenn.public = global.publik
//======================
zenn.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect } = update;
if (connection === "close") {
const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
const reconnect = () => Startzenn();
const reasons = {
[DisconnectReason.badSession]: "Bad Session, hapus session dan scan ulang!",
[DisconnectReason.connectionClosed]: "Koneksi tertutup, mencoba menghubungkan ulang...",
[DisconnectReason.connectionLost]: "Koneksi terputus dari server, menghubungkan ulang...",
[DisconnectReason.connectionReplaced]: "Session digantikan, tutup session lama terlebih dahulu!",
[DisconnectReason.loggedOut]: "Perangkat keluar, silakan scan ulang!",
[DisconnectReason.restartRequired]: "Restart diperlukan, memulai ulang...",
[DisconnectReason.timedOut]: "Koneksi timeout, menghubungkan ulang..."};
console.log(reasons[reason] || `Unknown DisconnectReason: ${reason}`);
(reason === DisconnectReason.badSession || reason === DisconnectReason.connectionReplaced) ? zenn() : reconnect()}
if (connection === "open") {
zenn.newsletterFollow("120363400894070889@newsletter") 
console.log(chalk.green.bold("ZENN BERHASIL TERSAMBUNG✔️"));
}});
//==========================//
zenn.ev.on("messages.upsert", async ({
messages,
type
}) => {
try {
const msg = messages[0] || messages[messages.length - 1]
if (type !== "notify") return
if (!msg?.message) return
if (msg.key && msg.key.remoteJid == "status@broadcast") return
const m = smsg(zenn, msg, store)
require(`./system/case`)(zenn, m, msg, store)
} catch (err) { console.log((err)); }})
//=========================//
zenn.decodeJid = (jid) => {
if (!jid) return jid;
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {};
return decode.user && decode.server && decode.user + '@' + decode.server || jid;
} else return jid;
};
//=========================//
zenn.sendText = (jid, text, quoted = '', options) => zenn.sendMessage(jid, { text: text, ...options }, { quoted });
zenn.ev.on('contacts.update', update => {
for (let contact of update) {
let id = zenn.decodeJid(contact.id);
if (store && store.contacts) {
store.contacts[id] = { id, name: contact.notify };
}
}
});
zenn.ev.on('creds.update', saveCreds);
return zenn;
}
//=============================//
console.log(chalk.yellow.bold(
`⠀⠀⠀⠀⠀⠀⠀⠠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠂
⠀⠘⢷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡾⠁⠀
⠀⠀⢸⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⡇⠀⠀
⠀⠀⠀⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⡇⠀⠀
⠀⠀⠀⣿⣿⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⡇⠀⠀
⠀⠀⠀⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⣿⣿⠃⠀⠀
⠀⠀⠀⢻⣿⣿⣿⣿⣷⣦⣀⠀⠀⠀⠀⣀⣤⣴⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣦⣄⣀⠀⠀⠀⣀⣴⣾⣿⣿⣿⣿⣿⠀⠀⠀
⠀⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣶⣤⣝⣛⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣙⣭⣥⣶⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀
⠀⠀⠀⠀⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀
⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢈⢿⣿⣿⣿⣿⣿⣿⣿⣿⢟⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣌⢿⣿⣿⣿⣿⣿⣿⣿⡿⢣⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢠⣿⣦⣽⣛⣻⠿⠿⣟⣛⣵⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣭⣛⣛⣛⣛⣻⣭⣶⣿⣧⠀⠀⠀⠀
⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠀⠀⠀
⠀⠀⠀⢰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡸⣿⡏⢿⣿⣿⣿⡟⣼⣿⢹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀
⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠹⣿⡈⢿⣿⠟⢰⣿⢃⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀
⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡆⠹⣷⡀⠉⢠⣿⠏⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀
⠀⠀⠀⠀⣿⣿⣿⣿⣯⣍⡛⠻⠿⢿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠀⣿⣷⣶⣿⡟⠀⢿⣿⣿⣿⣿⣿⣿⣿⠿⠿⠛⢋⣩⣵⣾⣿⣿⣿⡟⠀⠀⠀
⠀⠀⠀⠀⣿⣿⣜⢿⣿⣿⣿⣿⣶⣶⣤⣤⣤⣉⣉⣉⣁⣀⣠⣴⣿⣿⣿⣿⣿⣤⣄⣀⣀⣀⣠⣤⣤⣴⣶⣾⣿⣿⣿⣿⡿⢋⣾⣿⣇⠀⠀⠀
⠀⠀⠀⢰⣿⣿⣿⣷⣮⡝⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠛⢩⣾⣿⣿⣿⡿⣄⠀⠀
⠀⠀⢰⡏⠘⢿⣿⣿⣿⣇⠀⠀⠀⠀⠉⢭⣭⣽⡟⠛⠛⠛⠋⢁⣿⣿⣿⣿⣷⡈⠉⠉⠉⠉⢭⣭⣭⠵⠀⠀⠀⠀⠀⣼⣿⣿⣿⠟⠀⣽⠀⠀
⠀⠀⠀⢿⣄⠀⠻⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⡿⠃⢀⣾⡟⠀⠀
⠀⠀⠀⠘⣿⣷⣤⣈⠛⠿⣿⣷⣦⣄⡀⠀⠀⠀⠀⠀⣀⣤⣾⡿⢸⣿⣿⣿⡇⢿⣷⣤⣀⡀⠀⠀⠀⢀⣀⣤⣶⣿⡿⠟⣉⣤⣴⣿⡿⠀⠀⠀
⠀⠀⠀⠀⠸⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢃⣾⣿⣿⣿⣷⡈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⡿⠁⠀⠀⠀
⠀⠀⠀⠀⠀⢹⣿⣭⡻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣷⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣫⣶⣶⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣸⣿⣿⡟⢈⣭⣟⣛⠿⠿⣿⣿⣿⠟⣩⣤⣬⣝⢿⣿⣿⣿⣿⣿⣿⣫⣥⣶⣌⠙⠿⡿⠿⠿⣛⣫⣭⣧⣄⢹⣿⣿⣇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣿⣿⣿⣇⣿⣿⢛⣯⣟⢿⣶⣶⣶⡇⣿⣿⣿⣿⣾⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⢸⣿⣾⣿⢟⣯⣭⣝⢻⣿⣼⣿⣿⡿⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⣿⣿⣿⡿⣵⣿⣿⣿⣷⢹⣿⣿⣇⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⣸⣿⣿⡏⣾⣿⣿⣿⣧⡹⣿⣿⣿⠇⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢿⡿⢋⣾⣿⣿⣿⣿⠟⢈⢿⣿⣿⣷⣤⣉⠙⠿⣿⣿⣿⣿⣿⠿⠛⣉⣤⣾⣿⣿⡿⡁⠙⢿⣿⣿⣿⣿⣌⠻⡿⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢀⣨⣶⣿⣿⡿⢟⠋⠀⠀⢸⡎⠻⣿⣿⣿⣿⣿⣶⣮⣭⣿⣯⣵⣶⣿⣿⣿⣿⡿⢟⠱⡇⠀⠀⠈⣙⡻⠿⣿⣿⣦⣄⡀⠀⠀⠀
⠀⠀⠀⠀⠒⠛⠛⠉⣽⣶⣾⣿⣧⠀⠀⠈⠃⣿⣶⣶⢰⣮⡝⣛⣻⢿⣿⣿⢿⣛⡫⣵⣶⢲⣾⣿⠀⠃⠀⠀⣸⣿⣿⣿⣶⠂⠈⠉⠉⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⣿⡄⠀⠀⠀⢿⡿⠁⠈⠛⠷⠿⠿⠿⠿⠿⠸⠿⠇⠛⠁⠀⢹⣿⠀⠀⠀⠀⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣿⣿⡇⠀⠀⠀⠘⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠏⠀⠀⠀⠀⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣿⡇⣠⣶⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡀⠀⠀⢰⣦⢰⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣿⣿⡙⠇⣰⡇⢰⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣷⢠⣷⡜⢋⣾⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣇⢿⠗⣿⣿⣷⡄⣴⣶⣴⡆⣶⡆⣶⣰⣶⡄⣾⣿⣿⡞⢿⣣⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣷⣧⡻⡿⢟⣣⣛⣣⠻⣃⡻⣣⣛⣣⣛⣡⣛⡻⡿⣱⣷⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣷⣾⣿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⣿⣶⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣿⣿⣭⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣶⣽⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠿⠛⠋⠉⠁⠀⠀⠀⠀⠈⠉⠙⠛⠛⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
${chalk.green.bold("ZENN OFFICIAL!")} 
────────────────────────────
 Creator : ZENN 
────────────────────────────`));
Startzenn()
//======================
