import asf_search as asf
import os
from google.cloud import storage
from datetime import datetime
import numpy as np
from concurrent.futures import ThreadPoolExecutor, as_completed
import argparse

BUCKET_NAME = "sar-rm-santiago"
LOCAL_DOWNLOAD_DIR = "/home/laura_montaner/data/SAR_raw"
AOI_WKT = "POLYGON((-70.95 -33.1, -70.45 -33.1, -70.45 -33.6, -70.95 -33.6, -70.95 -33.1))"
PLATFORM = "Sentinel-1"
BEAMMODE = "IW"
PRODUCT_TYPE = "SLC" 
MAX_THREADS = 4 


def calculate_num_images(duration_months, min_images=2, max_images=12, k=0.3):
    n = int(k * duration_months)
    n = max(min_images, min(n, max_images))
    return n

def download_product(product, local_dir):
    file_name = product.properties['fileName']
    local_path = os.path.join(local_dir, file_name)
    if os.path.exists(local_path):
        print(f"⏩ Ya descargado: {file_name}")
        return local_path
    try:
        print(f"⬇️ Descargando: {file_name}")
        product.download(path=local_dir)
        return local_path
    except Exception as e:
        print(f"❌ Error descargando {file_name}: {e}")
        return None

def download_and_upload_results(start_date, end_date):
    print("🔍 Buscando imágenes SAR en ASF...")
    results = asf.search(
        platform=[PLATFORM],
        beamMode=BEAMMODE,
        processingLevel=PRODUCT_TYPE,
        start=start_date,
        end=end_date,
        intersectsWith=AOI_WKT
    )

    total_products = len(results)
    print(f"📦 {total_products} productos encontrados")
    if total_products == 0:
        print("⚠️ No se encontraron productos para las fechas y AOI indicadas.")
        return

    start_dt = datetime.strptime(start_date, "%Y-%m-%d")
    end_dt = datetime.strptime(end_date, "%Y-%m-%d")
    duration_months = (end_dt - start_dt).days / 30

    num_images = calculate_num_images(duration_months)
    print(f"ℹ️ Descargando {num_images} imágenes uniformemente distribuidas del total de {total_products}")

    results_sorted = sorted(results, key=lambda p: p.properties['startTime'])
    indices = np.linspace(0, total_products - 1, num=num_images, dtype=int)
    selected_products = [results_sorted[i] for i in indices]

    os.makedirs(LOCAL_DOWNLOAD_DIR, exist_ok=True)

    downloaded_files = []
    with ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        futures = {executor.submit(download_product, p, LOCAL_DOWNLOAD_DIR): p for p in selected_products}
        for f in as_completed(futures):
            local_path = f.result()
            if local_path:
                downloaded_files.append((futures[f], local_path))

    storage_client = storage.Client()
    bucket = storage_client.bucket(BUCKET_NAME)
    for product, local_path in downloaded_files:
        file_name = product.properties['fileName']
        blob_path = f"raw/{file_name}"
        blob = bucket.blob(blob_path)

        if os.path.exists(local_path):
            if not blob.exists():
                print(f"☁️ Subiendo {file_name} a gs://{BUCKET_NAME}/raw/")
                blob.upload_from_filename(local_path)
            else:
                print(f"✅ Ya existe en el bucket: {file_name}")
        else:
            print(f"⚠️ No se encontró el archivo descargado: {file_name}")

    print("🎉 Descarga y carga completada.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Descargar imágenes SAR y subir a GCS")
    parser.add_argument("--start", required=True, help="Fecha de inicio YYYY-MM-DD")
    parser.add_argument("--end", required=True, help="Fecha de fin YYYY-MM-DD")
    args = parser.parse_args()

    try:
        datetime.strptime(args.start, "%Y-%m-%d")
        datetime.strptime(args.end, "%Y-%m-%d")
    except ValueError:
        print("❌ Formato de fecha incorrecto. Usa YYYY-MM-DD.")
        exit(1)

    start_time = datetime.now()
    print(f"🚀 Inicio: {start_time}")
    download_and_upload_results(args.start, args.end)
    print(f"🕒 Tiempo total: {datetime.now() - start_time}")
