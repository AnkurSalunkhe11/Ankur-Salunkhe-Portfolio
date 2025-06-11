# Ankur Salunkhe Portfolio

A modern, responsive portfolio website showcasing both Computer Science and Mechanical Engineering expertise. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Dual Domain Portfolio**: Switch between CS and Mechanical Engineering views
- **Responsive Design**: Optimized for all devices
- **Modern UI**: Clean, professional design with smooth animations
- **Performance Optimized**: Fast loading with Vercel Analytics and Speed Insights
- **JSON-Based Content**: Easy content management through JSON files

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Animations**: Framer Motion
- **Analytics**: Vercel Analytics & Speed Insights
- **State Management**: Zustand
- **Icons**: Lucide React + React Icons

## Project Structure

```
├── app/                    # Next.js app directory
├── components/            # React components
├── data/                  # JSON data files
│   ├── personal-data.json # Personal information
│   ├── cs-data.json      # Computer Science content
│   ├── mechanical-data.json # Mechanical Engineering content
│   └── config.json       # Site configuration
├── lib/                   # Utility functions
└── public/               # Static assets
```

## Content Management

### Updating Content

Content is managed through JSON files in the `data/` directory:

1. **Personal Information** (`data/personal-data.json`):
   - Contact details, education, certifications
   - Social media links

2. **CS Content** (`data/cs-data.json`):
   - Software projects, skills, experience
   - Programming-focused content

3. **Mechanical Content** (`data/mechanical-data.json`):
   - Engineering projects, publications, patents
   - Technical expertise and research

4. **Configuration** (`data/config.json`):
   - Default landing page (cs/mechanical)
   - SEO settings
   - Analytics configuration

### Changing Default Landing Page

Edit `data/config.json`:

```json
{
  "defaultLanding": "cs",  // or "mechanical"
  ...
}
```

## Contact Form

The contact form uses a simple mailto approach:
- Form data is pre-filled in the user's default email client
- No server-side processing required
- All messages go directly to the configured email address

## Analytics

Uses Vercel Analytics and Speed Insights for:
- Page views and user interactions
- Performance monitoring
- User behavior tracking

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

Optimized for Vercel deployment:
- Automatic builds on push
- Edge functions support
- Built-in analytics integration

## Customization

### Adding New Projects

Add to the respective JSON file (`cs-data.json` or `mechanical-data.json`):

```json
{
  "title": "Project Name",
  "description": "Project description",
  "technologies": ["Tech1", "Tech2"],
  "image": "https://example.com/image.jpg",
  "github": "https://github.com/...",
  "demo": "https://demo.com"
}
```

### Adding New Skills

Update the skills array in the respective data file:

```json
{
  "category": "Category Name",
  "items": ["Skill1", "Skill2", "Skill3"]
}
```

## License

MIT License - see LICENSE file for details.

## Contact

For questions or collaboration opportunities:
- Email: ankursalunkhe2004@gmail.com
- LinkedIn: [Ankur Salunkhe](https://www.linkedin.com/in/ankur-salunkhe/)
- GitHub: [AnkurSalunkhe11](https://github.com/AnkurSalunkhe11)