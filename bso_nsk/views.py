from django.views.generic import TemplateView
from django.shortcuts import render
from bso_nsk.catalog.models import Category, CatalogSettings


def get_main_context(request):
    try:
        url_name = [ele for ele in request.path.split("/") if ele not in ['', 'catalog']][0]
    except IndexError:
        url_name = "home"

    context = {
        "url_name": url_name,
        "categories": Category.objects.all(),
        "settings": CatalogSettings.objects.first(),
    }

    return context


class HomeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(get_main_context(self.request))
        return context


class ContactView(TemplateView):
    template_name = "contacts.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context.update(get_main_context(self.request))
        return context


def page_not_found_view(request, exception):
    return render(request, "404.html", status=404)
