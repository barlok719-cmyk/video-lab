from PIL import Image, ImageDraw, ImageFilter
from pathlib import Path

logo = Image.open("assets/logo.jpg").convert("RGB")

def make_avatar(size: int, output: str):
    # Fill a square with the centered logo, then clip it to a circle.
    src = logo.copy()
    side = min(src.size)
    left = (src.width - side) // 2
    top = (src.height - side) // 2
    src = src.crop((left, top, left + side, top + side)).resize((size, size), Image.Resampling.LANCZOS)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).ellipse((2, 2, size - 3, size - 3), fill=255)
    # Subtle neon ring around the logo.
    ring = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(ring)
    d.ellipse((1, 1, size - 2, size - 2), outline=(76, 235, 226, 255), width=max(2, size // 32))
    ring = ring.filter(ImageFilter.GaussianBlur(max(0.5, size / 100)))
    out = src.convert("RGBA")
    out.putalpha(mask)
    out.alpha_composite(ring)
    Path(output).parent.mkdir(parents=True, exist_ok=True)
    out.save(output)

make_avatar(56, "assets/avatar-small.png")
make_avatar(176, "assets/avatar-large.png")
