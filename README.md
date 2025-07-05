# Multiplayer Quiz Application

A real-time multiplayer quiz application built with React, Node.js, Socket.io, and PostgreSQL. This is the first working prototype of our multiplayer quiz system, featuring real-time gameplay, lobby management, and dynamic question loading.

## 🚀 Features

- **Real-time Multiplayer**: Join game lobbies and play with other players simultaneously
- **Dynamic Lobby System**: Create and join game sessions with unique session IDs
- **Live Leaderboard**: Real-time score tracking and rankings
- **Question Categories**: Multiple topics with diverse question sets
- **Responsive Design**: Modern UI that works on desktop and mobile
- **Docker Deployment**: Easy containerized setup for development and production

## 🏗️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Socket.io Client** for real-time communication
- **CSS3** for styling and responsive design

### Backend
- **Node.js** with Express.js
- **Socket.io** for real-time bidirectional communication
- **Prisma ORM** for database management
- **PostgreSQL** for data persistence

### Infrastructure
- **Docker** and **Docker Compose** for containerization
- **PostgreSQL** database container

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually comes with Docker Desktop)
- [Git](https://git-scm.com/downloads)

## 🚀 Quick Start with Docker

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Quiz
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres@db:5432/quiz"

# Frontend Configuration
VITE_BACKEND_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

### 3. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Database**: localhost:5432

### 4. Seed the Database

After the containers are running, you need to seed the database with questions. Run this command from the root directory:

```bash
# Seed the database with questions
docker-compose exec backend npm run seed
```

**Important**: The seed script must be run from inside the Docker container because the `DATABASE_URL` uses `db:5432` (the internal Docker network hostname).

## 🗄️ Database Setup

### Prisma Schema

The database schema is defined in `prisma/schema.prisma`. The main models are:

- **Question**: Quiz questions with categories and answers
- **GameSession**: Active game sessions
- **Player**: Players in active sessions

### Database Migrations

If you need to create new migrations:

```bash
# Generate a new migration
docker-compose exec backend npx prisma migrate dev --name your_migration_name

# Apply migrations
docker-compose exec backend npx prisma migrate deploy
```

### Seeding the Database

The database comes with a comprehensive seed script that adds questions across multiple categories:

- **Science**: Physics, Chemistry, Biology
- **History**: World History, Ancient Civilizations
- **Geography**: Countries, Capitals, Landmarks
- **Technology**: Programming, Computers, Internet
- **Sports**: Various sports and athletes
- **Entertainment**: Movies, Music, Literature

To manually seed the database:

```bash
# From the root directory
docker-compose exec backend npm run seed

# Or if you need to reset the database first
docker-compose exec backend npx prisma db push --force-reset
docker-compose exec backend npm run seed
```

## 🎮 How to Play

### Creating a Game

1. Open the application in your browser (http://localhost:3000)
2. Enter your player name
3. Click "Create New Game"
4. Share the generated Session ID with other players

### Joining a Game

1. Open the application in your browser
2. Enter your player name
3. Enter the Session ID provided by the game creator
4. Click "Join Game"

### Playing the Game

1. Wait for all players to join
2. The game creator clicks "Start Game"
3. Answer questions within the time limit
4. View real-time leaderboard updates
5. See final results when the game ends

## 🛠️ Development Setup

### Local Development (without Docker)

If you prefer to run the application locally:

#### Backend Setup

```bash
cd backend
npm install
npm run dev
```

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### Database Setup

1. Install PostgreSQL locally
2. Create a database named `quiz`
3. Update the `DATABASE_URL` in your `.env` file to use `localhost:5432`
4. Run migrations: `npx prisma migrate deploy`
5. Seed the database: `npm run seed`

### Environment Variables

Create a `.env` file in the root directory with these variables:

```env
# For Docker deployment
DATABASE_URL="postgresql://postgres:postgres@db:5432/quiz"
VITE_BACKEND_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001

# For local development (change DATABASE_URL)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/quiz"
```

## 📁 Project Structure

```
Quiz/
├── backend/                 # Node.js backend server
│   ├── package.json
│   ├── server.js           # Main server file
│   └── Dockerfile
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app component
│   │   └── socket.js       # Socket.io client setup
│   ├── package.json
│   └── Dockerfile
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma       # Database schema
│   ├── seed.js            # Database seeding script
│   └── migrations/        # Database migrations
├── docker-compose.yml      # Docker services configuration
├── .env                    # Environment variables
└── README.md
```

## 🔧 Available Scripts

### Backend Scripts

```bash
# Development
npm run dev          # Start development server

# Database
npm run seed         # Seed the database with questions
npx prisma generate  # Generate Prisma client
npx prisma migrate   # Run database migrations
npx prisma studio    # Open Prisma Studio (database GUI)
```

### Frontend Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Docker Scripts

```bash
# Start all services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up --build

# View logs
docker-compose logs -f
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Errors**
   - Ensure PostgreSQL container is running: `docker-compose ps`
   - Check if database is seeded: `docker-compose exec backend npm run seed`

2. **Port Already in Use**
   - Stop other services using ports 3000, 3001, or 5432
   - Or change ports in `docker-compose.yml`

3. **Prisma Client Errors**
   - Regenerate Prisma client: `docker-compose exec backend npx prisma generate`
   - Restart the backend container

4. **Socket Connection Issues**
   - Check if backend is running on port 3001
   - Verify `VITE_SOCKET_URL` in `.env` file

### Logs and Debugging

```bash
# View backend logs
docker-compose logs backend

# View frontend logs
docker-compose logs frontend

# View database logs
docker-compose logs db

# Follow logs in real-time
docker-compose logs -f backend
```

## 🚧 Current Status

This is the **first working prototype** of our multiplayer quiz application. We're actively developing and improving the system.

### ✅ Completed Features
- Real-time multiplayer gameplay
- Dynamic lobby system
- Live leaderboard
- Database integration with Prisma
- Docker containerization
- Comprehensive question database

### 🔄 In Development
- Enhanced UI/UX improvements
- Additional game modes
- User authentication
- Persistent user profiles
- More question categories
- Mobile optimization

### 📋 Planned Features
- User accounts and authentication
- Game history and statistics
- Custom question creation
- Tournament mode
- Real-time chat
- Sound effects and animations

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository or contact the development team.

---

**Note**: This is a prototype version. The application is functional but may have bugs or incomplete features. We're actively working on improvements and new features. 