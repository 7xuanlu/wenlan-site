// Coordinates refer to original native capture pixels. Resource bodies match the isolated fictional Lumo fixture.
export const wikiInteractionData = {
  "en": {
    "pageTitle": "Lumo 2.0 launch plan",
    "sourceTitle": "7 sources",
    "resources": [
      {
        "id": "file-meeting",
        "kind": "file",
        "title": "Lumo 2.0 kickoff meeting.md",
        "body": "# Lumo 2.0 kickoff meeting\n\n# Lumo 2.0 kickoff meeting\n\nLumo 2.0 is the next version of our personal reading app.\n\n## Dates\n- Planned launch: iOS and Android together on October 20.\n- The launch announcement goes out the same day.\n\n## Next steps\n- Write a launch checklist with the release gate and owners.\n- Prepare a draft launch announcement.\n",
        "href": "/images/home/v019/sources/en/Lumo 2.0 kickoff meeting.md"
      },
      {
        "id": "file-checklist",
        "kind": "file",
        "title": "Launch checklist.md",
        "body": "# Launch checklist\n\n# Launch checklist\n\n## Release gate\n- Stability: each platform's crash rate must be below 1% of test sessions before release.\n- Run the stability check in every beta round.\n\n## Owners\n- Android stability issues: Rin.\n- iOS build and store review: launch team.\n\n## Before announcing\n- [ ] Store listing approved for each platform being released\n- [ ] Each platform being released has passed the stability gate\n- [ ] Release notes written\n",
        "href": "/images/home/v019/sources/en/Launch checklist.md"
      },
      {
        "id": "file-beta",
        "kind": "file",
        "title": "Beta round 3 report.md",
        "body": "# Beta round 3 report\n\n# Beta round 3 report\n\n## Stability check\n- Android: 31 crashes in 1,000 test sessions (3.1%). Does not meet the release threshold (below 1%).\n- iOS: passed the stability check.\n\n## Status\n- The Android crash issue is not fixed yet.\n- This report does not change any launch dates; the launch team will decide.\n",
        "href": "/images/home/v019/sources/en/Beta round 3 report.md"
      },
      {
        "id": "memory-meeting",
        "kind": "memory",
        "title": "Lumo 2.0 kickoff meeting",
        "body": "# Lumo 2.0 kickoff meeting\n\nLumo 2.0 is the next version of our personal reading app.\n\n## Dates\n- Planned launch: iOS and Android together on October 20.\n- The launch announcement goes out the same day.\n\n## Next steps\n- Write a launch checklist with the release gate and owners.\n- Prepare a draft launch announcement.",
        "usedIn": [
          {
            "label": "Lumo 2.0 launch plan",
            "target": "page"
          }
        ]
      },
      {
        "id": "memory-checklist",
        "kind": "memory",
        "title": "Launch checklist",
        "body": "# Launch checklist\n\n## Release gate\n- Stability: each platform's crash rate must be below 1% of test sessions before release.\n- Run the stability check in every beta round.\n\n## Owners\n- Android stability issues: Rin.\n- iOS build and store review: launch team.\n\n## Before announcing\n- [ ] Store listing approved for each platform being released\n- [ ] Each platform being released has passed the stability gate\n- [ ] Release notes written",
        "usedIn": [
          {
            "label": "Lumo 2.0 launch plan",
            "target": "page"
          },
          {
            "label": "Launch checklist",
            "target": "preview:checklist"
          }
        ]
      },
      {
        "id": "memory-beta",
        "kind": "memory",
        "title": "Beta round 3 report",
        "body": "# Beta round 3 report\n\n## Stability check\n- Android: 31 crashes in 1,000 test sessions (3.1%). Does not meet the release threshold (below 1%).\n- iOS: passed the stability check.\n\n## Status\n- The Android crash issue is not fixed yet.\n- This report does not change any launch dates; the launch team will decide.",
        "usedIn": [
          {
            "label": "Lumo 2.0 launch plan",
            "target": "page"
          },
          {
            "label": "Platform launch decision",
            "target": "preview:decision"
          }
        ]
      },
      {
        "id": "memory-decision",
        "kind": "memory",
        "title": "Platform launch decision",
        "body": "I've read the Beta round 3 report. My decision: keep iOS on October 20. Move Android tentatively to November 3, and release it only if it passes the next stability test. Reason: Android failed the stability gate in round 3, and iOS passed. Rin still owns the unfixed Android crash issue.",
        "usedIn": [
          {
            "label": "Lumo 2.0 launch plan",
            "target": "page"
          },
          {
            "label": "Platform launch decision",
            "target": "preview:decision"
          }
        ]
      }
    ],
    "hotspots": {
      "page": [
        {
          "id": "page-sources",
          "label": "7 sources",
          "rect": {
            "x": 2095,
            "y": 450,
            "width": 270,
            "height": 64
          },
          "target": "sources"
        },
        {
          "id": "node-memory-meeting",
          "label": "Open memory: Lumo 2.0 kickoff meeting",
          "rect": {
            "x": 1835,
            "y": 625,
            "width": 190,
            "height": 130
          },
          "target": "resource:memory-meeting"
        },
        {
          "id": "node-memory-checklist",
          "label": "Open memory: Launch checklist",
          "rect": {
            "x": 1835,
            "y": 775,
            "width": 190,
            "height": 130
          },
          "target": "resource:memory-checklist"
        },
        {
          "id": "node-memory-beta",
          "label": "Open memory: Beta round 3 report",
          "rect": {
            "x": 1980,
            "y": 860,
            "width": 210,
            "height": 138
          },
          "target": "resource:memory-beta"
        },
        {
          "id": "node-page-decision",
          "label": "Platform launch decision",
          "rect": {
            "x": 2155,
            "y": 625,
            "width": 210,
            "height": 130
          },
          "target": "preview:decision"
        },
        {
          "id": "node-page-checklist",
          "label": "Launch checklist",
          "rect": {
            "x": 2155,
            "y": 775,
            "width": 210,
            "height": 130
          },
          "target": "preview:checklist"
        },
        {
          "id": "linked-page-checklist",
          "label": "Launch checklist",
          "rect": {
            "x": 1800,
            "y": 1410,
            "width": 550,
            "height": 75
          },
          "target": "preview:checklist"
        },
        {
          "id": "linked-page-decision",
          "label": "Platform launch decision",
          "rect": {
            "x": 1800,
            "y": 1490,
            "width": 550,
            "height": 75
          },
          "target": "preview:decision"
        }
      ],
      "sources": [
        {
          "id": "file-beta",
          "label": "Open file: Beta round 3 report.md",
          "rect": {
            "x": 1815,
            "y": 729,
            "width": 560,
            "height": 92
          },
          "target": "resource:file-beta"
        },
        {
          "id": "file-checklist",
          "label": "Open file: Launch checklist.md",
          "rect": {
            "x": 1815,
            "y": 895,
            "width": 560,
            "height": 92
          },
          "target": "resource:file-checklist"
        },
        {
          "id": "file-meeting",
          "label": "Open file: Lumo 2.0 kickoff meeting.md",
          "rect": {
            "x": 1815,
            "y": 1060,
            "width": 560,
            "height": 92
          },
          "target": "resource:file-meeting"
        },
        {
          "id": "row-memory-checklist",
          "label": "Open memory: Launch checklist",
          "rect": {
            "x": 1815,
            "y": 1180,
            "width": 560,
            "height": 98
          },
          "target": "resource:memory-checklist"
        },
        {
          "id": "row-memory-meeting",
          "label": "Open memory: Lumo 2.0 kickoff meeting",
          "rect": {
            "x": 1815,
            "y": 1325,
            "width": 560,
            "height": 98
          },
          "target": "resource:memory-meeting"
        },
        {
          "id": "all-sources",
          "label": "7 sources",
          "rect": {
            "x": 1800,
            "y": 1438,
            "width": 560,
            "height": 74
          },
          "target": "sources"
        }
      ],
      "memory": [
        {
          "id": "memory-page-decision",
          "label": "Platform launch decision",
          "rect": {
            "x": 1950,
            "y": 770,
            "width": 560,
            "height": 62
          },
          "target": "preview:decision"
        },
        {
          "id": "memory-page-plan",
          "label": "Lumo 2.0 launch plan",
          "rect": {
            "x": 1950,
            "y": 840,
            "width": 560,
            "height": 62
          },
          "target": "page"
        }
      ]
    }
  },
  "zh-TW": {
    "pageTitle": "Lumo 2.0 發佈計畫",
    "sourceTitle": "7 個來源",
    "resources": [
      {
        "id": "file-meeting",
        "kind": "file",
        "title": "Lumo 2.0 啟動會議.md",
        "body": "# Lumo 2.0 啟動會議\n\n# Lumo 2.0 啟動會議\n\nLumo 2.0 是我們個人閱讀 App 的下一個版本。\n\n## 日期\n- 預定 10 月 20 日 iOS 與 Android 同步上線。\n- 上線公告同日發布。\n\n## 後續\n- 撰寫上線檢查清單，列出發佈門檻與負責人。\n- 準備上線公告草稿。\n",
        "href": "/images/home/v019/sources/zh-TW/Lumo 2.0 啟動會議.md"
      },
      {
        "id": "file-checklist",
        "kind": "file",
        "title": "上線檢查清單.md",
        "body": "# 上線檢查清單\n\n# 上線檢查清單\n\n## 發佈門檻\n- 穩定性：各平台的閃退率須低於測試工作階段的 1%，才可發佈。\n- 每一輪 Beta 都要執行穩定性檢查。\n\n## 負責人\n- Android 穩定性問題：阿岑。\n- iOS 建置與商店審核：發佈小組。\n\n## 公告前\n- [ ] 要發佈的平台，商店頁面已核准\n- [ ] 要發佈的平台，已通過穩定性門檻\n- [ ] 發佈說明已完成\n",
        "href": "/images/home/v019/sources/zh-TW/上線檢查清單.md"
      },
      {
        "id": "file-beta",
        "kind": "file",
        "title": "Beta 第 3 輪報告.md",
        "body": "# Beta 第 3 輪報告\n\n# Beta 第 3 輪報告\n\n## 穩定性檢查\n- Android：1,000 次測試工作階段中閃退 31 次（3.1%），未達發佈門檻（低於 1%）。\n- iOS：通過穩定性檢查。\n\n## 狀態\n- Android 閃退問題尚未修復。\n- 本報告不更動任何上線日期，由發佈小組決定。\n",
        "href": "/images/home/v019/sources/zh-TW/Beta 第 3 輪報告.md"
      },
      {
        "id": "memory-meeting",
        "kind": "memory",
        "title": "Lumo 2.0 啟動會議",
        "body": "# Lumo 2.0 啟動會議\n\nLumo 2.0 是我們個人閱讀 App 的下一個版本。\n\n## 日期\n- 預定 10 月 20 日 iOS 與 Android 同步上線。\n- 上線公告同日發布。\n\n## 後續\n- 撰寫上線檢查清單，列出發佈門檻與負責人。\n- 準備上線公告草稿。",
        "usedIn": [
          {
            "label": "Lumo 2.0 發佈計畫",
            "target": "page"
          }
        ]
      },
      {
        "id": "memory-checklist",
        "kind": "memory",
        "title": "上線檢查清單",
        "body": "# 上線檢查清單\n\n## 發佈門檻\n- 穩定性：各平台的閃退率須低於測試工作階段的 1%，才可發佈。\n- 每一輪 Beta 都要執行穩定性檢查。\n\n## 負責人\n- Android 穩定性問題：阿岑。\n- iOS 建置與商店審核：發佈小組。\n\n## 公告前\n- [ ] 要發佈的平台，商店頁面已核准\n- [ ] 要發佈的平台，已通過穩定性門檻\n- [ ] 發佈說明已完成",
        "usedIn": [
          {
            "label": "Lumo 2.0 發佈計畫",
            "target": "page"
          },
          {
            "label": "上線檢查清單",
            "target": "preview:checklist"
          }
        ]
      },
      {
        "id": "memory-beta",
        "kind": "memory",
        "title": "Beta 第 3 輪報告",
        "body": "# Beta 第 3 輪報告\n\n## 穩定性檢查\n- Android：1,000 次測試工作階段中閃退 31 次（3.1%），未達發佈門檻（低於 1%）。\n- iOS：通過穩定性檢查。\n\n## 狀態\n- Android 閃退問題尚未修復。\n- 本報告不更動任何上線日期，由發佈小組決定。",
        "usedIn": [
          {
            "label": "Lumo 2.0 發佈計畫",
            "target": "page"
          },
          {
            "label": "平台上線決定",
            "target": "preview:decision"
          }
        ]
      },
      {
        "id": "memory-decision",
        "kind": "memory",
        "title": "平台上線決定",
        "body": "我看過 Beta 第 3 輪報告了。決定：iOS 維持 10 月 20 日上線。Android 暫定延到 11 月 3 日，而且必須通過下一次穩定性測試才發佈。理由：Android 在第 3 輪沒通過穩定性門檻，iOS 通過了。尚未修復的 Android 閃退問題仍由阿岑負責。",
        "usedIn": [
          {
            "label": "Lumo 2.0 發佈計畫",
            "target": "page"
          },
          {
            "label": "平台上線決定",
            "target": "preview:decision"
          }
        ]
      }
    ],
    "hotspots": {
      "page": [
        {
          "id": "page-sources",
          "label": "7 個來源",
          "rect": {
            "x": 2095,
            "y": 413,
            "width": 270,
            "height": 64
          },
          "target": "sources"
        },
        {
          "id": "node-memory-checklist",
          "label": "開啟記憶：上線檢查清單",
          "rect": {
            "x": 1835,
            "y": 600,
            "width": 190,
            "height": 130
          },
          "target": "resource:memory-checklist"
        },
        {
          "id": "node-memory-meeting",
          "label": "開啟記憶：Lumo 2.0 啟動會議",
          "rect": {
            "x": 1835,
            "y": 744,
            "width": 190,
            "height": 130
          },
          "target": "resource:memory-meeting"
        },
        {
          "id": "node-memory-beta",
          "label": "開啟記憶：Beta 第 3 輪報告",
          "rect": {
            "x": 1980,
            "y": 824,
            "width": 210,
            "height": 138
          },
          "target": "resource:memory-beta"
        },
        {
          "id": "node-page-decision",
          "label": "平台上線決定",
          "rect": {
            "x": 2155,
            "y": 745,
            "width": 210,
            "height": 130
          },
          "target": "preview:decision"
        },
        {
          "id": "node-page-checklist",
          "label": "上線檢查清單",
          "rect": {
            "x": 2155,
            "y": 590,
            "width": 210,
            "height": 130
          },
          "target": "preview:checklist"
        },
        {
          "id": "linked-page-checklist",
          "label": "上線檢查清單",
          "rect": {
            "x": 1800,
            "y": 1350,
            "width": 550,
            "height": 75
          },
          "target": "preview:checklist"
        },
        {
          "id": "linked-page-decision",
          "label": "平台上線決定",
          "rect": {
            "x": 1800,
            "y": 1430,
            "width": 550,
            "height": 75
          },
          "target": "preview:decision"
        }
      ],
      "sources": [
        {
          "id": "file-beta",
          "label": "開啟檔案：Beta 第 3 輪報告.md",
          "rect": {
            "x": 1815,
            "y": 780,
            "width": 560,
            "height": 92
          },
          "target": "resource:file-beta"
        },
        {
          "id": "file-meeting",
          "label": "開啟檔案：Lumo 2.0 啟動會議.md",
          "rect": {
            "x": 1815,
            "y": 946,
            "width": 560,
            "height": 92
          },
          "target": "resource:file-meeting"
        },
        {
          "id": "file-checklist",
          "label": "開啟檔案：上線檢查清單.md",
          "rect": {
            "x": 1815,
            "y": 1112,
            "width": 560,
            "height": 92
          },
          "target": "resource:file-checklist"
        },
        {
          "id": "row-memory-beta",
          "label": "開啟記憶：Beta 第 3 輪報告",
          "rect": {
            "x": 1815,
            "y": 1230,
            "width": 560,
            "height": 98
          },
          "target": "resource:memory-beta"
        },
        {
          "id": "row-memory-decision",
          "label": "開啟記憶：平台上線決定",
          "rect": {
            "x": 1815,
            "y": 1340,
            "width": 560,
            "height": 98
          },
          "target": "memory"
        },
        {
          "id": "all-sources",
          "label": "7 個來源",
          "rect": {
            "x": 1800,
            "y": 1438,
            "width": 560,
            "height": 74
          },
          "target": "sources"
        }
      ],
      "memory": [
        {
          "id": "memory-page-plan",
          "label": "Lumo 2.0 發佈計畫",
          "rect": {
            "x": 1950,
            "y": 770,
            "width": 560,
            "height": 62
          },
          "target": "page"
        },
        {
          "id": "memory-page-decision",
          "label": "平台上線決定",
          "rect": {
            "x": 1950,
            "y": 840,
            "width": 560,
            "height": 62
          },
          "target": "preview:decision"
        }
      ]
    }
  },
  "zh-CN": {
    "pageTitle": "Lumo 2.0 发布计划",
    "sourceTitle": "7 个来源",
    "resources": [
      {
        "id": "file-meeting",
        "kind": "file",
        "title": "Lumo 2.0 启动会议.md",
        "body": "# Lumo 2.0 启动会议\n\n# Lumo 2.0 启动会议\n\nLumo 2.0 是我们个人阅读 App 的下一个版本。\n\n## 日期\n- 预定 10 月 20 日 iOS 与 Android 同步上线。\n- 上线公告同日发布。\n\n## 后续\n- 编写上线检查清单，列出发布门槛与负责人。\n- 准备上线公告草稿。\n",
        "href": "/images/home/v019/sources/zh-CN/Lumo 2.0 启动会议.md"
      },
      {
        "id": "file-checklist",
        "kind": "file",
        "title": "上线检查清单.md",
        "body": "# 上线检查清单\n\n# 上线检查清单\n\n## 发布门槛\n- 稳定性：各平台的闪退率须低于测试会话的 1%，才可发布。\n- 每一轮 Beta 都要执行稳定性检查。\n\n## 负责人\n- Android 稳定性问题：阿岑。\n- iOS 构建与商店审核：发布小组。\n\n## 公告前\n- [ ] 要发布的平台，商店页面已批准\n- [ ] 要发布的平台，已通过稳定性门槛\n- [ ] 发布说明已完成\n",
        "href": "/images/home/v019/sources/zh-CN/上线检查清单.md"
      },
      {
        "id": "file-beta",
        "kind": "file",
        "title": "Beta 第 3 轮报告.md",
        "body": "# Beta 第 3 轮报告\n\n# Beta 第 3 轮报告\n\n## 稳定性检查\n- Android：1,000 次测试会话中闪退 31 次（3.1%），未达发布门槛（低于 1%）。\n- iOS：通过稳定性检查。\n\n## 状态\n- Android 闪退问题尚未修复。\n- 本报告不更改任何上线日期，由发布小组决定。\n",
        "href": "/images/home/v019/sources/zh-CN/Beta 第 3 轮报告.md"
      },
      {
        "id": "memory-meeting",
        "kind": "memory",
        "title": "Lumo 2.0 启动会议",
        "body": "# Lumo 2.0 启动会议\n\nLumo 2.0 是我们个人阅读 App 的下一个版本。\n\n## 日期\n- 预定 10 月 20 日 iOS 与 Android 同步上线。\n- 上线公告同日发布。\n\n## 后续\n- 编写上线检查清单，列出发布门槛与负责人。\n- 准备上线公告草稿。",
        "usedIn": [
          {
            "label": "Lumo 2.0 发布计划",
            "target": "page"
          }
        ]
      },
      {
        "id": "memory-checklist",
        "kind": "memory",
        "title": "上线检查清单",
        "body": "# 上线检查清单\n\n## 发布门槛\n- 稳定性：各平台的闪退率须低于测试会话的 1%，才可发布。\n- 每一轮 Beta 都要执行稳定性检查。\n\n## 负责人\n- Android 稳定性问题：阿岑。\n- iOS 构建与商店审核：发布小组。\n\n## 公告前\n- [ ] 要发布的平台，商店页面已批准\n- [ ] 要发布的平台，已通过稳定性门槛\n- [ ] 发布说明已完成",
        "usedIn": [
          {
            "label": "Lumo 2.0 发布计划",
            "target": "page"
          },
          {
            "label": "上线检查清单",
            "target": "preview:checklist"
          }
        ]
      },
      {
        "id": "memory-beta",
        "kind": "memory",
        "title": "Beta 第 3 轮报告",
        "body": "# Beta 第 3 轮报告\n\n## 稳定性检查\n- Android：1,000 次测试会话中闪退 31 次（3.1%），未达发布门槛（低于 1%）。\n- iOS：通过稳定性检查。\n\n## 状态\n- Android 闪退问题尚未修复。\n- 本报告不更改任何上线日期，由发布小组决定。",
        "usedIn": [
          {
            "label": "Lumo 2.0 发布计划",
            "target": "page"
          },
          {
            "label": "平台上线决定",
            "target": "preview:decision"
          }
        ]
      },
      {
        "id": "memory-decision",
        "kind": "memory",
        "title": "平台上线决定",
        "body": "我看过 Beta 第 3 轮报告了。决定：iOS 维持 10 月 20 日上线。Android 暂定推迟到 11 月 3 日，而且必须通过下一次稳定性测试才发布。理由：Android 在第 3 轮没通过稳定性门槛，iOS 通过了。尚未修复的 Android 闪退问题仍由阿岑负责。",
        "usedIn": [
          {
            "label": "Lumo 2.0 发布计划",
            "target": "page"
          },
          {
            "label": "平台上线决定",
            "target": "preview:decision"
          }
        ]
      }
    ],
    "hotspots": {
      "page": [
        {
          "id": "page-sources",
          "label": "7 个来源",
          "rect": {
            "x": 2095,
            "y": 413,
            "width": 270,
            "height": 64
          },
          "target": "sources"
        },
        {
          "id": "node-memory-checklist",
          "label": "打开记忆：上线检查清单",
          "rect": {
            "x": 1835,
            "y": 600,
            "width": 190,
            "height": 130
          },
          "target": "resource:memory-checklist"
        },
        {
          "id": "node-memory-meeting",
          "label": "打开记忆：Lumo 2.0 启动会议",
          "rect": {
            "x": 1835,
            "y": 744,
            "width": 190,
            "height": 130
          },
          "target": "resource:memory-meeting"
        },
        {
          "id": "node-memory-beta",
          "label": "打开记忆：Beta 第 3 轮报告",
          "rect": {
            "x": 1980,
            "y": 824,
            "width": 210,
            "height": 138
          },
          "target": "resource:memory-beta"
        },
        {
          "id": "node-page-decision",
          "label": "平台上线决定",
          "rect": {
            "x": 2155,
            "y": 745,
            "width": 210,
            "height": 130
          },
          "target": "preview:decision"
        },
        {
          "id": "node-page-checklist",
          "label": "上线检查清单",
          "rect": {
            "x": 2155,
            "y": 590,
            "width": 210,
            "height": 130
          },
          "target": "preview:checklist"
        },
        {
          "id": "linked-page-checklist",
          "label": "上线检查清单",
          "rect": {
            "x": 1800,
            "y": 1350,
            "width": 550,
            "height": 75
          },
          "target": "preview:checklist"
        },
        {
          "id": "linked-page-decision",
          "label": "平台上线决定",
          "rect": {
            "x": 1800,
            "y": 1430,
            "width": 550,
            "height": 75
          },
          "target": "preview:decision"
        }
      ],
      "sources": [
        {
          "id": "file-beta",
          "label": "打开文件：Beta 第 3 轮报告.md",
          "rect": {
            "x": 1815,
            "y": 780,
            "width": 560,
            "height": 92
          },
          "target": "resource:file-beta"
        },
        {
          "id": "file-meeting",
          "label": "打开文件：Lumo 2.0 启动会议.md",
          "rect": {
            "x": 1815,
            "y": 946,
            "width": 560,
            "height": 92
          },
          "target": "resource:file-meeting"
        },
        {
          "id": "file-checklist",
          "label": "打开文件：上线检查清单.md",
          "rect": {
            "x": 1815,
            "y": 1112,
            "width": 560,
            "height": 92
          },
          "target": "resource:file-checklist"
        },
        {
          "id": "row-memory-meeting",
          "label": "打开记忆：Lumo 2.0 启动会议",
          "rect": {
            "x": 1815,
            "y": 1230,
            "width": 560,
            "height": 98
          },
          "target": "resource:memory-meeting"
        },
        {
          "id": "row-memory-checklist",
          "label": "打开记忆：上线检查清单",
          "rect": {
            "x": 1815,
            "y": 1340,
            "width": 560,
            "height": 98
          },
          "target": "resource:memory-checklist"
        },
        {
          "id": "all-sources",
          "label": "7 个来源",
          "rect": {
            "x": 1800,
            "y": 1438,
            "width": 560,
            "height": 74
          },
          "target": "sources"
        }
      ],
      "memory": [
        {
          "id": "memory-page-plan",
          "label": "Lumo 2.0 发布计划",
          "rect": {
            "x": 1950,
            "y": 770,
            "width": 560,
            "height": 62
          },
          "target": "page"
        },
        {
          "id": "memory-page-decision",
          "label": "平台上线决定",
          "rect": {
            "x": 1950,
            "y": 840,
            "width": 560,
            "height": 62
          },
          "target": "preview:decision"
        }
      ]
    }
  }
} as const;
