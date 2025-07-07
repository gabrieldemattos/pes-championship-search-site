from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import uuid
from datetime import datetime, timezone
import psycopg2
import time
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Configuração do banco
DB_CONFIG = {
    'dbname': 'pes2008db',
    'user': 'leonardo',
    'password': 'TelaQuente',
    'host': '172.23.155.195',
    'port': '30432'
}

# Utilitários
def slugify(name):
    return name.lower().replace(" ", "-")

def parse_int(val):
    try:
        return int(val.strip())
    except:
        return 0

def parse_float(val):
    try:
        return float(val.strip())
    except:
        return 0.0

# Conexão e inserção
def insert_player_pg(player):
    conn = psycopg2.connect(**DB_CONFIG)
    cur = conn.cursor()
    cur.execute("""
        INSERT INTO "Players" (
            "id", "name", "height", "strongerFoot", "mainPosition", "positions", "injuryTolerance",
            "attack", "defense", "balance", "stamina", "topSpeed", "acceleration", "response", "agility",
            "dribbleAccuracy", "dribbleSpeed", "shortPassAccuracy", "shortPassSpeed",
            "longPassAccuracy", "longPassSpeed", "shotAccuracy", "shotPower", "shotTechnique",
            "freeKickAccuracy", "swerve", "heading", "jump", "technique", "mentality",
            "goalKeeperSkills", "teamwork", "aggression", "conditionFitness",
            "weakFootAccuracy", "weakFootFrequency", "stars", "createdAt", "updatedAt",
            "slug", "playerOwner", "playerOwnerSlug"
        ) VALUES (
            %(id)s, %(name)s, %(height)s, %(strongerFoot)s, %(mainPosition)s, %(positions)s, %(injuryTolerance)s,
            %(attack)s, %(defense)s, %(balance)s, %(stamina)s, %(topSpeed)s, %(acceleration)s, %(response)s, %(agility)s,
            %(dribbleAccuracy)s, %(dribbleSpeed)s, %(shortPassAccuracy)s, %(shortPassSpeed)s,
            %(longPassAccuracy)s, %(longPassSpeed)s, %(shotAccuracy)s, %(shotPower)s, %(shotTechnique)s,
            %(freeKickAccuracy)s, %(swerve)s, %(heading)s, %(jump)s, %(technique)s, %(mentality)s,
            %(goalKeeperSkills)s, %(teamwork)s, %(aggression)s, %(conditionFitness)s,
            %(weakFootAccuracy)s, %(weakFootFrequency)s, %(stars)s, %(createdAt)s, %(updatedAt)s,
            %(slug)s, %(playerOwner)s, %(playerOwnerSlug)s
        );
    """, player)
    conn.commit()
    cur.close()
    conn.close()

# Extrai jogador de uma linha da tabela
def parse_player(row):
    cols = row.find_all("td")
    player_id = cols[0].text.strip()
    name = cols[1].text.strip()
    height = parse_float(cols[3].text.strip()) / 100
    stronger_foot = cols[7].text.strip()
    main_position = cols[8].text.strip()
    injury_tolerance = cols[41].text.strip()

    # Atributos técnicos
    attack = parse_int(cols[11].text)
    defense = parse_int(cols[12].text)
    balance = parse_int(cols[13].text)
    stamina = parse_int(cols[14].text)
    top_speed = parse_int(cols[15].text)
    acceleration = parse_int(cols[16].text)
    response = parse_int(cols[17].text)
    agility = parse_int(cols[18].text)
    dribble_accuracy = parse_int(cols[19].text)
    dribble_speed = parse_int(cols[20].text)
    short_pass_accuracy = parse_int(cols[21].text)
    short_pass_speed = parse_int(cols[22].text)
    long_pass_accuracy = parse_int(cols[23].text)
    long_pass_speed = parse_int(cols[24].text)
    shot_accuracy = parse_int(cols[25].text)
    shot_power = parse_int(cols[26].text)
    shot_technique = parse_int(cols[27].text)
    free_kick_accuracy = parse_int(cols[28].text)
    swerve = parse_int(cols[29].text)
    heading = parse_int(cols[30].text)
    jump = parse_int(cols[31].text)
    technique = parse_int(cols[32].text)
    mentality = parse_int(cols[33].text)
    goal_keeper_skills = parse_int(cols[34].text)
    teamwork = parse_int(cols[35].text)
    aggression = parse_int(cols[36].text)
    consistency = parse_int(cols[37].text)
    condition_fitness = parse_int(cols[38].text)
    weak_foot_accuracy = parse_int(cols[39].text)
    weak_foot_frequency = parse_int(cols[40].text)


    now = datetime.now(timezone.utc)
    return {
        "id": player_id,
        "name": name,
        "height": round(height, 2),
        "strongerFoot": stronger_foot,
        "mainPosition": main_position,
        "positions": [],  # Não há coluna de posições múltiplas
        "injuryTolerance": injury_tolerance,
        "attack": attack,
        "defense": defense,
        "balance": balance,
        "stamina": stamina,
        "topSpeed": top_speed,
        "acceleration": acceleration,
        "response": response,
        "agility": agility,
        "dribbleAccuracy": dribble_accuracy,
        "dribbleSpeed": dribble_speed,
        "shortPassAccuracy": short_pass_accuracy,
        "shortPassSpeed": short_pass_speed,
        "longPassAccuracy": long_pass_accuracy,
        "longPassSpeed": long_pass_speed,
        "shotAccuracy": shot_accuracy,
        "shotPower": shot_power,
        "shotTechnique": shot_technique,
        "freeKickAccuracy": free_kick_accuracy,
        "swerve": swerve,
        "heading": heading,
        "jump": jump,
        "technique": technique,
        "mentality": mentality,
        "goalKeeperSkills": goal_keeper_skills,
        "teamwork": teamwork,
        "aggression": aggression,
        "conditionFitness": condition_fitness,
        "weakFootAccuracy": weak_foot_accuracy,
        "weakFootFrequency": weak_foot_frequency,
        "stars": None,  # Não há coluna de estrelas
        "createdAt": now.date(),
        "updatedAt": now.date(),
        "slug": slugify(name),
        "playerOwner": "Descarte",
        "playerOwnerSlug": "descarte"
    }

def importar_com_selenium():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--no-sandbox")

    import time
    start_time = time.time()
    driver = webdriver.Chrome(options=chrome_options)

    for page in range(1, 163):
        url = f"https://wepesstats.rf.gd/pes2008.php?page={page}"
        print(f"\n🟡 Página {page} - {url}")
        driver.get(url)

        try:
            WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.TAG_NAME, "table"))
            )
        except:
            print(f"⚠️  Timeout esperando tabela na página {page}")
            continue

        soup = BeautifulSoup(driver.page_source, "html.parser")

        # Busca a primeira tabela da página
        tables = soup.find_all("table")

        table = tables[2]
        if not table:
            print(f"⚠️  Nenhuma tabela encontrada na página {page}")
            continue

        rows = table.find_all("tr")[1:]
        for row in rows:
            try:
                player = parse_player(row)
                insert_player_pg(player)
                print(f"✅ Inserido: {player['name']}")
            except Exception as e:
                print(f"❌ Erro ao processar jogador: {e}")

    driver.quit()
    end_time = time.time()
    elapsed = end_time - start_time
    mins, secs = divmod(int(elapsed), 60)
    print(f"\n⏱️ Tempo total de processamento: {mins} min {secs} s")

# Execução principal
if __name__ == "__main__":
    importar_com_selenium()
