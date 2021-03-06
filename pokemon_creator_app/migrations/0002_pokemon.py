# Generated by Django 2.2.4 on 2021-03-03 21:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon_creator_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Pokemon',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('sprite_url', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('favorited_users', models.ManyToManyField(related_name='favorite_pokemon', to='pokemon_creator_app.User')),
            ],
        ),
    ]
