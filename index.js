const TelegramApi = require("node-telegram-bot-api")
const {gameOptions, againOptions} = require('./options')
const { json } = require("stream/consumers")

const token = "7105596439:AAGny1EiuUSJjR6sxslw6hmRsCMRHtj-x7Q"

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async(chatId) => {
    await bot.sendMessage(chatId, 'угодай цифру от 0 до 9! авось угадаеш!');
        const randomNumber = Math.floor(Math.random() *10)
        chats[chatId] = randomNumber;
        await bot.sendMessage(chatId,'отгадуй!', gameOptions)
}

const start = () => {
    bot.setMyCommands( [
        {command:'/start', description:'поздраровуйся'},
        {command:'/info', description:'задоксить себя'},
        {command:'/game', description:'ФИНТИФЛЮШКА'},
    ])
    
    bot.on('message',async msg =>{
     const text = msg.text;
     const chatId = msg.chat.id;
    
     if(text === '/start'){
        
        await bot.sendMessage(chatId, 'https://data.chpic.su/stickers/k/kittykittykitty_by_fStikBot/kittykittykitty_by_fStikBot_017.webp')
        return bot.sendMessage(chatId, `МАУУУ МАУУ НАКОНЕЦ-ТО КТО-ТА ПРИ ШОЛ`)
     }
     if(text ==='/info') {
        return bot.sendMessage(chatId,`тебя звать ${msg.from.first_name} ${msg.from.last_name}`)
     }
     if (text === '/game') {
        return startGame(chatId);
     }
     return bot.sendMessage(chatId, 'че бля')
    })
    
    bot.on('callback_query', async msg => {
        const data =msg.data;
        const chatId =msg.message.chat.id;
        if(data==='/again') {
            return startGame(chatId)
        }
        if (data == chats[chatId]) {
            return bot.sendMessage(chatId, `правильно ${chats[chatId]}, ты угадал.. но как.. но как!`, againOptions)
        } else {
            return bot.sendMessage(chatId, `хахахаха лошара! облапошили мы тебя! а цифра то ${chats[chatId]} была! авось в некст раз повезет(`, againOptions)
        }
    })
}

start()