import json

def check_json(file_path):
    with open(file_path, "r") as f:
        data = json.load(f)
    slugs = []
    for d in data:
        slugs.append(d.get("slug"))
    
    seen = set()
    for s in slugs:
        if s in seen:
            print(f"Duplicate slug found in {file_path}: {s}")
        seen.add(s)

check_json("src/_data/specie.json")
