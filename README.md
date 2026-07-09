# Cyber Security Portfolio

A highly interactive, immersive cyber-security portfolio built for **Akshayavardhan S.**, an undergraduate Cyber Security researcher and Full-Stack Engineer based in Chennai, India.

This portfolio is designed to look like a classified operative dossier, complete with a glassmorphic hacker aesthetic and an interactive command-line interface.

## 🛠 Tech Stack
- **Frontend Framework**: React (v19)
- **Build Tool**: Vite (v8)
- **Styling**: Vanilla CSS with custom glassmorphism, CRT scanline effects, and glowing neon highlights.
- **Icons**: `lucide-react`
- **Contact Form**: Formspree API (No backend required)

## ✨ Core Features
- **Interactive System Console**: A fully functional command-line interface at the bottom of the page. Visitors can type `help`, `whoami`, `ls`, or `cat resume.pdf` to interact with the site.
- **Operative Dossier**: A classified-style "About Me" section detailing experience in offensive security testing and secure software development.
- **Technical Arsenal**: Custom-built glowing CSS progress bars categorizing skills into Offensive Security, Defensive & Infra, and Engineering.
- **Project Modals**: Standardized, glassmorphic modals that display project features and key findings using a terminal typewriter reveal effect.
- **Resume Extraction**: A dedicated 1-click button to securely download the operative's CV.
- **Secure Comm Channel**: An inline contact form wired directly to a Formspree endpoint for immediate communication.

## 🚀 Getting Started

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/pacman-yay/portfolio.git
   ```
2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 📝 Things Yet to Complete (TODO)
- [ ] **Upload Actual Resume**: Drop the finalized `resume.pdf` into the `public/` directory so the "EXTRACT DOSSIER" button works correctly.
- [ ] **Add More Project Reports**: Upload additional PDF reports for the other featured missions (e.g., Hive Security, Python Firewall).
- [ ] **Configure Custom Domain**: Deploy the repository to a hosting provider (like Vercel or GitHub Pages) and link a custom domain (e.g., `akshaya.dev`).
- [ ] **Test Contact Form**: Verify that messages sent through the Formspree endpoint correctly arrive in the inbox.
