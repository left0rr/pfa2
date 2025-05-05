import json
import os

INPUT_PATH = "gitleaks-reports/gitleaks-report.json"
OUTPUT_PATH = "gitleaks-reports/gitleaks-report.html"

def mask_secret(secret):
    if not secret:
        return ""
    return secret[:3] + "****" + secret[-3:]

def main():
    if not os.path.exists(INPUT_PATH):
        print(f"❌ Gitleaks report not found at {INPUT_PATH}")
        return

    with open(INPUT_PATH, "r") as f:
        data = json.load(f)

    html = """
    <html>
    <head>
        <title>Gitleaks Report</title>
        <style>
            body { font-family: Arial; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
        </style>
    </head>
    <body>
        <h2>🕵️ Gitleaks Report</h2>
        <table>
            <tr>
                <th>File</th>
                <th>Line</th>
                <th>Rule</th>
                <th>Secret</th>
                <th>Commit</th>
                <th>Description</th>
            </tr>
    """

    for leak in data:
        html += f"""
        <tr>
            <td>{leak.get('file')}</td>
            <td>{leak.get('line')}</td>
            <td>{leak.get('rule')}</td>
            <td>{mask_secret(leak.get('secret'))}</td>
            <td>{leak.get('commit')}</td>
            <td>{leak.get('description')}</td>
        </tr>
        """

    html += """
        </table>
    </body>
    </html>
    """

    with open(OUTPUT_PATH, "w") as f:
        f.write(html)

    print(f"✅ HTML report generated: {OUTPUT_PATH}")

if __name__ == "__main__":
    main()
