# Generated by Django 4.0.4 on 2022-05-24 23:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_delete_login'),
    ]

    operations = [
        migrations.AlterField(
            model_name='student',
            name='department',
            field=models.CharField(blank=True, max_length=15),
        ),
    ]