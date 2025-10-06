import subprocess
import argparse
import os

download_script = "download_sar.py"
process_script = "process_sar.py"

def main(start_date, end_date):
    print("🚀 Paso 1: Descargando imágenes SAR...")
    result = subprocess.run([
        "python3", download_script,
        "--start", start_date,
        "--end", end_date
    ], capture_output=True, text=True)
    
    print(result.stdout)
    if result.returncode != 0:
        print("❌ Error en download_sar.py")
        print(result.stderr)
        return

    print("🚀 Paso 2: Procesando SAR y generando interferogramas...")
    result = subprocess.run([
        "python3", process_script
    ], capture_output=True, text=True)
    
    print(result.stdout)
    if result.returncode != 0:
        print("❌ Error en process_sar.py")
        print(result.stderr)
        return

    print("🎉 Pipeline completado correctamente.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Pipeline SAR: descarga + procesamiento")
    parser.add_argument("--start", required=True, help="Fecha de inicio YYYY-MM-DD")
    parser.add_argument("--end", required=True, help="Fecha de fin YYYY-MM-DD")
    args = parser.parse_args()

    main(args.start, args.end)
