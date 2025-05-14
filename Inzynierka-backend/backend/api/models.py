from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('user', 'User'),
    )
    LANGUAGE_LEVEL_CHOICES = (
        ('a1', 'A1'),
        ('a2', 'A2'),
        ('b1', 'B1'),
        ('b2', 'B2'),
        ('c1', 'C1'),
        ('c2', 'C2'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    language_level = models.CharField(max_length=2, choices=LANGUAGE_LEVEL_CHOICES, default='a1')

    def __str__(self):
        return self.username