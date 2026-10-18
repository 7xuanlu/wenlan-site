import type { Locale } from "@/i18n/locales";

// Pixel coordinates measured from native PR #855 captures; English links wrap.
export const wikiPreviewLinks = {
  "zh-TW": [
    {
      "id": "decision",
      "label": "平台上線決定",
      "rect": {
        "x": 1182.04,
        "y": 732,
        "width": 209.76,
        "height": 38
      }
    },
    {
      "id": "checklist",
      "label": "上線檢查清單",
      "rect": {
        "x": 1433.57,
        "y": 732,
        "width": 209.76,
        "height": 38
      }
    }
  ],
  "en": [
    {
      "id": "decision",
      "label": "Platform launch decision",
      "rect": {
        "x": 1055.43,
        "y": 836,
        "width": 371.96,
        "height": 38
      }
    },
    {
      "id": "checklist",
      "label": "Launch checklist",
      "rect": {
        "x": 730.53,
        "y": 836,
        "width": 900.63,
        "height": 90
      },
      "rects": [
        {
          "x": 1491.53,
          "y": 836,
          "width": 139.64,
          "height": 38
        },
        {
          "x": 730.53,
          "y": 888,
          "width": 122.82,
          "height": 38
        }
      ]
    }
  ],
  "zh-CN": [
    {
      "id": "decision",
      "label": "平台上线决定",
      "rect": {
        "x": 1152.28,
        "y": 732,
        "width": 209.76,
        "height": 38
      }
    },
    {
      "id": "checklist",
      "label": "上线检查清单",
      "rect": {
        "x": 1403.8,
        "y": 732,
        "width": 209.76,
        "height": 38
      }
    }
  ]
} as const satisfies Record<Locale, readonly { id: string; label: string; rect: { x: number; y: number; width: number; height: number }; rects?: readonly { x: number; y: number; width: number; height: number }[] }[]>;
