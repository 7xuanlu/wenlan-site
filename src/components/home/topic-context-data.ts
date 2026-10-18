// Authored demonstration contexts. Icon mapping and colors follow the native App;
// additional example relationships are not presented as captured App records.
export const topicContexts = {
  "book": [
    {
      "id": "darwin",
      "icon": "User",
      "tone": "person",
      "label": [
        "Charles Darwin",
        "查爾斯・達爾文",
        "查尔斯·达尔文"
      ],
      "relation": [
        "Author",
        "作者",
        "作者"
      ]
    },
    {
      "id": "selection",
      "icon": "Lightbulb",
      "tone": "concept",
      "label": [
        "Natural selection",
        "自然選擇",
        "自然选择"
      ],
      "relation": [
        "Key idea",
        "核心觀點",
        "核心观点"
      ]
    },
    {
      "id": "chapter",
      "icon": "Notebook",
      "tone": "page",
      "label": [
        "Selection chapter",
        "自然選擇章",
        "自然选择章"
      ],
      "relation": [
        "Reading note",
        "讀書筆記",
        "读书笔记"
      ]
    },
    {
      "id": "descent",
      "icon": "Notebook",
      "tone": "page",
      "label": [
        "Common descent",
        "共同祖先",
        "共同祖先"
      ],
      "relation": [
        "Reading note",
        "讀書筆記",
        "读书笔记"
      ]
    },
    {
      "id": "islands",
      "icon": "MapPin",
      "tone": "neutral",
      "label": [
        "Galápagos",
        "加拉巴哥群島",
        "加拉巴哥群岛"
      ],
      "relation": [
        "Field observations",
        "觀察地點",
        "观察地点"
      ]
    }
  ],
  "biology": [
    {
      "id": "variants",
      "icon": "Notebook",
      "tone": "page",
      "label": [
        "Gene variants",
        "基因變異",
        "基因变异"
      ],
      "relation": [
        "Research note",
        "研究筆記",
        "研究笔记"
      ]
    },
    {
      "id": "mendel",
      "icon": "User",
      "tone": "person",
      "label": [
        "Gregor Mendel",
        "格雷戈爾・孟德爾",
        "格雷戈尔·孟德尔"
      ],
      "relation": [
        "Inheritance research",
        "遺傳研究",
        "遗传研究"
      ]
    },
    {
      "id": "selection",
      "icon": "Lightbulb",
      "tone": "concept",
      "label": [
        "Natural selection",
        "自然選擇",
        "自然选择"
      ],
      "relation": [
        "Mechanism",
        "演化機制",
        "演化机制"
      ]
    },
    {
      "id": "book",
      "icon": "BookOpen",
      "tone": "source",
      "label": [
        "Origin of Species",
        "《物種起源》",
        "《物种起源》"
      ],
      "relation": [
        "Related reading",
        "相關閱讀",
        "相关阅读"
      ]
    },
    {
      "id": "population",
      "icon": "Notebook",
      "tone": "page",
      "label": [
        "Population genetics",
        "群體遺傳學",
        "群体遗传学"
      ],
      "relation": [
        "Research note",
        "研究筆記",
        "研究笔记"
      ]
    }
  ],
  "development": [
    {
      "id": "loop",
      "icon": "Notebook",
      "tone": "page",
      "label": [
        "Agent Loop",
        "Agent Loop",
        "Agent Loop"
      ],
      "relation": [
        "Working pattern",
        "工作模式",
        "工作模式"
      ]
    },
    {
      "id": "claude",
      "icon": "Shapes",
      "tone": "tool",
      "label": [
        "Claude",
        "Claude",
        "Claude"
      ],
      "relation": [
        "AI tool",
        "AI 工具",
        "AI 工具"
      ]
    },
    {
      "id": "eval",
      "icon": "Shapes",
      "tone": "project",
      "label": [
        "Evaluation plan",
        "評測計畫",
        "评测计划"
      ],
      "relation": [
        "Project",
        "專案",
        "项目"
      ]
    },
    {
      "id": "retrieval",
      "icon": "Notebook",
      "tone": "page",
      "label": [
        "RAG retrieval",
        "RAG 檢索",
        "RAG 检索"
      ],
      "relation": [
        "Technical note",
        "技術筆記",
        "技术笔记"
      ]
    },
    {
      "id": "anthropic",
      "icon": "Buildings",
      "tone": "org",
      "label": [
        "Anthropic",
        "Anthropic",
        "Anthropic"
      ],
      "relation": [
        "Tool provider",
        "工具提供者",
        "工具提供方"
      ]
    }
  ]
} as const;
