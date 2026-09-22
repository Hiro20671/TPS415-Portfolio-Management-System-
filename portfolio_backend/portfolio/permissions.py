from rest_framework import permissions


class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Allows full read-only access for unauthenticated users (public portfolio).
    Requires authentication / staff status for write operations (POST, PUT, PATCH, DELETE).
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)


class ContactMessagePermission(permissions.BasePermission):
    """
    Allows anyone to POST a new contact inquiry.
    Requires authentication to view, edit, or delete messages.
    """

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return bool(request.user and request.user.is_authenticated)
