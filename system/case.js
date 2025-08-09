/*
⚠️ PERINGATAN:
Script ini **TIDAK BOLEH BOLEH DI JUAL KARNA INI FREE/GRATIS

╔══════════════════════════════════════════════╗
║                🛠️ INFORMASI SCRIPT           ║
╠══════════════════════════════════════════════╣
║ 📦 Version   : 1.0.0
║ 👨‍💻 Developer  : Zenn Official            ║    ║
║ 💻 GitHub  : https://youngz-oss║
╚══════════════════════════════════════════════╝

📌 Mulai 09 Agustus 2025,
Script *Base Wa* resmi menjadi *Open Source** dan dapat di gunakan Secara Gratis/Free
*/
require('./config')
const { 
default: baileys, 
proto, 
getContentType, 
generateWAMessage, 
generateWAMessageFromContent, 
generateWAMessageContent,
prepareWAMessageMedia, 
downloadContentFromMessage
} = require("@whiskeysockets/baileys");
const fs = require('fs-extra')
const axios = require('axios')
const util = require('util')
const chalk = require('chalk')
const { addPremiumUser, delPremiumUser } = require("./lib/premiun");
const { getBuffer, getGroupAdmins, getSizeMedia, fetchJson, sleep, isUrl, runtime } = require('./lib/myfunction');
//===============
module.exports = zenn = async (zenn, m, chatUpdate, store) => {
try {
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "messageContextInfo" ?
m.message.buttonsResponseMessage?.selectedButtonId ||
m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
m.message.InteractiveResponseMessage.NativeFlowResponseMessage ||
m.text : "");
const prefix = (typeof body === "string" ? global.prefix.find(p => body.startsWith(p)) : null) || "";  
const isCmd = !!prefix;  
const args = isCmd ? body.slice(prefix.length).trim().split(/ +/).slice(1) : []; 
const command = isCmd ? body.slice(prefix.length).trim().split(/ +/)[0].toLowerCase() : "";
const text = q = args.join(" ")//hard
const fatkuns = m.quoted || m;
const quoted = ["buttonsMessage", "templateMessage", "product"].includes(fatkuns.mtype)
? fatkuns[Object.keys(fatkuns)[1] || Object.keys(fatkuns)[0]]
: fatkuns;
//======================
const botNumber = await zenn.decodeJid(zenn.user.id);
const premuser = JSON.parse(fs.readFileSync("./system/database/premium.json"));
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender);
const isPremium = [botNumber, ...global.owner, ...premuser.map(user => user.id.replace(/[^0-9]/g, "") + "@s.whatsapp.net")].includes(m.sender);
if (!zenn.public && !isCreator) return;
//======================
const isGroup = m.chat.endsWith("@g.us");
const groupMetadata = isGroup ? await zenn.groupMetadata(m.chat).catch(() => ({})) : {};
const participants = groupMetadata.participants || [];
const groupAdmins = participants.filter(v => v.admin).map(v => v.id);
const isBotAdmins = groupAdmins.includes(botNumber);
const isAdmins = groupAdmins.includes(m.sender);
const groupName = groupMetadata.subject || "";
//======================
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
`   ⌬ Pesan: ${m.body || m.mtype} \n` +
`   ⌬ Pengirim: ${m.pushname} \n` +
`   ⌬ JID: ${m.sender}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Grup: ${groupName} \n` +
`   ⌬ GroupJid: ${m.chat}`
)
);
}
console.log();
}
//======================
switch (command) {
case "menu": {
    await zenn.sendMessage(m.chat, { react: { text: "😹", key: m.key }});

    await zenn.sendMessage(m.chat, { 
        audio: { url: './media/menu.mp3' }, 
        mimetype: 'audio/mpeg', 
        ptt: true 
    }, { quoted: m });

    let itsmenu = 
`\`𝘏𝘐 𝘐 𝘈𝘔 𝘡𝘌𝘕𝘕 𝘠𝘈𝘕𝘎 𝘚𝘐𝘈𝘗 𝘔𝘌𝘔𝘉𝘈𝘕𝘛𝘜 𝘈𝘕𝘋𝘈 𝘜𝘕𝘛𝘜𝘒 𝘔𝘌𝘔𝘉𝘌𝘙𝘌𝘚𝘒𝘈𝘕 𝘔𝘈𝘚𝘈𝘓𝘈𝘏\`

*\`- INFORMATION BOT\`*
 *⌬ Botname* : *𝘡𝘌𝘕𝘕 𝘛𝘌𝘊𝘏*
 *⌬ Owner* : https://ẉ.ceo/𝘡𝘦𝘯𝘯 𝘛𝘦𝘤𝘩
 *⌬ Version* : *1.0*

SELLECT BUTTON PLEASE
`

    const buttons = [
        { buttonId: ".sc", buttonText: { displayText: "𝗕𝗨𝗬𝗦𝗖" }, type: 1 },
        { buttonId: ".security", buttonText: { displayText: "𝗦𝗘𝗖𝗨𝗥𝗜𝗧𝗬 𝗕𝗢𝗧 𝗚𝗕 𝗟𝗨👻" }, type: 1 }
    ];

    const buttonMessage = {
        image: { url: './media/menu.jpg' },
        caption: itsmenu,
        footer: "𝘡𝘦𝘯𝘯",
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };

    const flowActions = {
        buttonId: 'action',
        buttonText: { displayText: 'This Button List' },
        type: 4,
        nativeFlowInfo: {
            name: 'single_select',
            paramsJson: JSON.stringify({
                title: "Menu Pilihan",
                sections: [
                    {
                        title: "Gas Bang",
                        highlight_label: "Recomended",
                        rows: [
                            { title: "KEPERLUAN", description: "Menampilkan KEPERLUAN", id: `.kebutuhan` },
                            { title: "𝗼𝘄𝗻𝗲𝗿𝗺𝗲𝗻𝘂", description: "Ownermenu", id: `.ownermenu` }, 
                            { title: "THANKS TOO", description: "Menampilkan MAKASIH", id: `.tqto` }                      
                        ]
                    }
                ]
            })
        },
        viewOnce: true
    };

    buttonMessage.buttons.push(flowActions);

    await zenn.sendMessage(m.chat, buttonMessage, { quoted: m });
}
break;

case "addprem": {
if (!isCreator) return m.reply(mess.owner);
if (!text) return m.reply("❌ Example: /addprem (nomor)");
let user = text.replace(/[^\d]/g, "");
addPremiumUser(user, 30);
m.reply(`✅ Add Premium:\n• ${user} (30 days)`)}
break;
//======================
case "delprem": {
if (!isCreator) return m.reply(mess.owner);
if (!text) return m.reply("❌ Example: /delprem (nomor)");
let user = text.replace(/[^\d]/g, ""); 
let removed = delPremiumUser(user);
m.reply(removed ? `✅ Removed Premium:\n• ${user}` : "❌ User tidak ditemukan")}
break;
//=======UNTUK CASE KALIAN====

//======================
default:
}} catch (err) {
console.log('\x1b[1;31m'+err+'\x1b[0m')}}
