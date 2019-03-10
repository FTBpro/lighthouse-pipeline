# lighthouse-pipeline
Lighthouse Pipeline

## Run with docker compose

```bash
docker compose up
```

```bash
docker compose down
```

### Services

#### influxdb

Time series database.  Ready to go on first run.
In host network:    `http://localhost:8086`
In compose network: `http://influxdb:8086`

#### cronograf

Admin tool for chronograf database.  Ready to go on first run.

In host network:    `http://localhost:8888`
In compose network: `http://chronograf:8888`

#### grafana

Dashboards system.  Need to be configured on the first run.

In host network:    `http://localhost:3000`
In compose network: `http://grafana:8888`

<b>Configure grafana on first run</b>

1. Go to `http://localhost:3000`
2. Create new datasource with settings:
    Name:  lighthouse@influxdb
    URL:   http://influxdb:8086
    Database:  lighthouse
    User:      telegraf
    Password:  1234
3. Import new dashboard from json file:  dashboards/lighthouse.json

<b>Commit your changes of grafana dashboard</b>

1. Go to `http://localhost:3000`
2. Export your dashboard as json
3. Save file in folder dashboards
4. Commit with git
