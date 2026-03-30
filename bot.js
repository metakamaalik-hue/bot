const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error("❌ BOT_TOKEN environment variable is missing!");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

console.log("🚀 Sports Insights Hub Bot is running...");

const LINK = "https://t.me/rockybook2121rockybookeducation";

// ─── INLINE KEYBOARDS ─────────────────────────────────────────────────────────

const startKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "👉 Start Now", callback_data: "start_now" }],
    ],
  },
};

const mainMenuKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "1️⃣ Today's Match Insights", callback_data: "match_insight" }],
      [{ text: "2️⃣ Premium Analysis",       callback_data: "premium"       }],
      [{ text: "3️⃣ Join Community",          callback_data: "community"     }],
      [{ text: "4️⃣ Live Updates",            callback_data: "live_updates"  }],
    ],
  },
};

const matchKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "📊 Get Full Analysis Here", url: LINK }],
      [{ text: "🔙 Back to Main Menu", callback_data: "main_menu" }],
    ],
  },
};

const premiumKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "🔥 Access Now", url: LINK }],
      [{ text: "🔙 Back to Main Menu", callback_data: "main_menu" }],
    ],
  },
};

const communityKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "💬 Join Community", url: LINK }],
      [{ text: "🔙 Back to Main Menu", callback_data: "main_menu" }],
    ],
  },
};

const liveKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [{ text: "📡 Follow Live Updates", url: LINK }],
      [{ text: "🔙 Back to Main Menu", callback_data: "main_menu" }],
    ],
  },
};

// ─── MESSAGES ─────────────────────────────────────────────────────────────────

const MESSAGES = {
  welcome: `Hello 👋\n\nWelcome to the *Sports Insights Hub!*\n\nGet ready to access:\n📊 Match Analysis\n🔥 Trending Insights\n📈 Data-Based Predictions\n\nClick below to continue 👇`,

  mainMenu: `🏠 *Main Menu*\n\nSelect an option below 👇`,

  matchInsight: `📊 *Match: Team A vs Team B*\n\n✔️ Recent Form Analysis\n✔️ Head-to-Head Stats\n✔️ Key Player Performance\n✔️ Winning Probability`,

  premium: `🔥 *Unlock Advanced Insights*\n\nGet deeper analysis, accuracy-based picks & real-time updates.`,

  community: `💬 *Join Our Discussion Community*\n\nStay updated with latest match trends & insights.`,

  liveUpdates: `📡 *Live Updates*\n\nGet real-time score updates, breaking news & instant match insights.\n\n🔔 Stay tuned — live coverage is active!`,
};

// ─── COMMAND HANDLERS ─────────────────────────────────────────────────────────

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, MESSAGES.welcome, {
    parse_mode: "Markdown",
    ...startKeyboard,
  });
});

bot.onText(/\/menu/, (msg) => {
  bot.sendMessage(msg.chat.id, MESSAGES.mainMenu, {
    parse_mode: "Markdown",
    ...mainMenuKeyboard,
  });
});

// ─── CALLBACK HANDLER ─────────────────────────────────────────────────────────

bot.on("callback_query", (query) => {
  const chatId    = query.message.chat.id;
  const messageId = query.message.message_id;
  const data      = query.data;

  bot.answerCallbackQuery(query.id);

  switch (data) {

    case "start_now":
      bot.editMessageText(MESSAGES.mainMenu, {
        chat_id: chatId, message_id: messageId,
        parse_mode: "Markdown",
        ...mainMenuKeyboard,
      });
      break;

    case "main_menu":
      bot.editMessageText(MESSAGES.mainMenu, {
        chat_id: chatId, message_id: messageId,
        parse_mode: "Markdown",
        ...mainMenuKeyboard,
      });
      break;

    case "match_insight":
      bot.editMessageText(MESSAGES.matchInsight, {
        chat_id: chatId, message_id: messageId,
        parse_mode: "Markdown",
        ...matchKeyboard,
      });
      break;

    case "premium":
      bot.editMessageText(MESSAGES.premium, {
        chat_id: chatId, message_id: messageId,
        parse_mode: "Markdown",
        ...premiumKeyboard,
      });
      break;

    case "community":
      bot.editMessageText(MESSAGES.community, {
        chat_id: chatId, message_id: messageId,
        parse_mode: "Markdown",
        ...communityKeyboard,
      });
      break;

    case "live_updates":
      bot.editMessageText(MESSAGES.liveUpdates, {
        chat_id: chatId, message_id: messageId,
        parse_mode: "Markdown",
        ...liveKeyboard,
      });
      break;

    default:
      break;
  }
});

// ─── ERROR HANDLING ───────────────────────────────────────────────────────────

bot.on("polling_error", (error) => {
  console.error("Polling error:", error.message);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection:", reason);
});
