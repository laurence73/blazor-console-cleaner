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
  /\s+[\w\-]+\.ts:\d+\s*$/,
  /\s+[\da-f]{8}:0x[\da-f]+\s*$/i,
  /\t+\S+\.(js|ts):\d+\s*$/,
];

// Handle keyboard shortcut
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'clean-clipboard') {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Execute script to read and clean clipboard
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
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
          const TRAILING_GARBAGE = [
            /\s+blazor\.webassembly\.js:\d+\s*$/,
            /\s+polyfills\.ts:\d+\s*$/,
            /\s+dotnet\.native\.\S+\.js:\d+\s*$/,
            /\s+scheduling\.ts:\d+\s*$/,
            /\s+managed-exports\.ts:\d+\s*$/,
            /\s+invoke-js\.ts:\d+\s*$/,
            /\s+marshal-to-cs\.ts:\d+\s*$/,
            /\s+cancelable-promise\.ts:\d+\s*$/,
            /\s+[\w\-]+\.ts:\d+\s*$/,
            /\s+[\da-f]{8}:0x[\da-f]+\s*$/i,
            /\t+\S+\.(js|ts):\d+\s*$/,
          ];

          return navigator.clipboard.readText().then(text => {
            const cleaned = text
              .split('\n')
              .filter(line => {
                const trimmed = line.trim();
                if (!trimmed) return false;
                return !GARBAGE_LINE_PATTERNS.some(pattern => pattern.test(line));
              })
              .map(line => {
                let cleaned = line;
                for (const pattern of TRAILING_GARBAGE) {
                  cleaned = cleaned.replace(pattern, '');
                }
                return cleaned.trimEnd();
              })
              .filter(line => line.trim())
              .join('\n')
              .trim();
            return navigator.clipboard.writeText(cleaned);
          });
        }
      });

      console.log('Clipboard cleaned');
    } catch (err) {
      console.error('Failed to clean clipboard:', err);
    }
  }
});
