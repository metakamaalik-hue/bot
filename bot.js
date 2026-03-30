const TelegramBot = require("node-telegram-bot-api");
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error("❌ BOT_TOKEN environment variable is missing!");
  process.exit(1);
}
const bot = new TelegramBot(TOKEN, { polling: true });
console.log("🚀 Bot is running...");
const LINK = "https://t.me/rockybook2121rockybookeducation";

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id,
    `Hello 👋 Welcome to the *Sports Insights Hub!*\n\nGet ready to access:\n📊 Match Analysis\n🔥 Trending Insights\n📈 Data-Based Predictions\n\nClick below to continue 👇`,
    {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "👉 Start Now", callback_data: "start_now" }]
        ]
      }
    }
  );
});

bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  bot.answerCallbackQuery(query.id);

  if (query.data === "start_now") {
    bot.editMessageText(
      `🎉 *Join Our Community!*\n\nHumari community join karo aur pao:\n\n✅ Daily Match Insights\n✅ Premium Predictions\n✅ Live Score Updates\n⚡ Expert Tips & Tricks\n💰 Winning Strategies\n\n👇 Pehle join karo, phir confirm karo!`,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "💬 Join Community", url: LINK }],
            [{ text: "✅ I Have Joined!", callback_data: "joined" }]
          ]
        }
      }
    );
  }

 if (query.data === "joined") {
    const name = query.from.first_name || "Champion";
    bot.editMessageText(
      `🏆 *Welcome to the Winners Club!*\n\n` +
      `Hey ${name}! 🎉\n\n` +
      `Thank you for joining *Sports Insights Hub!*\n` +
      `You are now part of our exclusive community! 🔥\n\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `📊 Daily Match Analysis\n` +
      `💡 Expert Predictions\n` +
      `📡 Live Score Updates\n` +
      `💰 Winning Strategies\n` +
      `━━━━━━━━━━━━━━━━\n\n` +
      `🚀 Share with your friends and help them win too!`,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "🔗 Share with Friends", url: `https://t.me/share/url?url=${encodeURIComponent(LINK)}&text=${encodeURIComponent("Join Sports Insights Hub for daily match analysis!")}` }]
          ]
        }
      }
    );
  }

bot.on("polling_error", (error) => {
  console.error("Polling error:", error.message);
});
