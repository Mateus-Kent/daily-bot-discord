# Daily Bot

A Discord bot designed to automate and manage team daily reports, facilitating the asynchronous daily standup process.

## 📋 Features

- Automatic daily report collection via direct message
- Reminder system for daily submissions
- Storage and organization of daily reports
- User-friendly interface for interaction

## 🚀 Setup

### Prerequisites

- Node.js 16.x or higher
- NPM or Yarn
- An application registered on [Discord Developer Portal](https://discord.com/developers/applications)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Mateus-Kent/daily-bot-discord.git
cd daily-bot-discord
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file in the project root
   - Add the following variables:
```env
BOT_TOKEN=your_token_here
SERVER_ID=server_id
```

4. Start the bot:
```bash
npm run dev
```

## 💻 Usage

### Basic Commands

- `!daily 11:03` - Starts the daily report submission process
- `!reports` - Shows the reports of the members in the server 

### How to Submit a Daily

1. Use the `!daily 11:03` command in any channel
2. The bot will send you a direct message
3. Reply with your report following the requested format
4. Wait for the submission confirmation

## 🛠️ Technologies Used

- [Discord.js](https://discord.js.org/) - Framework for Discord API interaction
- [Node.js](https://nodejs.org/) - Runtime environment
- TypeScript - Programming language

## 📄 Daily Report Format

The daily report should contain the following information:

1. What did you do yesterday?
2. What do you plan to do today?
3. Are there any blockers?

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mateus Quintino** - *Initial Work* - [Mateus-Kent](https://github.com/Mateus-Kent)

## ✨ Acknowledgments

- Team using the bot daily
- Discord.js community for support
- All contributors who participated in this project