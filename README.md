# ArTech Luxury Art Marketplace Template

This is the **ArTech Luxury Art Marketplace Template** for Filedgr.

Templates define the structure and behavior of digital twins in Filedgr.

## Template Types

**Art Marketplace Templates**
* Pre-built React templates for fractional art ownership
* Luxury UI design with premium aesthetics
* Interactive 360-degree artwork viewing
* Fractional purchase system with modal workflows
* PDF documentation viewer with authentication
* Web3Auth integration for secure access
* Blockchain transaction tracking

## Using ArTech Luxury Art Marketplace Template:

1. Use https://github.com/Filedgr/filedgr-images-template-checker to create zip file of the template

2. Upload the zip file as template in Filedgr web app (http://app.filedgr.network/)

3. Create streams for your artwork documentation (e.g., `certificates`, `artist-statements`, `creation-process`)

4. **For Artwork Documentation:**
   - Upload PDF files containing certificates, artist statements, creation processes
   - Mint as ZIP file
   - Create data attachments on respective streams

5. **For Artwork Images:**
   - Upload multiple angle views of the artwork
   - Include 360-degree view images for interactive display
   - Mint as ZIP file with organized folder structure

## Artwork Documentation Structure:

```json
{
  "attachments": [
    {
      "name": "Certificate of Authenticity",
      "description": "Official authenticity certificate",
      "files": [
        {
          "filename": "certificate.pdf",
          "type": "application/pdf"
        }
      ]
    },
    {
      "name": "Artist Statement", 
      "description": "Artist's vision and inspiration",
      "files": [
        {
          "filename": "artist_statement.pdf",
          "type": "application/pdf"
        }
      ]
    },
    {
      "name": "Creation Process",
      "description": "Behind-the-scenes documentation",
      "files": [
        {
          "filename": "creation_process.pdf",
          "type": "application/pdf"
        }
      ]
    }
  ]
}
```

## Artwork Configuration:

```javascript
// Dashboard artwork settings
const artworkConfig = {
  title: "The Masterpiece",
  subtitle: "ArTech Collective Presents", 
  description: "A groundbreaking fusion of traditional and digital art techniques",
  totalFractions: 100,
  availableFractions: 37,
  pricePerFraction: 150,
  images: {
    angleViews: [
      "turtle-angle-1.png",
      "turtle-angle-2.png", 
      "turtle-angle-3.png"
    ],
    threeSixtyView: "360-degree-images/"
  }
}
```

## Document Types Supported:

- **Certificate of Authenticity**: Verification documents with Shield icon
- **Artist Statement**: Artist's vision and inspiration with FileCheck icon  
- **Creation Process**: Behind-the-scenes documentation with Globe icon
- **Artwork Documentation**: General documentation with FileText icon

## Features:

- **Interactive Dashboard**: 
  - 360-degree artwork viewer with auto-rotation
  - Parallax scrolling effects
  - Multiple perspective image slider
  - Fraction availability tracker
- **Purchase System**:
  - Modal-based purchase workflow
  - Quantity selection (1-10 fractions)
  - Price calculation and confirmation
  - Success/processing states
- **Documentation Viewer**:
  - Luxury PDF viewer with download functionality
  - Private IPFS content support with authentication
  - Document categorization with custom icons
  - Responsive file navigation
- **Blockchain Integration**:
  - Transaction hash tracking
  - Blockchain explorer links
  - Secure authentication via Web3Auth
- **Premium Design**:
  - Obsidian dark theme with luxury gold accents
  - Framer Motion animations throughout
  - Responsive design for all devices
  - Custom typography (Playfair Display)

## Template Pages:

- **Dashboard**: Hero page with 360° artwork view and purchase introduction
- **Documentation Hub**: Grid view of all artwork documentation categories
- **Document Detail**: Individual document viewer with PDF display and purchase CTA
- **Purchase Modal**: Multi-step purchase flow with confirmation and success states

## Color Palette:

```css
--obsidian-500: #1a1a2e    /* Primary dark background */
--obsidian-400: #16213e    /* Secondary dark */
--obsidian-300: #0f1419    /* Accent dark */
--luxury-gold-500: #d4af37 /* Primary gold accent */
--luxury-gold-400: #e6c14a /* Hover gold */
--pearl-300: #f5f5dc       /* Light text */
--pearl-200: #fafafa       /* Lighter text */
```

## Purchase Flow:

1. **Selection**: Choose number of fractions (1-10)
2. **Confirmation**: Review purchase details and terms
3. **Processing**: Blockchain transaction processing
4. **Success**: Confirmation with ownership details

## Authentication:

- Web3Auth integration for wallet connection
- JWT token management for private content access
- Secure IPFS content retrieval with authentication headers
- Automatic login flow for seamless user experience

## File Management:

- Private and public IPFS vault support
- Authenticated PDF viewing and downloading
- Organized document categorization
- Blockchain-verified file integrity