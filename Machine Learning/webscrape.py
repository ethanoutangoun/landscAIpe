import json
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import csv

def main():


    zipcodes = getZipcodes()
    length = len(zipcodes)
    dataset = {}
    prev_city = ""
    cache = {}

    try:
        for i in range(length):
            zipcode = zipcodes[i][0]
            city = zipcodes[i][1]

            if city == prev_city:
                data = cache[city]
            else:
                data = getNativePlants(zipcode)
                cache[city] = data
                prev_city = city

            dataset[zipcode] = data

            print(f"Zipcode: {zipcode}, City: {city}")
            print(f"Progress: {i+1}/{length}\n")

            #write to json file
            with open('data.json', 'w') as outfile:
                json.dump(dataset, outfile, indent=2)
    except:
        return
    
     




   
  


#returns list of dictionaries of plants tied to key of zipcode
def getNativePlants(zipcode):

    try:
        chrome_options = Options()
        chrome_options.add_argument("--headless")

        url = f'https://www.audubon.org/native-plants/search?zipcode={zipcode}'

        driver = webdriver.Chrome(options=chrome_options)
        driver.get(url)
        data = []

        r = []

      
        WebDriverWait(driver, 5).until(EC.presence_of_all_elements_located((By.CLASS_NAME, "custom-h3")))
        page_source = driver.page_source
        soup = BeautifulSoup(page_source, 'html.parser')


        custom_h3_tags = soup.find_all('h2', class_='custom-h3')
        latin_names = soup.find_all('h3', class_='scientific-title custom-h4')
        tier_1_descriptions = soup.find_all('div', class_='tier-1-plant--description')
        plant_images = soup.find_all('button', class_='tier-1-plant-picture-modal cboxElement')

        
        fs_tags  = ['full sun', 'full to partial', 'full or partial']
        ps_tags = ['part shade', 'partial shade', 'partial to full shade', 'full to partial', 'full or partial']
        sh_tags = ['full shade', 'shady']

        for plant,latin, description, plant_image in zip(custom_h3_tags, latin_names, tier_1_descriptions, plant_images):
            # print(f"Plant: {plant.text.strip()} ({latin.text.strip()})")
            # print(f"Description: {description.text.strip()}\n")
            # print(f"Image: {plant_image['data-href']}\n")


            lname = (latin.text.strip())

            if lname in r:
                return data

            r.append(lname)
            
            
            sun_type = []
            for tag in fs_tags:
                if tag in description.text.lower():
                    sun_type.append('Full Sun')
                    break
            for tag in ps_tags:
                if tag in description.text.lower():
                    sun_type.append('Partial')
                    break
                
            for tag in sh_tags:
                if tag in description.text.lower():
                    sun_type.append('Full Shade')
                    break

            

            if len(sun_type) == 0:
                if 'shade' in description.text.lower():
                    sun_type.append('Full Shade')
                else:
                    sun_type.append('Unknown')
            

            plant_data = {
                "Plant": plant.text.strip(),
                "Latin Name": latin.text.strip(),
                "Description": description.text.strip(),
                "Image": plant_image['data-href'],
                "Sun Type": sun_type
            }

            data.append(plant_data)
        
            
        
        

            

    
        driver.quit()
    except:
        data = []
        print("Error")

    return data


#returns list of zipcodes in US
def getZipcodes():
    zip_codes = []

    with open('zip_code_ca.csv', newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            zip_codes.append((row['zip'], row['primary_city']))

    return zip_codes


if __name__ == "__main__":
    main()
