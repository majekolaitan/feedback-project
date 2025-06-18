from django.urls import path
from . import views

urlpatterns = [
    path('feedback/', views.FeedbackListCreateView.as_view(), name='feedback-list-create'),
    path('csrf/', views.get_csrf_token, name='csrf-token'),
]