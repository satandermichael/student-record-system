const fs = require('fs');
let css = fs.readFileSync('public/style.css', 'utf-8');

// 1. Add CSS Variables and Dark Mode Theme
css = css.replace(/:root {[\s\S]*?}/, `:root {
  --primary-color: #6366f1;
  --primary-hover: #4f46e5;
  --danger-color: #ef4444;
  --danger-hover: #dc2626;
  --text-main: #1f2937;
  --text-muted: #6b7280;
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.5);
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  --bg-gradient-1: #fdfbfb;
  --bg-gradient-2: #ebedee;
  --bg-gradient-3: #e0e7ff;
  --navbar-bg: rgba(255, 255, 255, 0.8);
  --navbar-border: rgba(255, 255, 255, 0.3);
  --input-bg: rgba(255, 255, 255, 0.9);
  --table-bg: rgba(255, 255, 255, 0.6);
  --table-th-bg: rgba(255, 255, 255, 0.8);
  --table-tr-hover: rgba(255, 255, 255, 0.9);
  --card-bg: rgba(255, 255, 255, 0.5);
  --input-border: rgba(0,0,0,0.1);
}

[data-theme="dark"] {
  --primary-color: #818cf8;
  --primary-hover: #6366f1;
  --text-main: #f3f4f6;
  --text-muted: #9ca3af;
  --glass-bg: rgba(17, 24, 39, 0.7);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  --bg-gradient-1: #111827;
  --bg-gradient-2: #1f2937;
  --bg-gradient-3: #374151;
  --navbar-bg: rgba(17, 24, 39, 0.8);
  --navbar-border: rgba(255, 255, 255, 0.1);
  --input-bg: rgba(31, 41, 55, 0.9);
  --table-bg: rgba(31, 41, 55, 0.6);
  --table-th-bg: rgba(17, 24, 39, 0.8);
  --table-tr-hover: rgba(55, 65, 81, 0.9);
  --card-bg: rgba(31, 41, 55, 0.5);
  --input-border: rgba(255,255,255,0.1);
}`);

css = css.replace('background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%, #e0e7ff 100%);', 'background: linear-gradient(135deg, var(--bg-gradient-1) 0%, var(--bg-gradient-2) 100%, var(--bg-gradient-3) 100%);');
css = css.replace('background: rgba(255, 255, 255, 0.8);', 'background: var(--navbar-bg);');
css = css.replace('border-bottom: 1px solid rgba(255, 255, 255, 0.3);', 'border-bottom: 1px solid var(--navbar-border);');
css = css.replace('background: rgba(255,255,255,0.9);', 'background: var(--input-bg);');
css = css.replace('border: 1px solid rgba(0,0,0,0.1);', 'border: 1px solid var(--input-border);');
css = css.replace('background: rgba(255, 255, 255, 0.6);', 'background: var(--table-bg);');
css = css.replace('background: rgba(255, 255, 255, 0.8);', 'background: var(--table-th-bg);');
css = css.replace('background: rgba(255, 255, 255, 0.9);', 'background: var(--table-tr-hover);');
css = css.replace('background: rgba(255,255,255,0.8);', 'background: var(--input-bg);');
css = css.replace('background: #fff;', 'background: var(--input-bg);');
css = css.replace('background: rgba(255,255,255,0.5);', 'background: var(--card-bg);');
css = css.replace('border: 1px solid rgba(0,0,0,0.1);', 'border: 1px solid var(--input-border);');

css += `
/* Errors */
.error-message {
  color: var(--danger-color);
  font-size: 0.85rem;
  margin-top: 0.3rem;
}
.alert {
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border-left: 4px solid var(--danger-color);
  color: var(--danger-color);
  margin-bottom: 1.5rem;
  border-radius: 4px;
}
.alert ul {
  margin-left: 1.5rem;
  margin-top: 0.5rem;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
}
.pagination-info {
  font-size: 0.9rem;
  color: var(--text-muted);
}
.btn-disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* Chart */
.chart-container {
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
}
`;

fs.writeFileSync('public/style.css', css);
