<script setup lang="ts">
interface ShortcutEntry {
  name: string
  url: string
}

interface ShortcutCollection {
  id: string
  title: string
  summary: string
  tags: string[]
  coverLabel: string
  shortcutCount: number
  likes: number
  comments: number
  updatedAt: string
  shortcuts: ShortcutEntry[]
}

const collections: ShortcutCollection[] = [
  {
    id: 'wifi-dns-kit',
    title: 'Wi-Fi DNS 快速切换工具箱',
    summary: '一键切换常用 DNS，支持公司/家用/开发环境配置快速套用。',
    tags: ['网络', '效率'],
    coverLabel: 'DNS',
    shortcutCount: 3,
    likes: 128,
    comments: 26,
    updatedAt: '2026-03-01',
    shortcuts: [
      { name: '切换到 Cloudflare DNS', url: '#' },
      { name: '切换到 AdGuard DNS', url: '#' },
      { name: '恢复自动获取 DNS', url: '#' },
    ],
  },
  {
    id: 'work-focus-flow',
    title: '深度工作模式自动化',
    summary: '打开专注模式、静音通知并自动记录工作开始时间。',
    tags: ['专注', '办公'],
    coverLabel: 'FOCUS',
    shortcutCount: 2,
    likes: 93,
    comments: 11,
    updatedAt: '2026-02-23',
    shortcuts: [
      { name: '开启深度工作模式', url: '#' },
      { name: '结束并生成工作摘要', url: '#' },
    ],
  },
  {
    id: 'commute-pack',
    title: '通勤场景快捷包',
    summary: '出门前一键查看天气、路况与地铁拥挤度，并推送提醒。',
    tags: ['生活', '出行'],
    coverLabel: 'GO',
    shortcutCount: 4,
    likes: 67,
    comments: 8,
    updatedAt: '2026-02-18',
    shortcuts: [
      { name: '早高峰通勤提醒', url: '#' },
      { name: '地铁到站播报', url: '#' },
      { name: '共享单车站点检查', url: '#' },
      { name: '回家路线建议', url: '#' },
    ],
  },
  {
    id: 'capture-publish',
    title: '灵感采集到发布工作流',
    summary: '从截图/语音快速入库，再自动整理后发布到 Notion 或博客。',
    tags: ['创作', '内容'],
    coverLabel: 'IDEA',
    shortcutCount: 3,
    likes: 154,
    comments: 37,
    updatedAt: '2026-02-12',
    shortcuts: [
      { name: '灵感快速采集', url: '#' },
      { name: '自动整理标签', url: '#' },
      { name: '一键发布模板', url: '#' },
    ],
  },
  {
    id: 'health-routine',
    title: '健康打卡例行流程',
    summary: '整合喝水、站立、拉伸与睡眠记录，自动生成每周统计。',
    tags: ['健康', '习惯'],
    coverLabel: 'CARE',
    shortcutCount: 2,
    likes: 81,
    comments: 13,
    updatedAt: '2026-01-30',
    shortcuts: [
      { name: '每日健康打卡', url: '#' },
      { name: '周报生成器', url: '#' },
    ],
  },
  {
    id: 'dev-helper-suite',
    title: '开发辅助指令合集',
    summary: '常用 API 调试、日志收集和 issue 模板生成集中处理。',
    tags: ['开发', '工具'],
    coverLabel: 'DEV',
    shortcutCount: 5,
    likes: 205,
    comments: 44,
    updatedAt: '2026-01-24',
    shortcuts: [
      { name: '请求调试面板', url: '#' },
      { name: '日志打包上传', url: '#' },
      { name: 'Crash 快速归档', url: '#' },
      { name: 'Issue 草稿生成', url: '#' },
      { name: '部署后健康检查', url: '#' },
    ],
  },
]
</script>

<template>
  <main class="home">
    <div class="bg-orb orb-a" aria-hidden="true" />
    <div class="bg-orb orb-b" aria-hidden="true" />

    <section class="hero">
      <p class="eyebrow">iOS Shortcuts Library</p>
      <h1>我写的快捷指令集合</h1>
      <p class="lead">
        面向手机浏览设计。每张卡片对应一个功能主题，点进去看完整说明、下载快捷指令并参与点赞评论。
      </p>

      <div class="hero-stats" aria-label="site summary">
        <div>
          <strong>{{ collections.length }}</strong>
          <span>专题卡片</span>
        </div>
        <div>
          <strong>{{ collections.reduce((sum, item) => sum + item.shortcutCount, 0) }}</strong>
          <span>快捷指令</span>
        </div>
        <div>
          <strong>{{ collections.reduce((sum, item) => sum + item.likes, 0) }}</strong>
          <span>总点赞</span>
        </div>
      </div>
    </section>

    <section class="gallery" aria-label="shortcuts gallery">
      <article v-for="item in collections" :key="item.id" class="card">
        <div class="card-cover">{{ item.coverLabel }}</div>

        <div class="card-content">
          <div class="card-top">
            <h2>{{ item.title }}</h2>
            <p>{{ item.summary }}</p>
          </div>

          <div class="tag-row">
            <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>

          <ul class="shortcut-list">
            <li v-for="shortcut in item.shortcuts.slice(0, 3)" :key="shortcut.name">
              {{ shortcut.name }}
            </li>
            <li v-if="item.shortcuts.length > 3">+{{ item.shortcuts.length - 3 }} 个更多指令</li>
          </ul>

          <div class="card-meta">
            <span>{{ item.shortcutCount }} 个指令</span>
            <span>{{ item.likes }} 赞</span>
            <span>{{ item.comments }} 评论</span>
          </div>

          <a class="card-link" :href="`/shortcuts/${item.id}`">进入详情页</a>
          <small class="updated-at">更新于 {{ item.updatedAt }}</small>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped lang="scss">
.home {
  --bg: #f5f8fb;
  --text-1: #112033;
  --text-2: #42566b;
  --line: #d6e2ec;
  --card-bg: #ffffff;
  --card-shadow: 0 12px 26px rgba(22, 39, 60, 0.08);
  --accent: #0c8f7a;
  --accent-deep: #0a6f5f;

  position: relative;
  min-height: 100vh;
  padding: 22px 14px 28px;
  background: radial-gradient(circle at 12% 0%, #dff7f0 0%, transparent 32%),
    radial-gradient(circle at 88% 0%, #e8f1ff 0%, transparent 30%), var(--bg);
  color: var(--text-1);
  overflow: hidden;
}

.bg-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.3;
  pointer-events: none;
}

.orb-a {
  width: 160px;
  height: 160px;
  top: -60px;
  right: -40px;
  background: #87dec8;
}

.orb-b {
  width: 160px;
  height: 160px;
  bottom: -70px;
  left: -50px;
  background: #9eb9f2;
}

.hero,
.gallery {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
}

.hero {
  margin-bottom: 16px;
}

.eyebrow {
  display: inline-block;
  margin: 0;
  padding: 5px 10px;
  border: 1px solid #b8cfdd;
  border-radius: 999px;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #395167;
  background: rgba(255, 255, 255, 0.72);
}

h1 {
  margin: 10px 0 8px;
  font-size: clamp(24px, 7vw, 34px);
  line-height: 1.16;
}

.lead {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-2);
}

.hero-stats {
  margin-top: 14px;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(112px, 1fr);
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;
}

.hero-stats::-webkit-scrollbar {
  display: none;
}

.hero-stats > div {
  min-height: 68px;
  padding: 9px 10px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.82);
}

.hero-stats strong {
  display: block;
  font-size: 17px;
  line-height: 1;
}

.hero-stats span {
  display: block;
  margin-top: 6px;
  color: var(--text-2);
  font-size: 12px;
}

.gallery {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
}

.card {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-radius: 14px;
  border: 1px solid #dbe6ef;
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  overflow: hidden;
}

.card-cover {
  width: 72px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #124c5e;
  background: linear-gradient(160deg, #d8f7ef, #e9f0ff);
}

.card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 10px;
  min-width: 0;
}

.card-top h2 {
  margin: 0;
  font-size: 15px;
  line-height: 1.35;
}

.card-top p {
  margin: 6px 0 0;
  color: var(--text-2);
  font-size: 13px;
  line-height: 1.5;
}

.tag-row {
  margin-top: 9px;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid #cfe1ea;
  background: #f4f9fb;
  font-size: 11px;
  color: #335367;
}

.shortcut-list {
  margin: 10px 0 0;
  padding: 0 0 0 16px;
  color: #294357;
  font-size: 12px;
  line-height: 1.5;
}

.card-meta {
  margin-top: auto;
  padding-top: 9px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11px;
  color: #5e748a;
}

.card-link {
  margin-top: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 40px;
  border-radius: 10px;
  padding: 9px 12px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(120deg, var(--accent), var(--accent-deep));
  text-decoration: none;
}

.updated-at {
  margin-top: 7px;
  color: #71879b;
  font-size: 11px;
  text-align: right;
}

@media (min-width: 768px) {
  .home {
    padding: 42px 22px 48px;
  }

  .hero {
    margin-bottom: 24px;
  }

  .lead {
    font-size: 15px;
    max-width: 700px;
  }

  .hero-stats {
    grid-auto-flow: row;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    overflow: visible;
    gap: 10px;
  }

  .gallery {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  .card {
    flex-direction: column;
  }

  .card-cover {
    width: 100%;
    min-height: 84px;
  }

  .card-content {
    padding: 12px;
  }
}

@media (min-width: 1080px) {
  .gallery {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }
}
</style>
