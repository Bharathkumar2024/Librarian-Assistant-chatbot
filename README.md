# 📚 Librarian Assistant Chatbot

An intelligent chatbot designed to assist library patrons with book searches, recommendations, library services, and general inquiries. This AI-powered assistant streamlines library operations and enhances user experience.

[![Python Version](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Bharathkumar2024/Librarian-Assistant-chatbot/graphs/commit-activity)

## 🌟 Features

- **Book Search & Discovery**: Search books by title, author, ISBN, or genre
- **Intelligent Recommendations**: Get personalized book suggestions based on reading preferences
- **Library Services**: Check book availability, due dates, and account information
- **FAQ Assistance**: Instant answers to common library-related questions
- **Natural Language Processing**: Understands queries in conversational language
- **Multi-format Support**: Handles queries about books, e-books, audiobooks, and journals
- **Reservation System**: Reserve books and manage hold requests
- **Reading History**: Track previously borrowed books and reading patterns

## 🚀 Quick Start

### Prerequisites

```bash
Python 3.8 or higher
pip package manager
Virtual environment (recommended)
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Bharathkumar2024/Librarian-Assistant-chatbot.git
cd Librarian-Assistant-chatbot
```

2. **Create and activate virtual environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/MacOS
python3 -m venv venv
source venv/bin/activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
```bash
# Create .env file
cp .env.example .env

# Edit .env and add your API keys
OPENAI_API_KEY=your_api_key_here
DATABASE_URL=your_database_url
```

5. **Initialize the database**
```bash
python manage.py migrate
```

6. **Run the application**
```bash
python app.py
```

The chatbot will be available at `http://localhost:5000`

## 💬 Usage Examples

### Basic Book Search
```
User: "Do you have books by Agatha Christie?"
Bot: "Yes! We have 15 books by Agatha Christie. Here are some popular titles:
      - Murder on the Orient Express (Available: 2 copies)
      - And Then There Were None (All copies checked out)
      - The Murder of Roger Ackroyd (Available: 1 copy)
      Would you like to reserve any of these?"
```

### Book Recommendation
```
User: "I enjoyed '1984' by George Orwell. What else would you recommend?"
Bot: "Based on your interest in dystopian fiction, I recommend:
      - Brave New World by Aldous Huxley
      - Fahrenheit 451 by Ray Bradbury
      - The Handmaid's Tale by Margaret Atwood
      All of these are currently available!"
```

### Check Due Dates
```
User: "When are my books due?"
Bot: "You have 2 books currently checked out:
      - 'The Great Gatsby' - Due: March 15, 2024
      - 'To Kill a Mockingbird' - Due: March 18, 2024
      Would you like to renew any of these?"
```

## 🏗️ Project Structure

```
Librarian-Assistant-chatbot/
│
├── app.py                  # Main application entry point
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── README.md              # This file
│
├── config/
│   ├── __init__.py
│   ├── settings.py        # Application configuration
│   └── database.py        # Database configuration
│
├── models/
│   ├── __init__.py
│   ├── book.py            # Book model
│   ├── user.py            # User model
│   └── transaction.py     # Transaction model
│
├── services/
│   ├── __init__.py
│   ├── nlp_service.py     # Natural Language Processing
│   ├── search_service.py  # Book search functionality
│   ├── recommendation.py  # Recommendation engine
│   └── library_api.py     # Library system integration
│
├── chatbot/
│   ├── __init__.py
│   ├── intent_classifier.py  # Intent recognition
│   ├── response_generator.py # Response generation
│   └── context_manager.py    # Conversation context
│
├── api/
│   ├── __init__.py
│   ├── routes.py          # API endpoints
│   └── webhooks.py        # Webhook handlers
│
├── static/
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript files
│   └── images/            # Image assets
│
├── templates/
│   ├── index.html         # Main chat interface
│   └── admin.html         # Admin dashboard
│
├── tests/
│   ├── __init__.py
│   ├── test_chatbot.py
│   └── test_services.py
│
└── docs/
    ├── API.md             # API documentation
    ├── DEPLOYMENT.md      # Deployment guide
    └── CONTRIBUTING.md    # Contribution guidelines
```

## 🛠️ Technology Stack

- **Backend Framework**: Flask/Django
- **NLP Engine**: spaCy / NLTK / Transformers
- **AI/ML**: OpenAI GPT / Google Dialogflow / Rasa
- **Database**: PostgreSQL / MongoDB
- **Cache**: Redis
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap
- **Real-time Communication**: WebSocket / Socket.io
- **Deployment**: Docker, Kubernetes (optional)

## 📊 Database Schema

### Books Table
```sql
- id (Primary Key)
- title
- author
- isbn
- genre
- publication_year
- available_copies
- total_copies
- description
- cover_image_url
```

### Users Table
```sql
- id (Primary Key)
- name
- email
- library_card_number
- registration_date
- account_status
```

### Transactions Table
```sql
- id (Primary Key)
- user_id (Foreign Key)
- book_id (Foreign Key)
- checkout_date
- due_date
- return_date
- renewal_count
- status
```

## 🔧 Configuration

Edit `.env` file to configure:

```env
# Application Settings
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DEBUG=True

# AI/NLP Settings
OPENAI_API_KEY=your-openai-api-key
NLP_MODEL=en_core_web_sm

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/library_db
REDIS_URL=redis://localhost:6379/0

# Library System API (if integrating with existing system)
LIBRARY_API_URL=https://your-library-system.com/api
LIBRARY_API_KEY=your-library-api-key

# Chat Settings
MAX_CONVERSATION_HISTORY=10
SESSION_TIMEOUT=3600
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_chatbot.py

# Run with coverage
pytest --cov=chatbot tests/
```

## 📖 API Documentation

### Chat Endpoint
```http
POST /api/chat
Content-Type: application/json

{
  "message": "Do you have books by J.K. Rowling?",
  "user_id": "12345",
  "session_id": "abc-def-ghi"
}

Response:
{
  "response": "Yes! We have the complete Harry Potter series...",
  "intent": "book_search",
  "suggestions": ["Harry Potter and the Philosopher's Stone", ...],
  "session_id": "abc-def-ghi"
}
```

### Search Endpoint
```http
GET /api/search?query=harry+potter&type=title

Response:
{
  "results": [
    {
      "id": 123,
      "title": "Harry Potter and the Philosopher's Stone",
      "author": "J.K. Rowling",
      "available": true,
      "copies_available": 3
    }
  ],
  "total": 7
}
```

For complete API documentation, see [API.md](docs/API.md)

## 🚀 Deployment

### Docker Deployment

```bash
# Build the image
docker build -t librarian-chatbot .

# Run the container
docker run -p 5000:5000 --env-file .env librarian-chatbot
```

### Production Deployment

1. Set up production environment variables
2. Configure SSL/TLS certificates
3. Set up reverse proxy (Nginx/Apache)
4. Configure database backups
5. Set up monitoring and logging

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for details on our code of conduct and development process.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Bharath Kumar**
- GitHub: [@Bharathkumar2024](https://github.com/Bharathkumar2024)

## 🙏 Acknowledgments

- OpenAI for GPT API
- spaCy for NLP capabilities
- Library community for feedback and suggestions
- All contributors who have helped improve this project

## 📧 Support

For support and questions:
- Create an issue on GitHub
- Email: support@example.com
- Documentation: [Project Wiki](https://github.com/Bharathkumar2024/Librarian-Assistant-chatbot/wiki)

## 🗺️ Roadmap

- [x] Basic chat functionality
- [x] Book search and recommendations
- [x] User account integration
- [ ] Voice interface support
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Integration with popular library management systems
- [ ] Advanced analytics dashboard
- [ ] AI-powered reading level assessment
- [ ] Book review summarization

## 📊 Project Status

Active development - Version 1.0.0

---

Made with ❤️ for libraries and book lovers everywhere
