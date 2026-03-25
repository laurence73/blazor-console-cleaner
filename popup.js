// Lines that are ENTIRELY garbage (stack traces) - remove whole line
const GARBAGE_LINE_PATTERNS = [
  /^\s*\$func\d+\s*@/,
  /^\s*@\s*[\da-f]+:0x[\da-f]+/i,
  /^\s*\$mono_wasm/,
  /^\s*Module\._mono_wasm/,
  /^\s*[\da-f]{8}:0x[\da-f]+$/i,
  /^\s*\(anonymous\)\s*@/,
  /^\s*hn\s*@/,
  /^\s*mo\s*@/,
  /^\s*Fc\s*@/,
  /^\s*complete_task_wrapper\s*@/,
  /^\s*resolve\s*@/,
  /^\s*Promise\.then\s*$/,
  /^\s*dotnet\.native\.\S+\.js:\d+\s*$/,
  /^\s*managed-exports\.ts:\d+\s*$/,
  /^\s*cancelable-promise\.ts:\d+\s*$/,
  /^\s*marshal-to-cs\.ts:\d+\s*$/,
  /^\s*invoke-js\.ts:\d+\s*$/,
  /^\s*scheduling\.ts:\d+\s*$/,
];

// Trailing garbage to strip from END of lines (source references)
const TRAILING_GARBAGE = [
  /\s+blazor\.webassembly\.js:\d+\s*$/,
  /\s+polyfills\.ts:\d+\s*$/,
  /\s+dotnet\.native\.\S+\.js:\d+\s*$/,
  /\s+scheduling\.ts:\d+\s*$/,
  /\s+managed-exports\.ts:\d+\s*$/,
  /\s+invoke-js\.ts:\d+\s*$/,
  /\s+marshal-to-cs\.ts:\d+\s*$/,
  /\s+cancelable-promise\.ts:\d+\s*$/,
  /\s+[\w\-]+\.ts:\d+\s*$/,  // Generic .ts file references
  /\s+[\da-f]{8}:0x[\da-f]+\s*$/i,  // WASM addresses
  /\t+\S+\.(js|ts):\d+\s*$/,  // Tab-separated source refs
];

function cleanText(text) {
  return text
    .split('\n')
    .filter(line => {
      const trimmed = line.trim();
      if (!trimmed) return false; // Remove empty lines
      // Remove lines that are entirely garbage
      return !GARBAGE_LINE_PATTERNS.some(pattern => pattern.test(line));
    })
    .map(line => {
      // Strip trailing source references from lines with actual content
      let cleaned = line;
      for (const pattern of TRAILING_GARBAGE) {
        cleaned = cleaned.replace(pattern, '');
      }
      return cleaned.trimEnd();
    })
    .filter(line => line.trim()) // Remove any lines that became empty
    .join('\n')
    .trim();
}

function showStatus(message, isError = false) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.style.color = isError ? '#f48771' : '#6a9955';
  setTimeout(() => { status.textContent = ''; }, 2000);
}

async function loadLogs() {
  const logsDiv = document.getElementById('logs');

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { type: 'GET_LOGS' });

    if (response && response.logs && response.logs.length > 0) {
      logsDiv.innerHTML = response.logs.map(log => {
        return `<div class="log-entry ${log.type}"><span class="timestamp">${log.timestamp}</span><span class="type">${log.type}</span>${escapeHtml(log.message)}</div>`;
      }).join('');
      logsDiv.scrollTop = logsDiv.scrollHeight;
    } else {
      logsDiv.textContent = 'No logs captured yet. Refresh the page to start capturing.';
    }
  } catch (err) {
    logsDiv.textContent = 'Could not connect to page. Try refreshing the page.';
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function copyLogs() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const response = await chrome.tabs.sendMessage(tab.id, { type: 'GET_LOGS' });

    if (response && response.logs && response.logs.length > 0) {
      const text = response.logs.map(log => `[${log.timestamp}] ${log.type.toUpperCase()}: ${log.message}`).join('\n');
      await navigator.clipboard.writeText(text);
      showStatus('Copied ' + response.logs.length + ' log entries!');
    } else {
      showStatus('No logs to copy', true);
    }
  } catch (err) {
    showStatus('Failed to copy: ' + err.message, true);
  }
}

async function clearLogs() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.tabs.sendMessage(tab.id, { type: 'CLEAR_LOGS' });
    document.getElementById('logs').textContent = 'Logs cleared.';
    showStatus('Logs cleared');
  } catch (err) {
    showStatus('Failed to clear', true);
  }
}

async function cleanClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    const cleaned = cleanText(text);
    await navigator.clipboard.writeText(cleaned);

    const originalLines = text.split('\n').length;
    const cleanedLines = cleaned.split('\n').length;
    const removed = originalLines - cleanedLines;

    showStatus(`Cleaned! Removed ${removed} lines of garbage.`);
  } catch (err) {
    showStatus('Failed: ' + err.message, true);
  }
}

document.getElementById('copyLogs').addEventListener('click', copyLogs);
document.getElementById('refresh').addEventListener('click', loadLogs);
document.getElementById('clear').addEventListener('click', clearLogs);
document.getElementById('cleanClipboard').addEventListener('click', cleanClipboard);

// Load logs on popup open
loadLogs();
