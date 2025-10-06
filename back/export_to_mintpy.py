
import os
import shutil
import re

MINTPY_INPUT_DIR = "/home/laura_montaner/data/MintPy_inputs"
DEM_DIR = os.path.join(MINTPY_INPUT_DIR, "DEM")
LOG_FILE = "/home/laura_montaner/data/SAR_preprocessed/processed_files.txt"

def extract_date_from_filename(filename):
    match = re.search(r"(\d{8})", filename)
    return match.group(1) if match else None

def prepare_mintpy_inputs():
    if not os.path.exists(LOG_FILE):
        print("❌ No se encontró el archivo de registro processed_files.txt.")
        return

    os.makedirs(MINTPY_INPUT_DIR, exist_ok=True)
    os.makedirs(DEM_DIR, exist_ok=True)

    with open(LOG_FILE, "r") as f:
        processed_files = [line.strip() for line in f if line.strip()]

    for file_path in processed_files:
        if not os.path.exists(file_path):
            print(f"⚠️ Archivo no encontrado: {file_path}")
            continue

        file = os.path.basename(file_path)
        date_str = extract_date_from_filename(file)
        if not date_str:
            print(f"⚠️ No se pudo extraer fecha de {file}")
            continue

        target_dir = os.path.join(MINTPY_INPUT_DIR, date_str)
        os.makedirs(target_dir, exist_ok=True)
        target_path = os.path.join(target_dir, file)

        print(f"📂 Copiando {file} → {target_path}")
        shutil.copy2(file_path, target_path)

    print("✅ Archivos de la última ejecución organizados para MintPy en:")
    print(MINTPY_INPUT_DIR)

if __name__ == "__main__":
    prepare_mintpy_inputs()
