import subprocess, time, urllib.request

# Find n8n PID
output = subprocess.check_output(['powershell', '-Command', "Get-CimInstance Win32_Process -Filter \"Name = 'node.exe'\" | Select-Object ProcessId, CommandLine | ConvertTo-Json"], text=True)

try:
    data = json.loads(output)
    if not isinstance(data, list):
        data = [data]
    for item in data:
        cmd = item.get('CommandLine') or ''
        if 'n8n' in cmd:
            pid = item.get('ProcessId')
            print(f"Stopping n8n PID {pid}...")
            subprocess.run(['powershell', '-Command', f"Stop-Process -Id {pid} -Force"])
except Exception as e:
    print('Error finding/killing n8n:', e)

time.sleep(2)

# Start n8n
print("Starting n8n process...")
subprocess.Popen(['node', 'C:/Users/fwdel/AppData/Roaming/npm/node_modules/n8n/bin/n8n', 'start'], creationflags=subprocess.CREATE_NEW_CONSOLE)

time.sleep(5)
try:
    with urllib.request.urlopen('http://localhost:5678/healthz') as res:
        print('n8n started successfully, status:', res.status)
except Exception as e:
    print('n8n check err:', e)
