import subprocess
import argparse
import sys

def run_download(start_date, end_date):
    print(f"🚀 Iniciando descarga de {start_date} a {end_date}...")
    result = subprocess.run(
        ["python3", "download_sar.py", "--start", start_date, "--end", end_date]
    )
    if result.returncode != 0:
        print("❌ Error en la descarga. Abortando pipeline.")
        sys.exit(1)
    print("✅ Descarga completada.\n")

def run_processing():
    print("🚀 Iniciando procesamiento de escenas descargadas...")
    result = subprocess.run(["python3", "process_sar.py"])
    if result.returncode != 0:
        print("❌ Error en el procesamiento.")
        sys.exit(1)
    print("✅ Procesamiento completado.\n")

def main():
    parser = argparse.ArgumentParser(description="Pipeline SAR: descarga + procesamiento")
    parser.add_argument("--start", required=True, help="Fecha de inicio YYYY-MM-DD")
    parser.add_argument("--end", required=True, help="Fecha de fin YYYY-MM-DD")
    args = parser.parse_args()

    run_download(args.start, args.end)
    run_processing()
    print("🎉 Pipeline completado exitosamente.")

if __name__ == "__main__":
    main()
