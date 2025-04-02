# First Stand 2025

A real-time League of Legends match display application built with Next.js, designed for tournament broadcasting and professional match analysis.

## Features

### Scoreboard Display
- Team information with complete player stats
- Player champion display with health and mana monitoring
- KDA (Kills/Deaths/Assists) tracking
- CS (Creep Score) tracking
- Gold difference indicators
- Player items with automatic sorting and stack display
- Ultimate and ability cooldown tracking
- Summoner perk display
- Team-based positioning (Blue/Red team layout)
- Dead player status indicators

### Match Timeline
- Real-time objective timers (Dragon, Baron, Herald, Atakhan)
- Game time tracking with precision
- Visual objective status indicators
- Power play status display

### Player Details
- Dynamic item builds with visual indicators for new items
- Resource bars (health/mana/energy)
- Ability icons with cooldown status
- Champion-specific information
- Gold acquisition tracking
- Vision score monitoring

## Technology Stack

- **Next.js**: React framework for server-rendered applications
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **React**: JavaScript library for building interactive UIs
- **Image Optimization**: Next.js Image component for optimized asset delivery
- **ESLint**: Code quality and consistency enforcement
- **PostCSS**: Advanced CSS processing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/socktow/FirstStand2025.git
cd FirstStand2025
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. The application will automatically connect to the League of Legends client at the local endpoint.

## Game Client Connection

The application connects to the League of Legends game client through:
```
http://localhost:58869
```

This endpoint provides real-time game data including:
- Player statistics and status
- Team performance metrics
- Match timeline events
- Objective status and timers
- Item purchase and upgrade tracking

## Customization

### Visual Styling
Modify the appearance using Tailwind CSS:
- Edit `tailwind.config.js` for theme customization
- Adjust component-specific styles in their respective files
- Modify global styles in the global CSS file

### Component Structure
Key component directories:
- `src/components/Scoreboard/`: Player information display components
  - `PlayerItems.js`: Item display with team-based positioning
  - `PlayerKDA.js`: Kill/Death/Assist statistics 
  - `ChampionSquare.js`: Champion portrait display
  - `AbilityIcon.js`: Ability cooldown indicators
  - `PerkIcon.js`: Summoner perk display
  - `ResourceBars.js`: Health/mana visualization
  - `PlayerName.js`: Player name display
  - `GoldDiff.js`: Gold difference indicators
- `src/app/ingame/`: In-game display layouts
  - `Scoreboardbottom.js`: Bottom scoreboard implementation

### Data Services
Service modules in `src/service/`:
- `itemService.js`: Item sorting and display logic
- `goldService.js`: Gold calculation and comparison
- `scoreboardService.js`: Team data organization

## Development

### Update Process
Use the included `update.bat` script for Windows users to update the application.

### Data Structure
- Data parsing and processing handled in `src/lib/dataParser.js`
- Component-specific data formatting in service modules

## Contact

For support or inquiries:
- Email: mjssdn95@gmail.com
- GitHub: [socktow](https://github.com/socktow)
- Repository: [FirstStand2025](https://github.com/socktow/FirstStand2025)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Last Update
April 2, 2024




