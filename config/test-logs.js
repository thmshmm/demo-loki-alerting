import { check, sleep } from 'k6';
import loki from 'k6/x/loki';

export const options = {
  vus: 1,
  iterations: 200,
  duration: '20m',
};

const labels = loki.Labels({
  "format": ["logfmt"],
  "os": ["linux"],
  "cluster": ["k3d", "minikube"],
  "namespace": ["loki-prod", "loki-dev"],
  "container": ["distributor", "ingester", "querier", "query-frontend", "query-scheduler", "index-gateway", "compactor"],
  "instance": ["localhost"],
});

const conf = loki.Config("http://team1@loki:3100", 5000, 1.0, {}, labels);
const client = loki.Client(conf);

export default () => {
  let res = client.pushParameterized(2, 512 * 1024, 1024 * 1024);

  check(res, { 'successful write': (res) => res.status == 204 });

  sleep(1);
}
