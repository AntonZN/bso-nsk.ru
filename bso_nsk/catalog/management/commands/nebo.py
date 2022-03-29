import requests
from bs4 import BeautifulSoup
from django.core.files.base import ContentFile
from bso_nsk.catalog.models import Product
from django.core.management.base import BaseCommand


def get_nb():
    r = requests.session()
    content = r.get("https://nebo18.ru/")

    soup = BeautifulSoup(content.content, "html.parser")
    for sect in [
        "elementor-element-7532b48",
        "elementor-element-0cadaa7",
        "elementor-element-a5b5273",
        "elementor-element-79be620",
        "elementor-element-05a0ff7",
    ]:
        section = soup.find("section", class_=sect)
        container = section.find("div", class_="elementor-container")
        sort = 31
        for item in container.find_all("div", class_="elementor-column"):
            data = item.find("div", class_="elementor-widget-container")
            image = None
            name = None
            zalupa = False
            desc = ""

            for h3 in data.find_all("h3"):
                if h3.find("a"):
                    image = h3.find("a").get("href")
                else:
                    name = h3.get_text()

            if image is None:
                image = data.find("p").find("a").get("href")
                zalupa = True

            for text in data.find_all("p"):
                if zalupa:
                    zalupa = False
                    continue
                desc += f"{text.get_text()}<br>\n"

            image_r = r.get(image)
            image_content = image_r.content
            filename = image.split('/')[-1]

            p = Product.objects.create(
                category_id=3,
                name=name,
                code=name,
                description=desc,
                sort=sort
            )
            p.image.save(filename, ContentFile(image_content))
            sort += 1
            print("next")


class Command(BaseCommand):
    help = 'Nebo'

    def handle(self, *args, **options):
        get_nb()





