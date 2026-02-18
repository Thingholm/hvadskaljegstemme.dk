FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

COPY Hvadskaljegstemme/Hvadskaljegstemme.csproj Hvadskaljegstemme/
COPY Hvadskaljegstemme.Tests/Hvadskaljegstemme.Tests.csproj Hvadskaljegstemme.Tests/
RUN dotnet restore Hvadskaljegstemme/Hvadskaljegstemme.csproj

COPY . .

WORKDIR /app/Hvadskaljegstemme
RUN dotnet publish Hvadskaljegstemme.csproj -c Release --no-restore -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app

COPY --from=build /app/publish .
EXPOSE 8080

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

ENTRYPOINT [ "dotnet", "Hvadskaljegstemme.dll" ]