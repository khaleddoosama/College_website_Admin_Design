from django.urls import path
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('Register/', views.register, name='register'),
    path('Edit/', views.edit, name='edit'),
    path('Edit/<int:id>', views.edit_student, name='edit_student'),
    path('Search/', views.search, name='search'),
    path('Department/', views.department, name='department'),
    path('Status/', views.status, name='status'),
    
]
