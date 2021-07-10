from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('', views.getUsers, name="users"),

    path('login/', views.MyTokenObtainPairView.as_view(), name="login"),
    path('register/', views.registerUser, name="register"),

    path('profile/', views.getUserProfile, name="user-profile"),
    path('profile/update/', views.updateUserProfile, name="update-user-profile"),

    path('update/<str:pk>/', views.updateUser, name="user-update"),

    path('<str:pk>/', views.getUserById, name="user"),

    path('delete/<str:pk>/', views.deleteUser, name="user-delete"),
]
