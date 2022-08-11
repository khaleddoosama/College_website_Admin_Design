from django.shortcuts import render, redirect, get_object_or_404
from .models import Student
# Create your views here.


# def base(request):
#     return render(request, 'pages/base.html')


def home(request):
    return render(request, 'pages/home.html')


def register(request):
    if request.method == 'POST':
        id = request.POST.get('Id')

        # Check if the id is already in the database
        if Student.objects.filter(id=id).exists():
            return render(request, 'pages/register.html', {'error': 'ID already exists'})

        name = request.POST.get('Name')
        email = request.POST.get('Email')
        phone = request.POST.get('Phone')
        department = request.POST.get('Department')
        birthday = request.POST.get('Birth Day')
        gpa = request.POST.get('gpa')
        gender = request.POST.get('Gender')
        level = request.POST.get('Level')
        if level != 'level 3' and level != 'level 4':
            department = "General"

        status = request.POST.get('Status')
        data = Student(id=id, name=name, email=email, phone=phone, department=department,
                    birthday=birthday, gpa=gpa, gender=gender, level=level, status=status)

        data.save()
    return render(request, 'pages/Register.html')




def edit(request):
    if request.method == 'POST':
        if 'edit' in request.POST:
            id = request.POST.get('Id')
            if Student.objects.filter(id=id).exists():
                data = get_object_or_404(Student, id=id)
                name = request.POST.get('Name')
                email = request.POST.get('Email')
                phone = request.POST.get('Phone')
                department = request.POST.get('Department')
                birthday = request.POST.get('Birth Day')
                gpa = request.POST.get('gpa')
                gender = request.POST.get('Gender')
                level = request.POST.get('Level')
                status = request.POST.get('Status')
                data.name = name
                data.email = email
                data.phone = phone
                data.birthday = birthday
                data.gpa = gpa
                data.gender = gender
                data.level = level
                data.status = status
                data.save()
                return render(request, 'pages/edit.html')
            else:
                return render(request, 'pages/edit.html', {'error': 'ID does not exist'})

        elif 'delete' in request.POST:
            id = request.POST.get('Id')
            if Student.objects.filter(id=id).exists():
                data = Student.objects.filter(id=id)
                data.delete()
                return render(request, 'pages/edit.html')
            else:
                return render(request, 'pages/edit.html', {'error': 'ID does not exist'})    
    return render(request, 'pages/edit.html')

def edit_student(request,id):
    if  request.method == 'POST' and 'edit' in request.POST or 'delete' in request.POST:
        edit(request)
        return redirect('/Edit/')
    else:
        id = id
        if Student.objects.filter(id=id).exists():
            data = get_object_or_404(Student, id=id)
            return render(request, 'pages/edit.html', {'data': data})
        else:
            return render(request, 'pages/edit.html', {'error': 'ID does not exist'})   



def search(request):
    if request.method == 'POST':
        name = request.POST.get('Name').lower().strip()
        data = Student.objects.filter(name__icontains=name)
        return render(request, 'pages/search.html', {'data': data})
        
    return render(request, 'pages/search.html')



def department(request):
    if request.method == 'POST':
        id = request.POST.get('Id')
        department = request.POST.get('Department')
        if Student.objects.filter(id=id).exists():
            data = get_object_or_404(Student, id=id)
            if data.level == 'level 3' or data.level == 'level 4':
                data.department = department
                data.save()
                return render(request, 'pages/department.html', {'data':data})
            else:
                return render(request, 'pages/department.html', {'data': data})
    return render(request, 'pages/department.html')


def status(request):
    if request.method == 'POST':
        id = request.POST.get('Id')
        status = request.POST.get('Status')
        data = get_object_or_404(Student, id=id)
        data.status = status
        data.save()
    return render(request, 'pages/status.html', {'data': Student.objects.all()})


