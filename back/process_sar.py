#!/usr/bin/env python3
import os
import subprocess
import argparse

def process_sar(temp_file_path, workflow_xml, output_dir):
    # Leer la lista de archivos seleccionados
    with open(temp_file_path, "r") as f:
        selected_files = [line.strip() for line in f if line.strip()]

    print(f"📂 Procesando {len(selected_files)} archivos seleccionados...")

    os.makedirs(output_dir, exist_ok=True)

    for zip_path in selected_files:
        if not os.path.exists(zip_path):
            print(f"⚠️ No se encontró el archivo: {zip_path}")
            continue

        # Generar nombre de salida
        file_name = os.path.basename(zip_path).replace(".zip", "_processed.tif")
        output_path = os.path.join(output_dir, file_name)

        # Ejecutar SNAP GPT con el workflow
        cmd = [
            "/opt/snap/bin/gpt",
            workflow_xml,
            f"-Psource={zip_path}",
            f"-Poutput={output_path}"
        ]
        print(f"▶️ Procesando {zip_path} → {output_path}")
        try:
            subprocess.run(cmd, check=True)
        except subprocess.CalledProcessError as e:
            print(f"❌ Error procesando {zip_path}: {e}")

    # Borrar archivo temporal al terminar
    os.remove(temp_file_path)
    print("🗑️ Archivo temporal eliminado")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Procesar imágenes SAR con SNAP GPT")
    parser.add_argument(
        "--temp_file", required=True, help="Archivo temporal con lista de productos seleccionados"
    )
    parser.add_argument(
        "--workflow",
        default=os.path.join(os.path.dirname(__file__), "sar_workflow.xml"),
        help="Archivo XML del workflow SNAP (por defecto: sar_workflow.xml en el mismo directorio que el script)"
    )
    parser.add_argument(
        "--output_dir",
        default="/home/laura_montaner/data/SAR_preprocessed",
        help="Directorio de salida"
    )
    args = parser.parse_args()

    process_sar(args.temp_file, args.workflow, args.output_dir)
