from django.urls import path
from . import views
urlpatterns = [
    path('', views.root),
    path('register', views.register),
    path('load_dashboard',views.load_dashboard),
    path('dashboard',views.dashboard),
    path('add_favorite',views.add_favorite),
    path('remove_favorite',views.remove_favorite),
    path('login', views.login),
    path('logout',views.logout),
]
