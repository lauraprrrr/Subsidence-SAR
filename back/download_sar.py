import asf_search as asf
import os
from google.cloud import storage
from datetime import datetime

BUCKET_NAME = "sar-rm-santiago"
LOCAL_DOWNLOAD_DIR = "/home/laura_montaner/data/SAR_raw"
AOI_WKT = "POLYGON((-70.95 -33.1, -70.45 -33.1, -70.45 -33.6, -70.95 -33.6, -70.95 -33.1))"  # Región Metropolitana aprox.
START_DATE = "2023-01-01"
END_DATE = "2025-10-01"
PLATFORM = "Sentinel-1"
BEAMMODE = "IW"
PRODUCT_TYPE = "SLC" 


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

    print(f"📦 {len(results)} productos encontrados")

    if not os.path.exists(LOCAL_DOWNLOAD_DIR):
        os.makedirs(LOCAL_DOWNLOAD_DIR, exist_ok=True)

    storage_client = storage.Client()
    bucket = storage_client.bucket(BUCKET_NAME)

    for product in results:
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
