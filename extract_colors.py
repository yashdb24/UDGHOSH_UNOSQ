import fitz
import json

def get_hex(c):
    if isinstance(c, int):
        return f"#{c:06x}"
    elif isinstance(c, (list, tuple)) and len(c) >= 3:
        return '#%02x%02x%02x' % (int(c[0]*255), int(c[1]*255), int(c[2]*255))
    return str(c)

doc = fitz.open("UNOSQ'25 _ Udghosh, IIT Kanpur.pdf")

colors = {"text": [], "fill": []}

for page in doc:
    # Extract text colors
    for b in page.get_text("dict")["blocks"]:
        if "lines" in b:
            for l in b["lines"]:
                for s in l["spans"]:
                    c = s["color"]
                    h = get_hex(c)
                    text_content = s["text"].strip()
                    if text_content:
                        colors["text"].append({"hex": h, "text": text_content, "font": s["font"], "size": s["size"]})
                        
    # Extract drawing paths for fill colors
    for d in page.get_drawings():
        if d.get("fill"):
            h = get_hex(d["fill"])
            if h not in colors["fill"]:
                colors["fill"].append(h)
        if d.get("color"):
            h = get_hex(d["color"])
            if h not in colors["fill"]:
                colors["fill"].append(h)

# Count frequencies to filter out noise
text_freq = {}
for t in colors["text"]:
    h = t["hex"]
    text_freq[h] = text_freq.get(h, 0) + 1

print("--- TEXT COLORS ---")
for h, count in sorted(text_freq.items(), key=lambda x: -x[1]):
    examples = [t["text"] for t in colors["text"] if t["hex"] == h][:3]
    fonts = list(set([t["font"] for t in colors["text"] if t["hex"] == h]))[:3]
    print(f"{h} (count: {count}) | Examples: {examples} | Fonts: {fonts}")

print("\n--- FILL/PATH COLORS ---")
print(colors["fill"])
