from django.contrib import admin
from .models import (
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


@admin.register(PersonalInformation)
class PersonalInformationAdmin(admin.ModelAdmin):
    list_display = ("full_name", "title", "email", "phone", "location", "updated_at")


@admin.register(EducationalBackground)
class EducationalBackgroundAdmin(admin.ModelAdmin):
    list_display = ("school", "degree", "field_of_study", "start_year", "end_year", "order")
    list_editable = ("order",)
    search_fields = ("school", "degree", "field_of_study")


@admin.register(WorkExperience)
class WorkExperienceAdmin(admin.ModelAdmin):
    list_display = ("position", "company", "employment_type", "start_date", "end_date", "is_current", "order")
    list_editable = ("order",)
    search_fields = ("position", "company")


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency_percentage", "icon_name", "order")
    list_editable = ("proficiency_percentage", "order")
    list_filter = ("category",)
    search_fields = ("name",)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "price_range", "is_featured", "order")
    list_editable = ("is_featured", "order")
    search_fields = ("title", "category")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "project_type", "is_featured", "order", "created_at")
    list_editable = ("is_featured", "order")
    list_filter = ("category", "is_featured")
    search_fields = ("title", "technologies")


@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ("name", "issuing_organization", "issue_date", "expiration_date", "order")
    list_editable = ("order",)
    search_fields = ("name", "issuing_organization")


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ("title", "organization", "date_received", "order")
    list_editable = ("order",)
    search_fields = ("title", "organization")


@admin.register(ContactInformation)
class ContactInformationAdmin(admin.ModelAdmin):
    list_display = ("platform", "label", "value", "is_primary", "order")
    list_editable = ("is_primary", "order")
    search_fields = ("platform", "label", "value")


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "is_read", "created_at")
    list_filter = ("is_read",)
    search_fields = ("name", "email", "subject")
