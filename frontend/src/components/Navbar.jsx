import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Bookmark, Globe, Layers, BarChart2, Compass, Shield, User, FileText } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useBookmarks } from '../hooks/useBookmarks';

const hasClerkKey = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function Navbar({ onOpenSearch }) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const { bookmarks } = useBookmarks();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart2 },
    { path: '/categories', label: 'Categories', icon: Layers },
    { path: '/compare', label: 'Compare', icon: Compass },
    { path: '/map', label: 'Map', icon: Globe },
    { path: '/trends', label: 'Trends', icon: Shield },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/bookmarks', label: `Bookmarks (${bookmarks.length})`, icon: Bookmark }
  ];

  return (
    <nav style={{
      height: '64px',
      backgroundColor: 'var(--color-canvas)',
      borderBottom: '1px solid var(--color-hairline)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      padding: '0 var(--space-lg)',
      transition: 'background-color 0.3s ease'
    }}>
      <div style={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        {/* Brand Logo - Fixed No Wrap */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          flex: '0 0 auto',
          whiteSpace: 'nowrap'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            flexShrink: 0
          }}>
            🇮🇳
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: '16px',
              fontWeight: '700',
              color: 'var(--color-ink)',
              letterSpacing: '-0.4px',
              lineHeight: '1.2',
              whiteSpace: 'nowrap'
            }}>
              India Global Scorecard
            </span>
            <span style={{
              fontSize: '10px',
              color: 'var(--color-muted)',
              lineHeight: '1.2',
              whiteSpace: 'nowrap'
            }}>
              Development Intelligence
            </span>
          </div>
        </Link>

        {/* Center Navigation Links - Responsive Center Row */}
        <div style={{
          flex: '1 1 auto',
          minWidth: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '4px',
          overflowX: 'auto',
          padding: '4px 0'
        }} className="nav-menu">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`category-tab ${isActive ? 'active' : ''}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  fontSize: '13px',
                  padding: '6px 12px'
                }}
              >
                <Icon size={14} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Actions Cluster - Fixed No Wrap */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: '0 0 auto'
        }}>
          {/* Global Search Bar Button */}
          <button
            onClick={onOpenSearch}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--color-surface-soft)',
              border: '1px solid var(--color-hairline)',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 12px',
              fontSize: '12px',
              color: 'var(--color-muted)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Search size={14} />
            <span className="search-text-desktop">Search...</span>
            <kbd style={{
              backgroundColor: 'var(--color-canvas)',
              border: '1px solid var(--color-hairline)',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '11px',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px',
              lineHeight: '1'
            }}>
              <span>⌘</span><span>K</span>
            </kbd>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--color-hairline)',
              backgroundColor: 'var(--color-canvas)',
              color: 'var(--color-ink)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              flexShrink: 0
            }}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Clerk Auth Integration with Fallback to Guest Mode */}
          {hasClerkKey ? (
            <>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="btn-primary" style={{ height: '34px', padding: '0 12px', fontSize: '12px' }}>
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </>
          ) : (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'var(--color-surface-card)',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              fontSize: '12px',
              fontWeight: '600',
              color: 'var(--color-ink)',
              border: '1px solid var(--color-hairline)',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              <User size={14} />
              <span>{user ? user.name : 'Guest Mode'}</span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
