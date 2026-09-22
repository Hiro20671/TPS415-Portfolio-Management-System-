# Step-by-Step Guide: Deploying & Connecting to Aiven Cloud PostgreSQL

This guide walks you through setting up a free cloud PostgreSQL database on **Aiven**, connecting it to the **Django REST API**, deploying all 9 database tables, and seeding Jeremy Bryan Villanueva's data into the cloud.

---

## 1. Create a Free PostgreSQL Database on Aiven

1. Go to [https://console.aiven.io](https://console.aiven.io) and create an account or sign in.
2. In the top navigation, click **Create service**.
3. Select **PostgreSQL®**.
4. **Cloud Provider & Region**:
   - Choose a cloud provider (AWS, Google Cloud, or Azure).
   - Select a region close to the Philippines (e.g., **Singapore** / `ap-southeast-1` or `asia-southeast1`) for the fastest response times.
5. **Service Plan**:
   - Select the **Free Plan** (or Startup plan if using trial credits).
6. **Service Name**:
   - Name your service (e.g., `jeremy-portfolio-db`).
7. Click **Create service**.
8. Wait 1–2 minutes for the service state to change from *Rebuilding* to **Running** (with a green indicator).

---

## 2. Copy Your Connection Details from Aiven

Once the database is **Running**, go to the **Overview** tab of your service. Under the **Connection information** panel, copy:

| Field in Aiven Console | Example Value | Corresponding `.env` Variable |
| :--- | :--- | :--- |
| **Host** | `pg-xxxxxxxx-your-org.aivencloud.com` | `DATABASE_HOST` |
| **Port** | `18342` | `DATABASE_PORT` |
| **User** | `avnadmin` | `DATABASE_USER` |
| **Password** | *(Click "Show" or "Copy")* | `DATABASE_PASSWORD` |
| **Database name** | `defaultdb` | `DATABASE_NAME` |
| **SSL mode** | `require` | `DATABASE_SSL_MODE` |

---

## 3. Configure Your `.env` File

Open `c:\hero_section_aiven\portfolio_backend\.env` (or `c:\hero_section_aiven\.env`) and paste your credentials:

```env
# =========================================================
# Aiven Cloud PostgreSQL Connection
# =========================================================
DATABASE_NAME=defaultdb
DATABASE_USER=avnadmin
DATABASE_PASSWORD=your_actual_aiven_password_here
DATABASE_HOST=pg-xxxxxxxx-your-org.aivencloud.com
DATABASE_PORT=18342
DATABASE_SSL_MODE=require

# Django Settings
DJANGO_SECRET_KEY=django-insecure-jeremy-bryan-villanueva-cinematic-portfolio-2026-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1,0.0.0.0,*
```

---

## 4. Test the Aiven Connection

We have provided a dedicated connection test script. In your terminal:

```powershell
cd c:\hero_section_aiven\portfolio_backend
..\venv\Scripts\python test_aiven_connection.py
```

You should see:
```text
[SUCCESS] Successfully connected to Aiven Cloud PostgreSQL!
PostgreSQL Version: PostgreSQL 16.x ...
```

---

## 5. Deploy Database Tables (Run Migrations in Aiven)

Run Django migrations to create all 9 database tables directly in your Aiven cloud database:

```powershell
cd c:\hero_section_aiven\portfolio_backend
..\venv\Scripts\python manage.py migrate
```

This will provision:
- `portfolio_personalinformation`
- `portfolio_educationalbackground`
- `portfolio_workexperience`
- `portfolio_skill`
- `portfolio_service`
- `portfolio_project`
- `portfolio_certification`
- `portfolio_achievement`
- `portfolio_contactinformation`
- `portfolio_contactmessage`
- Django auth and session tables

---

## 6. Seed Jeremy's Realistic Data to Aiven

Populate the cloud database with all portfolio records and create the admin account:

```powershell
..\venv\Scripts\python manage.py seed_portfolio
```

Output:
```text
Created admin user (username: admin, password: AdminPass123!)
Seeded Personal Information.
Seeded 2 Education records.
Seeded 3 Work Experience records.
Seeded 18 Skill records across 6 categories.
Seeded 7 Service records.
Seeded 9 Project records.
Seeded 3 Certification records.
Seeded 5 Achievement records.
Seeded 7 Contact Information records.
[SUCCESS] Portfolio database seeding completed successfully!
```

---

## 7. Verify Your Cloud Database in Aiven Console

In your [Aiven Console](https://console.aiven.io):
1. Navigate to your PostgreSQL service.
2. Click the **Current queries** or **Metrics** tab to observe incoming database traffic.
3. You can also view the created tables under the **Databases and tables** tab.

Now your entire full-stack system is officially operating on **Aiven Cloud PostgreSQL**!
