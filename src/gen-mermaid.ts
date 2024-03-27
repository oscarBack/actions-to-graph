import fs from 'fs'
import YAML from 'yaml'

interface Job {
  name: string;
  needs?: string[];
}

interface Workflow {
  jobs: { [key: string]: Job };
}

const arreglo : any[] = []

export function generateMermaidSyntax(workflow: Workflow): string {
  let mermaidSyntax = 'graph TD;\n';


  for (const jobId in workflow.jobs) {
      const job = workflow.jobs[jobId];
      const jobName = job.name.replace(/\s+/g, '-'); // Replace whitespace with hyphens for Mermaid compatibility
      mermaidSyntax += `  ${jobName}[\"${job.name}\"]`;

      if (Array.isArray(job.needs) && job.needs.length > 0) {
          job.needs.forEach((dependency) => {
              if (workflow.jobs[dependency]) {
                  const dependencyName = workflow.jobs[dependency].name.replace(/\s+/g, '-');
                  mermaidSyntax += `\n  ${dependencyName}[\"${workflow.jobs[dependency].name}\"] --> ${jobName}`;
                  arreglo.push(mermaidSyntax)
              }
          });
      }
      // if job.needs is not an array and is a string
      else if (typeof job.needs === 'string' && workflow.jobs[job.needs]) {
          const dependencyName = workflow.jobs[job.needs].name.replace(/\s+/g, '-');
          mermaidSyntax += `\n  ${dependencyName}[\"${workflow.jobs[job.needs].name}\"] --> ${jobName}`;
          arreglo.push(mermaidSyntax)
      }
      // arreglo.push(job)
      // if this is the last iteration just add a semicolon, otherwise add a semi-colon and a new line
      if (jobId === Object.keys(workflow.jobs)[Object.keys(workflow.jobs).length - 1]) {
          mermaidSyntax += ';';
      } else {
          mermaidSyntax += ';\n';
      }
  }

  return mermaidSyntax;
}

export function parseYAMLtoJSON(yamlContent: string) {
  return YAML.parse(yamlContent);
}