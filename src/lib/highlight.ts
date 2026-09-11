/**
 * Minimal zero-dependency multi-language syntax tokenizer for the static code
 * panel. Not a general-purpose highlighter — just enough to make our own
 * snippets readable across JS/Python/Java/C++ without pulling in
 * Monaco/Shiki for a scoped build.
 */

export type CodeLang = "js" | "python" | "java" | "cpp";

const KEYWORDS_BY_LANG: Record<CodeLang, Set<string>> = {
  js: new Set([
    "function", "return", "if", "else", "for", "while", "let", "const", "var",
    "new", "class", "extends", "constructor", "this", "null", "undefined",
    "true", "false", "typeof", "instanceof", "break", "continue", "switch",
    "case", "default", "throw", "try", "catch", "finally", "of", "in", "yield",
    "async", "await", "export", "import", "from", "static", "interface",
    "type", "implements", "public", "private", "readonly", "void",
  ]),
  python: new Set([
    "def", "return", "if", "elif", "else", "for", "while", "class", "self",
    "None", "True", "False", "and", "or", "not", "in", "is", "break",
    "continue", "pass", "raise", "try", "except", "finally", "yield",
    "import", "from", "as", "with", "lambda", "global", "nonlocal",
    "assert", "del", "async", "await", "int", "float", "str", "bool",
    "list", "dict", "set", "tuple", "Optional", "List", "Dict", "Tuple",
  ]),
  java: new Set([
    "public", "private", "protected", "static", "final", "class",
    "interface", "extends", "implements", "new", "return", "if", "else",
    "for", "while", "do", "switch", "case", "default", "break", "continue",
    "void", "int", "long", "double", "float", "boolean", "char", "byte",
    "short", "null", "true", "false", "this", "super", "throw", "throws",
    "try", "catch", "finally", "import", "package", "instanceof", "enum",
    "abstract", "synchronized", "volatile", "transient", "String",
  ]),
  cpp: new Set([
    "int", "long", "double", "float", "bool", "char", "void", "auto",
    "const", "static", "class", "struct", "public", "private", "protected",
    "return", "if", "else", "for", "while", "do", "switch", "case",
    "default", "break", "continue", "new", "delete", "nullptr", "true",
    "false", "this", "throw", "try", "catch", "namespace", "using",
    "template", "typename", "virtual", "override", "friend", "enum",
    "unsigned", "size_t", "include", "define", "constexpr", "inline",
  ]),
};

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

// Group 1: line comment (// ... or # ...)
// Group 2: string/char literal
// Group 3: number
// Group 4: word
// Group 5: punctuation
// Group 6: whitespace
const TOKEN_REGEX_CACHE = new Map<CodeLang, RegExp>();

function regexForLang(lang: CodeLang): RegExp {
  const cached = TOKEN_REGEX_CACHE.get(lang);
  if (cached) return cached;
  const commentPart = lang === "python" ? "(#.*$)" : "(//.*$)";
  const re = new RegExp(
    commentPart +
      `|("(?:[^"\\\\]|\\\\.)*"|'(?:[^'\\\\]|\\\\.)*'|` +
      "`(?:[^`\\\\]|\\\\.)*`)" +
      `|(\\b\\d+(?:\\.\\d+)?[fFlLuU]?\\b)|([a-zA-Z_$][\\w$]*)|([{}()[\\].,;:+\\-*/%<>=!&|?^~#]+)|(\\s+)`,
    "gm"
  );
  TOKEN_REGEX_CACHE.set(lang, re);
  return re;
}

export function tokenizeLine(line: string, lang: CodeLang = "js"): Token[] {
  const tokens: Token[] = [];
  const regex = regexForLang(lang);
  const keywords = KEYWORDS_BY_LANG[lang];
  let match: RegExpExecArray | null;
  regex.lastIndex = 0;
  let lastIndex = 0;

  while ((match = regex.exec(line)) !== null) {
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
        type: keywords.has(word) ? "keyword" : "plain",
      });
    } else if (punct) tokens.push({ text: punct, type: "punct" });
    else if (space) tokens.push({ text: space, type: "plain" });
    else tokens.push({ text: full, type: "plain" });
    lastIndex = regex.lastIndex;
    if (match.index === regex.lastIndex) regex.lastIndex++;
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
