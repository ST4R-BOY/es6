import baileys from "@adiwajshing/baileys"
import axios from "axios"
import fetch from "node-fetch"
import fs from "fs"
import util from "util"
import cp from "child_process"
import module from "module"
import jimp from "jimp"
import os from "os"
import moment from "moment-timezone"
import cheerio from "cheerio"
import formData from "form-data"
import * as fileType from "file-type"
import syntaxerror from "syntax-error"
import P from "pino"
import Message, {
    color,
    audio,
    owner,
    anon,
    map,
    set,
    chatsFilter,
    random,
    getRandom,
    streamToBuff,
    ffmpegDefault,
    hapus,
    baca,
    simpan,
    sticker,
    getExif,
    CustomError,
    clearCache,
    cekUsia,
    bindSock,
    format
} from "./functions.js"
import * as functions from "./functions.js"
import dt, {
    dl,
    savefrom,
    aiovideodl,
    idML,
    idFF,
    idCOC,
    JSObfuscator,
    topup,
    identifymusic,
    top4top,
    deepai,
    gdrive,
    anonfiles,
    jarak,
    mix,
    gtts,
    formatSize,
    igstalk,
    ytdl,
    ssweb,
    couple,
    smeme,
    rmbg,
    yts,
    youtube,
    stalk
} from "./data.js"
import * as scrap from "./data.js"
let {
    version,
    isLatest
} = await baileys.fetchLatestBaileysVersion()

global.data = { functions, scrap }
global.require = module.createRequire(import.meta.url)
global.setting = {
  author: "ivanz | Ivanzz`",
  wm: "Stiker By",
    owner: owner,
    prefix: ".",
    antiSpam: false,
    antiNsfw: false,
    antiNsfwRmv: false,
    antiViewonce: true,
    autoReact: false,
    emjReact : ["💗"],
    auth: "auth.json"
}
global.tumnel = await (await fetch ("https://i.ibb.co/cQwSSJ9/1657159953434.jpg")).buffer()

let app  = require ("express")()
const main = async (auth, memStr, multi, own) => {
let store = memStr ? baileys.makeInMemoryStore({
    stream: "store"
}) : undefined
store.readFromFile("store.json")
var fileAuth = baileys.useSingleFileAuthState(auth)
var sock = baileys.default({
    auth: fileAuth.state,
    browser: ["Safari", "xyvnz@Ivanzz", "4.0.1"],
    printQRInTerminal: true,
    version: version,
    logger: P({
        level: "silent"
    }),
})
bindSock(sock)
store?.bind(sock.ev)
 setInterval(() => {
store?.writeToFile("store.json")
}, 10_000)
sock.ev.on("creds.update", fileAuth.saveState)
sock.ev.on("connection.update", update => {
    if (multi) {
        sock.ev.emit("multi.sessions", update)
    }
    if (update.connection == "close") {
        var code = update.lastDisconnect?.error?.output?.statusCode;
        console.log(update.lastDisconnect?.error)
        if (code != 401) {
            main(setting.auth, true, true, owner)
        }
        if (update.connection == "open") {
            console.log("Connect to WA Web")
        }
    }
})

sock.ev.on("messages.upsert",
    async (message) => {
        try {
            if (!message.messages[0]) return
            let timestamp = new Date()
            let msg = message.messages[0]
            if (!msg.message) return;
            let m = new Message(msg, sock, store)
            let type = Object.keys(msg.message)[0]
            let from = msg.key.remoteJid;
            let isGroup = from.endsWith("@g.us")
            let sender = isGroup ? msg.key.participant : m.sender;
            let metadt = isGroup ? await sock.groupMetadata(from) : ""
            let me = sock.user.id.split(":")[0] + baileys.S_WHATSAPP_NET
            let isMeAdmin = isGroup ? metadt.participants.find(v => v.id == me).admin : ""
            let isAdmin = isGroup ? metadt.participants.find(u => u.id == sender)?.admin : ""
            isMeAdmin = isMeAdmin == "admin" || isMeAdmin == "superadmin"
            isAdmin = isAdmin == "admin" || isAdmin == "superadmin"
            let pushname = msg.pushName
            let body = msg.message?.conversation || msg.message?.imageMessage?.caption || msg.message?.videoMessage?.caption || msg.message?.extendedTextMessage?.text || msg.message?.listResponseMessage?.singleSelectReply?.selectedRowId || msg.message?.buttonsResponseMessage?.selectedButtonId || msg.message?.templateButtonReplyMessage?.selectedId || "";
            let args = body.trim().split(/ +/).slice(1)
            let q = args.join(" ")
            let command = body.slice(0).trim().split(/ +/).shift().toLowerCase()
            let isOwner = !!own.find(o => o == sender)
            let time = moment.tz("Asia/Jakarta").format("HH:mm:ss")
            let prefix = setting.prefix
            let isCmd = command.startsWith(prefix)
            //read sw
            if (m.key.remoteJid === 'status@broadcast') return sock.readMessages([m.key])
            function reply(text) {
                sock.sendMessage(from, {
                    text
                }, {
                    quoted: msg
                })
            }
            async function sendContact(jid, numbers, name, quoted, men) {
                let number = numbers.replace(/[^0-9]/g, '')
                const vcard = 'BEGIN:VCARD\n' +
                    'VERSION:3.0\n' +
                    'FN:' + name + '\n' +
                    'ORG:;\n' +
                    'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n' +
                    'END:VCARD'
                return sock.sendMessage(jid, {
                    contacts: {
                        displayName: name,
                        contacts: [{
                            vcard
                        }]
                    },
                    mentions: men ? men : []
                }, {
                    quoted: quoted
                })
            }
            
            if (setting.autoReact) {
     sock.sendMessage(from, { react: { key: m.key, text: random(setting.emjReact)}})
                }
            if (command) {
                console.log(`[ MESSAGE ] from ${pushname} text: ${body}`)
            }
            switch (command) {
                case prefix + "anonymous":
                    var teks = "*MENU ANONYMOUS CHAT*\n\n"
                    teks += prefix + "start [untuk memulai chat]\n"
                    teks += prefix + "next [untuk memulai chat baru]\n"
                    teks += prefix + "leave [untuk keluar dari chat]\n"
                    teks += prefix + "sendprofile [untuk mengirim kontak mu]\n"
                    reply(teks)
                    break
case prefix+ "cp":
  case prefix+ "couple":
    case prefix+ "ppcouple":
    let cpl = await couple ()
      sock.sendMessage(from, {image: { url: cpl.cowo }, contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Cowo",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  } }, {
                            quoted: msg
                        })
                              sock.sendMessage(from, {image: { url: cpl.cewe}, contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Cewe",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  } }, {
                            quoted: msg
                        })
                        break
case prefix+ "toimg":
  case prefix+ "toimage":
    if (!m.quoted) return reply("Reply Sticker !!")
var filename = getRandom("webp")
                        var out = getRandom("png")
                        await simpan(filename, await m.quoted.download())
                        var outname = await ffmpegDefault(filename, out)
                        sock.sendMessage(from, {
                            image: baca(outname),
                            contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Sticker To Image",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  } }, {
                            quoted: msg
                        })
                        break 
                case prefix + "getpp":
                    if (isGroup && !q) return reply("Masukan nomor atau tag member!")
                    if (!q) return reply("Masukan nomor!")
                    let no;
                    let image;
                    if (q.includes(baileys.S_WHATSAPP_NET)) no = q.split("@")[0]
                    else if (q.startsWith("@")) no = q.split("@")[1]
                    else no = q;
                    var dt = await sock.onWhatsApp(no + baileys.S_WHATSAPP_NET)
                    if (dt.length > 0) {
                        sock.profilePictureUrl(dt[0].jid, "image").then(async (pp) => {
                            sock.sendMessage(from, {
                                image: {
                                    url: pp
                                }
                            }, {
                                quoted: msg
                            })
                        }).catch(_ => {
                            reply("No Profile")
                        })
                    }
                    break;
                    case prefix +"update":
                      case "u":
                      let git = await cp.execSync("git pull").toString()
                                  reply(util.format(git))
                                  await baileys.delay(1000)
                                  if (!git.includes("Already")) cp.execSync("pm2 restart all")
                                  break
                case prefix + "upload":
                  if (q.endsWith("--top4")) {
                        let top = await top4top(m.quoted ? await m.quoted.download() : await m.download())
                        reply(util.format(top))
                  } else if (q.endsWith("--anonfiles")) {
                    let non = await anonfiles.default(m.quoted ? await m.quoted.download() : await m.download())
                    reply(util.format(non))
                  } else {
                    let nn = await anonfiles.default(m.quoted ? await m.quoted.download() : await m.download())
                    reply(util.format(nn))
                  }
                    break;
                case prefix + "deepai":
                    let dep = await deepai(q, {
                        image: m.quoted ? await m.quoted.download() : await m.download()
                    })
                    sock.sendMessage(from, {
                        image: {
                            url: dep.output_url
                        }
                    }, {
                        quoted: msg
                    })
                    break
                case prefix + "gdrive":
                    let gdr = await gdrive(q)
                    sock.sendMessage(from, {
                        document: {
                            url: gdr.downloadUrl
                        },
                        fileName: gdr.fileName,
                        mimetype: gdr.mimetype
                    }, {
                        quoted: msg
                    })
                    break

                case prefix + "join":
                    var link = q
                    if (!q) link = m.quoted ? m.quoted.text : m.text
                    if (!/https?:\/\/(chat\.whatsapp\.com)\/[A-Za-z]/.test(link)) return ("Link tidak valid")
                    try {
                        var code = link.split("/")[3]
                        await sock.groupAcceptInvite(code)
                        reply("Suscess join")
                    } catch (e) {
                        reply(String(e))
                    }
                    break;
                    case prefix+ "jarak":
                    var dari = q.split("|")[0]
                    var ke = q.split("|")[1]
                    var jr = await jarak(dari, ke)
                    sock.sendMessage(from, { image: { url: jr.img }, caption: jr.desc , contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Prediksi Jarak",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  }}, { quoted: msg })
                    break
                case "read":
                    if (!msg.message[type]?.contextInfo?.quotedMessage) return;
                    var tipeQuot = Object.keys(msg.message[type].contextInfo.quotedMessage)[0]
                    if (tipeQuot == "viewOnceMessage") {
                        var anu = msg.message.extendedTextMessage.contextInfo.quotedMessage.viewOnceMessage.message
                        var tipe = Object.keys(anu)[0]
                        delete anu[tipe].viewOnce
                        var ah = {}
                        if (anu[tipe].caption) ah.caption = anu[tipe].caption
                        if (anu[tipe]?.contextInfo?.mentionedJid) {
                            ah.contextInfo = {}
                            ah.contextInfo.mentionedJid = anu[tipe]?.contextInfo?.mentionedJid || []
                        }
                        var dta = await baileys.downloadContentFromMessage(anu[tipe], tipe.split("M")[0])
                        sock.sendMessage(from, {
                            [tipe.split("M")[0]]: await streamToBuff(dta),
                            ...ah
                        }, {
                            quoted: msg
                        })
                    }
                    if (tipeQuot == "documentMessage") {
                        var text = (await m.quoted.download()).toString()
                        if (text.length >= 65000) text.slice(65000)
                        reply(util.format(text))
                    }
                    break;
                    case prefix + "audio": {
                      if (!q) return reply("masuk kan prameter")
    let dt = await m.quoted.download()
    let dta = q.split("|")[0]
    let dtaa = q.split("|")[1]
    await sock.sendMessage(from, {
        audio: await audio.create(dt, {
            [dta]: dtaa
        }),
        mimetype: "audio/mpeg",
        ptt: true 
    ,contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Audio Filter",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  }}, {
        quoted: msg
    })
}
break
case prefix + "cut": {
                      if (!q) return reply("masuk kan prameter")
    let dt = await m.quoted.download()
    let i = q.split("|")[0]
    let o = q.split("|")[1]
    await sock.sendMessage(from, {
        audio: await audio.create(dt, {
            cut: [i, o]
        }),
        mimetype: "audio/mpeg",
        ptt: true 
    ,contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Audio Cutter",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  }}, {
        quoted: msg
    })
}
break
case prefix+"cekusia":
  case prefix+ "umur":
  if (!q) return reply ("penggunaan .cekUsia 2007 11 1")
  reply(cekUsia(q))
  break
case prefix+ "crash":
  case "p":
let reactionMessage = baileys.proto.ReactionMessage.create({ key: m.key, text: "🗿" })
sock.relayMessage(from, { reactionMessage }, { messageId: "ppppp" })
break
                case prefix + "tt":
                case prefix + "tiktok":
                case prefix + "ttmp4":
                  case prefix+ "ytmp4":
                    let titit;
                  if (body.includes("tt") || body.includes("tiktok")) titit = "Tiktok Mp4"
                    if (body.includes("ytmp3")) titit = "Youtube Mp4"
                    if (!q) return reply("Masukan URL !")
                    try {
                        var dt = await savefrom(q)
                        sock.sendMessage(from, {
                            video: {
                                url: dt.url[0].url
                            }
                       , contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: titit,
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  } }, {
                            quoted: msg
                        })
                    } catch (e) {
                        reply(String(e))
                    }
                    break;
case prefix+ "ss":
  case prefix+ "ssweb":
    if (!q) return reply("Masukan URL !")
    if (q) {
      sock.sendMessage(from, { image: await ssweb(args[0], args[1] ? true : false), contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Screenshot Web",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  } }, {
                            quoted: msg
                        })
    }
    break
    case prefix+ "setpp":
sock.generateProfilePicture = async(buffer) => {
const jimp_1 = await jimp.read(buffer);
const resz = jimp_1.getWidth() > jimp_1.getHeight() ? jimp_1.resize(550, jimp.AUTO) : jimp_1.resize(jimp.AUTO, 650)
const jimp_2 = await jimp.read(await resz.getBufferAsync(jimp.MIME_JPEG));
return {
img: await resz.getBufferAsync(jimp.MIME_JPEG)
}
}
async function setpp(jid, bupper) {
 var { img } = await sock.generateProfilePicture(bupper)
return await sock.query({
tag: 'iq',
attrs: {
to: jid,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
}
sock.sendMessage(from, { text: util.format( await (await setpp(sender, await m.quoted.download())).content[0]) }, {quoted:msg})
break

                case prefix + "bugfc":
                    if (!isOwner) return
                    let bugfc = {
                        key: {
                            fromMe: true,
                            participant: `0@s.whatsapp.net`,
                            ...({
                                remoteJid: ""
                            })
                        },
                        message: {
                            conversation: 'p'
                        }
                    }
                    sock.sendMessage(q ? q:from, {
                        text: 'p'
                    }, {
                        quoted: bugfc
                    })
                    break
                case prefix + "ttmp3":
                case prefix + "tiktokaudio":
                case prefix + "tiktokmusic":
                case prefix + "tiktokmp3":
                  case prefix + "ytmp3":
                    if (!q) return reply("Masukan URL !")
                    let titid;
                    if (body.includes("tt") || body.includes("tiktok")) titid = "Tiktok Mp3"
                    if (body.includes("ytmp3")) titid = "Youtube Mp3"
                    try {
                        var dtaa = await savefrom(q)
                        var filename = getRandom("mp4")
                        var out = getRandom("mp3")
                        var buff = await (await fetch(dtaa.url[0].url)).buffer()
                        await fs.writeFileSync(filename, buff)
                        var outname = await ffmpegDefault(filename, out)
                        sock.sendMessage(from, {
                            audio: baca(outname),
                            mimetype: "audio/mpeg"
                        , contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: titid,
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  }}, {
                            quoted: msg
                        })
                        hapus(outname)
                        hapus(filename)
                    } catch (e) {
                        reply(String(e))
                    }
                    break;
                    case prefix+ "stiker":
                      case prefix+"s":
                       if (q) {
                         sock.sendMessage(from, { sticker: await sticker(m.quoted ? await m.quoted.download() : await m.download(), { pack: q.split("|")[0], author: q.split("|")[1], type: "FULL"}), contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Sticker by",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  }})
                       } else {
                        sock.sendMessage(from, { sticker: await sticker(m.quoted ? await m.quoted.download() : await m.download(), { pack: setting.wm, author: setting.author, type: "FULL"}), contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Sticker by",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  }})
                       }
                       break
                case prefix + "emojimix":
                case prefix + "mix":
                    if (!q) return reply("masukan emoji")
                    var [emoji1, emoji2] = q.split("|")
                    var url = await mix(encodeURI(emoji1), encodeURI ( emoji2))
                    if (!url || url?.results?.length == 0) return reply(`Emoji ${emoji1} dan ${emoji2} tidak di temukan`)
                    var buff = await fetch(url.results[0].url)
                    sock.sendMessage(from, {
                        sticker: await sticker (buff.buffer(), { author: setting.author, pack: setting.wm, type: "FULL" })
                    }, {
                        quoted: msg
                    })
                    break;
                    case prefix+ "smeme":
var img = m.quoted ? await m.quoted.download() : await m.download()
var up = await anonfiles.default(img, "png")
var buff = await (await fetch(smeme(q.split("|")[0], q.split("|")[1], up))).buffer()
sock.sendMessage(from, { sticker: await sticker(buff, { pack: setting.wm, author: setting.author, type: "full" }), contextInfo: {
    externalAdReply: { 
      showAdAttribution: true,
      renderLargerThumbnail: false,
      thumbnail: tumnel,
      title: "Sticker Meme",
      body: "Ivanzz`",
      sourceUrl: "https://ivanz.herokuapp.com/"
    }
  }}, {
                            quoted: msg
                        })
                        break
                case prefix + "leave":
                case prefix + "next": {
                    if (isGroup && isOwner && command == prefix + "leave") return sock.groupLeave(from)
                    if (isGroup) return reply("Only private chat")
                    var room = Object.values(anon.anonymous).find(p => p.check(sender))
                    if (!room) return reply("Anda tidak berada didalam room")
                    reply("Ok")
                    var other = room.other(sender)
                    delete anon.anonymous[room.id]
                    if (other != "") sock.sendMessage(other, {
                        text: "Partner meninggalkan room chat"
                    })
                    if (command == prefix + "leave") break;
                }
                case prefix + "start":
                    if (isGroup) return reply("Only private chat")
                    if (Object.values(anon.anonymous).find(p => p.check(sender))) return reply("Anda masih didalam room")
                    var check = Object.values(anon.anonymous).find(p => p.state == "WAITING")
                    if (!check) {
                        anon.createRoom(sender)
                        console.log("[  ANONYMOUS  ] Creating room for: " + sender);
                        return reply("Menunggu partner")
                    }
                    var join = anon.joinRoom(sender)
                    if (join) {
                        reply("Menunggu partner")
                        console.log("[  ANONYMOUS  ] Join a room " + sender);
                        sock.sendMessage(from, {
                            text: "Menemukan partner"
                        })
                        sock.sendMessage(join.other(sender), {
                            text: "Menemukan partner"
                        })
                    }
                    break;
                case prefix + "sendprofile":
                    if (isGroup) return reply("Only private chat")
                    var wait = Object.values(anon.anonymous).find(p => p.state == "WAITING" && p.check(sender))
                    if (wait) return reply("kamu mau kirim profile ke siapa??")
                    var chat = Object.values(anon.anonymous).find(p => p.state == "CHATTING" && p.check(sender))
                    if (!chat) return reply("Anda tidak berada didalam room")
                    var other = chat.other(sender)
                    var msgs = await sendContact(other, sender.split("@")[0], pushname)
                    reply("Send profile success")
                    sock.sendMessage(other, {
                        text: "Teman chat kamu mengirimkan profilnya!"
                    }, {
                        quoted: msgs
                    })
                    break;
                case ">":
                                case "=>":
                                    if (!isOwner) return;
                                    var arg = command == ">" ? args.join(" ") : "return " + args.join(" ")
                                    try {
                                        var text = util.format(await eval(`(async()=>{ ${arg} })()`))
                                        sock.sendMessage(from, {
                                            text
                                        }, {
                                            quoted: msg
                                        })
                                    } catch(e) {
                                      let _syntax = ""
                                      let _err = util.format(e)
                                        let err = syntaxerror(arg, "Execution Function", {
                                          allowReturnOutsideFunction: true,
                                          allowAwaitOutsideFunction: true,
                                          sourceType: "module"
                                        })
                                        if (err) _syntax = err + "\n\n"
                                        reply(util.format(_syntax + _err))
                                    }
                                break;
                case prefix + "q":
                    if (!m.quoted) return reply("Reply pesan")
                    var quotedObj = await m.quoted.getQuotedObj()
                    if (!quotedObj.quoted) return reply("Pesan yang anda reply tidal mengandung reply")
                    sock.relayMessage(from, {
                        ...quotedObj.quoted.fakeObj
                    }, {
                        messageId: baileys.generateMessageID()
                    })
                    break;
               
                case "$":
                    if (!isOwner) return;
                    try {
                        cp.exec(args.join(" "), function(er, st) {
                            if (er) sock.sendMessage(from, {
                                text: util.format(er.toString().replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
                            }, {
                                quoted: msg
                            })
                            if (st) sock.sendMessage(from, {
                                text: util.format(st.toString().replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
                            }, {
                                quoted: msg
                            })
                        })
                    } catch (e) {
                        console.warn(e)
                    }
                    break;
                default:
                    if (!isGroup && !isCmd && !m.key.fromMe) {
                        let room = Object.values(anon.anonymous).find(p => p.state == "CHATTING" && p.check(sender))
                        //console.log(room);
                        if (room) {
                            let other = room.other(sender)
                            sock.relayMessage(other, baileys.generateForwardMessageContent(m.fakeObj, 1), {
                                messageId: baileys.generateMessageID()
                            })
                        }
                    }
                    if (setting.antiSpam && isGroup && !m.key.fromMe) {
                        chatsFilter.add(body)
                        let h = chatsFilter.has(body)
                        console.log(h);
                        if (h) {
                            reply("Jangan spam!")
                        }
                    }
                    if (setting.antiNsfw && !msg.key.fromMe && m.type == "imageMessage") {
                        let dt = await m.download()
                        let res = await deepai("nsfw-detector", {
                            image: dt
                        })
                        if (res.output.nsfw_score > 0.75) {
                            reply(`*NSFW DETECTED*\n\nNAMA: ${pushname}\nWAKTU: ${time}`)
                            console.log("[ NSFW DETECTED ]\n\n" + res.output)
                            if (setting.antiNsfwRmv && setting.antiNsfwRmv != undefined) return sock.groupParticipantsUpdate(from, [sender], "remove")
                        }
                    }

                    if (setting.antiViewonce && type == "viewOnceMessage" && !msg.key.fromMe) {
                        var anu = msg.message.viewOnceMessage.message
                        var tipe = Object.keys(anu)[0]
                        delete anu[tipe].viewOnce
                        var ah = {}
                        if (anu[tipe].caption) ah.caption = anu[tipe].caption
                        if (anu[tipe]?.contextInfo?.mentionedJid) {
                            ah.contextInfo = {}
                            ah.contextInfo.mentionedJid = anu[tipe]?.contextInfo?.mentionedJid || []
                        }
                        let uh = await sock.sendMessage(from, { text:`ANTI VIEWONCE MESSAGE\n\nNama: ${pushname}\nWaktu: ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}\nTipe: ${tipe}`}, { quoted: msg})

                        var dt = await baileys.downloadContentFromMessage(anu[tipe], tipe.split("M")[0])

                        sock.sendMessage(from, {

                            [tipe.split("M")[0]]: await streamToBuff(dt),

                            ...ah

                        }, {quoted: uh})
                    }
            }
        } catch (e) {
            console.log(e)
            
        }
    })
}

main(setting.auth, true, true, owner)
//main("auth_iv.json", true, true, ["6285742088184@s.whatsapp.net"])
//main("auth_ab.json", true, true, ["6288983804245@s.whatsapp.net"])
startApp()

process.on("UnhandledPromiseRejection", async qm => {
    console.log("[  INFO  ] " + qm)
    main(setting.auth, true, true)
})

async function react(options = {}, sock) {
    if (!options.jid) throw new Error("Jid not be empty")
    if (!options.id) throw new Error("id not be empty")
    if (!options.participant) throw new Error("participat not be empty")
    if (!options.timestamp) throw new Error("timestamp not be empty")
    if (!options.emoji) throw new Error("emoji not be empty")
    let reac = await baileys.proto.ReactionMessage.create({
        key: {
            id: options.id,
            participant: options.participant,
            remoteJid: options.jid,
        },
        text: options.emoji,
        senderTimestampMs: options.timestamp
    });
    if (sock) return await sock.relayMessage(reac.key.remoteJid, {
        reactionMessage: reac
    }, {
        messageId: baileys.generateMessageID()
    });
    else return reac
}
async function mmgwa(msg) {
    try {
        if (msg.url && msg.mediaKey) {
            const mediakei = Buffer.from(msg.mediaKey).toString('base64')
            return `https://ivanz.herokuapp.com/api/mmg/${msg.url.split('/d/f/')[1]}/${encodeURIComponent(mediakei)}?type=${msg.mimetype.split('/')[0]}`
        }
        const psn = msg.message[type]
        const urlmsg = psn?.url
        if (!urlmsg) return
        const mediakei = Buffer.from(psn.mediaKey).toString('base64')
        return `https://ivanz.herokuapp.com/api/mmg/${urlmsg.split('/d/f/')[1]}/${encodeURIComponent(mediakei)}?type=${psn.mimetype.split('/')[0]}`
    } catch (e) {
        return e
    }
}

// api
function startApp() {
  app.get("/bot", function(req, res) {
    res.send("Active!!")
  })
  app.get("/docs", function(req, res) {
    res.sendFile(process.cwd() + "/web/docs.html")
  })
  app.get("/", function(req, res) {
    res.sendFile(process.cwd() + "/web/home.html")
  })
  
  app.get('/api/mmg/:urlpath/:mediaKey', async(req, res) => {
  try {
  const downloadM = baileys.downloadContentFromMessage
	const urlmmg = 'https://mmg.whatsapp.net/d/f/'
	const downloadm = req.query
	const {urlpath} = req.params
	if (!downloadm.type) return res.status(404).send('?type not found')
	const mediaKey = Buffer.from(req.params.mediaKey, 'base64')
	if (downloadm.directPath) var directPath = Buffer.from(downloadm.directPath, 'base64')
	var stream = await downloadM({url: urlmmg+urlpath, mediaKey, directPath}, downloadm.type)
		let buffer = Buffer.from([])
  	  for await(const chunk of stream) {
  	  	buffer = Buffer.concat([buffer, chunk])
  	  }
	let type = await fileType.fileTypeFromBuffer(buffer) || {
      mime: 'application/octet-stream',
      ext: '.bin'
	}
	res.set("content-type", type.mime).send(buffer)
  } catch (e) {
	res.status(404).send(e+``)
  }
})
app.get("/files", async (req, res) => {
let id = req.query.name
res.sendFile(process.cwd() +"/"+id)
})
//app.use("/web", express.static(process.cwd()+ "/web"))
app.listen(process.env.PORT, () => console.log("Connected"))
}
// Ivanzz - © 2022
