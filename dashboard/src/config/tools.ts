export type ToolStatus = 'online' | 'degraded' | 'offline' | 'maintenance'
export type ToolCategory = 'monitoring' | 'documentation' | 'configuration'

export interface SubLink {
  name: string
  url: string
}

export interface Tool {
  id: string
  name: string
  description: string
  url: string
  category: ToolCategory
  status: ToolStatus
  icon: string
  subLinks?: SubLink[]
}

export interface CategoryMeta {
  id: ToolCategory
  label: string
  icon: string
}

// ─── Update URLs to match your internal network ──────────────────────────────

export const categories: CategoryMeta[] = [
  { id: 'monitoring',     label: 'Monitoring',     icon: '📡' },
  { id: 'documentation',  label: 'Documentation',  icon: '📋' },
  { id: 'configuration',  label: 'Configuration',  icon: '⚙️' },
]

export const tools: Tool[] = [
  {
    id: 'grafana',
    name: 'Grafana',
    description: 'Network metrics, bandwidth utilization, and infrastructure dashboards',
    url: 'http://grafana.internal',
    category: 'monitoring',
    status: 'online',
    icon: '📊',
    subLinks: [
      { name: 'Network Overview',  url: 'http://grafana.internal/d/network-overview' },
      { name: 'WAN Utilization',   url: 'http://grafana.internal/d/wan-utilization' },
      { name: 'NOC Summary',       url: 'http://grafana.internal/d/noc-summary' },
      { name: 'Device Health',     url: 'http://grafana.internal/d/device-health' },
    ],
  },
  {
    id: 'prtg',
    name: 'PRTG Network Monitor',
    description: 'Device status, sensor alerts, and real-time network health monitoring',
    url: 'http://prtg.internal',
    category: 'monitoring',
    status: 'online',
    icon: '🔍',
  },
  {
    id: 'wiki',
    name: 'Documentation Wiki',
    description: 'Network runbooks, SOPs, change management, and internal documentation',
    url: 'http://wiki.internal',
    category: 'documentation',
    status: 'online',
    icon: '📚',
  },
  {
    id: 'netbox',
    name: 'NetBox',
    description: 'IP address management, device inventory, rack diagrams, and cable management',
    url: 'http://netbox.internal',
    category: 'configuration',
    status: 'online',
    icon: '🗂️',
  },
  {
    id: 'oxidized',
    name: 'Oxidized',
    description: 'Automated network device configuration backup and diff history',
    url: 'http://oxidized.internal',
    category: 'configuration',
    status: 'online',
    icon: '💾',
  },
]
