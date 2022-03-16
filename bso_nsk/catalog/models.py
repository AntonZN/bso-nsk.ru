from django.db import models
from mptt.models import MPTTModel, TreeForeignKey
from image_cropping import ImageRatioField, ImageCropField
from django.urls import reverse


class CatalogSettings(models.Model):
    class Meta:
        verbose_name = "Настройки"
        verbose_name_plural = "Настройки"

    phone = models.CharField("Номер телефона для связи", max_length=128)
    email = models.CharField("Email для связи", max_length=128)
    address = models.CharField("Адрес", max_length=128)
    work_time = models.CharField("Время работы", max_length=128)

    def __str__(self):
        return f"Настройки сайта {self.id}"


class Category(MPTTModel):
    class Meta:
        verbose_name = "Катеория"
        verbose_name_plural = "Категории товаров"

    name = models.CharField("Название", max_length=128)
    description = models.TextField("Описание", null=True, blank=True)
    parent = TreeForeignKey(
        "self",
        verbose_name="Главаня категория",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    slug = models.SlugField("Название для ulr")
    image = models.ImageField("Изображение", blank=True, null=True)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        if self.parent:
            return reverse(
                "catalog:category_detail",
                kwargs={"sub_slug": self.slug, "slug": self.parent.slug},
            )
        return reverse("catalog:category_detail", kwargs={"slug": self.slug})


class Product(models.Model):
    class Meta:
        verbose_name = "Товар"
        verbose_name_plural = "Товары"

    name = models.CharField("Название", max_length=128)
    code = models.CharField("Артикул", max_length=100, unique=True)
    description = models.TextField("Описание", blank=True, null=True)
    price = models.DecimalField("Цена", default=0, max_digits=10, decimal_places=2)
    category = models.ForeignKey(
        Category,
        verbose_name="Категория",
        on_delete=models.CASCADE,
        related_name="products",
    )
    visible = models.BooleanField("Отображать в каталоге", default=True)
    image = ImageCropField(blank=True, upload_to="products", verbose_name="Изображение")
    image_cropping = ImageRatioField(
        "image", "1000x1000", verbose_name="Изображение кроп", free_crop=True
    )
    slug = models.SlugField("Название для ulr")

    def __str__(self):
        return f"{self.name}, арт: {self.code}"

    def get_absolute_url(self):
        if self.category.parent:
            return reverse(
                "catalog:product_detail",
                kwargs={
                    "sub_slug": self.category.slug,
                    "slug": self.category.parent.slug,
                    "product_slug": self.slug,
                },
            )
        return reverse(
            "catalog:product_detail",
            kwargs={"slug": self.slug, "product_slug": self.slug},
        )
