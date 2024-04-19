```mermaid
graph TD;
  generate-build-number["generate-build-number"];
  nginx-docker-image-deploy["nginx-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> nginx-docker-image-deploy;
  test-server-docker-image-deploy["test-server-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> test-server-docker-image-deploy;
  otel-collector-docker-image-deploy["otel-collector-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> otel-collector-docker-image-deploy;
  isolated-vm-docker-image-deploy["isolated-vm-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> isolated-vm-docker-image-deploy;
  status-page-docker-image-deploy["status-page-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> status-page-docker-image-deploy;
  test-docker-image-deploy["test-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> test-docker-image-deploy;
  ingestor-docker-image-deploy["ingestor-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> ingestor-docker-image-deploy;
  probe-docker-image-deploy["probe-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> probe-docker-image-deploy;
  haraka-docker-image-deploy["haraka-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> haraka-docker-image-deploy;
  dashboard-docker-image-deploy["dashboard-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> dashboard-docker-image-deploy;
  admin-dashboard-docker-image-deploy["admin-dashboard-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> admin-dashboard-docker-image-deploy;
  app-docker-image-deploy["app-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> app-docker-image-deploy;
  accounts-docker-image-deploy["accounts-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> accounts-docker-image-deploy;
  infrastructure-agent-docker-image-deploy["infrastructure-agent-docker-image-deploy"]
  generate-build-number["generate-build-number"] --> infrastructure-agent-docker-image-deploy;
  test-helm-chart["test-helm-chart"]
  infrastructure-agent-docker-image-deploy["infrastructure-agent-docker-image-deploy"] --> test-helm-chart
  isolated-vm-docker-image-deploy["isolated-vm-docker-image-deploy"] --> test-helm-chart
  test-server-docker-image-deploy["test-server-docker-image-deploy"] --> test-helm-chart
  test-docker-image-deploy["test-docker-image-deploy"] --> test-helm-chart
  ingestor-docker-image-deploy["ingestor-docker-image-deploy"] --> test-helm-chart
  probe-docker-image-deploy["probe-docker-image-deploy"] --> test-helm-chart
  haraka-docker-image-deploy["haraka-docker-image-deploy"] --> test-helm-chart
  dashboard-docker-image-deploy["dashboard-docker-image-deploy"] --> test-helm-chart
  admin-dashboard-docker-image-deploy["admin-dashboard-docker-image-deploy"] --> test-helm-chart
  app-docker-image-deploy["app-docker-image-deploy"] --> test-helm-chart
  accounts-docker-image-deploy["accounts-docker-image-deploy"] --> test-helm-chart
  otel-collector-docker-image-deploy["otel-collector-docker-image-deploy"] --> test-helm-chart
  status-page-docker-image-deploy["status-page-docker-image-deploy"] --> test-helm-chart
  nginx-docker-image-deploy["nginx-docker-image-deploy"] --> test-helm-chart;
```