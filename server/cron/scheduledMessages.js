const cron = require("node-cron");
const Message = require("../modules/message");
const Chat = require("../modules/chat");
const CryptoJS = require("crypto-js");
const SECRET_KEY = process.env.SECRET_KEY;

const startScheduledMessagesCron = (io) => {

    cron.schedule("*/10 * * * * *", async () => {

        try {

            const messages = await Message.find({
                isScheduled: true,
                isDelivered: false,
                scheduledFor: { $lte: new Date() }
            });

            for (const message of messages) {

                await Message.findByIdAndUpdate(message._id, {
                    isDelivered: true,
                    deliveredAt: new Date()
                });

                const updatedMessage = await Message.findById(message._id);

                await Chat.findByIdAndUpdate(message.chatId, {
                    lastMessage: updatedMessage._id,
                    $inc: { unreadMessageCount: 1 }
                });

const decryptedMessage = {

    ...updatedMessage._doc,

    text: CryptoJS.AES.decrypt(
        updatedMessage.text,
        SECRET_KEY
    ).toString(CryptoJS.enc.Utf8),

    translatedText: updatedMessage.translatedText
        ? CryptoJS.AES.decrypt(
              updatedMessage.translatedText,
              SECRET_KEY
          ).toString(CryptoJS.enc.Utf8)
        : ""

};
            io.emit("receive-message", decryptedMessage);
            }

        } catch (error) {
            console.log(error);
        }

    });

};

module.exports = startScheduledMessagesCron;