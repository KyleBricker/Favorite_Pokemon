from django.db import models
import bcrypt

class UserManager(models.Manager):
    def r_validator(self,post):
        errors={}
        if len(post['first_name'])<2:
            errors['first_name']='First name should be at least two characters'
        if len(post['last_name'])<2:
            errors['last_name']='Last name should be at least two characters'
        if len(post['email'])<2:
            errors['email']='Email should be at least two characters'
        if len(post['password'])<8:
            errors['password']='Password should be at least two characters'
        if post['confirm_password'] != post['password']:
            errors['confirm_password']='Passwords do not match'
        if len(User.objects.filter(email=post['email']))>0:
            errors['unique_email']='The provided email already belongs to a user'
        return errors

    def l_validator(self,post):
        errors={}
        if len(User.objects.filter(email=post['email']))==0:
            errors['invalid_email']='The provided email is not associated with an account'
        elif not bcrypt.checkpw(post['password'].encode(), User.objects.get(email=post['email']).password.encode()):
            errors['invalid_password']='Incorrect password'
        return errors

class User(models.Model):
    first_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    email = models.CharField(max_length=45)
    password = models.CharField(max_length=45)
    favorites=models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    objects=UserManager()
    
# Create your models here.
