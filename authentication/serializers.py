from rest_framework import serializers
from users.models import User

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firebase_uid', 'email', 'full_name', 'avatar_url', 'created_at']
