import { create } from 'zustand'

interface Player {
  id: string
  name: string
  title: string
  level: number
  exp: number
  expToNext: number
  health: number
  maxHealth: number
  attack: number
  defense: number
  speed: number
  luck: number
  gold: number
  gems: number
  spirit: number
  reputation: number
  alignment: number
  realm: string
  realmLevel: number
  cultivation: number
  cultivationToNext: number
  region: string
  faction: string
  tianshuCount: number
  equipment: Equipment[]
}

interface Equipment {
  id: string
  name: string
  type: 'weapon' | 'armor' | 'boots' | 'accessory' | 'helmet' | 'pants'
  level: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  stats: {
    attack?: number
    defense?: number
    health?: number
    speed?: number
    luck?: number
  }
}

interface Region {
  id: string
  name: string
  description: string
  exploration: number
  isUnlocked: boolean
}

interface NPC {
  id: string
  name: string
  title: string
  faction: string
  region: string
  description: string
  friendliness: number
}

interface Event {
  id: string
  type: 'adventure' | 'battle' | 'friendship' | 'mission' | 'crisis'
  title: string
  description: string
  choices: { id: string; text: string }[]
  deadline: number
  isUrgent: boolean
  isResolved: boolean
}

interface LogEntry {
  id: string
  time: string
  message: string
  type: 'info' | 'success' | 'warning' | 'danger'
}

interface WorldBoss {
  id: string
  name: string
  level: number
  health: number
  maxHealth: number
  damage: number
  rewards: { gold: number; exp: number; items: string[] }
  participants: number
  myDamage: number
  rank: number
}

interface ArenaPlayer {
  id: string
  name: string
  title: string
  power: number
  rank: number
}

interface GameState {
  player: Player
  regions: Region[]
  npcs: NPC[]
  events: Event[]
  logs: LogEntry[]
  worldBoss: WorldBoss | null
  arena: ArenaPlayer[]
  myArenaRank: number
  myArenaPower: number
  isAutoBattle: boolean
  battleLog: string[]
  currentChat: { name: string; avatar: string; messages: { text: string; isPlayer: boolean }[] } | null

  setPlayer: (player: Player) => void
  updatePlayerStats: (stats: Partial<Player>) => void
  addExp: (amount: number) => void
  addGold: (amount: number) => void
  addLog: (log: LogEntry) => void
  moveToRegion: (regionId: string) => void
  toggleAutoBattle: () => void
  addBattleLog: (message: string) => void
  resolveEvent: (eventId: string, choiceId: string) => void
  attackBoss: () => void
  startChat: (npc: NPC) => void
  sendChatMessage: (message: string) => void
  closeChat: () => void
}

const initialPlayer: Player = {
  id: 'player-001',
  name: '江湖小虾米',
  title: '初入江湖',
  level: 128,
  exp: 8560,
  expToNext: 10000,
  health: 85630,
  maxHealth: 85630,
  attack: 12870,
  defense: 6430,
  speed: 12566,
  luck: 487,
  gold: 1280000000,
  gems: 8960,
  spirit: 32000,
  reputation: 236000000,
  alignment: 0,
  realm: '金丹中期',
  realmLevel: 5,
  cultivation: 236000000,
  cultivationToNext: 289000000,
  region: '中原',
  faction: '少林',
  tianshuCount: 3,
  equipment: [
    { id: 'w1', name: '屠龙钳', type: 'weapon', level: 128, rarity: 'legendary', stats: { attack: 2500 } },
    { id: 'a1', name: '金丝甲', type: 'armor', level: 126, rarity: 'epic', stats: { defense: 1800, health: 5000 } },
    { id: 'b1', name: '疾风靴', type: 'boots', level: 125, rarity: 'epic', stats: { speed: 1500 } },
    { id: 'h1', name: '紫金冠', type: 'helmet', level: 126, rarity: 'rare', stats: { defense: 800 } },
    { id: 'p1', name: '玄铁裤', type: 'pants', level: 126, rarity: 'rare', stats: { defense: 600 } },
    { id: 'ac1', name: '九转玉佩', type: 'accessory', level: 127, rarity: 'legendary', stats: { luck: 100, health: 3000 } },
  ],
}

const initialRegions: Region[] = [
  { id: 'zhongyuan', name: '中原', description: '江湖腹地，天下武学正宗', exploration: 100, isUnlocked: true },
  { id: 'jiangnan', name: '江南', description: '鱼米之乡，风景秀丽', exploration: 70, isUnlocked: true },
  { id: 'miaojiang', name: '苗疆', description: '蛊毒盛行，充满神秘', exploration: 65, isUnlocked: true },
  { id: 'xiyu', name: '西域', description: '大漠孤烟，异域风情', exploration: 45, isUnlocked: true },
  { id: 'guanwai', name: '关外', description: '北国风光，铁骑纵横', exploration: 30, isUnlocked: true },
  { id: 'jingcheng', name: '京城', description: '朝廷势力，江湖庙堂', exploration: 80, isUnlocked: true },
]

const initialNPCs: NPC[] = [
  { id: 'npc1', name: '郭靖', title: '北侠', faction: '丐帮', region: '中原', description: '侠之大者，为国为民', friendliness: 80 },
  { id: 'npc2', name: '黄蓉', title: '丐帮夫人', faction: '丐帮', region: '江南', description: '聪明伶俐，厨艺天下第一', friendliness: 85 },
  { id: 'npc3', name: '扫地僧', title: '少林无名', faction: '少林', region: '中原', description: '深藏不露的武林高手', friendliness: 70 },
]

const initialLogs: LogEntry[] = [
  { id: 'log1', time: '14:35', message: '击败少林扫地僧，获得经验+12580', type: 'success' },
  { id: 'log2', time: '14:35', message: '获得物品【少林功德箱】x1', type: 'success' },
  { id: 'log3', time: '14:34', message: '修炼完成，修为+35679', type: 'info' },
  { id: 'log4', time: '14:34', message: '遭遇隐世高人，触发奇遇任务', type: 'warning' },
  { id: 'log5', time: '14:33', message: '击败铜人阵守卫，获得经验+8420', type: 'success' },
  { id: 'log6', time: '14:32', message: '获得物品【洗髓丹】x2', type: 'success' },
  { id: 'log7', time: '14:31', message: '境界感悟，修为+26789', type: 'info' },
  { id: 'log8', time: '14:30', message: '遭遇Boss【金刚罗汉】', type: 'danger' },
  { id: 'log9', time: '14:30', message: '对Boss造成856.7万伤害', type: 'success' },
]

const initialWorldBoss: WorldBoss = {
  id: 'boss1',
  name: '金刚罗汉',
  level: 120,
  health: 2367890123,
  maxHealth: 6450000000,
  damage: 50000,
  rewards: { gold: 1000000, exp: 500000, items: ['金刚经', '罗汉舍利'] },
  participants: 2367890123,
  myDamage: 8567000,
  rank: 128,
}

const initialArena: ArenaPlayer[] = [
  { id: 'p1', name: '虾仁不眨眼', title: '武林盟主', power: 12500000, rank: 1 },
  { id: 'p2', name: '虾仁霸霸', title: '天下第二', power: 9875000, rank: 2 },
  { id: 'p3', name: '龙虾霸霸', title: '西域霸主', power: 9875000, rank: 3 },
  { id: 'p4', name: '虾客行', title: '独行侠', power: 8563000, rank: 4 },
  { id: 'p5', name: '虾在江湖', title: '逍遥客', power: 7521000, rank: 5 },
  { id: 'p6', name: '红袍虾侠', title: '红衣使者', power: 6320000, rank: 6 },
]

export const useGameStore = create<GameState>((set) => ({
  player: initialPlayer,
  regions: initialRegions,
  npcs: initialNPCs,
  events: [],
  logs: initialLogs,
  worldBoss: initialWorldBoss,
  arena: initialArena,
  myArenaRank: 128,
  myArenaPower: 9856000,
  isAutoBattle: true,
  battleLog: [],
  currentChat: {
    name: '小师妹',
    avatar: 'female',
    messages: [
      { text: '虾虾大侠，你又突破啦！真厉害呢~', isPlayer: false },
      { text: '听说你在少林寺大显神威，师父都夸你是百年难得一见的练武奇才呢！(^o^)', isPlayer: false },
    ],
  },

  setPlayer: (player) => set({ player }),

  updatePlayerStats: (stats) => set((state) => ({
    player: { ...state.player, ...stats },
  })),

  addExp: (amount) => set((state) => {
    let newExp = state.player.exp + amount
    let newLevel = state.player.level
    let expNeeded = state.player.expToNext

    while (newExp >= expNeeded) {
      newExp -= expNeeded
      newLevel += 1
      expNeeded = Math.floor(expNeeded * 1.5)
    }

    return {
      player: {
        ...state.player,
        exp: newExp,
        level: newLevel,
        expToNext: expNeeded,
      },
    }
  }),

  addGold: (amount) => set((state) => ({
    player: { ...state.player, gold: state.player.gold + amount },
  })),

  addLog: (log) => set((state) => ({
    logs: [log, ...state.logs].slice(0, 50),
  })),

  moveToRegion: (regionId) => set((state) => ({
    player: { ...state.player, region: state.regions.find(r => r.id === regionId)?.name || state.player.region },
  })),

  toggleAutoBattle: () => set((state) => ({ isAutoBattle: !state.isAutoBattle })),

  addBattleLog: (message) => set((state) => ({
    battleLog: [...state.battleLog, message].slice(-50),
  })),

  resolveEvent: (eventId, choiceId) => set((state) => ({
    events: state.events.map(e =>
      e.id === eventId ? { ...e, isResolved: true, playerChoice: choiceId } : e
    ),
  })),

  attackBoss: () => set((state) => {
    if (!state.worldBoss) return state

    const damage = Math.floor(state.player.attack * (1 + Math.random() * 0.2))
    const newHealth = Math.max(0, state.worldBoss.health - damage)
    const newMyDamage = state.worldBoss.myDamage + damage

    return {
      worldBoss: {
        ...state.worldBoss,
        health: newHealth,
        myDamage: newMyDamage,
      },
    }
  }),

  startChat: (npc) => set({
    currentChat: {
      name: npc.name,
      avatar: 'male',
      messages: [{ text: npc.description, isPlayer: false }],
    },
  }),

  sendChatMessage: (message) => set((state) => {
    if (!state.currentChat) return state

    const responses = [
      '说得好！',
      '少侠言之有理！',
      '哈哈，有趣有趣！',
      '愿闻其详！',
      '原来如此！',
    ]

    return {
      currentChat: {
        ...state.currentChat,
        messages: [
          ...state.currentChat.messages,
          { text: message, isPlayer: true },
          { text: responses[Math.floor(Math.random() * responses.length)], isPlayer: false },
        ],
      },
    }
  }),

  closeChat: () => set({ currentChat: null }),
}))
