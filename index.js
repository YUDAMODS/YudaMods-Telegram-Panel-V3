// By YudaMods
// Taruh Credits


// Import required modules
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const figlet = require('figlet');
const chalk = require('chalk');
const express = require('express');

// Create an instance of Express
const app = express(); // Jangan Di Ubah
const port = process.env.PORT || 8080; // Jangan Diubah

// Telegram Bot Token
const token = ''; // buat bot t.me/BotFather

// Pterodactyl API configurations
const pterodactylApiUrl = ''; // Masukan Domain Panel
const pterodactylApiKey = ''; // Apikey Panel

// Owner contact information
let ownerContact = '0'; // dapatkan di bot t.me/getidsbot

// URL for Telegram thumbnail
const thumbPath = 'telegra.ph/file/2660b2f3572c0f2571fe9.png'; // Ganti Link Thumb Lu


// YouTube link
const youtubeLink = 'https://youtube.com/@YUDAMODS'; // Ganti Aja Bebas

// Create a Telegram Bot instance


app.set('json spaces', 2);
app.get('/', (req, res) => {
  const data = {
    status: 'true',
    message: `Telegram Bot Successfully Activated! Bot Token: ${token}`,
    author: 'YudaMods',
  };
  const result = {
    response: data,
  };
  res.json(result);
});

function listenOnPort(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  app.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying another port...`);
      listenOnPort(port + 1);
    } else {
      console.error(err);
    }
  });
}

listenOnPort(port);

const bot = new TelegramBot(token, { polling: true });

function showMenu() {
  console.log('Selamat datang! Pilih salah satu opsi:');
  console.log('1. Use QR');
  console.log('2. Use Token');
}

showMenu();


process.stdin.on('data', (data) => {
  const choice = data.toString().trim();

  if (choice === '1') {
    console.log('Silakan scan QR code untuk menggunakan bot.');
    // Tambahkan logika untuk handling QR disini
  } else if (choice === '2') {
    console.log('Silakan masukkan token untuk menggunakan bot.');
    // Panggil fungsi untuk menghubungkan bot dengan token
    connectWithToken();
  } else {
    console.log('Pilihan tidak valid. Silakan pilih 1 untuk "Use QR" atau 2 untuk "Use Token".');
    showMenu();
  }
});

// Fungsi untuk menghubungkan bot menggunakan token
function connectWithToken() {
  bot.onText(/\/test/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Bot terhubung menggunakan token.');
  });
  
 

let Start = new Date();

let senderInfo;
let dateInfo;

const logs = (message, color, senderInfo, dateInfo) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(chalk[color](`[${timestamp}] ${senderInfo} ${dateInfo} => ${message}`));
};

// Figlet banner
figlet('YudaMods', (err, data) => {
  if (err) {
    console.error('Error rendering figlet:', err);
    return;
  }
  console.log(chalk.blue(data)); // Use chalk to display in blue
  console.log(chalk.blue('Bot is Running...'));
});

bot.on('polling_error', (error) => {
  logs(`Polling error: ${error.message}`, 'blue');
});

// Function to send start menu
function sendStartMenu(chatId) {
  const startMessage = "Selamat datang di bot YudaMods!\n\n" +
    "Berikut adalah fitur yang tersedia:\n" +
    "/addserver [Nama Server] - Menambahkan server baru\n" +
    "/adduser - Menambahkan pengguna baru\n" +
    "/addadmin [Nama Admin] - Menambahkan administrator baru\n" +
    "/checkuser [Nama Pengguna] - Memeriksa keberadaan pengguna\n" +
    "/checkadmin [Nama Admin] - Memeriksa keberadaan administrator\n" +
    "/deleteserver [Nama Server] - Menghapus server\n" +
    "/deleteuser [Nama Pengguna] - Menghapus pengguna\n" +
    "/deleteadmin [Nama Admin] - Menghapus administrator\n" +
    "/owner - Melihat nomor kontak owner\n" +
    "/getuserid - Mendapatkan ID pengguna\n" +
    "/addowner [ID Pengguna] - Menambahkan owner baru\n" +
    "/runtime - Informasi waktu eksekusi skrip\n"; +
    "/panelinfo - Informasi Admin Panel";
  // Add YouTube button
  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🎬 Kunjungi YouTube', url: youtubeLink }],
      ],
    },
  };

  bot.sendPhoto(chatId, thumbPath, { caption: startMessage, ...keyboard });
}

// Handling /start and /menu commands
bot.onText(/\/start|\/menu/, (msg) => {
  const chatId = msg.chat.id;
  sendStartMenu(chatId);
});

// Server listening on a specific port
// Menanggapi perintah /addserver
bot.onText(/\/addserver (.+)/, async (msg, match) => {
  const startTime = new Date();
  try {
    const serverName = match[1];
    const chatId = msg.chat.id;

    if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
    }
    
    const response = await axios.post(`${pterodactylApiUrl}/api/application/servers`, {
      name: serverName,
    }, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000; // dalam detik

    bot.sendPhoto(chatId, thumbPath, {
      caption: `Server ${serverName} berhasil ditambahkan.\nWaktu eksekusi: ${executionTime} detik`,
    });
  } catch (error) {
    console.error('Error adding server:', error);
    bot.sendMessage(ownerContact, `Error: ${error.message}`);
    bot.sendPhoto(chatId, thumbPath, {
      caption: 'Gagal menambahkan server.',
    });
  }
});

// Menanggapi perintah /adduser
bot.onText(/\/adduser/, async (msg) => {
  const startTime = new Date();
  try {
    const chatId = msg.chat.id;

    if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
    }
    
    const response = await axios.post(`${pterodactylApiUrl}/api/application/users`, null, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000; // dalam detik

    bot.sendPhoto(chatId, thumbPath, {
      caption: `Pengguna berhasil ditambahkan.\nWaktu eksekusi: ${executionTime} detik`,
    });
  } catch (error) {
    console.error('Error adding user:', error);
    bot.sendMessage(ownerContact, `Error: ${error.message}`);
    bot.sendPhoto(chatId, thumbPath, {
      caption: 'Gagal menambahkan pengguna.',
    });
  }
});

// Menanggapi perintah /addadmin
bot.onText(/\/addadmin (.+)/, async (msg, match) => {
  const startTime = new Date();
  try {
    const adminUsername = match[1];
    const chatId = msg.chat.id;

    if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
    }
    
    const response = await axios.post(`${pterodactylApiUrl}/api/application/users`, {
      username: adminUsername,
    }, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    await axios.post(`${pterodactylApiUrl}/api/application/users/${response.data.id}/administrative`, null, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    const endTime = new Date();
    const executionTime = (endTime - startTime) / 1000; // dalam detik

    bot.sendPhoto(chatId, thumbPath, {
      caption: `Administrator ${adminUsername} berhasil ditambahkan.\nWaktu eksekusi: ${executionTime} detik`,
    });
  } catch (error) {
    console.error('Error adding admin:', error);
    bot.sendMessage(ownerContact, `Error: ${error.message}`);
    bot.sendPhoto(chatId, thumbPath, {
      caption: `Gagal menambahkan administrator. Error: ${error.message}`,
    });
  }
});

// Menanggapi perintah /checkuser
bot.onText(/\/checkuser (.+)/, async (msg, match) => {
  const startTime = new Date();
  try {
    const username = match[1];
    const chatId = msg.chat.id;

    if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
    }

    const response = await axios.get(`${pterodactylApiUrl}/api/application/users`, {
      params: {
        filter: `username=${username}`,
      },
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    if (response.data.data.length > 0) {
      bot.sendPhoto(chatId, thumbPath, {
        caption: `User ${username} sudah terdaftar.`,
      });
    } else {
      bot.sendPhoto(chatId, thumbPath, {
        caption: `User ${username} belum terdaftar.`,
      });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    bot.sendMessage(ownerContact, `Error: ${error.message}`);
    bot.sendPhoto(chatId, thumbPath, {
      caption: `Gagal melakukan pengecekan user. Error: ${error.message}`,
    });
  }
});

bot.onText(/\/checkadmin (.+)/, async (msg, match) => {
  try {
    const adminUsername = match[1];
    const chatId = msg.chat.id;

    if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
    }
    
    // Implementasi pengecekan keberadaan administrator

    const response = await axios.get(`${pterodactylApiUrl}/api/application/users`, {
      params: {
        filter: `username=${adminUsername}`,
      },
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    if (response.data.data.length > 0) {
      bot.sendMessage(msg.chat.id, `Admin ${adminUsername} sudah terdaftar.`);
    } else {
      bot.sendMessage(msg.chat.id, `Admin ${adminUsername} belum terdaftar.`);
    }
  } catch (error) {
    console.error('Error checking admin:', error);
    bot.sendMessage(msg.chat.id, `Gagal melakukan pengecekan admin. Error: ${error.message}`);
  }
});

bot.onText(/\/deleteserver (.+)/, async (msg, match) => {
  try {
    const serverName = match[1];
    const chatId = msg.chat.id;
    
    // Implementasi penghapusan server dari Pterodactyl
    // Sesuaikan dengan endpoint dan payload yang diperlukan oleh API Pterodactyl
    
    if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
    }
    
    const response = await axios.delete(`${pterodactylApiUrl}/api/application/servers/${serverName}`, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    bot.sendMessage(msg.chat.id, `Server ${serverName} berhasil dihapus.`);
  } catch (error) {
    console.error('Error deleting server:', error);
    bot.sendMessage(msg.chat.id, `Gagal menghapus server. Error: ${error.message}`);
  }
});

bot.onText(/\/deleteuser (.+)/, async (msg, match) => {
  try {
    const username = match[1];
    const chatId = msg.chat.id;
    // Implementasi penghapusan pengguna dari Pterodactyl
    // Sesuaikan dengan endpoint dan payload yang diperlukan oleh API Pterodactyl
    
    if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
      
    }
    const response = await axios.delete(`${pterodactylApiUrl}/api/application/users/${username}`, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    bot.sendMessage(msg.chat.id, `Pengguna ${username} berhasil dihapus.`);
  } catch (error) {
    console.error('Error deleting user:', error);
    bot.sendMessage(msg.chat.id, `Gagal menghapus pengguna. Error: ${error.message}`);
  }
});

bot.onText(/\/deleteadmin (.+)/, async (msg, match) => {
  try {
    const adminUsername = match[1];
    const chatId = msg.chat.id;
    
    // Implementasi penghapusan administrator dari Pterodactyl
    // Sesuaikan dengan endpoint dan payload yang diperlukan oleh API Pterodactyl
    
    if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
    }
    
    const response = await axios.delete(`${pterodactylApiUrl}/api/application/users/${adminUsername}`, {
      headers: {
        Authorization: `Bearer ${pterodactylApiKey}`,
      },
    });

    bot.sendMessage(msg.chat.id, `Administrator ${adminUsername} berhasil dihapus.`);
  } catch (error) {
    console.error('Error deleting admin:', error);
    bot.sendMessage(msg.chat.id, `Gagal menghapus administrator. Error: ${error.message}`);
  }
});


bot.onText(/\/getuserid (.+)/, async (msg, match) => {
  try {
    const username = match[1];
    const chatId = msg.chat.id;

    // Pastikan hanya owner yang dapat menggunakan perintah ini

    // Implementasi pengambilan ID pengguna berdasarkan nama pengguna
    const response = await bot.getChat(username);

    if (response && response.id) {
      bot.sendMessage(chatId, `ID pengguna untuk ${username} adalah: ${response.id}`);
    } else {
      bot.sendMessage(chatId, 'Tidak dapat menemukan ID pengguna.');
    }
  } catch (error) {
    console.error('Error getting user ID:', error);
    bot.sendMessage(chatId, `Gagal mendapatkan ID pengguna. Error: ${error.message}`);
  }
  bot.sendPhoto(chatId, thumbPath, { caption: chatId });
});

bot.onText(/\/addowner (.+)/, async (msg, match) => {
  try {
    const newOwnerID = match[1];
    const chatId = msg.chat.id;

    // Pastikan hanya owner yang dapat menggunakan perintah ini
    if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
    }

    // Update ID owner dengan ID baru
    ownerContact = newOwnerID;

    bot.sendMessage(chatId, `Owner berhasil diperbarui. ID owner sekarang: ${newOwnerID}`);
  } catch (error) {
    console.error('Error adding owner:', error);
    bot.sendMessage(chatId, `Gagal menambahkan owner. Error: ${error.message}`);
  }
  bot.sendPhoto(chatId, thumbPath, { caption: chatId });
});


// Additional features go here...

// Credits
bot.onText(/\/credits/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Dibuat oleh YudaMods. Berikan kredit jika digunakan.');
});

bot.onText(/\/panelinfo/, (msg) => {
const chatId = msg.chat.id;

if (msg.from.id.toString() !== ownerContact) {
      bot.sendMessage(chatId, 'Anda tidak memiliki izin untuk menggunakan perintah ini.');
      return;
    }
    
  bot.sendMessage(msg.chat.id, `Your Panel Details\nDomain : ${pterodactylApiUrl}\nApikey : ${pterodactylApiKey}`);
});



bot.onText(/^\/owner$/, (msg) => {
  const From = msg.chat.id;
  const creatorMessage = 'This is my owmer: [YUDAMODS](https://t.me/YUDAMODS)';
  
  senderInfo = `From: ${msg.from.first_name} (@${msg.from.username || 'N/A'})`;
  dateInfo = `Date: ${new Date(msg.date * 1000).toLocaleString()}`;

  const replyMarkup = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Chat Creator YudaMods', url: 'https://t.me/YUDAMODS' }],
      ],
    },
  };
  bot.sendMessage(From, creatorMessage, { reply_to_message_id: msg.message_id, ...replyMarkup });

  // Tampilkan informasi di console
  logs('Creator response sent', 'green', senderInfo, dateInfo);
});


bot.onText(/^\/runtime$/, (msg) => {
  const now = new Date();
  const uptimeMilliseconds = now - Start;
  const uptimeSeconds = Math.floor(uptimeMilliseconds / 1000);
  const uptimeMinutes = Math.floor(uptimeSeconds / 60);
  const uptimeHours = Math.floor(uptimeMinutes / 60);

  const From = msg.chat.id;
  const uptimeMessage = `Active ⏱️${uptimeHours} hour ${uptimeMinutes % 60} minute ${uptimeSeconds % 60} second.`;

  senderInfo = `From: ${msg.from.first_name} (@${msg.from.username || 'N/A'})`;
  dateInfo = `Date: ${new Date(msg.date * 1000).toLocaleString()}`;

  const replyMarkup = {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Owner', url: 't.me/YUDAMODS' }],
      ],
    },
  };
  bot.sendMessage(From, uptimeMessage, { reply_to_message_id: msg.message_id, ...replyMarkup });

  // Tampilkan informasi di console
  logs('Runtime response sent', 'green', senderInfo, dateInfo);
});


}