from django.contrib.auth.models import AbstractUser
from django.db import models
from django.template.defaultfilters import length


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

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)

    class Meta:
        verbose_name = 'Kategoria'
        verbose_name_plural = 'Kategorie'

    def __str__(self):
        return self.name

class Flashcard(models.Model):
    ARTICLE_CHOICES = (
        ('der', 'der'),
        ('die', 'die'),
        ('das', 'das'),
    )

    COLOR_CHOICES = (
        ('niebieski', 'Niebieski'),
        ('czerwony', 'Czerwony'),
        ('zielony', 'Zielony'),
        ('żółty', 'Żółty'),
    )

    front = models.CharField(max_length=100, unique=True)
    reverse = models.CharField(max_length=100, unique=True)
    synonym = models.CharField(max_length=100, blank=True)
    plural = models.CharField(max_length=100, blank=True)
    article = models.CharField(max_length=100, choices=ARTICLE_CHOICES, blank=True)
    color = models.CharField(max_length=10, choices=COLOR_CHOICES, default='niebieski')
    example_sentence = models.TextField(blank=True)
    image = models.ImageField(upload_to='flashcard_images', blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='flashcards')

    class Meta:
        verbose_name = 'Fiszka'
        verbose_name_plural = 'Fiszki'

    def __str__(self):
        return f"{self.category}: {self.front} - {self.reverse}"