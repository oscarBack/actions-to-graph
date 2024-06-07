import YAML from 'yaml'
import { ensureError } from './utils/erros'

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
    if (typeof job.name !== 'string') {
      job.name = jobId
    }
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

export function parseYAMLtoJSON (yamlContent: string): any {
  try {
    if (yamlContent === '') {
      throw new Error('The content of the file is empty')
    }
    const yamlContentParsed = YAML.parse(yamlContent)
    if (yamlContentParsed === null) {
      throw new Error('The content of the file is not a valid YAML')
    }
    if (yamlContentParsed.errors !== null &&
      typeof yamlContentParsed.errors !== 'undefined' &&
        yamlContentParsed.errors.length > 0
    ) {
      throw new Error('The content of the file is not a valid YAML')
    }
    return yamlContentParsed
  } catch (error) {
    throw ensureError(error)
  }
}
