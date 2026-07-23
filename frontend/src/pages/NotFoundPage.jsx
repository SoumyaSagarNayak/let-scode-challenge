import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container section-padding" style={{ textAlign: 'center', padding: '120px 20px' }}>
      <h1 className="display-xl" style={{ color: 'var(--color-brand-pink)', marginBottom: '16px' }}>404</h1>
      <h2 className="display-sm" style={{ marginBottom: '16px' }}>Page Not Found</h2>
      <p className="body-md" style={{ color: 'var(--color-muted)', maxWidth: '480px', margin: '0 auto 32px' }}>
        The development indicator or page requested does not exist in the Scorecard registry.
      </p>
      <Link to="/" className="btn-primary" style={{ padding: '12px 24px' }}>
        <ArrowLeft size={16} /> Return to Homepage
      </Link>
    </div>
  );
}
