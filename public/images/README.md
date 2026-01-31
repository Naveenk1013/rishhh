# Image Assets Directory

Place your images here following this structure:

```
images/
├── hero/
│   └── style-reel.mp4      # Main hero video
├── gallery/
│   ├── autumn-luxe.webp
│   ├── street-couture.webp
│   └── ...
├── portfolio/
│   ├── boss-lady/
│   │   ├── power-meeting.webp
│   │   ├── boardroom-ready.webp
│   │   └── ceo-chic.webp
│   ├── street-luxe/
│   │   ├── urban-edge.webp
│   │   ├── night-out.webp
│   │   └── weekend-wander.webp
│   └── ethereal/
│       ├── dream-sequence.webp
│       ├── garden-party.webp
│       └── fairy-tale.webp
└── instagram/
    ├── post-1.webp
    ├── reel-1.webp
    └── ...
```

## Image Specifications

| Type | Recommended Size | Format |
|------|------------------|--------|
| Hero Video | 1920x1080 | MP4 (H.264) |
| Gallery | 800x1000 | WebP |
| Portfolio | 600x800 | WebP |
| Instagram | 400x500 | WebP |

## Converting to WebP

Use this command (requires `cwebp`):
```bash
cwebp -q 85 input.jpg -o output.webp
```

Or use online tools like squoosh.app
