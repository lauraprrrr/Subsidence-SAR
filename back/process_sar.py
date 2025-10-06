import os
import subprocess
from glob import glob
from xml.etree import ElementTree as ET


snap_gpt = "/opt/snap/bin/gpt"
input_dir = "/home/laura_montaner/data/SAR_raw"
orbit_graph = os.path.join(input_dir, "ApplyOrbitGraph.xml")
workflow_graph = os.path.join(input_dir, "sar_workflow.xml")
output_dir = os.path.join(input_dir, "Orb_Products")
interfero_dir = os.path.join(input_dir, "Interferograms")

os.makedirs(output_dir, exist_ok=True)
os.makedirs(interfero_dir, exist_ok=True)


zip_files = glob(os.path.join(input_dir, "*.zip"))
orb_files = []

for zipf in zip_files:
    base_name = os.path.basename(zipf).replace(".zip", "_Orb.dim")
    orb_file = os.path.join(output_dir, base_name)
    print(f"Procesando órbita: {zipf}")
    subprocess.run([snap_gpt, orbit_graph, "-Pinput="+zipf, "-Poutput="+orb_file])
    orb_files.append(orb_file)


def get_polarization(dim_file):
    tree = ET.parse(dim_file)
    root = tree.getroot()
    pols = set()
    for band in root.findall(".//band"):
        pol_name = band.get("name")
        if pol_name:
            # Ejemplo: VV, VH, HV, HH
            pols.add(pol_name.upper())
    return pols


orb_files_info = []

for orb in orb_files:
    pols = get_polarization(orb)
    orb_files_info.append({"file": orb, "polarizations": pols})


pairs = []
for i in range(len(orb_files_info)):
    for j in range(i+1, len(orb_files_info)):
        common_pol = orb_files_info[i]["polarizations"].intersection(
            orb_files_info[j]["polarizations"]
        )
        if common_pol:
            
            file_i = orb_files_info[i]["file"]
            file_j = orb_files_info[j]["file"]
            master, slave = sorted([file_i, file_j])
            pairs.append({"master": master, "slave": slave, "pol": list(common_pol)[0]})

for idx, pair in enumerate(pairs):
    output_file = os.path.join(interfero_dir, f"interf_{idx+1}.dim")
    print(f"Generando interferograma {idx+1}: {pair['master']} + {pair['slave']} (Pol: {pair['pol']})")
    subprocess.run([
        snap_gpt, workflow_graph,
        f"-Pmaster={pair['master']}",
        f"-Pslave={pair['slave']}",
        f"-Poutput={output_file}"
    ])
