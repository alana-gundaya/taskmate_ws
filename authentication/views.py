from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from users.models import User
from users.serializers import UserSerializer
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.middleware.csrf import get_token

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Username and password required'}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=400)

        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password  # Django will hash this automatically
            )
            return Response({
                'message': 'User created successfully',
                'username': user.username
            }, status=201)
        except Exception as e:
            return Response({'error': str(e)}, status=400)

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({
                'error': 'Please provide both username and password'
            }, status=400)

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            # Ensure CSRF token is set
            csrf_token = get_token(request)
            response = Response({
                'user': UserSerializer(user).data,
                'message': 'Login successful'
            })
            response['X-CSRFToken'] = csrf_token
            return response
        
        return Response({
            'error': 'Invalid credentials - please check your username and password'
        }, status=401)

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'}, status=200)
