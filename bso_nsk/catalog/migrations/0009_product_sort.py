# Generated by Django 4.0.3 on 2022-03-29 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0008_alter_category_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='sort',
            field=models.IntegerField(default=0, verbose_name='Порядок сортировки'),
        ),
    ]
