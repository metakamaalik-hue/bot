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
      `🎉 *Join Our Community!*\n\nPao daily:\n✅ Match Insights\n✅ Premium Predictions\n✅ Live Score Updates\n\n👇 Button dabao aur join karo!`,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: "💬 Join Community", url: LINK }]
          ]
        }
      }
    );
  }
});

bot.on("polling_error", (error) => {
  console.error("Polling error:", error.message);
});
