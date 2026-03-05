// src/shared/components/Footer.tsx
import { motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  FileText,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Shield,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { appRoutes } from "../constants/routes";

// Import artech logo
import artechLogo from "../../assets/images/artech.svg";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: "Gallery", path: appRoutes.dashboard.path },
      { name: "Artist Portfolios", path: appRoutes.attachments.path },
      { name: "Programs", path: "#" },
      { name: "Events", path: "#" },
    ],
    about: [
      { name: "About ArTech", path: "#" },
      { name: "Our Mission", path: "#" },
      { name: "AHRC NYC", path: "#" },
      { name: "Contact Us", path: "#" },
    ],
    resources: [
      { name: "Artist Support", path: "#" },
      { name: "Community Partners", path: "#" },
      { name: "Accessibility", path: "#" },
      { name: "Visit Us", path: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-obsidian-500 border-t border-luxury-gold-500/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={artechLogo}
                alt="ArTech"
                className="h-12"
                style={{ filter: "brightness(0) saturate(100%) invert(1)" }}
              />
            </div>

            <p className="text-pearl-300 mb-6 max-w-sm">
              Empowering artists with intellectual and developmental
              disabilities through inclusive, innovative approaches to
              traditional and new media.
            </p>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-luxury-gold-500" />
                <span className="text-sm text-pearl-400">
                  AHRC NYC Operated
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-luxury-gold-500" />
                <span className="text-sm text-pearl-400">50+ Artists</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-luxury-gold-500/30 
                           flex items-center justify-center text-luxury-gold-500
                           hover:bg-luxury-gold-500 hover:text-obsidian-500 
                           transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div>
            <h4 className="text-luxury-gold-500 font-medium mb-6 tracking-wider">
              EXPLORE
            </h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-pearl-300 hover:text-luxury-gold-500 
                             transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-luxury-gold-500 font-medium mb-6 tracking-wider">
              RESOURCES
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-pearl-300 hover:text-luxury-gold-500 
                             transition-colors duration-200 text-sm flex items-center gap-1"
                  >
                    {link.name}
                    {link.name.includes("Visit") && (
                      <ExternalLink className="w-3 h-3" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-luxury-gold-500 font-medium mb-6 tracking-wider">
              ABOUT
            </h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-pearl-300 hover:text-luxury-gold-500 
                             transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-luxury-gold-500/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center gap-3 text-pearl-300">
              <Mail className="w-4 h-4 text-luxury-gold-500" />
              <a
                href="mailto:info@artechcollective.org"
                className="hover:text-luxury-gold-500 transition-colors"
              >
                info@artechcollective.org
              </a>
            </div>
            <div className="flex items-center gap-3 text-pearl-300">
              <Phone className="w-4 h-4 text-luxury-gold-500" />
              <a
                href="tel:+1234567890"
                className="hover:text-luxury-gold-500 transition-colors"
              >
                +1 (234) 567-890
              </a>
            </div>
            <div className="flex items-center gap-3 text-pearl-300">
              <Globe className="w-4 h-4 text-luxury-gold-500" />
              <span>All Five Boroughs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-obsidian-400/50 border-t border-luxury-gold-500/10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-pearl-400">
              <span>
                © {currentYear} ArTech Collective. All rights reserved.
              </span>
              <span className="hidden md:inline">|</span>
              <span className="flex items-center gap-2">
                A program of AHRC New York City
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-pearl-400">
              <FileText className="w-4 h-4 text-luxury-gold-500" />
              <span>
                Supported by NY State Council on the Arts & NYC Dept of Cultural
                Affairs
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
