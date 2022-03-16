from django.urls import path
from .views import *

app_name = "post"

urlpatterns = [
    path("<slug:slug>/", CategoryView.as_view(), name="category_detail"),
    path("<slug:slug>/<slug:sub_slug>/", CategoryView.as_view(), name="category_detail"),
    path("<slug:slug>/<slug:sub_slug>/<slug:product_slug>/", ProductView.as_view(), name="product_detail"),
]