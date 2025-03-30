# First Stand 2025

A real-time League of Legends match display application built with Next.js, designed for tournament broadcasting and match analysis.

## Features

### Timeline Display
- Real-time objective timers (Dragon, Baron, Herald)
- Game time tracking
- Objective status indicators

### Scoreboard
- Team information display
- Team statistics (Kills, Gold, Towers)
- Dragon and Herald status
- Baron/Dragon Power Play indicators

### Player Information
- Player names and champions
- Level and experience tracking
- Health and mana monitoring
- Ultimate and spell cooldowns
- KDA statistics
- CS (Creep Score) tracking
- Item builds (0-6)

## Library

- **Next.js**: React framework for production
- **Tailwind CSS**: Utility-first CSS framework
- **React**: JavaScript library for building user interfaces
- **Image Optimization**: Next.js built-in Image component
- **ESLint**: Code linting and formatting
- **PostCSS**: CSS processing and optimization

## Install

1. Clone the repository:
```bash
git clone https://github.com/socktow/FST-2025.git
cd FST-2025
```

2. Install dependencies:
```bash
npm install
```

## How to Start

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. The application will automatically connect to the game client through the local endpoint.

## Endpoint

The application connects to the League of Legends game client through:
```
http://localhost:58869
```

This endpoint provides real-time game data including:
- Player information
- Team statistics
- Match timeline
- Objective timers
- Item updates

## How to Customize

### Styling
The application uses Tailwind CSS for styling. You can customize the appearance by:
1. Modifying the Tailwind configuration in `tailwind.config.js`
2. Adding custom CSS in the global styles
3. Modifying component-specific styles

### Components
Main components are located in `src/components/`:
- `PlayerList.js`: Displays player information and items
- `Timeline.js`: Shows match timeline and objectives
- `ScoreBoard.js`: Displays team statistics

### Data Structure
Game data structure is defined in `src/service/`:
- `itemService.js`: Handles item-related logic
- `playerService.js`: Manages player data processing

### Configuration Files
- `next.config.js`: Next.js configuration
- `postcss.config.mjs`: PostCSS configuration
- `eslint.config.mjs`: ESLint configuration
- `jsconfig.json`: JavaScript configuration

## Development Tools

### Update Script
The project includes an `update.bat` script for Windows users to easily update the application.

### Data Management
- `data.json`: Contains game data structure and configurations
- Real-time data processing and updates

## Contact

For support or inquiries:
- Email: mjssdn95@gmail.com
- GitHub: [socktow](https://github.com/socktow)
- Repository: [FST-2025](https://github.com/socktow/FST-2025)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Last Update
21.03.2025




