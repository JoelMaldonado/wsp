import { MemoryDB, addKeyword, createBot, createFlow, createProvider } from "@bot-whatsapp/bot";
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'


const flowBienvenida = addKeyword('hola').addAnswer('Buenas!!, Bienvenido')


const main = async () =>{

    const provider = createProvider(BaileysProvider)

    provider.initHttpServer(3002)

    provider.http?.server.post('/send-message', handleCtx(async (bot, req, res) => {
        const { mensaje, mediaUrl } = req.body;
        await bot.sendMessage('51936416623', mensaje, {
            media: mediaUrl
        })
        res.end('Se envio el mensaje')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()