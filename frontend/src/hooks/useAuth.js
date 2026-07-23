import { useState } from 'react';

export function useAuth() {
  const [isGuestMode, setIsGuestMode] = useState(() => {
    return localStorage.getItem('scorecard_guest_mode') === 'true' || true;
  });

  const [user, setUser] = useState(() => {
    return isGuestMode ? { name: 'Guest Explorer', role: 'Guest Mode', isGuest: true } : null;
  });

  const enableGuestMode = () => {
    setIsGuestMode(true);
    localStorage.setItem('scorecard_guest_mode', 'true');
    setUser({ name: 'Guest Explorer', role: 'Guest Mode', isGuest: true });
  };

  const logout = () => {
    setIsGuestMode(true);
    localStorage.setItem('scorecard_guest_mode', 'true');
    setUser({ name: 'Guest Explorer', role: 'Guest Mode', isGuest: true });
  };

  return { user, isGuestMode, enableGuestMode, logout };
}
