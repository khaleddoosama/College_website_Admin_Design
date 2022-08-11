from django.contrib import admin
from .models import Student

# Register your models here.


class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'department', 'level', 'gpa', 'status']
    list_filter = ['department', 'level', 'status']
    search_fields = ['id']



admin.site.register(Student, StudentAdmin)

admin.site.site_header = 'CU community v1.0'
admin.site.site_title = 'CU community'
