"""Resize and recompress desktop quiz media to its maximum rendered size."""

from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
GROUPS = (
    (ROOT / "generated" / "quiz", "*.webp", 1280, 76),
    (ROOT / "generated" / "chapters", "*.webp", 1200, 76),
)


def optimize(path: Path, max_width: int, quality: int) -> tuple[int, int]:
    before = path.stat().st_size
    with Image.open(path) as source:
        image = ImageOps.exif_transpose(source)
        if image.width <= max_width:
            return before, before
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGB")
        temporary = path.with_suffix(".tmp.webp")
        image.save(temporary, "WEBP", quality=quality, method=6)
    temporary.replace(path)
    return before, path.stat().st_size


def main() -> None:
    total_before = 0
    total_after = 0
    for directory, pattern, max_width, quality in GROUPS:
        for path in sorted(directory.glob(pattern)):
            if "-mobile" in path.stem:
                continue
            before, after = optimize(path, max_width, quality)
            total_before += before
            total_after += after
            print(f"{path.relative_to(ROOT)}: {before // 1024} KB -> {after // 1024} KB")
    saved = total_before - total_after
    print(f"Total: {total_before / 1024 / 1024:.2f} MiB -> {total_after / 1024 / 1024:.2f} MiB")
    print(f"Saved: {saved / 1024 / 1024:.2f} MiB")


if __name__ == "__main__":
    main()
