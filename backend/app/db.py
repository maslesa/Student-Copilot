import sqlite3

conn = sqlite3.connect('messages.db', check_same_thread=False)
cursor = conn.cursor()

def init_database():
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender TEXT NOT NULL,
        text TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    
def save_message(sender, text):
    cursor.execute("INSERT INTO messages (sender, text) VALUES (?, ?)", (sender, text))
    conn.commit()

def get_all_messages():
    cursor.execute("SELECT sender, text, timestamp FROM messages ORDER BY timestamp ASC")
    rows = cursor.fetchall()
    return [{"sender": r[0], "text": r[1], "timestamp": str(r[2])} for r in rows]