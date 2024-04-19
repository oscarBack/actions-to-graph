```mermaid
graph TD;
  build["build"];
  tag["tag"]
  build["build"] --> tag;
  deploy["deploy"]
  tag["tag"] --> deploy;
```