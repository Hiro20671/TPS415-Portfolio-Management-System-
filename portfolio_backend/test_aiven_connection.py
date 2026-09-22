import os
import sys
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")
load_dotenv(BASE_DIR.parent / ".env")

def test_connection():
    print("=" * 60)
    print("AIVEN POSTGRESQL CONNECTION TEST")
    print("=" * 60)

    host = os.getenv("DATABASE_HOST")
    user = os.getenv("DATABASE_USER")
    password = os.getenv("DATABASE_PASSWORD")
    name = os.getenv("DATABASE_NAME")
    port = os.getenv("DATABASE_PORT", "5432")
    sslmode = os.getenv("DATABASE_SSL_MODE", "require")

    print(f"Target Host: {host or '(Not set - using local SQLite fallback)'}")
    print(f"Target Database: {name or '(Not set)'}")
    print(f"Target User: {user or '(Not set)'}")
    print(f"Target Port: {port}")
    print(f"SSL Mode: {sslmode}")
    print("-" * 60)

    if not (host and user and password and name):
        print("[INFO] Aiven environment variables are currently empty.")
        print("To connect to Aiven, fill in your .env file with your Aiven credentials.")
        return

    try:
        import psycopg2
        print("Connecting to Aiven Cloud PostgreSQL over SSL...")
        conn = psycopg2.connect(
            dbname=name,
            user=user,
            password=password,
            host=host,
            port=port,
            sslmode=sslmode,
            connect_timeout=10,
        )
        cursor = conn.cursor()
        cursor.execute("SELECT version();")
        db_version = cursor.fetchone()
        print("\n[SUCCESS] Successfully connected to Aiven Cloud PostgreSQL!")
        print(f"PostgreSQL Version: {db_version[0]}\n")

        # Check existing tables
        cursor.execute("""
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
            ORDER BY table_name;
        """)
        tables = cursor.fetchall()
        print(f"Found {len(tables)} tables in 'public' schema:")
        for t in tables:
            print(f"  - {t[0]}")

        cursor.close()
        conn.close()
        print("\nReady! You can now run:")
        print("  python manage.py migrate")
        print("  python manage.py seed_portfolio")
    except Exception as e:
        print(f"\n[ERROR] Connection failed: {e}")
        print("\nTroubleshooting tips:")
        print("  1. Verify the DATABASE_HOST and DATABASE_PORT from the Aiven Console.")
        print("  2. Double check DATABASE_PASSWORD for any typos.")
        print("  3. Ensure DATABASE_SSL_MODE=require is present.")

if __name__ == "__main__":
    test_connection()
