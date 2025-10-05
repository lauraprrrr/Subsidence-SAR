import os
import subprocess
from glob import glob
from concurrent.futures import ThreadPoolExecutor, as_completed

RAW_DIR = "/home/laura_montaner/data/SAR_raw"
PROCESSED_DIR = "/home/laura_montaner/data/SAR_preprocessed"
os.makedirs(PROCESSED_DIR, exist_ok=True)

MAX_THREADS = 4

def create_snap_workflow(input_zip, output_dim):
    workflow = f"""
<graph id="Preprocessing">
  <version>1.0</version>
  <node id="Apply-Orbit-File">
    <operator>Apply-Orbit-File</operator>
    <sources>
      <sourceProduct refid="source"/>
    </sources>
  </node>
  <node id="Remove-Thermal-Noise">
    <operator>Remove-Thermal-Noise</operator>
    <sources>
      <sourceProduct refid="Apply-Orbit-File"/>
    </sources>
  </node>
  <node id="Calibration">
    <operator>Calibration</operator>
    <sources>
      <sourceProduct refid="Remove-Thermal-Noise"/>
    </sources>
    <parameters>
      <outputSigmaBand>true</outputSigmaBand>
      <selectedPolarisations>VV,VH</selectedPolarisations>
      <sourceBands>Intensity_VV,Intensity_VH</sourceBands>
    </parameters>
  </node>
  <node id="TOPSAR-Deburst">
    <operator>TOPSAR-Deburst</operator>
    <sources>
      <sourceProduct refid="Calibration"/>
    </sources>
  </node>
  <node id="Terrain-Correction">
    <operator>Terrain-Correction</operator>
    <sources>
      <sourceProduct refid="TOPSAR-Deburst"/>
    </sources>
    <parameters>
      <demName>SRTM 3Sec</demName>
      <pixelSpacingInMeter>10.0</pixelSpacingInMeter>
    </parameters>
  </node>
  <node id="Write">
    <operator>Write</operator>
    <sources>
      <sourceProduct refid="Terrain-Correction"/>
    </sources>
    <parameters>
      <file>{output_dim}</file>
      <formatName>BEAM-DIMAP</formatName>
    </parameters>
  </node>
</graph>
"""
    return workflow

def process_scene(zip_file):
    base_name = os.path.basename(zip_file).replace(".zip", "")
    output_dim = os.path.join(PROCESSED_DIR, f"{base_name}_preprocessed.dim")
    workflow_xml = os.path.join(PROCESSED_DIR, f"{base_name}_workflow.xml")

    with open(workflow_xml, "w") as f:
        f.write(create_snap_workflow(zip_file, output_dim))

    print(f"🚀 Procesando escena: {base_name}")
    try:
        subprocess.run(
            ["gpt", workflow_xml, f"-Psource={zip_file}", f"-Poutput={output_dim}"],
            check=True
        )
        print(f"✅ Escena procesada: {output_dim}\n")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error procesando {zip_file}: {e}\n")

def main():
    zip_files = glob(os.path.join(RAW_DIR, "*.zip"))
    if not zip_files:
        print("❌ No se encontraron archivos ZIP en", RAW_DIR)
        return

    print(f"🔹 Se encontraron {len(zip_files)} escenas para procesar.")

    with ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        futures = [executor.submit(process_scene, z) for z in zip_files]
        for f in as_completed(futures):
            f.result() 

if __name__ == "__main__":
    main()
