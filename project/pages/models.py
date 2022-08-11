from django.db import models
# Create your models here.


class Student(models.Model):
    lvl = [
        ('level 1', 'level 1'),
        ('level 2', 'level 2'),
        ('level 3', 'level 3'),
        ('level 4', 'level 4'),
    ]
    gndr = [
        ('male', 'male'),
        ('female', 'female'),
    ]

    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    department = models.CharField(max_length=15,blank=True)
    birthday = models.DateField()
    gpa = models.DecimalField(decimal_places=2, max_digits=3)   
    gender = models.CharField(max_length=6, choices=gndr)
    level = models.CharField(max_length=7, choices=lvl)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['id']


