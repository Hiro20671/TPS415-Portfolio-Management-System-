from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
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
from .serializers import (
    PersonalInformationSerializer,
    EducationalBackgroundSerializer,
    WorkExperienceSerializer,
    SkillSerializer,
    ServiceSerializer,
    ProjectSerializer,
    CertificationSerializer,
    AchievementSerializer,
    ContactInformationSerializer,
    ContactMessageSerializer,
)
from .permissions import IsAdminUserOrReadOnly, ContactMessagePermission


class PersonalInformationViewSet(viewsets.ModelViewSet):
    queryset = PersonalInformation.objects.all()
    serializer_class = PersonalInformationSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class EducationalBackgroundViewSet(viewsets.ModelViewSet):
    queryset = EducationalBackground.objects.all()
    serializer_class = EducationalBackgroundSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class WorkExperienceViewSet(viewsets.ModelViewSet):
    queryset = WorkExperience.objects.all()
    serializer_class = WorkExperienceSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class CertificationViewSet(viewsets.ModelViewSet):
    queryset = Certification.objects.all()
    serializer_class = CertificationSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class AchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class ContactInformationViewSet(viewsets.ModelViewSet):
    queryset = ContactInformation.objects.all()
    serializer_class = ContactInformationSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [ContactMessagePermission]


class DashboardStatsView(APIView):
    """
    Returns aggregated metrics for the Admin Dashboard overview.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        data = {
            "projects_count": Project.objects.count(),
            "client_work_count": Project.objects.filter(category="CLIENT_WORK").count(),
            "dev_projects_count": Project.objects.filter(category="DEVELOPMENT_PROJECT").count(),
            "skills_count": Skill.objects.count(),
            "services_count": Service.objects.count(),
            "certifications_count": Certification.objects.count(),
            "achievements_count": Achievement.objects.count(),
            "education_count": EducationalBackground.objects.count(),
            "experience_count": WorkExperience.objects.count(),
            "contact_info_count": ContactInformation.objects.count(),
            "unread_messages_count": ContactMessage.objects.filter(is_read=False).count(),
            "total_messages_count": ContactMessage.objects.count(),
        }
        return Response(data, status=status.HTTP_200_OK)


class CurrentUserView(APIView):
    """
    Returns the currently logged in user info.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "is_staff": user.is_staff,
            "is_superuser": user.is_superuser,
        })
