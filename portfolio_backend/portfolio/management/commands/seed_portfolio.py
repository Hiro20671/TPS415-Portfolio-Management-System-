from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from portfolio.models import (
    PersonalInformation,
    EducationalBackground,
    WorkExperience,
    Skill,
    Service,
    Project,
    Certification,
    Achievement,
    ContactInformation,
    ContactMessage,
)


class Command(BaseCommand):
    help = "Seeds initial realistic data for Jeremy Bryan Villanueva's cinematic portfolio and management system."

    def handle(self, *args, **options):
        self.stdout.write("Starting database seed process...")

        # 1. Ensure Superuser exists for Admin Login
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@jeremyvillanueva.com", "AdminPass123!")
            self.stdout.write(self.style.SUCCESS("Created admin user (username: admin, password: AdminPass123!)"))
        else:
            self.stdout.write("Admin user already exists.")

        # 2. Personal Information
        PersonalInformation.objects.all().delete()
        PersonalInformation.objects.create(
            full_name="Jeremy Bryan Villanueva",
            title="Videographer • Video Editor • Full Stack Developer",
            tagline="Visual storytelling captured through cinema lenses. Scalable web systems engineered with clean code.",
            bio=(
                "I am a passionate videographer and editor based in the Philippines, specializing in "
                "cinematic visuals, event coverage, promotional content, documentaries, wedding films, "
                "and social media reels. I also work as a full stack developer, building responsive and "
                "functional web applications."
            ),
            about_details=(
                "With over 5 years behind cinema cameras and software stacks, I blend artistic rhythm "
                "with architectural precision. Whether directing multi-camera festival coverage, grading "
                "raw 10-bit log footage in DaVinci Resolve, or developing reactive web applications with "
                "React, Django, and PostgreSQL, my focus is always on impactful storytelling and seamless user experiences."
            ),
            avatar_url="/assets/images/jeremy-profile.jpg",
            resume_url="https://example.com/jeremy-bryan-villanueva-cv.pdf",
            location="Metro Manila, Philippines",
            email="jeremybryan.villanueva@gmail.com",
            phone="+63 917 890 1234",
            years_experience=5,
            projects_completed=32,
            client_works=45,
            technologies_count=20,
        )
        self.stdout.write(self.style.SUCCESS("Seeded Personal Information."))

        # 3. Educational Background
        EducationalBackground.objects.all().delete()
        educations = [
            {
                "school": "De La Salle - College of Saint Benilde",
                "degree": "Bachelor of Arts in Digital Filmmaking",
                "field_of_study": "Cinematography, Post-Production & Sound Design",
                "start_year": "2019",
                "end_year": "2023",
                "grade_or_honors": "Magna Cum Laude • Best Capstone Film",
                "description": "Specialized in advanced camera operation, cinematic lighting, color grading theory, and narrative pacing. Directed multi-award winning undergraduate thesis short film.",
                "order": 1,
            },
            {
                "school": "Mapúa University",
                "degree": "Associate in Computer Science & Web Technology",
                "field_of_study": "Full-Stack Development, Relational Databases & Algorithms",
                "start_year": "2023",
                "end_year": "2025",
                "grade_or_honors": "Dean's Honor List • President's Scholar",
                "description": "Intensive coursework covering software engineering principles, modern JavaScript frameworks (React), Python backend systems (Django REST Framework), and PostgreSQL database architecture.",
                "order": 2,
            },
        ]
        for edu in educations:
            EducationalBackground.objects.create(**edu)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(educations)} Education records."))

        # 4. Work Experience
        WorkExperience.objects.all().delete()
        experiences = [
            {
                "company": "Kinetic Visuals Studios",
                "position": "Lead Videographer & Senior Editor",
                "employment_type": "Contract / Freelance",
                "start_date": "2022",
                "end_date": "Present",
                "is_current": True,
                "location": "Metro Manila & Destination Locations",
                "description": "Direct, shoot, and edit high-end wedding films, commercial brand reels, and music videos. Manage color management pipelines (ACES & Rec.709) and drone cinematography.",
                "order": 1,
            },
            {
                "company": "Nexus Media & Tech Innovations",
                "position": "Junior Full Stack Developer & Media Specialist",
                "employment_type": "Full-time",
                "start_date": "2023",
                "end_date": "Present",
                "is_current": True,
                "location": "Taguig, Metro Manila (Hybrid)",
                "description": "Develop and maintain responsive web portals and client media galleries using React, Django, and PostgreSQL. Streamline digital asset delivery and video streaming workflows.",
                "order": 2,
            },
            {
                "company": "Apex Creative Production",
                "position": "Video Editor & Motion Designer",
                "employment_type": "Part-time",
                "start_date": "2020",
                "end_date": "2022",
                "is_current": False,
                "location": "Makati City, Philippines",
                "description": "Edited short-form and long-form promotional content for corporate clients. Crafted custom motion graphics, lower-thirds, and visual transitions using After Effects.",
                "order": 3,
            },
        ]
        for exp in experiences:
            WorkExperience.objects.create(**exp)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(experiences)} Work Experience records."))

        # 5. Skills (Divided across all required categories)
        Skill.objects.all().delete()
        skills = [
            # VIDEOGRAPHY
            {"name": "Cinema Camera Operation (Sony FX3 / FX6)", "category": "VIDEOGRAPHY", "proficiency_percentage": 95, "icon_name": "FaVideo", "years_practiced": 5, "order": 1},
            {"name": "Cinematic Lighting & Three-Point Setup", "category": "VIDEOGRAPHY", "proficiency_percentage": 90, "icon_name": "FaCamera", "years_practiced": 5, "order": 2},
            {"name": "Drone Aerial Cinematography (DJI)", "category": "VIDEOGRAPHY", "proficiency_percentage": 88, "icon_name": "FaVideo", "years_practiced": 4, "order": 3},
            {"name": "Gimbal Stabilizers & Dolly Movements", "category": "VIDEOGRAPHY", "proficiency_percentage": 92, "icon_name": "FaCamera", "years_practiced": 4, "order": 4},
            
            # VIDEO EDITING
            {"name": "DaVinci Resolve Studio & Color Grading", "category": "VIDEO_EDITING", "proficiency_percentage": 94, "icon_name": "FaFilm", "years_practiced": 5, "order": 5},
            {"name": "Adobe Premiere Pro", "category": "VIDEO_EDITING", "proficiency_percentage": 96, "icon_name": "FaFilm", "years_practiced": 5, "order": 6},
            {"name": "Adobe After Effects (Motion Graphics)", "category": "VIDEO_EDITING", "proficiency_percentage": 84, "icon_name": "FaFilm", "years_practiced": 3, "order": 7},
            {"name": "Audio Engineering & Sound Design", "category": "VIDEO_EDITING", "proficiency_percentage": 86, "icon_name": "FaFilm", "years_practiced": 4, "order": 8},

            # WEB DEVELOPMENT
            {"name": "React.js & Modern UI Architecture", "category": "WEB_DEVELOPMENT", "proficiency_percentage": 90, "icon_name": "FaCode", "years_practiced": 3, "order": 9},
            {"name": "Django & Django REST Framework", "category": "WEB_DEVELOPMENT", "proficiency_percentage": 88, "icon_name": "FaCode", "years_practiced": 2, "order": 10},
            {"name": "Responsive CSS & Glassmorphic UI Systems", "category": "WEB_DEVELOPMENT", "proficiency_percentage": 92, "icon_name": "FaCode", "years_practiced": 4, "order": 11},
            {"name": "Framer Motion & Interactive Animations", "category": "WEB_DEVELOPMENT", "proficiency_percentage": 85, "icon_name": "FaCode", "years_practiced": 2, "order": 12},

            # PROGRAMMING
            {"name": "JavaScript (ES6+) & TypeScript", "category": "PROGRAMMING", "proficiency_percentage": 89, "icon_name": "FaCode", "years_practiced": 3, "order": 13},
            {"name": "Python (Backend Systems & Scripting)", "category": "PROGRAMMING", "proficiency_percentage": 87, "icon_name": "FaCode", "years_practiced": 2, "order": 14},

            # DATABASE
            {"name": "PostgreSQL & Aiven Cloud Database", "category": "DATABASE", "proficiency_percentage": 86, "icon_name": "FaDatabase", "years_practiced": 2, "order": 15},
            {"name": "Relational Data Modeling & ORM Queries", "category": "DATABASE", "proficiency_percentage": 85, "icon_name": "FaDatabase", "years_practiced": 2, "order": 16},

            # OTHER
            {"name": "Color Management (ACES / Log profiles)", "category": "OTHER", "proficiency_percentage": 90, "icon_name": "FaCamera", "years_practiced": 4, "order": 17},
            {"name": "Git & Collaborative Version Control", "category": "OTHER", "proficiency_percentage": 88, "icon_name": "FaGithub", "years_practiced": 3, "order": 18},
        ]
        for sk in skills:
            Skill.objects.create(**sk)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(skills)} Skill records across 6 categories."))

        # 6. Services (At least 6 services with realistic rates)
        Service.objects.all().delete()
        services = [
            {
                "title": "Video Production",
                "category": "Cinematic Production",
                "description": "End-to-end cinematic video production from concept scripting and storyboarding to multi-camera on-location shooting with cinema-grade lighting and sound.",
                "price_range": "₱35,000 - ₱120,000",
                "icon_name": "FaVideo",
                "features": "Cinema-grade 4K 10-bit Recording\nProfessional Direction & Crew\nMulti-point Studio Lighting\nMastered Audio & Color Grading",
                "is_featured": True,
                "order": 1,
            },
            {
                "title": "Wedding Videography",
                "category": "Event Cinematography",
                "description": "Emotional, cinematic wedding films capturing raw tears, authentic laughter, and grand celebrations with dreamy depth of field and timeless color grading.",
                "price_range": "₱45,000 - ₱150,000",
                "icon_name": "FaCamera",
                "features": "Same-Day Edit (SDE) Option\nFull Ceremony & Reception Multi-cam\nDrone Aerial Coverage\nTeaser Trailer & Feature Length Film",
                "is_featured": True,
                "order": 2,
            },
            {
                "title": "Event Coverage",
                "category": "Live Events",
                "description": "High-energy, fast-paced documentation of corporate conferences, musical festivals, brand launches, and sports tournaments.",
                "price_range": "₱25,000 - ₱80,000",
                "icon_name": "FaFilm",
                "features": "Comprehensive Highlight Reel\nKeynote Speaker Coverage\nSocial Media Rush Edits (24-hour turnaround)\nInterviews & Vox Pops",
                "is_featured": True,
                "order": 3,
            },
            {
                "title": "Promotional Videos",
                "category": "Commercial Media",
                "description": "Strategic product videos, restaurant features, and brand commercials engineered to captivate audiences and drive conversions.",
                "price_range": "₱30,000 - ₱90,000",
                "icon_name": "FaVideo",
                "features": "Scripting & Creative Direction\nMacro Lens & Dynamic B-Roll\nTargeted Platform Formats (16:9 & 9:16)\nLicensed Soundtrack Curation",
                "is_featured": True,
                "order": 4,
            },
            {
                "title": "Social Media Content",
                "category": "Digital Content",
                "description": "Vertical short-form cinematic reels for TikTok, Instagram Reels, and YouTube Shorts designed with viral pacing and punchy hooks.",
                "price_range": "₱15,000 - ₱40,000 / batch",
                "icon_name": "FaInstagram",
                "features": "Dynamic Speed Ramps & Transitions\nCustom Animated Subtitles\nTrending Audio Matching\nHigh Engagement Formats",
                "is_featured": True,
                "order": 5,
            },
            {
                "title": "Video Editing & Color Grading",
                "category": "Post Production",
                "description": "Professional post-production polishing for existing client footage. Transforming raw log files into rich, atmospheric master films.",
                "price_range": "₱18,000 - ₱60,000",
                "icon_name": "FaFilm",
                "features": "DaVinci Resolve Log Color Grading\nPacing & Narrative Assembly\nFoley & Sound Design Enhancement\nMotion Graphics & Lower Thirds",
                "is_featured": True,
                "order": 6,
            },
            {
                "title": "Full Stack Web Development",
                "category": "Software Engineering",
                "description": "Custom web applications, client media portals, and portfolio systems built with modern React frontend architecture and secure Django REST APIs.",
                "price_range": "₱35,000 - ₱120,000",
                "icon_name": "FaCode",
                "features": "React & Django REST Architecture\nPostgreSQL Database Design\nInteractive Framer Motion Interfaces\nSecure JWT Admin Authentication",
                "is_featured": True,
                "order": 7,
            },
        ]
        for srv in services:
            Service.objects.create(**srv)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(services)} Service records."))

        # 7. Projects (Divided into CLIENT WORK [Videography] and DEVELOPMENT PROJECTS)
        Project.objects.all().delete()
        projects = [
            # CLIENT WORK (Videography focus)
            {
                "title": "Aurelia & Marcus: The Palawan Coastal Vows",
                "category": "CLIENT_WORK",
                "project_type": "Wedding Highlights",
                "short_description": "A breathtaking cinematic destination wedding highlight captured along the limestone cliffs and turquoise shores of El Nido, Palawan.",
                "full_description": "Shot on dual Sony FX3 cinema cameras in 10-bit S-Log3 with anamorphic lenses and DJI Mavic 3 Cine aerial coverage. Color graded in DaVinci Resolve utilizing a tailored Kodachrome-inspired film emulation LUT.",
                "technologies": "Sony FX3, Sirui Anamorphic, DJI Mavic 3 Cine, DaVinci Resolve Studio",
                "image_url": "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
                "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "github_url": "",
                "website_url": "https://vimeo.com",
                "completion_date": "February 2026",
                "is_featured": True,
                "order": 1,
            },
            {
                "title": "Apex Global Tech Summit: Future of Cloud",
                "category": "CLIENT_WORK",
                "project_type": "Corporate Event Coverage",
                "short_description": "High-octane multi-camera conference recap and keynote video series for an international cloud computing summit in BGC.",
                "full_description": "Delivered comprehensive 3-day coverage including mainstage speeches, breakout discussions, and attendee testimonials with a fast 48-hour social sizzle reel turnaround.",
                "technologies": "Multi-Cam Sony Alpha, Sennheiser Wireless Mics, Premiere Pro, After Effects",
                "image_url": "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
                "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "github_url": "",
                "website_url": "https://vimeo.com",
                "completion_date": "January 2026",
                "is_featured": True,
                "order": 2,
            },
            {
                "title": "Solstice Apparel: High-Energy Kinetic Reel",
                "category": "CLIENT_WORK",
                "project_type": "Promotional Reel",
                "short_description": "Urban athletic wear campaign featuring dynamic speed ramps, rhythmic sound design, and Tokyo-inspired neon night cinematography.",
                "full_description": "Created for digital billboards and Instagram Reels campaigns. Combined fast motion tracking, glitch transitions, and low-light Sony FX6 night shots.",
                "technologies": "Sony FX6, Aputure Amaran Tube Lights, After Effects, Soundly",
                "image_url": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80",
                "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "github_url": "",
                "website_url": "https://vimeo.com",
                "completion_date": "December 2025",
                "is_featured": True,
                "order": 3,
            },
            {
                "title": "Guardians of the Coral: Conservation Docuseries",
                "category": "CLIENT_WORK",
                "project_type": "Campaign Video",
                "short_description": "Environmental documentary spotlighting community-led coral reef restoration initiatives across the Verde Island Passage.",
                "full_description": "Produced in partnership with an ocean conservation foundation. Included underwater housing filming, macro reef textures, and interviews with local marine biologists.",
                "technologies": "Sony FX3 Underwater Housing, Drone 4K, DaVinci Resolve, Foley Design",
                "image_url": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
                "video_url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                "github_url": "",
                "website_url": "https://vimeo.com",
                "completion_date": "November 2025",
                "is_featured": True,
                "order": 4,
            },

            # DEVELOPMENT PROJECTS (School & Technical Portfolio)
            {
                "title": "Final Hands-on Exam - Full-Stack Evaluation Portal",
                "category": "DEVELOPMENT_PROJECT",
                "project_type": "Web Application",
                "short_description": "Production-ready full-stack portfolio management platform built with React, Django REST Framework, JWT auth, and Aiven PostgreSQL.",
                "full_description": "Demonstrates the complete architecture: React frontend with Framer Motion animations connecting to a Django REST API backed by an Aiven Cloud PostgreSQL instance.",
                "technologies": "React.js, Django REST Framework, PostgreSQL, Aiven Cloud, JWT, Framer Motion",
                "image_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
                "video_url": "",
                "github_url": "https://github.com/jeremyvillanueva/hero_section_aiven",
                "website_url": "http://localhost:5173",
                "completion_date": "September 2026",
                "is_featured": True,
                "order": 5,
            },
            {
                "title": "Book Finder - Intelligent Literary Discovery",
                "category": "DEVELOPMENT_PROJECT",
                "project_type": "Web Application",
                "short_description": "Interactive book search and recommendation engine with real-time Google Books API filtering, category browsing, and reading list persistence.",
                "full_description": "Engineered with clean React hooks, debounced search queries, skeleton loading states, and dark mode responsive CSS.",
                "technologies": "React.js, Google Books API, Axios, CSS Modules, LocalStorage",
                "image_url": "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
                "video_url": "",
                "github_url": "https://github.com/jeremyvillanueva/book-finder",
                "website_url": "https://jeremy-bookfinder.vercel.app",
                "completion_date": "August 2026",
                "is_featured": True,
                "order": 6,
            },
            {
                "title": "Student Enrollment Form & Academic Portal",
                "category": "DEVELOPMENT_PROJECT",
                "project_type": "Web Application",
                "short_description": "Multi-step student enrollment system with real-time schema validation, file upload capabilities, and database record synchronization.",
                "full_description": "Developed as an academic software engineering milestone demonstrating secure form state handling, error boundaries, and relational course mapping.",
                "technologies": "React.js, Django REST, PostgreSQL, Tailwind CSS, Formik",
                "image_url": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
                "video_url": "",
                "github_url": "https://github.com/jeremyvillanueva/student-enrollment-portal",
                "website_url": "https://jeremy-enrollment.vercel.app",
                "completion_date": "July 2026",
                "is_featured": True,
                "order": 7,
            },
            {
                "title": "Assignment 1 - Responsive Multimedia Landing Page",
                "category": "DEVELOPMENT_PROJECT",
                "project_type": "Frontend Web Application",
                "short_description": "High-performance semantic HTML5 and vanilla CSS3 showcase featuring parallax scrolling, responsive layouts, and modern accessibility standards.",
                "full_description": "First foundational web design deliverable exploring CSS Grid, Flexbox, custom design tokens, and media query breakpoints.",
                "technologies": "HTML5 Semantic, Modern CSS3, Vanilla JavaScript",
                "image_url": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80",
                "video_url": "",
                "github_url": "https://github.com/jeremyvillanueva/assignment-1-landing",
                "website_url": "https://jeremy-assignment1.vercel.app",
                "completion_date": "May 2026",
                "is_featured": False,
                "order": 8,
            },
            {
                "title": "Assignment 2 - Interactive Media Gallery",
                "category": "DEVELOPMENT_PROJECT",
                "project_type": "Frontend Web Application",
                "short_description": "Dynamic interactive media gallery with video playback modal, category tagging, and smooth Framer Motion micro-animations.",
                "full_description": "Second academic assignment showcasing state-driven UI filtering, image lightbox transitions, and responsive grid layouts.",
                "technologies": "React.js, Framer Motion, React Icons, CSS Modules",
                "image_url": "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80",
                "video_url": "",
                "github_url": "https://github.com/jeremyvillanueva/assignment-2-gallery",
                "website_url": "https://jeremy-assignment2.vercel.app",
                "completion_date": "June 2026",
                "is_featured": False,
                "order": 9,
            },
        ]
        for prj in projects:
            Project.objects.create(**prj)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(projects)} Project records (Client Works & Dev Projects)."))

        # 8. Certifications (At least 3 certifications)
        Certification.objects.all().delete()
        certifications = [
            {
                "name": "DaVinci Resolve Certified End User",
                "issuing_organization": "Blackmagic Design",
                "issue_date": "November 2024",
                "expiration_date": "No Expiration",
                "credential_id": "BMD-DVR-2024-8831",
                "credential_url": "https://www.blackmagicdesign.com/products/davinciresolve/training",
                "description": "Official certification verifying industry-standard proficiency in advanced color grading, Fairlight audio mixing, and high-resolution delivery.",
                "order": 1,
            },
            {
                "name": "Adobe Certified Professional in Digital Video",
                "issuing_organization": "Adobe Certified Professional",
                "issue_date": "March 2024",
                "expiration_date": "March 2027",
                "credential_id": "ADOBE-PR-74291",
                "credential_url": "https://www.credly.com",
                "description": "Validated expertise in professional video editing with Adobe Premiere Pro and motion graphics integration with After Effects.",
                "order": 2,
            },
            {
                "name": "Meta Front-End Developer Professional Certificate",
                "issuing_organization": "Meta (Coursera)",
                "issue_date": "August 2025",
                "expiration_date": "No Expiration",
                "credential_id": "META-FED-93821",
                "credential_url": "https://www.coursera.org/account/accomplishments/specialization/certificate",
                "description": "Comprehensive 9-course program covering React, responsive design, UI/UX principles, JavaScript algorithms, and version control.",
                "order": 3,
            },
        ]
        for cert in certifications:
            Certification.objects.create(**cert)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(certifications)} Certification records."))

        # 9. Achievements (At least 5 achievements)
        Achievement.objects.all().delete()
        achievements = [
            {
                "title": "Best Cinematography Award",
                "organization": "National Indie Film Festival (Manila)",
                "date_received": "December 2024",
                "description": "Awarded for exceptional visual storytelling, natural lighting, and emotional camera movement on the short narrative film 'Whispers of the Bay'.",
                "image_url": "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
                "order": 1,
            },
            {
                "title": "1st Runner Up - Inter-Collegiate Media Showcase",
                "organization": "Philippine Media Arts Council",
                "date_received": "May 2023",
                "description": "Recognized among 40 participating universities for innovative hybrid videography and sound engineering.",
                "image_url": "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80",
                "order": 2,
            },
            {
                "title": "Hackathon Finalist - Web & Mobile Innovation",
                "organization": "Philippine Software Developers League",
                "date_received": "November 2025",
                "description": "Built a cloud-based video asset indexing application with Django REST Framework and React in 48 hours.",
                "image_url": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                "order": 3,
            },
            {
                "title": "Academic Excellence & Dean's Lister",
                "organization": "Mapúa University & CSB",
                "date_received": "Consecutive Semesters 2020 - 2025",
                "description": "Maintained high GPA standing while balancing commercial videography client commitments and web engineering projects.",
                "image_url": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
                "order": 4,
            },
            {
                "title": "Featured Creator of the Month",
                "organization": "Manila Creative Collective",
                "date_received": "January 2026",
                "description": "Highlighted for bridging cinematic media production with modern full-stack web software engineering in the Philippines.",
                "image_url": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80",
                "order": 5,
            },
        ]
        for ach in achievements:
            Achievement.objects.create(**ach)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(achievements)} Achievement records."))

        # 10. Contact Information
        ContactInformation.objects.all().delete()
        contacts = [
            {"platform": "Email", "label": "Direct Email", "value": "jeremybryan.villanueva@gmail.com", "url": "mailto:jeremybryan.villanueva@gmail.com", "icon_name": "FaEnvelope", "is_primary": True, "order": 1},
            {"platform": "Phone", "label": "Mobile / WhatsApp", "value": "+63 917 890 1234", "url": "tel:+639178901234", "icon_name": "FaPhone", "is_primary": True, "order": 2},
            {"platform": "Location", "label": "Base Location", "value": "Metro Manila, Philippines", "url": "https://maps.google.com/?q=Metro+Manila+Philippines", "icon_name": "FaMapMarkerAlt", "is_primary": True, "order": 3},
            {"platform": "GitHub", "label": "Code Repositories", "value": "github.com/jeremyvillanueva", "url": "https://github.com", "icon_name": "FaGithub", "is_primary": False, "order": 4},
            {"platform": "LinkedIn", "label": "Professional Network", "value": "linkedin.com/in/jeremyvillanueva", "url": "https://linkedin.com", "icon_name": "FaLinkedin", "is_primary": False, "order": 5},
            {"platform": "Instagram", "label": "Videography Reels", "value": "@jeremy_cinematics", "url": "https://instagram.com", "icon_name": "FaInstagram", "is_primary": False, "order": 6},
            {"platform": "Facebook", "label": "Official Films Page", "value": "Jeremy Villanueva Films", "url": "https://facebook.com", "icon_name": "FaFacebook", "is_primary": False, "order": 7},
        ]
        for cnt in contacts:
            ContactInformation.objects.create(**cnt)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(contacts)} Contact Information records."))

        # 11. Initial Sample Inquiry Message
        ContactMessage.objects.all().delete()
        ContactMessage.objects.create(
            name="Sophia Laurel",
            email="sophia.laurel@zenithentertainment.ph",
            subject="Inquiry for Commercial Brand Film & Custom Client Web Portal",
            message="Hi Jeremy, we were blown away by your cinematic reels and your full-stack technical background. We are launching a new luxury eco-resort in Palawan and need both a 3-minute highlight film and an interactive media gallery web portal. Let's set up a call this week!",
            is_read=False,
        )
        self.stdout.write(self.style.SUCCESS("Seeded sample contact message inquiry."))
        self.stdout.write(self.style.SUCCESS("[SUCCESS] Portfolio database seeding completed successfully!"))
