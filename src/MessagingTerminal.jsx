import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import "xterm/css/xterm.css";
import { sendFacebookMessage } from "./api/facebook.js";
import { hofiPushMessage, messageBuckets } from "./data/inbox.js";

const themes = [
  {
    name: "hotline",
    background: "#1e1e1e",
    foreground: "#00ffff",
    cursor: "#00ffff"
  },
  {
    name: "matrix",
    background: "#000000",
    foreground: "#39ff14",
    cursor: "#39ff14"
  },
  {
    name: "cyberpink",
    background: "#2b001d",
    foreground: "#ff69b4",
    cursor: "#ff69b4"
  },
  {
    name: "aurora",
    background: "#1d1f21",
    foreground: "#8be9fd",
    cursor: "#50fa7b"
  },
  {
    name: "nord",
    background: "#2e3440",
    foreground: "#d8dee9",
    cursor: "#88c0d0"
  }
];

export default function HofivisionTerminal() {
  const terminalRef = useRef(null);

  useEffect(() => {
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const term = new Terminal({
      theme,
      fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
      fontSize: 14,
      cursorBlink: true,
    });

    term.open(terminalRef.current);
    term.writeln("🛰️ hofivision terminal booting...");
    term.writeln("Type 'help' to see available commands.\n");
    term.write("hofi> ");

    // Inject test
    hofiPushMessage({
      platform: 'facebook',
      senderId: 'demo-user-1234',
      text: 'This is a test message from Facebook 🧪',
      timestamp: Date.now(),
    });

    let currentCommand = "";

    term.onData(data => {
      switch (data) {
        case "\r":
          handleCommand(currentCommand.trim(), term);
          currentCommand = "";
          term.write("\r\nhofi> ");
          break;
        case "\u007F":
          if (currentCommand.length > 0) {
            currentCommand = currentCommand.slice(0, -1);
            term.write("\b \b");
          }
          break;
        default:
          currentCommand += data;
          term.write(data);
      }
    });

    return () => term.dispose();
  }, []);

  const handleCommand = async (cmd, term) => {
    const parts = cmd.split(" ");
    const base = parts[0];

    switch (base.toLowerCase()) {
      case "help":
        term.writeln("\nAvailable commands:");
        term.writeln("  help              Show available commands");
        term.writeln("  clear             Clear the terminal");
        term.writeln("  version           Show version info");
        term.writeln("  connect           Simulate connecting to inboxes");
        term.writeln("  inbox             Show received messages");
        term.writeln("  sendfb USER MSG   Send FB message to user ID\n");
        break;

      case "clear":
        term.clear();
        break;

      case "version":
        term.writeln("hofivision v0.1-alpha\n");
        break;

      case "connect":
        term.writeln("Connecting to Gmail, Reverb, Instagram... ✅\n");
        break;

      case "inbox":
        term.writeln("📥 Inbox:");
        Object.entries(messageBuckets).forEach(([platform, messages]) => {
          messages.forEach((msg) => {
            term.writeln(`[${platform}] <${msg.senderId}> ${msg.text}`);
          });
        });
        term.writeln("");
        break;

      case "sendfb":
        if (parts.length < 3) {
          term.writeln("Usage: sendfb USER_ID MESSAGE\n");
          break;
        }
        const userId = parts[1];
        const msg = parts.slice(2).join(" ");
        try {
          await sendFacebookMessage(userId, msg, process.env.FB_TOKEN);
          term.writeln(`✅ Sent to ${userId}: ${msg}\n`);
        } catch (err) {
          term.writeln(`❌ Failed to send: ${err.message}\n`);
        }
        break;

      default:
        term.writeln(`Unknown command: '${cmd}'\n`);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-gradient-to-b from-neutral-100 to-neutral-300">
      <div className="rounded-lg shadow-xl border border-neutral-300 w-[800px] overflow-hidden">
        <div className="bg-neutral-200 h-7 flex items-center px-3 space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-xs text-gray-600 font-mono">hofivision — zsh</span>
        </div>
        <div ref={terminalRef} className="bg-[#fadadd] text-black w-full h-[500px]" />
      </div>
    </div>
  );
}