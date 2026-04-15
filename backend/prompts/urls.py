from django.urls import path

from .views import prompt_detail, prompt_list_create

urlpatterns = [
    path('prompts/', prompt_list_create),
    path('prompts/<int:id>/', prompt_detail),
]
