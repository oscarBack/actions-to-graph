import YAML from 'yaml'

export interface Job {
  name: string
  needs?: string[]
}

export interface Workflow {
  jobs: { [key: string]: Job }
}

const arreglo: string[] = []

export function generateMermaidSyntax (workflowString: string): string {
  let mermaidSyntax = 'graph TD;\n'
  const workflow = typeof workflowString === 'string' ? JSON.parse(workflowString) as Workflow : workflowString
  for (const jobId in workflow.jobs) {
    const job = workflow.jobs[jobId]
    const jobName = job.name.replace(/\s+/g, '-')
    mermaidSyntax += `  ${jobName}["${job.name}"]`

    if (Array.isArray(job.needs) && job.needs.length > 0) {
      job.needs.forEach((dependency) => {
        if (typeof workflow.jobs[dependency] !== 'undefined') {
          const dependencyName = workflow.jobs[dependency].name.replace(/\s+/g, '-')
          mermaidSyntax += `\n  ${dependencyName}["${workflow.jobs[dependency].name}"] --> ${jobName}`
          arreglo.push(mermaidSyntax)
        }
      })
    } else if (typeof job.needs === 'string' && typeof workflow.jobs[job.needs] !== 'undefined') {
      const dependencyName = workflow.jobs[job.needs].name.replace(/\s+/g, '-')
      mermaidSyntax += `\n  ${dependencyName}["${workflow.jobs[job.needs].name}"] --> ${jobName}`
      arreglo.push(mermaidSyntax)
    }
    if (jobId === Object.keys(workflow.jobs)[Object.keys(workflow.jobs).length - 1]) {
      mermaidSyntax += ';'
    } else {
      mermaidSyntax += ';\n'
    }
  }

  return mermaidSyntax
}

export function parseYAMLtoJSON (yamlContent: string): string {
  return YAML.parse(yamlContent)
}
