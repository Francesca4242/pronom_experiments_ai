# PRONOM AI Generator

A web-based AI tool that generates PRONOM database entries from file format information. PRONOM is a database of file formats maintained by The National Archives that helps with digital preservation efforts.

## Features

- **🤖 AI-Powered Generation**: Uses artificial intelligence to analyze file information and generate structured PRONOM database entries
- **🔗 Multiple AI Providers**: Supports OpenAI GPT, Anthropic Claude, and local AI implementations
- **🎨 User-Friendly Interface**: Clean, modern web interface for easy data input and output
- **📤 Export Functionality**: Copy generated entries to clipboard or export as text files
- **📚 Example Data**: Includes sample PRONOM entries to guide users

## How to Use

### Starting the Application

1. **Run the local server**:
   ```bash
   python3 server.py
   ```
   
2. **Open your browser** and navigate to `http://localhost:8000`

### Using the Tool

1. **Input File Information**: 
   - Paste relevant data about your file format in the text area
   - Include technical details, specifications, file extensions, MIME types, etc.

2. **Choose AI Provider**:
   - **OpenAI**: Requires an OpenAI API key
   - **Anthropic**: Requires an Anthropic API key  
   - **Local AI**: Uses a mock implementation (for demonstration)

3. **Generate Entry**:
   - Click "Generate PRONOM Entry" to process your input
   - The AI will analyze the information and generate a structured PRONOM entry

4. **Export Results**:
   - Copy the generated entry to clipboard
   - Export as a text file for further use

## PRONOM Field Structure

The tool generates entries with the following fields:

- **Name**: Format name
- **Version**: Version information
- **Other names**: Alternative names/abbreviations
- **Identifiers**: MIME types, PUIDs, Apple UTIs
- **Classification**: Format category (Image, Text, etc.)
- **Description**: Detailed format description
- **Orientation**: Text or Binary
- **Technical details**: Byte order, environment requirements
- **Relationships**: Related file formats
- **Metadata**: Developer, release info, risk assessment

## API Keys

To use external AI providers, you'll need:

- **OpenAI**: Get an API key from [OpenAI Platform](https://platform.openai.com/)
- **Anthropic**: Get an API key from [Anthropic Console](https://console.anthropic.com/)

## Example Input

Here's an example of the type of information you might input:

```
File Format: JPEG 2000
Extension: .jp2, .j2k
MIME Type: image/jp2
Description: JPEG 2000 is a wavelet-based image compression standard
Technical: Supports both lossy and lossless compression
Developed by: Joint Photographic Experts Group
Released: 2000
Applications: Used in digital cinema, medical imaging, satellite imagery
```

## Files Structure

- `index.html` - Main web interface
- `script.js` - JavaScript functionality and AI integration
- `server.py` - Local development server
- `exemplar_data.md` - Sample PRONOM entries for reference

## Contributing

This tool is designed to assist digital preservation professionals in creating PRONOM database entries. All generated entries should be reviewed and validated before submission to the official PRONOM database.

## Notes

- Generated entries are AI-assisted and require manual verification
- The tool uses exemplary data from existing PRONOM entries as training examples
- For production use, ensure API keys are kept secure
- Local AI option is provided for demonstration purposes





