# PRONOM AI Generator Configuration

## Quick Start

1. **Install Python 3.6+** (if not already installed)
2. **Run the server**:
   ```bash
   python3 server.py
   ```
3. **Open browser** to `http://localhost:8000`

## Environment Setup

### For Development
```bash
# Clone the repository
git clone https://github.com/Francesca4242/pronom_experiments_ai.git
cd pronom_experiments_ai

# Start the development server
python3 server.py
```

### For Production Deployment

#### Using Python HTTP Server
```bash
# Production server on port 80 (requires sudo)
sudo python3 -m http.server 80

# Or use a specific port
python3 server.py
```

#### Using Node.js (Alternative)
```bash
# Install http-server globally
npm install -g http-server

# Serve the application
http-server -p 8000 -c-1
```

#### Using Apache/Nginx
Place all files in your web server's document root directory.

## API Configuration

### OpenAI Setup
1. Create account at https://platform.openai.com/
2. Generate API key
3. Enter key in the web interface

### Anthropic Setup  
1. Create account at https://console.anthropic.com/
2. Generate API key
3. Enter key in the web interface

## Security Notes

- **Never commit API keys to version control**
- **Use environment variables for production API keys**
- **Consider rate limiting for production deployments**
- **Use HTTPS in production environments**

## Customization

### Modifying AI Prompts
Edit the `buildPrompt()` function in `script.js` to customize how the AI processes file information.

### Adding New AI Providers
Extend the `PRONOMAIGenerator` class in `script.js` to add support for additional AI services.

### Styling Changes
Modify the CSS in `index.html` to customize the appearance.

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000

# Kill the process
kill -9 <PID>
```

### CORS Issues
The server includes CORS headers. If you encounter issues, ensure you're accessing the application through the server (not opening files directly).

### API Connection Issues
- Verify API keys are correct
- Check internet connectivity
- Ensure API quotas aren't exceeded
