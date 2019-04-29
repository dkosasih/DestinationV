# escape=`

# use existing  builder from https://github.com/docker/labs/blob/master/windows/sql-server/part-1.md
# Only for POC - once going towards production we should create our own builder to ensure availability and proper update

FROM dockersamples/assets-db-builder AS builder

WORKDIR .
COPY . .
RUN msbuild DestinationV.Database.sqlproj `
    /p:SQLDBExtensionsRefPath="C:\Microsoft.Data.Tools.Msbuild.10.0.61804.210\lib\net46" `
    /p:SqlServerRedistPath="C:\Microsoft.Data.Tools.Msbuild.10.0.61804.210\lib\net46"
	
# update to latest SqlPackage
FROM microsoft/windowsservercore:ltsc2016 AS sqlpackage
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

ARG PROXY=""

ENV download_url="https://download.microsoft.com/download/6/E/4/6E406E38-0A01-4DD1-B85E-6CA7CF79C8F7/EN/x64/DacFramework.msi"

RUN Invoke-WebRequest -Uri $env:download_url -OutFile DacFramework.msi  -Proxy $env:PROXY; `
    Start-Process msiexec.exe -ArgumentList '/i', 'DacFramework.msi', '/quiet', '/norestart' -NoNewWindow -Wait; `
    Remove-Item -Force DacFramework.msi

# db image
FROM microsoft/mssql-server-windows-express:2016-sp1
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';"]

COPY --from=sqlpackage ["C:\\Program Files\\Microsoft SQL Server\\140\\DAC", "C:\\Program Files\\Microsoft SQL Server\\140\\DAC"]

ENV ACCEPT_EULA="Y" `
    DATA_PATH="C:\database" `
    sa_password="D0cker!a8s"

VOLUME ${DATA_PATH}

WORKDIR c:\init
COPY InitDb.ps1 .
ENTRYPOINT ["powershell", "./InitDb.ps1"]

COPY --from=builder C:\bin\Debug\DestinationV.Database.dacpac .
