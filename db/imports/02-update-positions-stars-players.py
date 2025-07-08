import psycopg2
import re
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

DB_CONFIG = {
    'dbname': 'pes2008db',
    'user': 'leonardo',
    'password': 'TelaQuente',
    'host': '172.23.155.195',
    'port': '30432'
}

def get_all_players():
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()
    cur.execute('SELECT id FROM "Players" WHERE "playerOwnerSlug" != %s', ('descarte',))
    players = [row[0] for row in cur.fetchall()]
    cur.close()
    conn.close()
    return players

def update_player(id, positions, stars):
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()
    cur.execute('UPDATE "Players" SET positions=%s, stars=%s WHERE id=%s', (positions, stars, id))
    conn.commit()
    cur.close()
    conn.close()

def fetch_positions_and_stars(player_id):
    

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--no-sandbox")

    driver = webdriver.Chrome(options=chrome_options)
    try:
        url = f"https://wepesstats.rf.gd/player_pes2008.php?id={player_id}"
        driver.get(url)
        try:
            WebDriverWait(driver, 7).until(
                EC.presence_of_element_located((By.TAG_NAME, "table"))
            )
        except Exception as e:
            print(f"Timeout esperando tabela para o jogador {player_id}: {e}")
        soup = BeautifulSoup(driver.page_source, "html.parser")
    finally:
        driver.quit()

    # Extrai o campo 'all positions' (pega só o texto dos spans)
    positions = []
    all_positions_th = soup.find(lambda tag: tag.name == "th" and "all positions" in tag.text.lower())
    if all_positions_th:
        td = all_positions_th.find_next_sibling("td")
        if td:
            positions = [span.text.strip() for span in td.find_all("span") if span.text.strip()]

    # Extrai as estrelas (habilidades especiais) diretamente da tabela correta (tables[6])
    stars = []
    tables = soup.find_all("table")
    if len(tables) >= 7:
        stars_table = tables[6]
        td = stars_table.find("td")
        if td:
            raw = re.split(r'<br\s*/?>', td.decode_contents(), flags=re.IGNORECASE)
            for item in raw:
                clean = BeautifulSoup(item, "html.parser").get_text().strip().strip('"')
                if clean:
                    stars.append(clean)

    return positions, stars

def main():
    import time
    players = get_all_players()
    start_time = time.time()
    for player_id in players:
        try:
            positions, stars = fetch_positions_and_stars(player_id)
            update_player(player_id, positions, stars)
            print(f"Atualizado: {player_id} | Positions: {positions} | Stars: {stars}")
        except Exception as e:
            print(f"Erro ao processar {player_id}: {e}")
        time.sleep(7)
    end_time = time.time()
    elapsed = end_time - start_time
    mins, secs = divmod(int(elapsed), 60)
    print(f"\n⏱️ Tempo total de processamento: {mins} min {secs} s")

if __name__ == "__main__":
    main()