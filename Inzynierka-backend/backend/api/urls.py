from django.urls import path
from .views import login_view, registration_view, admin_only_view, user_only_view, FlashcardViewSet, CategoryViewSet

urlpatterns = [
    path('login/', login_view, name='login'),
    path('register/', registration_view, name='register'),
    path('admin/', admin_only_view, name='admin'),
    path('user/', user_only_view, name='user'),
    path('flashcards/', FlashcardViewSet.as_view({'get': 'list'}), name='flashcards'),
    path('categories/', CategoryViewSet.as_view({'get': 'list'}), name='categories'),
]