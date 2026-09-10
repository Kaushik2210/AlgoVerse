/**
 * Minimal zero-dependency JS/TS syntax tokenizer for the static code panel.
 * Not a general-purpose highlighter — just enough to make our own snippets
 * readable without pulling in Monaco/Shiki for a scoped build.
 */

const KEYWORDS = new Set([
  "function", "return", "if", "else", "for", "while", "let", "const", "var",
  "new", "class", "extends", "constructor", "this", "null", "undefined",
  "true", "false", "typeof", "instanceof", "break", "continue", "switch",
  "case", "default", "throw", "try", "catch", "finally", "of", "in", "yield",
  "async", "await", "export", "import", "from", "static", "interface",
  "type", "implements", "public", "private", "readonly", "void",
]);

type TokenType =
  | "keyword"
  | "string"
  | "comment"
  | "number"
  | "function"
  | "punct"
  | "plain";

export interface Token {
  text: string;
  type: TokenType;
}

const TOKEN_REGEX =
  /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([a-zA-Z_$][\w$]*)|([{}()[\].,;:+\-*/%<>=!&|?^~]+)|(\s+)/gm;

export function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let match: RegExpExecArray | null;
  TOKEN_REGEX.lastIndex = 0;
  let lastIndex = 0;

  while ((match = TOKEN_REGEX.exec(line)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: line.slice(lastIndex, match.index), type: "plain" });
    }
    const [full, comment, str, num, word, punct, space] = match;
    if (comment) tokens.push({ text: comment, type: "comment" });
    else if (str) tokens.push({ text: str, type: "string" });
    else if (num) tokens.push({ text: num, type: "number" });
    else if (word) {
      tokens.push({
        text: word,
        type: KEYWORDS.has(word) ? "keyword" : "plain",
      });
    } else if (punct) tokens.push({ text: punct, type: "punct" });
    else if (space) tokens.push({ text: space, type: "plain" });
    else tokens.push({ text: full, type: "plain" });
    lastIndex = TOKEN_REGEX.lastIndex;
  }
  if (lastIndex < line.length) {
    tokens.push({ text: line.slice(lastIndex), type: "plain" });
  }
  return tokens;
}

export const tokenColorClass: Record<TokenType, string> = {
  keyword: "text-violet",
  string: "text-amber",
  comment: "text-text-muted italic",
  number: "text-cyan",
  function: "text-cyan",
  punct: "text-text-muted",
  plain: "text-foreground/90",
};
