from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PersonalInformationViewSet,
    EducationalBackgroundViewSet,
    WorkExperienceViewSet,
    SkillViewSet,
    ServiceViewSet,
    ProjectViewSet,
    CertificationViewSet,
    AchievementViewSet,
    ContactInformationViewSet,
    ContactMessageViewSet,
    DashboardStatsView,
    CurrentUserView,
)

router = DefaultRouter()
router.register(r"personal-information", PersonalInformationViewSet, basename="personal-information")
router.register(r"education", EducationalBackgroundViewSet, basename="education")
router.register(r"work-experience", WorkExperienceViewSet, basename="work-experience")
router.register(r"skills", SkillViewSet, basename="skills")
router.register(r"services", ServiceViewSet, basename="services")
router.register(r"projects", ProjectViewSet, basename="projects")
router.register(r"certifications", CertificationViewSet, basename="certifications")
router.register(r"achievements", AchievementViewSet, basename="achievements")
router.register(r"contact-information", ContactInformationViewSet, basename="contact-information")
router.register(r"contact-messages", ContactMessageViewSet, basename="contact-messages")

urlpatterns = [
    path("", include(router.urls)),
    path("dashboard-stats/", DashboardStatsView.as_view(), name="dashboard-stats"),
    path("auth/me/", CurrentUserView.as_view(), name="current-user"),
]
