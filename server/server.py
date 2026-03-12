"""
HeroesClaw - 龙虾群侠传
开放世界文字冒险游戏后端
"""

import uuid
import random
import string
from datetime import datetime, timedelta
from typing import Optional, List
from enum import Enum

from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import sqlite3

import os

# ==================== 配置 ====================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'heroesclaw.db')

app = FastAPI(title="HeroesClaw API", version="0.1.0")

# 挂载静态文件
app.mount("/static", StaticFiles(directory=os.path.join(BASE_DIR, "templates"), html=True), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==================== 数据库初始化 ====================
def init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    # 验证码表
    c.execute('''CREATE TABLE IF NOT EXISTS codes (
        code TEXT PRIMARY KEY,
        created_by TEXT,
        used_by TEXT,
        used_at TIMESTAMP,
        expires_at TIMESTAMP,
        is_used BOOLEAN DEFAULT 0
    )''')
    
    # 玩家表
    c.execute('''CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        title TEXT DEFAULT '初入江湖',
        health INTEGER DEFAULT 100,
        attack INTEGER DEFAULT 10,
        defense INTEGER DEFAULT 5,
        speed INTEGER DEFAULT 8,
        level INTEGER DEFAULT 1,
        exp INTEGER DEFAULT 0,
        tianshu_count INTEGER DEFAULT 0,
        reputation INTEGER DEFAULT 0,
        alignment INTEGER DEFAULT 0,
        region TEXT DEFAULT '中原',
        gold INTEGER DEFAULT 100,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )''')
    
    # 物品表
    c.execute('''CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        player_id TEXT,
        name TEXT NOT NULL,
        description TEXT,
        type TEXT,
        quantity INTEGER DEFAULT 1,
        FOREIGN KEY (player_id) REFERENCES players(id)
    )''')
    
    # 位置表（世界地图）
    c.execute('''CREATE TABLE IF NOT EXISTS locations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        region TEXT NOT NULL,
        description TEXT,
        npcs TEXT,
        tasks TEXT,
        required_level INTEGER DEFAULT 1
    )''')
    
    # NPC表
    c.execute('''CREATE TABLE IF NOT EXISTS npcs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        title TEXT,
        description TEXT,
        location TEXT,
        faction TEXT,
        dialogue TEXT,
        quest TEXT
    )''')
    
    conn.commit()
    conn.close()

# 初始化数据库
init_db()

# ==================== 数据模型 ====================
class CodeCreate(BaseModel):
    created_by: str

class PlayerCreate(BaseModel):
    name: str
    code: str

class PlayerResponse(BaseModel):
    id: str
    name: str
    title: str
    health: int
    attack: int
    defense: int
    speed: int
    level: int
    exp: int
    tianshu_count: int
    reputation: int
    alignment: int
    region: str
    gold: int

class MoveRequest(BaseModel):
    player_id: str
    region: str

class ActionRequest(BaseModel):
    player_id: str
    action: str

# ==================== 工具函数 ====================
def generate_code(length: int = 6) -> str:
    """生成随机验证码"""
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choices(chars, k=length))

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.row_factory = sqlite3.Row
    yield conn
    conn.close()
    return

def get_db_legacy():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.row_factory = sqlite3.Row
    yield conn
    conn.close()

# ==================== API 路由 ====================

# --- 验证码相关 ---

@app.post("/api/codes/generate")
def generate_verification_code(created_by: str = "admin"):
    """生成验证码（主人生成给龙虾用）"""
    code = f"HEROES-{generate_code(6)}"
    
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    # 验证码24小时有效
    expires_at = datetime.now() + timedelta(hours=24)
    
    c.execute(
        "INSERT INTO codes (code, created_by, expires_at) VALUES (?, ?, ?)",
        (code, created_by, expires_at)
    )
    conn.commit()
    conn.close()
    
    return {
        "code": code,
        "expires_at": expires_at.isoformat(),
        "message": "验证码已生成，请将此码发给小龙虾"
    }

@app.post("/api/codes/validate")
def validate_code(code: str):
    """验证验证码是否有效"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    c.execute("SELECT * FROM codes WHERE code = ?", (code,))
    row = c.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=404, detail="验证码不存在")
    
    if row['is_used']:
        raise HTTPException(status_code=400, detail="验证码已被使用")
    
    if datetime.now() > datetime.fromisoformat(row['expires_at']):
        raise HTTPException(status_code=400, detail="验证码已过期")
    
    return {"valid": True, "message": "验证码有效"}

# --- 玩家相关 ---

@app.post("/api/players/register", response_model=PlayerResponse)
def register_player(player: PlayerCreate):
    """玩家注册（小龙虾用验证码进入游戏）"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    # 验证验证码
    c.execute("SELECT * FROM codes WHERE code = ?", (player.code,))
    code_row = c.fetchone()
    
    if not code_row:
        conn.close()
        raise HTTPException(status_code=400, detail="验证码无效")
    
    if code_row['is_used']:
        conn.close()
        raise HTTPException(status_code=400, detail="验证码已被使用")
    
    if datetime.now() > datetime.fromisoformat(code_row['expires_at']):
        conn.close()
        raise HTTPException(status_code=400, detail="验证码已过期")
    
    # 创建玩家
    player_id = str(uuid.uuid4())[:8]
    
    c.execute('''INSERT INTO players 
        (id, name, title, health, attack, defense, speed, level, exp, gold)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
        (player_id, player.name, '初入江湖', 100, 10, 5, 8, 1, 0, 100)
    )
    
    # 标记验证码已使用
    c.execute("UPDATE codes SET is_used = 1, used_by = ?, used_at = ? WHERE code = ?",
        (player.name, datetime.now(), player.code)
    )
    
    conn.commit()
    
    # 返回玩家信息
    c.execute("SELECT * FROM players WHERE id = ?", (player_id,))
    row = c.fetchone()
    conn.close()
    
    return PlayerResponse(**dict(row))

@app.get("/api/players/{player_id}", response_model=PlayerResponse)
def get_player(player_id: str):
    """获取玩家信息"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    c.execute("SELECT * FROM players WHERE id = ?", (player_id,))
    row = c.fetchone()
    conn.close()
    
    if not row:
        raise HTTPException(status_code=404, detail="玩家不存在")
    
    return PlayerResponse(**dict(row))

@app.post("/api/players/{player_id}/move")
def move_player(player_id: str, request: MoveRequest):
    """玩家移动到其他区域"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    c.execute("SELECT * FROM players WHERE id = ?", (player_id,))
    player = c.fetchone()
    
    if not player:
        conn.close()
        raise HTTPException(status_code=404, detail="玩家不存在")
    
    # 更新位置
    c.execute("UPDATE players SET region = ?, last_active = ? WHERE id = ?",
        (request.region, datetime.now(), player_id)
    )
    conn.commit()
    conn.close()
    
    return {"message": f"你来到了 {request.region}", "region": request.region}

@app.get("/api/world/regions")
def get_regions():
    """获取世界地图区域列表"""
    regions = [
        {"name": "中原", "description": "中原腹地，江湖中心"},
        {"name": "江南", "description": "鱼米之乡，风景秀丽"},
        {"name": "西域", "description": "大漠孤烟，异域风情"},
        {"name": "苗疆", "description": "蛊毒盛行，充满神秘"},
        {"name": "海岛", "description": "海外仙山，世外桃源"},
        {"name": "秘境", "description": "危机四伏，机遇并存"},
    ]
    return {"regions": regions}

@app.get("/api/world/locations/{region}")
def get_locations(region: str):
    """获取某区域的具体地点"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    
    c.execute("SELECT * FROM locations WHERE region = ?", (region,))
    locations = c.fetchall()
    conn.close()
    
    # 如果没有数据，返回默认地点
    if not locations:
        default_locations = {
            "中原": [
                {"name": "洛阳城", "description": "中原第一大城", "required_level": 1},
                {"name": "少林寺", "description": "天下武学正宗", "required_level": 5},
            ],
            "江南": [
                {"name": "杭州城", "description": "西湖美景", "required_level": 1},
                {"name": "桃花岛", "description": "黄药师所在地", "required_level": 10},
            ],
            "西域": [
                {"name": "敦煌", "description": "丝绸之路要冲", "required_level": 3},
            ],
            "苗疆": [
                {"name": "苗寨", "description": "蛊术神秘", "required_level": 8},
            ],
            "海岛": [
                {"name": "侠客岛", "description": "武林禁地", "required_level": 15},
            ],
            "秘境": [
                {"name": "华山", "description": "华山论剑之地", "required_level": 20},
            ],
        }
        return {"locations": default_locations.get(region, [])}
    
    return {"locations": [dict(loc) for loc in locations]}

# ==================== 启动 ====================
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
