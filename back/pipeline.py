#!/usr/bin/env python3
import argparse
import os
import subprocess
import sys

sys.path.insert(0, os.path.dirname(__file__))  # Para importar download_sar
import download_sar

parser = argparse.ArgumentParser(description="Pipeline SAR: descarga y procesa")
parser.add_argument("--start", required=True, help="Fecha inicio YYYY-MM-DD")
parser.add_argument("--end", required=True, help="Fecha fin YYYY-MM-DD")
args = parser.parse_args()

# Ejecutar download_sar.py y obtener archivo temporal
temp_file = download_sar.download_and_upload_results(args.start, args.end)

# Ruta del workflow relativa al script
workflow_xml = os.path.join(os.path.dirname(__file__), "sar_workflow.xml")

# Ejecutar process_sar.py
subprocess.run([
    "python3", "process_sar.py",
    "--temp_file", temp_file,
    "--workflow", workflow_xml,
    "--output_dir", "/home/laura_montaner/data/SAR_preprocessed"
])
