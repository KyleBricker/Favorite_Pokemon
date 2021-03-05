# Generated by Django 2.2.4 on 2021-03-04 01:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon_creator_app', '0002_pokemon'),
    ]

    operations = [
        migrations.AddField(
            model_name='pokemon',
            name='attack',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pokemon',
            name='defense',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pokemon',
            name='hp',
            field=models.IntegerField(default=5),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pokemon',
            name='special_attack',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pokemon',
            name='special_defense',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='pokemon',
            name='speed',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('pokemon', models.ManyToManyField(related_name='types', to='pokemon_creator_app.Pokemon')),
            ],
        ),
        migrations.CreateModel(
            name='Move',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('pokemon', models.ManyToManyField(related_name='moves', to='pokemon_creator_app.Pokemon')),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('pokemon', models.ManyToManyField(related_name='games', to='pokemon_creator_app.Pokemon')),
            ],
        ),
        migrations.CreateModel(
            name='Ability',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('pokemon', models.ManyToManyField(related_name='abilities', to='pokemon_creator_app.Pokemon')),
            ],
        ),
    ]
