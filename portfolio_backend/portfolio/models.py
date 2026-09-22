from django.db import models


class PersonalInformation(models.Model):
    full_name = models.CharField(max_length=150, default="Jeremy Bryan Villanueva")
    title = models.CharField(
        max_length=200,
        default="Videographer • Video Editor • Full Stack Developer",
    )
    tagline = models.CharField(
        max_length=300,
        blank=True,
        default="Crafting cinematic stories through lens and code.",
    )
    bio = models.TextField(
        default=(
            "I am a passionate videographer and editor based in the Philippines, "
            "specializing in cinematic visuals, event coverage, promotional content, "
            "documentaries, wedding films, and social media reels. I also work as a full stack "
            "developer, building responsive, scalable, and functional web applications."
        )
    )
    about_details = models.TextField(
        blank=True,
        default=(
            "Bridging the gap between creative visual media and modern software engineering. "
            "With an eye for cinematic lighting, framing, and pacing alongside technical mastery "
            "in React, Django, and database systems, I bring ideas to life on screens of all sizes."
        ),
    )
    avatar_url = models.URLField(max_length=500, blank=True)
    resume_url = models.URLField(max_length=500, blank=True)
    location = models.CharField(max_length=150, default="Metro Manila, Philippines")
    email = models.EmailField(default="jeremybryan.villanueva@example.com")
    phone = models.CharField(max_length=50, default="+63 917 123 4567")
    years_experience = models.PositiveIntegerField(default=5)
    projects_completed = models.PositiveIntegerField(default=28)
    client_works = models.PositiveIntegerField(default=40)
    technologies_count = models.PositiveIntegerField(default=18)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Personal Information"
        verbose_name_plural = "Personal Information"

    def __str__(self):
        return f"{self.full_name} ({self.title})"


class EducationalBackground(models.Model):
    school = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200)
    start_year = models.CharField(max_length=20)
    end_year = models.CharField(max_length=20, default="Present")
    grade_or_honors = models.CharField(max_length=150, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Educational Background"
        verbose_name_plural = "Educational Backgrounds"

    def __str__(self):
        return f"{self.degree} - {self.school}"


class WorkExperience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    employment_type = models.CharField(max_length=100, default="Freelance")
    start_date = models.CharField(max_length=50)
    end_date = models.CharField(max_length=50, default="Present")
    is_current = models.BooleanField(default=False)
    location = models.CharField(max_length=150, blank=True)
    description = models.TextField()
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Work Experience"
        verbose_name_plural = "Work Experiences"

    def __str__(self):
        return f"{self.position} at {self.company}"


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("VIDEOGRAPHY", "Videography"),
        ("VIDEO_EDITING", "Video Editing"),
        ("WEB_DEVELOPMENT", "Web Development"),
        ("PROGRAMMING", "Programming"),
        ("DATABASE", "Database"),
        ("OTHER", "Other"),
    ]

    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency_percentage = models.PositiveIntegerField(default=85)
    icon_name = models.CharField(max_length=50, default="FaCode")
    years_practiced = models.PositiveIntegerField(default=3)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["category", "order", "-proficiency_percentage"]
        verbose_name = "Skill"
        verbose_name_plural = "Skills"

    def __str__(self):
        return f"{self.name} ({self.get_category_display()} - {self.proficiency_percentage}%)"


class Service(models.Model):
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=100, default="Creative Media")
    description = models.TextField()
    price_range = models.CharField(max_length=100, blank=True)
    icon_name = models.CharField(max_length=50, default="FaVideo")
    features = models.TextField(blank=True, help_text="Newline separated bullet points")
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "created_at"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.title


class Project(models.Model):
    CATEGORY_CHOICES = [
        ("CLIENT_WORK", "Client Work"),
        ("DEVELOPMENT_PROJECT", "Development Project"),
    ]

    title = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    project_type = models.CharField(max_length=100)
    short_description = models.CharField(max_length=300)
    full_description = models.TextField(blank=True)
    technologies = models.CharField(max_length=300)
    image_url = models.URLField(max_length=500, blank=True)
    video_url = models.URLField(max_length=500, blank=True)
    github_url = models.URLField(max_length=500, blank=True)
    website_url = models.URLField(max_length=500, blank=True)
    completion_date = models.CharField(max_length=50, blank=True)
    is_featured = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self):
        return f"{self.title} [{self.get_category_display()}]"


class Certification(models.Model):
    name = models.CharField(max_length=200)
    issuing_organization = models.CharField(max_length=200)
    issue_date = models.CharField(max_length=50)
    expiration_date = models.CharField(max_length=50, blank=True, default="No Expiration")
    credential_id = models.CharField(max_length=150, blank=True)
    credential_url = models.URLField(max_length=500, blank=True)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Certification"
        verbose_name_plural = "Certifications"

    def __str__(self):
        return f"{self.name} - {self.issuing_organization}"


class Achievement(models.Model):
    title = models.CharField(max_length=200)
    organization = models.CharField(max_length=200)
    date_received = models.CharField(max_length=50)
    description = models.TextField()
    image_url = models.URLField(max_length=500, blank=True)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]
        verbose_name = "Achievement"
        verbose_name_plural = "Achievements"

    def __str__(self):
        return f"{self.title} ({self.organization})"


class ContactInformation(models.Model):
    platform = models.CharField(max_length=100)
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=255)
    url = models.URLField(max_length=500, blank=True)
    icon_name = models.CharField(max_length=50, default="FaEnvelope")
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "created_at"]
        verbose_name = "Contact Information"
        verbose_name_plural = "Contact Information"

    def __str__(self):
        return f"{self.platform}: {self.value}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"

    def __str__(self):
        return f"Message from {self.name} <{self.email}>"
