import { useEffect, useRef, useState } from "react";

const controlClass =
  "mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/15";

// Matches a real line break, or the literal two-character sequence "\n"
// (backslash + n). Earlier revisions of this field were wired with
// separator="\n" in JSX — which passes those two characters instead of a
// newline — so previously typed text can contain them.
const LINE_SPLIT_PATTERN = /\r?\n|\\n/;

function joinList(items: string[], multiline: boolean) {
  return multiline ? items.join("\n") : items.join(", ");
}

function parseList(value: string, multiline: boolean) {
  return value
    .split(multiline ? LINE_SPLIT_PATTERN : ",")
    .map((item) => item.trim())
    .filter(Boolean);
}

/**
 * A list editor that fixes the "comma disappears while typing" bug:
 * the input keeps the raw text as typed (commas and spaces included) and
 * only reformats to the canonical joined value on blur. The parsed array is
 * emitted on every change so the draft stays in sync live.
 *
 * Use `multiline` for one-item-per-line fields (challenges, paragraphs);
 * the default comma mode is for comma-separated fields (tech stack, tags).
 */
export default function ListField({
  label,
  items,
  onChange,
  multiline = false,
  placeholder,
  rows,
}: {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  multiline?: boolean;
  placeholder?: string;
  rows?: number;
}) {
  const [text, setText] = useState(() => joinList(items, multiline));
  const lastEmitted = useRef<string[]>(items);

  // Re-sync only when the value changes from the outside (content load,
  // "Restore defaults") — not when our own parse round-trips back.
  useEffect(() => {
    if (items !== lastEmitted.current) {
      lastEmitted.current = items;
      setText(joinList(items, multiline));
    }
  }, [items, multiline]);

  function handleChange(value: string) {
    setText(value);
    const parsed = parseList(value, multiline);
    lastEmitted.current = parsed;
    onChange(parsed);
  }

  function handleBlur() {
    setText(joinList(lastEmitted.current, multiline));
  }

  const sharedProps = {
    value: text,
    placeholder,
    onChange: (event: { target: { value: string } }) =>
      handleChange(event.target.value),
    onBlur: handleBlur,
  };

  return (
    <label className="block text-sm font-medium text-slate-300">
      {label}
      {multiline && rows ? (
        <textarea {...sharedProps} rows={rows} className={`${controlClass} resize-y`} />
      ) : (
        <input {...sharedProps} type="text" className={controlClass} />
      )}
    </label>
  );
}
