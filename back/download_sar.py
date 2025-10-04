import asf_search as asf
import os
from google.cloud import storage
from datetime import datetime
import numpy as np

# === CONFIGURACIONES ===
BUCKET_NAME = "sar-rm-santiago"
LOCAL_DOWNLOAD_DIR = "/home/laura_montaner/data/SAR_raw"
AOI_WKT = "POLYGON((-70.95 -33.1, -70.45 -33.1, -70.45 -33.6, -70.95 -33.6, -70.95 -33.1))"  # Región Metropolitana aprox.
START_DATE = "2023-01-01"
END_DATE = "2025-10-01"
PLATFORM = "Sentinel-1"
BEAMMODE = "IW"
PRODUCT_TYPE = "SLC"  # MintPy necesita SLC

# === FUNCIONES ===

def calculate_num_images(duration_months, min_images=2, max_images=12, k=0.3):
    """
    Calcula el número de imágenes a descargar proporcional al intervalo
    """
    n = int(k * duration_months)
    n = max(min_images, min(n, max_images))
    return n

def download_and_upload_results():
    print("🔍 Buscando imágenes SAR en ASF...")
    results = asf.search(
        platform=[PLATFORM],
        beamMode=BEAMMODE,
        processingLevel=PRODUCT_TYPE,
        start=START_DATE,
        end=END_DATE,
        intersectsWith=AOI_WKT
    )

    total_products = len(results)
    print(f"📦 {total_products} productos encontrados")

    if total_products == 0:
        print("⚠️ No se encontraron productos para las fechas y AOI indicadas.")
        return

    # Calcular duración del intervalo
    start_dt = datetime.strptime(START_DATE, "%Y-%m-%d")
    end_dt = datetime.strptime(END_DATE, "%Y-%m-%d")
    duration_months = (end_dt - start_dt).days / 30

    # Determinar cuántas imágenes extraer
    num_images = calculate_num_images(duration_months)
    print(f"ℹ️ Descargando {num_images} imágenes uniformemente distribuidas del total de {total_products}")

    # Seleccionar imágenes uniformemente
    results_sorted = sorted(results, key=lambda p: p.properties['startTime'])
    indices = np.linspace(0, total_products - 1, num=num_images, dtype=int)
    selected_products = [results_sorted[i] for i in indices]

    # Crear carpeta local si no existe
    os.makedirs(LOCAL_DOWNLOAD_DIR, exist_ok=True)

    # Inicializar cliente GCS
    storage_client = storage.Client()
    bucket = storage_client.bucket(BUCKET_NAME)

    # Descargar y subir seleccionadas
    for product in selected_products:
        file_name = f"{product.properties['fileName']}"
        local_path = os.path.join(LOCAL_DOWNLOAD_DIR, file_name)
        blob_path = f"raw/{file_name}"

        if os.path.exists(local_path):
            print(f"⏩ Ya descargado: {file_name}")
        else:
            print(f"⬇️ Descargando: {file_name}")
            product.download(path=LOCAL_DOWNLOAD_DIR)

        blob = bucket.blob(blob_path)
        if not blob.exists():
            print(f"☁️ Subiendo {file_name} a gs://{BUCKET_NAME}/raw/")
            blob.upload_from_filename(local_path)
        else:
            print(f"✅ Ya existe en el bucket: {file_name}")

    print("🎉 Descarga y carga completada.")


if __name__ == "__main__":
    start = datetime.now()
    print(f"🚀 Inicio: {start}")
    download_and_upload_results()
    print(f"🕒 Tiempo total: {datetime.now() - start}")
