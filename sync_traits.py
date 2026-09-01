import json

def main():
    file_path = "src/_data/specie.json"
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Authority list based on recent edits (highest priority first)
    authority_order = [
        "Lettori Empatici", 
        "Chiaroveggenti", 
        "Medium", 
        "Lettori Telepatici", 
        "Lettori Animici", 
        "Riemersi", 
        "Aoristi", 
        "Artefici"
    ]

    # Collect all occurrences of each trait name
    # traits[name] = [ (specie_name, category, index_in_array, trait_dict), ... ]
    traits = {}
    categories = ["caratteristiche", "poteri", "avversioni", "doni", "tabu"]

    for specie in data:
        specie_name = specie.get("nome", "Unknown")
        for category in categories:
            items = specie.get(category)
            if not items:
                continue
            for idx, item in enumerate(items):
                name = item.get("nome")
                if not name:
                    continue
                if name not in traits:
                    traits[name] = []
                traits[name].append({
                    "specie": specie_name,
                    "category": category,
                    "index": idx,
                    "item": item
                })

    changes_made = 0

    for name, occurrences in traits.items():
        if len(occurrences) <= 1:
            continue
            
        # Determine the authoritative version
        best_occ = None
        best_priority = 999
        
        for occ in occurrences:
            try:
                priority = authority_order.index(occ["specie"])
            except ValueError:
                priority = 999
            
            # If this is better priority, or if we don't have a best yet
            if priority < best_priority:
                best_priority = priority
                best_occ = occ
                
        if not best_occ:
            best_occ = occurrences[0]

        auth_lore = best_occ["item"].get("lore", [])
        auth_mech = best_occ["item"].get("mech", [])
        
        # Apply to all others
        for occ in occurrences:
            current_lore = occ["item"].get("lore", [])
            current_mech = occ["item"].get("mech", [])
            
            if current_lore != auth_lore or current_mech != auth_mech:
                print(f"Syncing '{name}' in {occ['specie']} to match {best_occ['specie']}")
                occ["item"]["lore"] = auth_lore
                occ["item"]["mech"] = auth_mech
                changes_made += 1

    if changes_made > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        # Fix formatting for arrays slightly if needed, but json.dump is fine
        print(f"\nSuccessfully synced {changes_made} discrepancies!")
    else:
        print("\nAll shared traits are already perfectly synced.")

if __name__ == "__main__":
    main()
