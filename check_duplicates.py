import json

with open("src/_data/specie.json", "r") as f:
    data = json.load(f)

traits = {}

for specie in data:
    specie_name = specie.get("nome", "Unknown")
    
    for category in ["caratteristiche", "poteri", "avversioni", "doni", "tabu"]:
        items = specie.get(category)
        if not items:
            continue
            
        for item in items:
            name = item.get("nome")
            if not name:
                continue
                
            if name not in traits:
                traits[name] = []
                
            traits[name].append({
                "specie": specie_name,
                "category": category,
                "lore": item.get("lore", []),
                "mech": item.get("mech", [])
            })

found = False
for name, occurrences in traits.items():
    if len(occurrences) > 1:
        first_lore = occurrences[0]["lore"]
        first_mech = occurrences[0]["mech"]
        
        is_identical = True
        for occ in occurrences[1:]:
            if occ["lore"] != first_lore or occ["mech"] != first_mech:
                is_identical = False
                break
                
        if not is_identical:
            found = True
            print(f"\n=====================================")
            print(f"DISCREPANCY FOUND FOR: {name}")
            print(f"=====================================")
            
            versions = []
            for occ in occurrences:
                version = (json.dumps(occ["lore"]), json.dumps(occ["mech"]))
                if version not in versions:
                    versions.append(version)
                    print(f"\n--- VERSION {len(versions)} (Found in: {occ['specie']}) ---")
                    print("LORE:")
                    for l in occ["lore"]: print(f"  {l}")
                    print("MECH:")
                    for m in occ["mech"]: print(f"  {m}")
                else:
                    v_idx = versions.index(version) + 1
                    print(f"--- (Specie '{occ['specie']}' uses Version {v_idx}) ---")
if not found:
    print("NO DISCREPANCIES FOUND!")
