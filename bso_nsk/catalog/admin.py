from django.contrib import admin

from bso_nsk.catalog.models import Product, Category, CatalogSettings


from image_cropping import ImageCroppingMixin
from mptt.admin import DraggableMPTTAdmin


@admin.register(CatalogSettings)
class CatalogSettingsAdmin(admin.ModelAdmin):
    list_display = [
        "__str__",
        "phone",
        "email",
        "address",
        "work_time"
    ]


@admin.register(Category)
class CategoryAdmin(DraggableMPTTAdmin):
    mptt_indent_field = "id"
    list_display = [
        "tree_actions",
        "indented_title",
    ]
    list_display_links = ["indented_title"]
    prepopulated_fields = {"slug": ("name",), }


@admin.register(Product)
class ProductAdmin(ImageCroppingMixin, admin.ModelAdmin):

    list_display = (
        "name",
        "code",
        "category",
        "price",
        "visible",
    )
    search_fields = ("code", "name",)
    list_filter = ("category",)
    prepopulated_fields = {"slug": ("name",), }
