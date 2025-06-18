# feedback/views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Feedback
from .serializers import FeedbackSerializer

# Public feedback endpoints
class FeedbackListCreateView(generics.ListCreateAPIView):
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        # Only return reviewed feedback for public view
        return Feedback.objects.filter(is_reviewed=True)
    
    def get_serializer_class(self):
        return FeedbackSerializer
    
    def perform_create(self, serializer):
        serializer.save()

def get_csrf_token(request):
    return Response({'csrfToken': get_token(request)})