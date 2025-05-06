import sys
import json
from pathlib import Path
import html

# Validate arguments
if len(sys.argv) != 3:
    print("Usage: python3 checkov_json_to_html.py <input_json_path> <output_html_path>")
    sys.exit(1)

input_path = Path(sys.argv[1])
output_path = Path(sys.argv[2])

try:
    with input_path.open() as f:
        report = json.load(f)
except Exception as e:
    print(f"❌ Failed to read or parse JSON: {e}")
    sys.exit(1)

html_content = "<html><head><title>Checkov Report</title></head><body><h1>Checkov Results</h1><ul>"
for result in report.get("results", {}).get("failed_checks", []):
    check_id = html.escape(result.get('check_id', 'N/A'))
    check_name = html.escape(result.get('check_name', ''))
    file_path = html.escape(result.get('file_path', ''))
    html_content += f"<li><b>{check_id}</b>: {check_name} in <code>{file_path}</code></li>"
html_content += "</ul></body></html>"

try:
    output_path.write_text(html_content)
    print(f"✅ HTML report written to {output_path}")
except Exception as e:
    print(f"❌ Failed to write HTML report: {e}")
    sys.exit(1)
