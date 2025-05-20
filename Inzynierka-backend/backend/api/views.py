from django.shortcuts import render
from rest_framework import status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser, Category, Flashcard
from .serializers import LoginSerializer, RegisterSerializer, CustomUserSerializer, CategorySerializer, FlashcardSerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

class FlashcardViewSet(viewsets.ModelViewSet):
    queryset = Flashcard.objects.select_related('category').all()
    serializer_class = FlashcardSerializer
    permission_classes = [IsAuthenticated]


def set_jwt_token(response, token):
    response.set_cookie(
        key='access',
        value=token,
        httponly=True,
        secure=False,
        samesite='Lax'
    )

@api_view(['POST'])
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        response = Response({"message": "Zalogowano pomyślnie"}, status=status.HTTP_200_OK)
        set_jwt_token(response, str(refresh.access_token))
        response.set_cookie(
            key='refresh',
            value=str(refresh),
            httponly=True,
            secure=False,
            samesite='Lax'
        )
        return response
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def registration_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Rejestracja przebiegła pomyślnie"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_flashcards_by_category(request, category_id):
    flashcards = Flashcard.objects.filter(category=category_id)
    serializer = FlashcardSerializer(flashcards, many=True, context={'request': request})
    return Response(serializer.data)

def role_required(role):
    def decorator(view_func):
        def _wrapped_view(request, *args, **kwargs):
            if not hasattr(request.user, 'role') or request.user.role != role:
                return Response({'error': 'Brak uprawnień'}, status=status.HTTP_403_FORBIDDEN)
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@role_required('admin')
def admin_only_view(request):
    return Response({"message": "Witaj, admin!"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@role_required('user')
def user_only_view(request):
    return Response({"message": "Witaj, użytkowniku!"}, status=status.HTTP_200_OK)

