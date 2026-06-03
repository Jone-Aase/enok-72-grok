param(
  [int]$Port = 8771
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Address = [System.Net.IPAddress]::Parse('127.0.0.1')
$Server = [System.Net.Sockets.TcpListener]::new($Address, $Port)
$Server.Start()
Write-Host "Serving $Root at http://127.0.0.1:$Port/"

function Get-ContentType($path) {
  switch ([System.IO.Path]::GetExtension($path).ToLowerInvariant()) {
    '.html' { 'text/html; charset=utf-8'; break }
    '.js'   { 'text/javascript; charset=utf-8'; break }
    '.json' { 'application/json; charset=utf-8'; break }
    '.png'  { 'image/png'; break }
    '.webp' { 'image/webp'; break }
    '.css'  { 'text/css; charset=utf-8'; break }
    default { 'application/octet-stream' }
  }
}

function Send-Response($stream, $status, $contentType, [byte[]]$body) {
  $reason = if ($status -eq 200) { 'OK' } elseif ($status -eq 403) { 'Forbidden' } else { 'Not Found' }
  $header = "HTTP/1.1 $status $reason`r`nContent-Length: $($body.Length)`r`nContent-Type: $contentType`r`nConnection: close`r`n`r`n"
  $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
  $stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($body.Length -gt 0) { $stream.Write($body, 0, $body.Length) }
}

try {
  while ($true) {
    $client = $Server.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $reader = [System.IO.StreamReader]::new($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()
      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        Send-Response $stream 404 'text/plain; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes('Not found'))
        continue
      }

      $parts = $requestLine.Split(' ')
      $requestPath = if ($parts.Length -ge 2) { $parts[1].Split('?')[0].TrimStart('/') } else { '' }
      $requestPath = [System.Uri]::UnescapeDataString($requestPath)
      if ([string]::IsNullOrWhiteSpace($requestPath)) { $requestPath = 'index.html' }

      while ($reader.ReadLine()) { }

      $fullPath = [System.IO.Path]::GetFullPath((Join-Path $Root $requestPath))
      if (-not $fullPath.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
        Send-Response $stream 403 'text/plain; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes('Forbidden'))
        continue
      }

      if (-not [System.IO.File]::Exists($fullPath)) {
        Send-Response $stream 404 'text/plain; charset=utf-8' ([System.Text.Encoding]::UTF8.GetBytes('Not found'))
        continue
      }

      $bytes = [System.IO.File]::ReadAllBytes($fullPath)
      Send-Response $stream 200 (Get-ContentType $fullPath) $bytes
    }
    finally {
      $client.Close()
    }
  }
}
finally {
  $Server.Stop()
}
