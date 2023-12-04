from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

chrome_options = Options()
chrome_options.add_argument("--headless")

url = 'https://www.audubon.org/native-plants/search?zipcode=93405'

driver = webdriver.Chrome(options=chrome_options)
driver.get(url)

WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "custom-h3")))
page_source = driver.page_source

soup = BeautifulSoup(page_source, 'html.parser')

# Find all h2 tags with class custom-h3
custom_h3_tags = soup.find_all('h2', class_='custom-h3')
tier_1_descriptions = soup.find_all('div', class_='tier-1-plant--description')

for plant, description in zip(custom_h3_tags, tier_1_descriptions):
    print(f"Plant: {plant.text.strip()}")
    print(f"Description: {description.text.strip()}\n")
driver.quit()
