from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from os import getcwd
import time

# Configure Chrome options
chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument("--use-fake-ui-for-media-stream")

# Comment this for speech recognition (headless can't use mic)
# chrome_options.add_argument("--headless=new")

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()), 
    options=chrome_options
)

website = f"{getcwd()}\\website\\index.html"
driver.get(website)

rec_file = f"{getcwd()}\\input.txt"

def listen():
    try:
        # Wait for the start button
        start_button = WebDriverWait(driver, 20).until(
            EC.element_to_be_clickable((By.ID, "startbtn"))
        )
        start_button.click()
        print("Listening......")

        output_text = ""

        while True:
            try:
                # Always fetch a fresh copy of the element (avoids stale element error)
                new_text = driver.find_element(By.ID, "output").text.strip()

                # Save text if it changes
                if new_text and new_text != output_text:
                    output_text = new_text
                    with open(rec_file, "a", encoding="utf-8") as file:
                        file.write(output_text.lower() + "\n")
                    print("User : " + output_text)

                # Check button text -> stop listening when speech recognition ends
                btn_text = driver.find_element(By.ID, "output").text
                if "stop listening" in btn_text:
                    print("Recognition stopped.")
                    break

            except Exception as inner_e:
                # Non-fatal errors like stale element handled here
                print("Inner loop error:", inner_e)

            time.sleep(0.5)  # avoid busy looping

    except KeyboardInterrupt:
        print("Stopped manually.")
    except Exception as e:
        print("Fatal error:", e)
    finally:
        driver.quit()

listen()
