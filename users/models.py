from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    full_name = models.CharField(max_length=150, blank=True)
    avatar_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.username
