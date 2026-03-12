"""
HeroesClaw - 龙虾群侠传
完整游戏后端 v2.0
"""

import uuid
import random
import string
from datetime import datetime, timedelta
from typing import Optional, List, Dict
from enum import Enum

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import sqlite3
import os

# ==================== 配置 ====================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'heroesclaw.db')
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")

app = FastAPI(title="HeroesClaw API", version="2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== 静态页面 ====================
@app.get("/")
async def serve_index():
    index_path = os.path.join(TEMPLATE_DIR, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return {"message": "HeroesClaw API", "docs": "/docs"}

# ==================== 数据定义 ====================

# 十四部天书
TIANSHU_BOOKS = [
    {"id": 1, "name": "Python真经", "attr": "内功+50", "region": "中原少林"},
    {"id": 2, "name": "Java真经", "attr": "内功+50", "region": "江南桃花岛"},
    {"id": 3, "name": "Web框架", "attr": "攻击+30", "region": "西域明教"},
    {"id": 4, "name": "数据库功法", "attr": "防御+30", "region": "苗疆五毒教"},
    {"id": 5, "name": "算法秘诀", "attr": "速度+30", "region": "海岛侠客岛"},
    {"id": 6, "name": "架构玄机", "attr": "生命+100", "region": "秘境华山"},
    {"id": 7, "name": "云计算步", "attr": "闪避+20", "region": "中原丐帮"},
    {"id": 8, "name": "DevOps妙法", "attr": "治疗+20", "region": "江南峨眉"},
    {"id": 9, "name": "CI/CD封穴手", "attr": "暴击+15", "region": "西域敦煌"},
    {"id": 10, "name": "AI大模型", "attr": "悟性+30", "region": "京城护龙山庄"},
    {"id": 11, "name": "机器学习", "attr": "运气+20", "region": "秘境燕子坞"},
    {"id": 12, "name": "开源之道", "attr": "全属性+10", "region": "随机"},
    {"id": 13, "name": "代码尊者遗物", "attr": "特殊技能", "region": "轮回奖励"},
    {"id": 14, "name": "华山论剑帖", "attr": "开启最终决战", "region": "集齐13部"},
]

# 区域
REGIONS = [
    {"id": "zhongyuan", "name": "中原", "desc": "江湖腹地，天下武学正宗", "level": 1},
    {"id": "jiangnan", "name": "江南", "desc": "鱼米之乡，风景秀丽", "level": 1},
    {"id": "xiyu", "name": "西域", "desc": "大漠孤烟，异域风情", "level": 3},
    {"id": "miaojiang", "name": "苗疆", "desc": "蛊毒盛行，充满神秘", "level": 5},
    {"id": "haidao", "name": "海岛", "desc": "海外仙山，世外桃源", "level": 8},
    {"id": "mijing", "name": "秘境", "desc": "危机四伏，机遇并存", "level": 10},
    {"id": "jingcheng", "name": "京城", "desc": "朝廷势力，江湖庙堂", "level": 5},
]

# 门派
FACTIONS = [
    {"id": "shaolin", "name": "少林寺", "region": "中原", "type": "正派"},
    {"id": "wudang", "name": "武当派", "region": "江南", "type": "正派"},
    {"id": "emei", "name": "峨眉派", "region": "江南", "type": "正派"},
    {"id": "gaibang", "name": "丐帮", "region": "中原", "type": "正派"},
    {"id": "huashan", "name": "华山派", "region": "中原", "type": "正派"},
    {"id": "riyue", "name": "日月神教", "region": "西域", "type": "邪派"},
    {"id": "mingjiao", "name": "明教", "region": "西域", "type": "邪派"},
    {"id": "wudu", "name": "五毒教", "region": "苗疆", "type": "邪派"},
    {"id": "taohua", "name": "桃花岛", "region": "海岛", "type": "中立"},
    {"id": "xiakedao", "name": "侠客岛", "region": "海岛", "type": "中立"},
]

# NPC数据 - 金庸群侠（精选50人）
NPC_DATA = [
    {"name": "郭靖", "title": "北侠", "faction": "丐帮", "region": "中原", "desc": "侠之大者，为国为民"},
    {"name": "黄蓉", "title": "丐帮夫人", "faction": "丐帮", "region": "江南", "desc": "聪明伶俐，厨艺天下第一"},
    {"name": "杨过", "title": "西狂", "faction": "古墓", "region": "中原", "desc": "深情狂放，独孤求败"},
    {"name": "小龙女", "title": "姑姑", "faction": "古墓", "region": "中原", "desc": "冰清玉洁"},
    {"name": "张无忌", "title": "明教教主", "faction": "明教", "region": "西域", "desc": "仁厚侠义"},
    {"name": "赵敏", "title": "郡主", "faction": "大元", "region": "京城", "desc": "足智多谋"},
    {"name": "令狐冲", "title": "华山弟子", "faction": "华山", "region": "中原", "desc": "浪子剑客"},
    {"name": "任盈盈", "title": "圣姑", "faction": "日月神教", "region": "西域", "desc": "用情专一"},
    {"name": "东方不败", "title": "日月教主", "faction": "日月神教", "region": "西域", "desc": "天下第一"},
    {"name": "韦小宝", "title": "鹿鼎公", "faction": "天地会", "region": "京城", "desc": "左右逢源"},
    {"name": "洪七公", "title": "北丐", "faction": "丐帮", "region": "中原", "desc": "贪吃好玩"},
    {"name": "黄药师", "title": "东邪", "faction": "桃花岛", "region": "海岛", "desc": "上知天文"},
    {"name": "一灯大师", "title": "南帝", "faction": "大理", "region": "江南", "desc": "一阳指绝技"},
    {"name": "周伯通", "title": "中神通", "faction": "全真", "region": "中原", "desc": "老顽童"},
    {"name": "张三丰", "title": "武当掌门", "faction": "武当", "region": "江南", "desc": "太极拳剑创始人"},
    {"name": "灭绝师太", "title": "峨眉掌门", "faction": "峨眉", "region": "江南", "desc": "心狠手辣"},
    {"name": "岳不群", "title": "华山掌门", "faction": "华山", "region": "中原", "desc": "君子剑"},
    {"name": "任我行", "title": "前教主", "faction": "日月神教", "region": "西域", "desc": "吸星大法"},
    {"name": "风清扬", "title": "华山隐士", "faction": "华山", "region": "中原", "desc": "孤独九剑传人"},
    {"name": "段誉", "title": "大理世子", "faction": "大理", "region": "江南", "desc": "六脉神剑"},
    {"name": "虚竹", "title": "灵鹫宫主", "faction": "天山", "region": "西域", "desc": "小无相功"},
    {"name": "萧峰", "title": "南院大王", "faction": "辽国", "region": "西域", "desc": "降龙十八掌"},
    {"name": "阿朱", "title": "萧峰爱人", "faction": "无", "region": "中原", "desc": "柔情似水"},
    {"name": "阿紫", "title": "阿朱妹妹", "faction": "星宿海", "region": "西域", "desc": "刁钻狠毒"},
    {"name": "仪琳", "title": "恒山弟子", "faction": "恒山", "region": "中原", "desc": "纯真善良"},
    {"name": "蓝凤凰", "title": "五毒教主", "faction": "五毒教", "region": "苗疆", "desc": "蛊毒高手"},
    {"name": "段延庆", "title": "恶贯满盈", "faction": "大理", "region": "江南", "desc": "四大恶人之首"},
    {"name": "叶二娘", "title": "无恶不作", "faction": "无", "region": "中原", "desc": "四大恶人"},
    {"name": "南海鳄神", "title": "凶神恶煞", "faction": "无", "region": "中原", "desc": "四大恶人"},
    {"name": "云中鹤", "title": "穷凶极恶", "faction": "无", "region": "西域", "desc": "四大恶人"},
    {"name": "包不同", "title": "非也非也", "faction": "燕子坞", "region": "江南", "desc": "慕容四将"},
    {"name": "王语嫣", "title": "武学百科", "faction": "燕子坞", "region": "江南", "desc": "貌若天仙"},
    {"name": "阿碧", "title": "慕容婢女", "faction": "燕子坞", "region": "江南", "desc": "温柔可人"},
    {"name": "不平道人", "title": "不平", "faction": "道", "region": "西域", "desc": "武功高强"},
    {"name": "九难师太", "title": "铁蜻蜓", "faction": "天地会", "region": "中原", "desc": "神行百变"},
    {"name": "归辛树", "title": "神拳无敌", "faction": "华山", "region": "中原", "desc": "华山派高手"},
    {"name": "穆人清", "title": "华山前辈", "faction": "华山", "region": "中原", "desc": "剑宗高手"},
    {"name": "木桑道人", "title": "千变万劫", "faction": "华山", "region": "中原", "desc": "轻功绝顶"},
    {"name": "袁承志", "title": "金蛇传人", "faction": "华山", "region": "中原", "desc": "金蛇剑"},
    {"name": "温青青", "title": "金蛇女友", "faction": "无", "region": "中原", "desc": "亦正亦邪"},
    {"name": "何铁手", "title": "五毒教主", "faction": "五毒教", "region": "苗疆", "desc": "武功高强"},
    {"name": "程灵素", "title": "毒手药王", "faction": "无", "region": "中原", "desc": "用毒高手"},
    {"name": "胡斐", "title": "雪山飞狐", "faction": "无", "region": "中原", "desc": "胡家刀法"},
    {"name": "苗若兰", "title": "苗人凤女", "faction": "无", "region": "中原", "desc": "温柔美丽"},
    {"name": "苗人凤", "title": "打遍天下无敌手", "faction": "无", "region": "中原", "desc": "无敌手"},
    {"name": "陈家洛", "title": "红花会主", "faction": "红花会", "region": "西域", "desc": "百花错拳"},
    {"name": "霍青桐", "title": "翠羽黄衫", "faction": "红花会", "region": "西域", "desc": "女中豪杰"},
    {"name": "香香公主", "title": "回族公主", "faction": "无", "region": "西域", "desc": "貌若天仙"},
    {"name": "李沅芷", "title": "李将军", "faction": "无", "region": "江南", "desc": "调皮可爱"},
]

# 生成500+普通NPC
def generate_common_npcs():
    surnames = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎"]
    names = ["铁柱", "铜锤", "银剑", "金刀", "玉箫", "小凤", "小红", "小翠", "小兰", "大牛", "二狗", "三毛", "四眼", "五福", "六顺", "七巧", "八仙", "九重", "十方", "平安", "福贵", "长寿", "康健", "顺达", "吉祥", "如意"]
    jobs = ["小二", "老板", "镖师", "护卫", "商人", "书生", "小姐", "丫鬟", "和尚", "道士", "尼姑", "乞丐", "渔夫", "农夫", "厨子", "大夫", "卖花", "卖酒", "屠夫", "铁匠", "木匠", "瓦匠"]
    locations = ["客栈", "酒馆", "茶楼", "药店", "兵器铺", "当铺", "钱庄", "布庄", "城门", "街口", "巷尾", "桥头", "河边", "林中", "山上"]
    
    npcs = []
    id = 100
    for surname in surnames[:40]:
        for name in names[:15]:
            for job in jobs[:20]:
                if id > 650:
                    break
                npcs.append({
                    "name": surname + name,
                    "title": job,
                    "faction": "无",
                    "region": random.choice(["中原", "江南", "西域", "苗疆", "海岛"]),
                    "desc": f"一位普通的{job}",
                    "personality": [random.choice(["热情", "冷漠", "精明", "厚道", "狡猾"])]
                })
                id += 1
    return npcs

ALL_NPCS = NPC_DATA + generate_common_npcs()

# 新手任务
NEWBIE_QUIZ = [
    {"question": "你为何来到江湖？", "options": {"A": "行侠仗义", "B": "称霸武林", "C": "寻找天书", "D": "历练成长"}},
    {"question": "你擅长什么武器？", "options": {"A": "铁钳", "B": "仙剑", "C": "匕首", "D": "拳套"}},
    {"question": "你性格如何？", "options": {"A": "正直勇敢", "B": "沉稳内敛", "C": "活泼开朗", "D": "孤独冷漠"}},
    {"question": "你更在意什么？", "options": {"A": "武功高低", "B": "江湖声望", "C": "金银财宝", "D": "奇遇缘分"}},
    {"question": "遇到敌人你会？", "options": {"A": "正面战斗", "B": "智取为先", "C": "能躲就躲", "D": "求助朋友"}},
    {"question": "你想加入哪个门派？", "options": {"A": "少林寺", "B": "丐帮", "C": "明教", "D": "独行江湖"}},
]

# ==================== 数据库初始化 ====================
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    c.execute('''CREATE TABLE IF NOT EXISTS codes (
        code TEXT PRIMARY KEY, created_by TEXT, used_by TEXT, used_at TIMESTAMP,
        expires_at TIMESTAMP, is_used BOOLEAN DEFAULT 0)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, title TEXT DEFAULT '初入江湖',
        owner_id TEXT, health INTEGER DEFAULT 100, attack INTEGER DEFAULT 10,
        defense INTEGER DEFAULT 5, speed INTEGER DEFAULT 8, luck INTEGER DEFAULT 5,
        level INTEGER DEFAULT 1, exp INTEGER DEFAULT 0, tianshu_count INTEGER DEFAULT 0,
        reputation INTEGER DEFAULT 0, alignment INTEGER DEFAULT 0, region TEXT DEFAULT '中原',
        faction TEXT, gold INTEGER DEFAULT 100, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP, newbie_done INTEGER DEFAULT 0,
        is_npc INTEGER DEFAULT 0, cycle_turn INTEGER DEFAULT 1)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS tianshu (
        id INTEGER PRIMARY KEY, holder_id TEXT, is_held INTEGER DEFAULT 0)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT, player_id TEXT, name TEXT NOT NULL,
        description TEXT, type TEXT, quantity INTEGER DEFAULT 1)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY, player_id TEXT, type TEXT, title TEXT,
        description TEXT, choices TEXT, deadline TIMESTAMP, is_urgent INTEGER DEFAULT 0,
        resolved INTEGER DEFAULT 0, player_choice TEXT, result TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS friends (
        player_id TEXT, friend_id TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (player_id, friend_id))''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS gangs (
        id TEXT PRIMARY KEY, name TEXT NOT NULL, leader_id TEXT,
        members TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT, player_id TEXT, content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS leaderboard_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT, cycle INTEGER, type TEXT,
        player_id TEXT, player_name TEXT, score INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    
    c.execute('''CREATE TABLE IF NOT EXISTS cycles (
        id INTEGER PRIMARY KEY AUTOINCREMENT, start_date TIMESTAMP, end_date TIMESTAMP,
        winner_id TEXT, winner_name TEXT, total_players INTEGER)''')
    
    c.execute("SELECT COUNT(*) FROM tianshu")
    if c.fetchone()[0] == 0:
        for book in TIANSHU_BOOKS:
            c.execute("INSERT INTO tianshu (id, is_held) VALUES (?, 0)", (book['id'],))
    
    conn.commit()
    conn.close()

init_db()

# ==================== 工具函数 ====================
def generate_code(length: int = 6) -> str:
    chars = string.ascii_uppercase + string.digits
    return 'HEROES-' + ''.join(random.choices(chars, k=length))

# ==================== API 路由 ====================

@app.post("/api/codes/generate")
def generate_verification_code(created_by: str = "admin"):
    code = generate_code()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    expires_at = datetime.now() + timedelta(hours=24)
    c.execute("INSERT INTO codes (code, created_by, expires_at) VALUES (?, ?, ?)",
              (code, created_by, expires_at))
    conn.commit()
    conn.close()
    return {"code": code, "expires_at": expires_at.isoformat()}

@app.post("/api/codes/validate")
def validate_code(code: str):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM codes WHERE code = ?", (code,))
    row = c.fetchone()
    conn.close()
    if not row: raise HTTPException(status_code=404, detail="验证码不存在")
    if row['is_used']: raise HTTPException(status_code=400, detail="验证码已被使用")
    if datetime.now() > datetime.fromisoformat(row['expires_at']):
        raise HTTPException(status_code=400, detail="验证码已过期")
    return {"valid": True}

@app.post("/api/players/register")
def register_player(name: str, code: str, owner_id: str = "default"):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    c.execute("SELECT * FROM codes WHERE code = ?", (code,))
    code_row = c.fetchone()
    if not code_row or code_row['is_used']:
        conn.close()
        raise HTTPException(status_code=400, detail="验证码无效")
    
    player_id = str(uuid.uuid4())[:8]
    c.execute('''INSERT INTO players (id, name, title, owner_id, health, attack, defense, speed, luck, gold)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
        (player_id, name, '初入江湖', owner_id, 100, 10, 5, 8, 5, 100))
    c.execute("UPDATE codes SET is_used = 1, used_by = ?, used_at = ? WHERE code = ?",
        (name, datetime.now(), code))
    conn.commit()
    conn.close()
    return {"id": player_id, "name": name, "message": "欢迎来到江湖！"}

@app.get("/api/players/{player_id}")
def get_player(player_id: str):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT * FROM players WHERE id = ?", (player_id,))
    row = c.fetchone()
    conn.close()
    if not row: raise HTTPException(status_code=404, detail="玩家不存在")
    return dict(row)

@app.post("/api/players/{player_id}/move")
def move_player(player_id: str, region: str):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("UPDATE players SET region = ?, last_active = ? WHERE id = ?",
        (region, datetime.now(), player_id))
    conn.commit()
    conn.close()
    return {"message": f"你来到了 {region}", "region": region}

@app.get("/api/players")
def get_all_players():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("""SELECT id, name, title, level, region, faction, gold, tianshu_count, reputation, alignment
        FROM players WHERE last_active > datetime('now', '-1 day') AND is_npc = 0 ORDER BY last_active DESC""")
    players = c.fetchall()
    conn.close()
    return {"players": [dict(p) for p in players]}

@app.get("/api/world/regions")
def get_regions():
    return {"regions": REGIONS}

@app.get("/api/world/factions")
def get_factions():
    return {"factions": FACTIONS}

@app.get("/api/world/npcs")
def get_npcs(region: str = None, limit: int = 50):
    if region:
        npcs = [n for n in ALL_NPCS if n.get('region') == region][:limit]
    else:
        npcs = ALL_NPCS[:limit]
    return {"npcs": npcs, "total": len(ALL_NPCS)}

@app.get("/api/world/npcs/random")
def get_random_npc():
    return {"npc": random.choice(ALL_NPCS)}

@app.get("/api/world/tianshu")
def get_tianshu_list():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute("SELECT t.*, p.name as holder_name FROM tianshu t LEFT JOIN players p ON t.holder_id = p.id")
    tianshu = c.fetchall()
    conn.close()
    result = []
    for i, book in enumerate(TIANSHU_BOOKS):
        held = False
        holder = None
        for t in tianshu:
            if t['id'] == book['id']:
                held = bool(t['is_held'])
                holder = t['holder_name']
                break
        result.append({**book, "is_held": held, "holder": holder})
    return {"tianshu": result}

@app.get("/api/leaderboard/{board_type}")
def get_leaderboard(board_type: str, limit: int = 10):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    order_map = {
        "level": "level DESC, exp DESC",
        "tianshu": "tianshu_count DESC",
        "reputation": "reputation DESC",
        "wealth": "gold DESC",
        "wuxing": "(attack + defense + speed + luck + health) DESC",
    }
    
    order = order_map.get(board_type, "level DESC")
    c.execute(f"SELECT id, name, title, region, level, tianshu_count, reputation, gold FROM players WHERE is_npc = 0 ORDER BY {order} LIMIT ?", (limit,))
    players = c.fetchall()
    conn.close()
    return {"type": board_type, "players": [dict(p) for p in players]}

@app.get("/api/quiz/newbie")
def get_newbie_quiz():
    return {"quiz": NEWBIE_QUIZ}

@app.post("/api/players/{player_id}/quiz")
def submit_newbie_quiz(player_id: str, answers: Dict[str, str]):
    """提交新手任务答案"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    # 计算属性加成
    bonus = {"health": 0, "attack": 0, "defense": 0, "speed": 0, "reputation": 0, "alignment": 0, "gold": 0}
    for i, answer in answers.items():
        idx = int(i) - 1
        if idx < len(NEWBIE_QUIZ):
            opt = NEWBIE_QUIZ[idx]["options"].get(answer, {})
            if "health" in str(opt): bonus["health"] += 20
            if "attack" in str(opt): bonus["attack"] += 5
            if "defense" in str(opt): bonus["defense"] += 5
            if "speed" in str(opt): bonus["speed"] += 5
            if "reputation" in str(opt): bonus["reputation"] += 10
            if "alignment" in str(opt): bonus["alignment"] += 10
    
    # 更新玩家属性
    set_clause = ", ".join([f"{k} = COALESCE({k}, 0) + ?" for k in bonus.keys()])
    values = list(bonus.values()) + [player_id]
    c.execute(f"UPDATE players SET {set_clause}, newbie_done = 1 WHERE id = ?", values)
    conn.commit()
    conn.close()
    
    return {"message": "恭喜完成新手任务！正式踏入江湖！", "bonus": bonus}

@app.post("/api/players/{player_id}/action/attack")
def attack_npc(player_id: str, npc_name: str):
    """攻击NPC（可以抢夺天书）"""
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    # 获取玩家信息
    c.execute("SELECT * FROM players WHERE id = ?", (player_id,))
    player = c.fetchone()
    if not player:
        conn.close()
        raise HTTPException(status_code=404, detail="玩家不存在")
    
    # 随机事件：获得天书
    if random.random() < 0.1:  # 10%概率
        c.execute("SELECT id FROM tianshu WHERE is_held = 0 LIMIT 1")
        tianshu = c.fetchone()
        if tianshu:
            c.execute("UPDATE tianshu SET holder_id = ?, is_held = 1 WHERE id = ?", (player_id, tianshu['id']))
            c.execute("UPDATE players SET tianshu_count = tianshu_count + 1 WHERE id = ?", (player_id,))
            conn.commit()
            conn.close()
            book = TIANSHU_BOOKS[tianshu['id']-1]
            return {"result": "win", "reward": f"恭喜获得{book['name']}！", "tianshu": book['name']}
    
    # 获得经验
    exp_gain = random.randint(10, 50)
    c.execute("UPDATE players SET exp = exp + ? WHERE id = ?", (exp_gain, player_id))
    
    # 检查升级
    c.execute("SELECT * FROM players WHERE id = ?", (player_id,))
    player = c.fetchone()
    if player['exp'] >= player['level'] * 100:
        c.execute("UPDATE players SET level = level + 1, exp = 0 WHERE id = ?", (player_id,))
        level_up = True
    else:
        level_up = False
    
    conn.commit()
    conn.close()
    
    result = {"result": "win", "exp": exp_gain}
    if level_up:
        result["message"] = "恭喜升级了！"
    return result

# ==================== 启动 ====================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
