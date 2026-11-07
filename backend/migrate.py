"""Add missing columns to the users table."""
from app.core.database import engine
from sqlalchemy import text

columns = [
    "phone VARCHAR(50) DEFAULT ''",
    "college VARCHAR(255) DEFAULT ''",
    "graduation_year INTEGER",
    "linkedin_url VARCHAR(500) DEFAULT ''",
    "github_url VARCHAR(500) DEFAULT ''",
    "resume_score INTEGER",
    "resume_data TEXT DEFAULT ''",
    "profile_completed BOOLEAN DEFAULT FALSE",
    "updated_at TIMESTAMPTZ",
]

with engine.connect() as conn:
    for col in columns:
        conn.execute(text(f"ALTER TABLE users ADD COLUMN IF NOT EXISTS {col}"))
    conn.commit()
    print("All columns added successfully")
