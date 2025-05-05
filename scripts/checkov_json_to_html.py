import json
from pathlib import Path

input_path = Path("checkov-reports/checkov-report.json")
output_path = Path("checkov-reports/checkov-report.html")

with input_path.open() as f:
    report = json.load(f)

html = "<html><head><title>Checkov Report</title></head><body><h1>Checkov Results</h1><ul>"
for result in report.get("results", {}).get("failed_checks", []):
    html += f"<li><b>{result['check_id']}</b>: {result['check_name']} in {result['file_path']}</li>"
html += "</ul></body></html>"

output_path.write_text(html)
