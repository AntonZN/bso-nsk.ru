from django.views.generic import ListView, DetailView
from view_breadcrumbs import (
    DetailBreadcrumbMixin,
    ListBreadcrumbMixin,
    BaseBreadcrumbMixin,
)
from bso_nsk.catalog.models import Product, Category
from bso_nsk.views import get_main_context
from django.utils.functional import cached_property
from django.urls import reverse


class CategoryView(BaseBreadcrumbMixin, DetailView):
    template_name = "catalog.html"
    model = Category
    breadcrumb_use_pk = False
    context_object_name = "category"

    @cached_property
    def crumbs(self):
        if self.object.parent:
            category_sub_kwargs = self.kwargs.copy()
            del category_sub_kwargs["sub_slug"]

            return [
                (
                    self.object.parent,
                    reverse("catalog:category_detail", kwargs=category_sub_kwargs),
                ),
                (
                    self.object.name,
                    reverse("catalog:category_detail", kwargs=self.kwargs),
                ),
            ]
        return [
            (self.object.name, reverse("catalog:category_detail", kwargs=self.kwargs)),
        ]

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(get_main_context(self.request))
        context["products"] = (
            Product.objects.filter(
                category__in=self.object.get_descendants(include_self=True)
            )
            .filter(visible=True)
            .order_by("sort")
        )
        context["header_image"] = self.object.get_root().image
        return context

    def get(self, request, slug, sub_slug=None, *args, **kwargs):
        if sub_slug is not None:
            self.object = Category.objects.get(slug=sub_slug)
        else:
            self.object = Category.objects.get(slug=slug)
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)


class ProductView(BaseBreadcrumbMixin, DetailView):
    template_name = "product.html"
    model = Product
    breadcrumb_use_pk = False
    context_object_name = "product"
    slug_url_kwarg = "product_slug"

    @cached_property
    def crumbs(self):
        category_kwargs = self.kwargs.copy()
        del category_kwargs["product_slug"]
        category_sub_kwargs = self.kwargs.copy()
        del category_sub_kwargs["sub_slug"]
        del category_sub_kwargs["product_slug"]

        if self.object.category.parent:
            return [
                (
                    self.object.category.parent,
                    reverse("catalog:category_detail", kwargs=category_sub_kwargs),
                ),
                (
                    self.object.category.name,
                    reverse("catalog:category_detail", kwargs=category_kwargs),
                ),
                (
                    self.object.name,
                    reverse("catalog:product_detail", kwargs=self.kwargs),
                ),
            ]
        return [
            (
                self.object.category,
                reverse("catalog:category_detail", kwargs=category_kwargs),
            ),
            (self.object.name, reverse("catalog:product_detail", kwargs=self.kwargs)),
        ]

    def get_context_data(self, *, object_list=None, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(get_main_context(self.request))
        context["header_image"] = self.object.category.get_root().image
        return context
