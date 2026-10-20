/**
 * Original illustrations of school supplies and a classroom.
 * They stand in where real Jukar photographs have not been supplied yet,
 * and deliberately show objects — never invented children or events.
 * All are decorative (aria-hidden); the surrounding copy carries meaning.
 */

const C = {
  paper: "#f6f0e4",
  sheet: "#fcfaf5",
  ink: "#1c1e1a",
  forest: "#1f3b2d",
  forestDeep: "#15291f",
  forestSoft: "#2c4d3b",
  sun: "#f2b33d",
  sunSoft: "#f8d589",
  sunDark: "#d9951f",
  clay: "#b4502d",
  ruled: "#bfcdd6",
  kraft: "#dcc7a3",
  wood: "#9c7448",
  woodDark: "#7a5734",
  metal: "#c7c1b4",
  eraser: "#e4927c",
};

const hand = { fontFamily: "var(--font-hand), cursive" } as const;

/* ── Shared objects ───────────────────────────────────────── */

function Pencil({ length = 260, body = C.sun, stripe = C.sunDark }: { length?: number; body?: string; stripe?: string }) {
  return (
    <g>
      <rect x="-50" y="2" width={length + 100} height="22" rx="6" fill="#000" opacity=".1" transform="translate(4 6)" />
      <rect x="-48" y="0" width="24" height="22" rx="5" fill={C.eraser} />
      <rect x="-26" y="0" width="26" height="22" fill={C.metal} />
      <path d="M-20 0v22M-12 0v22M-4 0v22" stroke="#a9a293" strokeWidth="1.5" />
      <rect x="0" y="0" width={length} height="22" fill={body} />
      <path d={`M0 7.5H${length}M0 14.5H${length}`} stroke={stripe} strokeWidth="1.5" />
      <path d={`M${length} 0L${length + 40} 11L${length} 22Z`} fill="#e8c8a0" />
      <path d={`M${length + 27} 6.6L${length + 40} 11L${length + 27} 15.4Z`} fill={C.ink} />
    </g>
  );
}

function Pen({ length = 210, body = C.forestSoft, cap = C.forestDeep }: { length?: number; body?: string; cap?: string }) {
  return (
    <g>
      <rect x="0" y="2" width={length + 30} height="16" rx="8" fill="#000" opacity=".1" transform="translate(4 6)" />
      <rect x="0" y="0" width={length} height="16" rx="8" fill={body} />
      <path d={`M${length - 2} 2L${length + 26} 8L${length - 2} 14Z`} fill={C.metal} />
      <circle cx={length + 25} cy="8" r="1.8" fill={C.ink} />
      <rect x="-6" y="-1" width="78" height="18" rx="8" fill={cap} />
      <rect x="6" y="-6" width="52" height="5" rx="2.5" fill={C.metal} />
    </g>
  );
}

function BookStack({ width = 220 }: { width?: number }) {
  const covers = [C.clay, C.forest, C.sun];
  return (
    <g>
      <rect x="6" y="10" width={width} height="108" rx="4" fill="#000" opacity=".12" />
      {covers.map((cover, i) => (
        <g key={cover} transform={`translate(${i % 2 === 0 ? 0 : 10} ${i * 36})`}>
          <rect width={width} height="34" rx="4" fill={cover} />
          <rect x={width - 14} y="5" width="10" height="24" fill={C.sheet} />
          <path d={`M${width - 12} 11h8M${width - 12} 17h8M${width - 12} 23h8`} stroke={C.ruled} strokeWidth="1" />
          <rect x="18" y="11" width="64" height="12" rx="2" fill={C.sheet} opacity=".85" />
        </g>
      ))}
    </g>
  );
}

/* ── Hero: a flat-lay of a school desk ────────────────────── */

export function SuppliesStillLife({ className }: { className?: string }) {
  const lines = Array.from({ length: 12 }, (_, i) => 52 + i * 22);
  return (
    <svg viewBox="0 0 560 700" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <rect width="560" height="700" fill={C.kraft} />
      <path d="M0 140C180 120 360 170 560 130M0 420c160-25 380 20 560-8M0 610c200 15 330-20 560 5" stroke="#cdb48b" strokeWidth="2" fill="none" opacity=".55" />

      {/* Ruler */}
      <g transform="translate(-20 38) rotate(-4)">
        <rect width="360" height="44" rx="3" fill={C.sunSoft} />
        {Array.from({ length: 34 }, (_, i) => (
          <path key={i} d={`M${12 + i * 10} 0v${i % 5 === 0 ? 16 : 9}`} stroke={C.woodDark} strokeWidth="1.4" />
        ))}
      </g>

      {/* Open exercise book */}
      <g transform="translate(58 132) rotate(-6 220 165)">
        <rect x="2" y="12" width="440" height="330" rx="8" fill="#000" opacity=".14" />
        <rect x="-6" y="-6" width="452" height="332" rx="8" fill={C.forest} />
        <rect x="0" y="0" width="219" height="320" rx="3" fill={C.sheet} />
        <rect x="221" y="0" width="219" height="320" rx="3" fill={C.sheet} />
        <path d="M220 0v320" stroke="#d9d1c2" strokeWidth="3" />
        {lines.map((y) => (
          <path key={y} d={`M10 ${y}H210M230 ${y}H430`} stroke={C.ruled} strokeWidth="1.3" />
        ))}
        <path d="M38 0v320M258 0v320" stroke={C.clay} strokeWidth="1.4" opacity=".7" />
        <text x="52" y="92" fontSize="30" fill={C.forest} style={hand}>a b c d e</text>
        <text x="52" y="158" fontSize="30" fill={C.forest} style={hand}>1 + 2 = 3</text>
        <text x="52" y="224" fontSize="30" fill={C.forest} style={hand}>4 × 2 = 8</text>
        <path d="M54 252c30-10 70-8 120 2" stroke={C.clay} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* a child's drawing: sun and a tree */}
        <circle cx="330" cy="104" r="22" fill="none" stroke={C.sunDark} strokeWidth="3" />
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <path
              key={i}
              d={`M${330 + Math.cos(a) * 30} ${104 + Math.sin(a) * 30}L${330 + Math.cos(a) * 42} ${104 + Math.sin(a) * 42}`}
              stroke={C.sunDark}
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        <path d="M300 260v-50" stroke={C.woodDark} strokeWidth="4" strokeLinecap="round" />
        <path d="M300 214c-30 0-34-40-8-44 0-22 32-22 34 0 26 6 18 46-10 44z" fill="none" stroke={C.forestSoft} strokeWidth="3" strokeLinejoin="round" />
        <path d="M262 262c40-6 110-6 160 0" stroke={C.forestSoft} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Pen */}
      <g transform="translate(402 84) rotate(64)">
        <Pen length={200} />
      </g>

      {/* Long pencil */}
      <g transform="translate(110 560) rotate(-24)">
        <Pencil length={250} />
      </g>

      {/* Short, well-loved pencil */}
      <g transform="translate(70 486) rotate(9)">
        <Pencil length={92} body={C.clay} stripe="#93401f" />
      </g>

      {/* Eraser */}
      <g transform="translate(470 450) rotate(14)">
        <rect x="3" y="6" width="56" height="30" rx="5" fill="#000" opacity=".12" />
        <rect width="56" height="30" rx="5" fill={C.eraser} />
        <rect x="22" width="34" height="30" rx="2" fill="#4a7ea6" />
      </g>

      {/* Stack of exercise books */}
      <g transform="translate(320 556) rotate(5)">
        <BookStack width={230} />
      </g>
    </svg>
  );
}

/* ── Fees: a classroom with a seat waiting ────────────────── */

export function ClassroomScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 520" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <rect width="640" height="520" fill="#e7dcc7" />
      <path d="M470 0h170v520L330 520z" fill={C.sunSoft} opacity=".35" />
      <rect y="410" width="640" height="110" fill={C.kraft} />
      <path d="M0 410h640" stroke="#c4ab82" strokeWidth="3" />

      {/* Chalkboard */}
      <rect x="44" y="50" width="400" height="236" rx="4" fill={C.woodDark} />
      <rect x="56" y="62" width="376" height="212" fill={C.forestDeep} />
      <text x="84" y="132" fontSize="44" fill={C.paper} opacity=".92" style={hand}>A  B  C</text>
      <text x="84" y="200" fontSize="38" fill={C.paper} opacity=".85" style={hand}>1 + 1 = 2</text>
      <path d="M84 222c50-8 120-8 170 0" stroke={C.sunSoft} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".8" />
      <circle cx="366" cy="132" r="26" fill="none" stroke={C.sunSoft} strokeWidth="3" opacity=".9" />
      <path d="M366 92v-12M366 184v-12M326 132h-12M418 132h-12M338 104l-8-8M402 168l-8-8M394 104l8-8M330 168l8-8" stroke={C.sunSoft} strokeWidth="3" strokeLinecap="round" opacity=".9" />
      <rect x="50" y="284" width="388" height="10" rx="2" fill={C.wood} />
      <rect x="120" y="279" width="22" height="6" rx="2" fill={C.sheet} />

      {/* Window */}
      <rect x="494" y="60" width="104" height="150" rx="4" fill={C.sheet} />
      <rect x="502" y="68" width="88" height="134" fill="#cfe0dd" />
      <path d="M546 68v134M502 135h88" stroke={C.sheet} strokeWidth="6" />

      {/* Desk */}
      <rect x="328" y="334" width="262" height="18" rx="3" fill={C.wood} />
      <rect x="342" y="352" width="12" height="122" fill={C.woodDark} />
      <rect x="564" y="352" width="12" height="122" fill={C.woodDark} />
      <rect x="354" y="370" width="210" height="10" fill={C.woodDark} opacity=".8" />
      {/* open book + pencil on the desk */}
      <path d="M392 334l18-22h56l-2 22zM466 334l2-22h56l18 22z" fill={C.sheet} />
      <path d="M466 312v22" stroke="#d6cdbc" strokeWidth="2" />
      <path d="M418 318h38M416 324h40M474 318h40M476 324h40" stroke={C.ruled} strokeWidth="1.5" />
      <g transform="translate(400 300) rotate(-8)">
        <rect width="118" height="8" fill={C.sun} />
        <path d="M118 0l16 4-16 4z" fill="#e8c8a0" />
      </g>

      {/* Chair */}
      <rect x="214" y="290" width="12" height="190" rx="3" fill={C.forest} />
      <rect x="214" y="296" width="96" height="40" rx="6" fill={C.forest} />
      <rect x="214" y="384" width="112" height="14" rx="4" fill={C.forestSoft} />
      <rect x="312" y="398" width="12" height="82" rx="3" fill={C.forest} />
      <rect x="226" y="398" width="10" height="82" rx="3" fill={C.forestSoft} />

      {/* School bag hanging on the chair */}
      <path d="M218 330c-10 40-6 74 6 96" stroke={C.ink} strokeWidth="5" fill="none" strokeLinecap="round" />
      <rect x="164" y="368" width="74" height="92" rx="16" fill={C.clay} />
      <path d="M164 398h74" stroke="#8e3c1f" strokeWidth="3" />
      <rect x="182" y="414" width="38" height="28" rx="6" fill="#c9653f" />
      <circle cx="201" cy="398" r="4" fill={C.sun} />
    </svg>
  );
}

/* ── Materials: small sketches for each supply ────────────── */

export type SupplyKind = "exercise-books" | "notebook" | "pencils" | "pens" | "bag" | "other";

export function supplyKindFor(label: string): SupplyKind {
  const l = label.toLowerCase();
  if (l.includes("exercise")) return "exercise-books";
  if (l.includes("notebook")) return "notebook";
  if (l.includes("pencil")) return "pencils";
  if (l.includes("pen")) return "pens";
  if (l.includes("bag")) return "bag";
  return "other";
}

export function SupplySketch({ kind, className }: { kind: SupplyKind; className?: string }) {
  return (
    <svg viewBox="0 0 200 140" className={className} aria-hidden="true" focusable="false">
      {kind === "exercise-books" && (
        <g transform="translate(30 30) rotate(-4)">
          <BookStack width={140} />
        </g>
      )}
      {kind === "notebook" && (
        <g transform="translate(52 12) rotate(5 48 58)">
          <rect x="5" y="8" width="96" height="116" rx="5" fill="#000" opacity=".12" />
          <rect width="96" height="116" rx="5" fill={C.forest} />
          <rect x="14" y="6" width="78" height="104" rx="3" fill={C.sheet} />
          {[28, 42, 56, 70, 84, 98].map((y) => (
            <path key={y} d={`M24 ${y}h60`} stroke={C.ruled} strokeWidth="1.5" />
          ))}
          {[14, 30, 46, 62, 78, 94].map((y) => (
            <path key={y} d={`M2 ${y}h18`} stroke={C.metal} strokeWidth="4" strokeLinecap="round" />
          ))}
          <path d="M30 40c10-4 30-4 44 0" stroke={C.clay} strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
      {kind === "pencils" && (
        <g>
          <g transform="translate(26 92) rotate(-22) scale(.5)">
            <Pencil length={230} />
          </g>
          <g transform="translate(34 72) rotate(-8) scale(.5)">
            <Pencil length={210} body={C.clay} stripe="#93401f" />
          </g>
          <g transform="translate(46 50) rotate(6) scale(.5)">
            <Pencil length={190} body={C.forestSoft} stripe={C.forest} />
          </g>
        </g>
      )}
      {kind === "pens" && (
        <g>
          <g transform="translate(30 50) rotate(14) scale(.62)">
            <Pen length={190} />
          </g>
          <g transform="translate(36 92) rotate(-10) scale(.62)">
            <Pen length={190} body="#2f5f8a" cap="#1f425f" />
          </g>
        </g>
      )}
      {kind === "bag" && (
        <g transform="translate(58 8)">
          <path d="M24 26c0-26 36-26 36 0" stroke={C.ink} strokeWidth="6" fill="none" strokeLinecap="round" />
          <rect x="6" y="122" width="84" height="6" rx="3" fill="#000" opacity=".12" />
          <rect x="0" y="22" width="84" height="102" rx="18" fill={C.clay} />
          <path d="M0 56h84" stroke="#8e3c1f" strokeWidth="3" />
          <rect x="16" y="70" width="52" height="40" rx="8" fill="#c9653f" />
          <circle cx="42" cy="56" r="5" fill={C.sun} />
        </g>
      )}
      {kind === "other" && (
        <g>
          <g transform="translate(24 30) rotate(-6)">
            <rect width="150" height="30" rx="3" fill={C.sunSoft} />
            {Array.from({ length: 14 }, (_, i) => (
              <path key={i} d={`M${10 + i * 10} 0v${i % 5 === 0 ? 12 : 7}`} stroke={C.woodDark} strokeWidth="1.4" />
            ))}
          </g>
          <g transform="translate(40 84) rotate(8)">
            <rect width="50" height="28" rx="5" fill={C.eraser} />
            <rect x="20" width="30" height="28" rx="2" fill="#4a7ea6" />
          </g>
          <g transform="translate(118 80)">
            <rect width="38" height="34" rx="5" fill={C.forestSoft} />
            <circle cx="19" cy="17" r="8" fill={C.forestDeep} />
            <rect x="34" y="12" width="10" height="10" rx="2" fill={C.metal} />
          </g>
        </g>
      )}
    </svg>
  );
}

/* ── Hand-drawn marks ─────────────────────────────────────── */

export function ScribbleUnderline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 26" className={className} aria-hidden="true" focusable="false" preserveAspectRatio="none">
      <path
        className="draw-in"
        style={{ ["--len" as string]: 330 }}
        d="M5 17C62 7 126 5 186 9s82 9 108-1"
        fill="none"
        stroke="var(--color-sun)"
        strokeWidth="8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HandArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 80" className={className} aria-hidden="true" focusable="false">
      <path d="M8 10c34 2 74 18 92 54" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M86 58l14 8 2-16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HandCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden="true" focusable="false">
      <rect x="3" y="4" width="21" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" opacity=".55" transform="rotate(-3 14 14)" />
      <path d="M7 14.5l5 5L25 5" fill="none" stroke="var(--color-clay)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
