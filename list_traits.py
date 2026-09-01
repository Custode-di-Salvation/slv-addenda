import json

with open("src/_data/specie.json", "r") as f:
    data = json.load(f)

for specie in data:
    nome_specie = specie.get("nome", "Unknown")
    print(f"\n--- {nome_specie} ---")
    for category in ["meccaniche_base", "poteri", "avversioni", "doni", "tabu"]:
        items = specie.get(category)
        if not items:
            continue
        print(f"  {category}:")
        for item in items:
            if "nome" in item:
                print(f"    - {item['nome']}")
