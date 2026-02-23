# Art AI - Deployment Instructions

## 🚀 Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `art-ai-website`
3. Keep it public (required for free GitHub Pages)
4. DON'T initialize with README (we already have one)
5. Click "Create repository"

### Step 2: Push Code to GitHub

```bash
cd /Users/jackrockell/Desktop/art-ai-website
git remote add origin https://github.com/YOUR_USERNAME/art-ai-website.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. The workflow will automatically deploy on push

### Step 4: Wait for Deployment (60 seconds)

The site will be live at:
```
https://YOUR_USERNAME.github.io/art-ai-website/
```

---

## 🌐 Custom Domain Setup (Optional)

If you want to use a custom domain like `artai.com`:

### 1. Add Custom Domain in GitHub

1. Repository Settings → Pages
2. Custom domain: `artai.com`
3. Click Save

### 2. Configure DNS (at your registrar)

Add these DNS records:

```
Type: A
Host: @
Value: 185.199.108.153

Type: A
Host: @
Value: 185.199.109.153

Type: A
Host: @
Value: 185.199.110.153

Type: A
Host: @
Value: 185.199.111.153

Type: CNAME
Host: www
Value: YOUR_USERNAME.github.io
```

### 3. Wait for DNS Propagation (10 min - 24 hours)

Check status: https://www.whatsmydns.net/

### 4. Enable HTTPS

GitHub will auto-provision SSL certificate after DNS propagation.

---

## 📝 Update Content

### Update Contact Email

Edit `src/App.jsx`:

```jsx
// Line ~213
<a href="mailto:hello@artai.com" className="contact-link">hello@artai.com</a>
```

Replace with your actual email address.

### Update Services

Edit `src/App.jsx`:

```jsx
// Lines ~37-58
const services = [
  {
    icon: Brain,
    title: "AI Strategy & Consulting",
    description: "Transform your business with intelligent AI solutions tailored to your needs",
    color: "#8B5CF6"
  },
  // Add/edit services here
]
```

### Update Color Scheme

Edit `src/App.css` to change the purple/blue gradient:

```css
/* Current colors */
--purple: #8B5CF6
--blue: #3B82F6
--green: #10B981
```

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173/art-ai-website/)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📊 Next Steps

### Immediate (Today):
- [ ] Push to GitHub
- [ ] Enable GitHub Pages
- [ ] Test live site
- [ ] Update email address to real one
- [ ] Share link with Darren

### Short Term (This Week):
- [ ] Set up custom domain (if desired)
- [ ] Add Google Analytics
- [ ] Set up form submission (currently logs to console)
- [ ] Add real company email for contact form

### Form Integration Options:

**Option 1: Formspree (Easiest)**
```bash
npm install @formspree/react
```
Free tier: 50 submissions/month

**Option 2: EmailJS**
Free tier: 200 emails/month

**Option 3: Custom Backend**
Set up Node.js backend with SendGrid/AWS SES

---

## 🎨 Design Notes

### Color Palette:
- Primary: Purple (#8B5CF6) - Innovation, creativity
- Secondary: Blue (#3B82F6) - Trust, technology
- Accent: Green (#10B981) - Growth, success
- Dark: Black (#0a0a0a) - Modern, professional

### Typography:
- Font: Inter (system fonts fallback)
- Headings: 800 weight (extrabold)
- Body: 400 weight (regular)

### Responsive Breakpoints:
- Mobile: < 480px
- Tablet: 480px - 768px  
- Desktop: > 768px

---

## 📱 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Android (latest)

---

## ⚡ Performance

**Current Bundle Size:**
- HTML: ~0.5 KB
- CSS: ~8 KB
- JS: ~150 KB (includes React + Framer Motion)
- **Total:** ~160 KB (~40 KB gzipped)

**Load Time Goals:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Score: 95+

---

## 🐛 Troubleshooting

### Site not loading after push
1. Check Actions tab for build errors
2. Ensure GitHub Pages is enabled with "GitHub Actions" source
3. Wait 60 seconds for first deployment

### Styles not loading
1. Check `vite.config.js` has correct `base` path
2. Clear browser cache
3. Rebuild: `npm run build`

### Form not submitting
Currently the form just shows success message. You need to:
1. Set up Formspree/EmailJS
2. Or create backend API endpoint
3. Update `handleSubmit` function in `App.jsx`

---

## 📞 Support

Built using the same methodology as Syd Wells Charity website (see BUILD_DOCUMENTATION.md)

**Tech Stack:**
- React 18
- Vite 5 (10x faster than webpack)
- Framer Motion (smooth animations)
- Lucide React (beautiful icons)
- GitHub Pages (free hosting)

**Build Time:** ~20 minutes from scratch to deployed

---

**Built with AI ✨ - Ready to show Darren!**
