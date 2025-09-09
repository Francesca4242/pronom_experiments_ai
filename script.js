// PRONOM AI Generator JavaScript

class PRONOMAIGenerator {
    constructor() {
        this.form = document.getElementById('pronomiForm');
        this.outputContent = document.getElementById('outputContent');
        this.generateBtn = document.getElementById('generateBtn');
        
        this.init();
    }

    init() {
        this.loadExampleData();
        this.bindEvents();
    }

    loadExampleData() {
        const exampleData = `Name: Windows Bitmap
Version: 1.0
Other names: BMP (1.0)
Classification: Image (Raster)
MIME: image/bmp
PUID: fmt/114

Name: Acrobat PDF/X - Portable Document Format - Exchange 1:2001
Other names: PDF/X-1:2001
Classification: Page Description
MIME: application/pdf
PUID: fmt/145

Name: Extensible Markup Language
Version: 1.1
Other names: XML (1.1)
Classification: Text (Mark-up)
MIME: application/xml, text/xml
PUID: fmt/1776`;

        document.getElementById('exampleData').textContent = exampleData;
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generatePRONOMEntry();
        });
    }

    async generatePRONOMEntry() {
        const formData = new FormData(this.form);
        const fileData = formData.get('fileData');
        const aiProvider = formData.get('aiProvider');
        const apiKey = formData.get('apiKey');

        if (!fileData.trim()) {
            this.showError('Please provide file information.');
            return;
        }

        this.setLoading(true);

        try {
            let result;
            
            switch (aiProvider) {
                case 'openai':
                    result = await this.callOpenAI(fileData, apiKey);
                    break;
                case 'anthropic':
                    result = await this.callAnthropic(fileData, apiKey);
                    break;
                case 'local':
                    result = await this.callLocalAI(fileData);
                    break;
                default:
                    throw new Error('Unknown AI provider');
            }

            this.displayResult(result);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async callOpenAI(fileData, apiKey) {
        if (!apiKey) {
            throw new Error('OpenAI API key is required');
        }

        const prompt = this.buildPrompt(fileData);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert in digital preservation and file format identification. Generate PRONOM database entries based on file information provided.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 2000,
                temperature: 0.3
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async callAnthropic(fileData, apiKey) {
        if (!apiKey) {
            throw new Error('Anthropic API key is required');
        }

        const prompt = this.buildPrompt(fileData);

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 2000,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`Anthropic API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.content[0].text;
    }

    async callLocalAI(fileData) {
        // This is a mock implementation for local AI
        // In a real implementation, you would call a local AI service
        return this.generateMockPRONOMEntry(fileData);
    }

    buildPrompt(fileData) {
        return `Based on the following file information, generate a complete PRONOM database entry. Use the structure and format from the exemplar data below.

EXEMPLAR DATA FORMAT:
Name	[Format Name]
Version	[Version if applicable]
Other names	[Alternative names]
Identifiers	MIME: [MIME type]
PUID: [PRONOM Unique Identifier - use fmt/XXXX format]
Apple Uniform Type Identifier: [if applicable]
Family	[Format family if applicable]
Classification	[Classification type like Image (Raster), Text (Mark-up), Page Description, etc.]
Disclosure	[Disclosure level]
Description	[Detailed description of the format]
Orientation	[Text/Binary]
Byte order	[Byte order if applicable]
Related file formats	[Relationships to other formats]
Technical Environment	[Technical requirements]
Released	[Release date if known]
Supported until	[Support end date if known]
Format Risk	[Risk assessment]
Developed by	[Developer/Organization]
Supported by	[Supporting organizations]
Source	[Information source]
Source date	[Date of source]
Source description	[Source details]
Last updated	[Last update date]
Note	[Additional notes]

FILE INFORMATION TO PROCESS:
${fileData}

Please generate a complete PRONOM entry following the exact format above. If information is not available, you may use "None." or leave fields empty as appropriate. Be thorough and accurate in your analysis.`;
    }

    generateMockPRONOMEntry(fileData) {
        // Mock AI response for demonstration
        return `Name	Unknown Format
Version	
Other names	
Identifiers	MIME: application/octet-stream
PUID: fmt/XXXX
Family	
Classification	Binary
Disclosure	
Description	Based on the provided information: ${fileData.substring(0, 100)}... This format requires further research and authentication to provide complete information for digital preservation assessment.
Orientation	Binary
Byte order	
Related file formats	
Technical Environment	
Released	
Supported until	
Format Risk	
Developed by	Unknown
Supported by	None.
Source	User submission
Source date	${new Date().toLocaleDateString()}
Source description	Generated using PRONOM AI Generator
Last updated	${new Date().toLocaleDateString()}
Note	This entry was generated automatically and requires manual verification.`;
    }

    displayResult(result) {
        this.outputContent.textContent = result;
        this.outputContent.classList.remove('loading');
    }

    showError(message) {
        this.outputContent.innerHTML = `<div class="error">Error: ${message}</div>`;
        this.outputContent.classList.remove('loading');
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.outputContent.textContent = 'Generating PRONOM entry...';
            this.outputContent.classList.add('loading');
            this.generateBtn.disabled = true;
            this.generateBtn.textContent = 'Generating...';
        } else {
            this.generateBtn.disabled = false;
            this.generateBtn.textContent = 'Generate PRONOM Entry';
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PRONOMAIGenerator();
});

// Add copy to clipboard functionality
function copyToClipboard() {
    const outputContent = document.getElementById('outputContent');
    const text = outputContent.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        alert('PRONOM entry copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Add export functionality
function exportPRONOM() {
    const outputContent = document.getElementById('outputContent');
    const text = outputContent.textContent;
    
    if (!text || text.includes('Generated PRONOM database entry will appear here')) {
        alert('No PRONOM entry to export. Please generate one first.');
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pronom_entry.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
